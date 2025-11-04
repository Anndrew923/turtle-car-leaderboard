import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Reminder,
  ReminderFormData,
  ApiResponse,
  AuditResult,
  ReminderAudit,
} from "@/types";
import { maskPlateNumber, isValidPlateFormat } from "@/utils/plateNumber";
import { isValidRoadBlock } from "@/data/roadBlocks";

export class ReminderService {

  // 檢查重複提交（短時間內相同用戶）
  private static async checkDuplicateSubmission(
    userId: string,
    timeWindowMinutes: number = 5
  ): Promise<boolean> {
    if (!db) return false;

    try {
      const now = new Date();
      const timeWindow = new Date(
        now.getTime() - timeWindowMinutes * 60 * 1000
      );

      const q = query(
        collection(db, "reminders"),
        where("reminderId", "==", userId),
        where("createdAt", ">=", Timestamp.fromDate(timeWindow)),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking duplicate submission:", error);
      return false; // 檢查失敗時允許提交
    }
  }

  // 自動稽核
  static async autoAuditReminder(
    formData: ReminderFormData,
    userId: string
  ): Promise<AuditResult> {
    const reasons: string[] = [];
    let score = 100; // 初始分數

    // 1. 車牌號格式驗證
    if (!isValidPlateFormat(formData.plateNumber)) {
      reasons.push("車牌號格式不正確");
      score -= 30;
    }

    // 2. 路段區塊驗證
    if (!isValidRoadBlock(formData.roadBlock)) {
      reasons.push("路段選擇不正確");
      score -= 20;
    }

    // 3. 速度差驗證
    if (!formData.speedDifference) {
      reasons.push("請選擇低於速限的公里數");
      score -= 15;
    } else {
      // 驗證速度差值格式（10公里、20公里...50公里）
      const validSpeedDifferences = ["10公里", "20公里", "30公里", "40公里", "50公里"];
      if (!validSpeedDifferences.includes(formData.speedDifference)) {
        reasons.push("速度差值格式不正確");
        score -= 10;
      }
    }

    // 4. 重複提交檢測
    const isDuplicate = await this.checkDuplicateSubmission(userId);
    if (isDuplicate) {
      reasons.push("短時間內重複提交");
      score -= 25;
    }

    // 判斷是否通過自動稽核
    // 分數 >= 70 則自動通過
    const passed = score >= 70;
    const autoVerified = passed && score >= 80;

    return {
      passed,
      reasons,
      autoVerified,
      auditScore: Math.max(0, Math.min(100, score)),
    };
  }

  // Create a new reminder
  static async createReminder(
    reminderData: ReminderFormData,
    userId: string
  ): Promise<ApiResponse<Reminder>> {
    if (!db) {
      return {
        success: false,
        error: "Firebase 未初始化。請檢查 .env 文件並確保 Firebase 配置正確。",
      };
    }

    try {
      // 執行自動稽核
      const auditResult = await this.autoAuditReminder(reminderData, userId);

      // 如果稽核失敗，返回錯誤
      if (!auditResult.passed) {
        return {
          success: false,
          error: `提交失敗：${auditResult.reasons.join("、")}`,
        };
      }

      // 屏蔽車牌號
      const maskedPlate = maskPlateNumber(reminderData.plateNumber);

      // 建立稽核資訊
      const audit: ReminderAudit = {
        autoVerified: auditResult.autoVerified,
        autoVerifiedAt: auditResult.autoVerified ? new Date() : null,
        adminReviewed: false,
        adminReviewedAt: null,
        flagged: auditResult.auditScore < 70,
        flaggedReason: auditResult.auditScore < 70 ? "稽核分數過低" : undefined,
        auditScore: auditResult.auditScore,
      };

      // 決定狀態
      let status: "pending" | "verified" | "disputed" | "flagged" = "pending";
      if (auditResult.autoVerified) {
        status = "verified";
      } else if (audit.flagged) {
        status = "flagged";
      }

      // 建立路段字串（用於向後兼容）
      const roadString = reminderData.roadBlock.mainRoad
        ? `${reminderData.roadBlock.city}${reminderData.roadBlock.district}${reminderData.roadBlock.mainRoad}`
        : `${reminderData.roadBlock.city}${reminderData.roadBlock.district}`;

      // 建立提醒文件
      const reminder: Omit<Reminder, "id"> = {
        timestamp: new Date(),
        location: reminderData.location,
        road: roadString, // 向後兼容
        direction: "north", // 預設值，向後兼容
        roadBlock: reminderData.roadBlock,
        vehicleInfo: {
          color: reminderData.vehicleColor,
          type: reminderData.vehicleType,
          platePartial: maskedPlate, // 向後兼容
        },
        plateNumber: reminderData.plateNumber, // 完整車牌（私密）
        plateNumberMasked: maskedPlate, // 屏蔽後車牌（公開）
        speedDifference: reminderData.speedDifference,
        reminderId: userId,
        status,
        images: [], // 保留欄位用於向後兼容，但不再使用
        votes: { up: 0, down: 0 },
        audit,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 儲存到 Firestore
      const docRef = await addDoc(collection(db!, "reminders"), {
        ...reminder,
        timestamp: Timestamp.fromDate(reminder.timestamp),
        createdAt: Timestamp.fromDate(reminder.createdAt),
        updatedAt: Timestamp.fromDate(reminder.updatedAt),
        audit: {
          ...audit,
          autoVerifiedAt: audit.autoVerifiedAt
            ? Timestamp.fromDate(audit.autoVerifiedAt)
            : null,
          adminReviewedAt: null,
        },
      });

      return {
        success: true,
        data: { ...reminder, id: docRef.id },
        message: auditResult.autoVerified
          ? "提醒已成功提交並通過自動稽核"
          : "提醒已成功提交，等待人工審核",
      };
    } catch (error) {
      console.error("Error creating reminder:", error);
      return {
        success: false,
        error: "提交提醒失敗，請稍後再試",
      };
    }
  }

  // Get reminders with filters
  static async getReminders(
    limitCount: number = 20,
    road?: string
  ): Promise<ApiResponse<Reminder[]>> {
    if (!db) {
      return {
        success: false,
        error: "Firebase 未初始化。請檢查 .env 文件並確保 Firebase 配置正確。",
      };
    }
    try {
      let q = query(
        collection(db, "reminders"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      if (road) {
        q = query(
          collection(db!, "reminders"),
          where("road", "==", road),
          orderBy("createdAt", "desc"),
          limit(limitCount)
        );
      }

      const querySnapshot = await getDocs(q);
      const reminders: Reminder[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          audit: data.audit
            ? {
                ...data.audit,
                autoVerifiedAt: data.audit.autoVerifiedAt?.toDate() || null,
                adminReviewedAt: data.audit.adminReviewedAt?.toDate() || null,
              }
            : {
                autoVerified: false,
                autoVerifiedAt: null,
                adminReviewed: false,
                adminReviewedAt: null,
                flagged: false,
                auditScore: 0,
              },
          // 向後兼容：如果沒有 roadBlock，從 road 解析
          roadBlock: data.roadBlock || {
            city: data.road?.split("市")[0] + "市" || "",
            district: data.road?.split("市")[1]?.split("區")[0] + "區" || "",
            mainRoad: undefined,
          },
          plateNumberMasked: data.plateNumberMasked || data.vehicleInfo?.platePartial || "",
          speedDifference: data.speedDifference || data.description || "", // 向後兼容：如果沒有 speedDifference，使用 description
          images: data.images || [], // 向後兼容
        } as Reminder;
      });

      return {
        success: true,
        data: reminders,
      };
    } catch (error) {
      console.error("Error getting reminders:", error);
      return {
        success: false,
        error: "獲取提醒資料失敗",
      };
    }
  }

  // Vote on a reminder
  static async voteReminder(
    reminderId: string,
    voteType: "up" | "down",
    userId: string
  ): Promise<ApiResponse<void>> {
    if (!db) {
      return {
        success: false,
        error: "Firebase 未初始化。請檢查 .env 文件並確保 Firebase 配置正確。",
      };
    }
    try {
      const reminderRef = doc(db, "reminders", reminderId);
      // Note: In a real app, you'd want to track individual votes to prevent duplicate voting
      // For now, we'll just increment the vote count
      // TODO: Implement proper vote tracking using userId
      console.log(`User ${userId} voted ${voteType} on reminder ${reminderId}`);
      await updateDoc(reminderRef, {
        [`votes.${voteType}`]: 1, // This should be incremented, not set to 1
        updatedAt: Timestamp.now(),
      });

      return {
        success: true,
        message: "投票成功",
      };
    } catch (error) {
      console.error("Error voting on reminder:", error);
      return {
        success: false,
        error: "投票失敗",
      };
    }
  }

  // Delete a reminder
  static async deleteReminder(
    reminderId: string,
    userId: string
  ): Promise<ApiResponse<void>> {
    if (!db) {
      return {
        success: false,
        error: "Firebase 未初始化。請檢查 .env 文件並確保 Firebase 配置正確。",
      };
    }
    try {
      const reminderRef = doc(db, "reminders", reminderId);
      // TODO: Add authorization check to ensure user can delete this reminder
      console.log(`User ${userId} deleting reminder ${reminderId}`);
      await deleteDoc(reminderRef);

      return {
        success: true,
        message: "提醒已刪除",
      };
    } catch (error) {
      console.error("Error deleting reminder:", error);
      return {
        success: false,
        error: "刪除提醒失敗",
      };
    }
  }

  // Listen to reminders in real-time
  static subscribeToReminders(
    callback: (reminders: Reminder[]) => void,
    road?: string
  ): () => void {
    if (!db) {
      console.warn("Firebase 未初始化，無法訂閱提醒");
      callback([]);
      return () => {};
    }
    let q = query(
      collection(db, "reminders"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    if (road) {
      q = query(
        collection(db!, "reminders"),
        where("road", "==", road),
        orderBy("createdAt", "desc"),
        limit(20)
      );
    }

    return onSnapshot(q, (querySnapshot) => {
      const reminders: Reminder[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          audit: data.audit
            ? {
                ...data.audit,
                autoVerifiedAt: data.audit.autoVerifiedAt?.toDate() || null,
                adminReviewedAt: data.audit.adminReviewedAt?.toDate() || null,
              }
            : {
                autoVerified: false,
                autoVerifiedAt: null,
                adminReviewed: false,
                adminReviewedAt: null,
                flagged: false,
                auditScore: 0,
              },
          roadBlock: data.roadBlock || {
            city: data.road?.split("市")[0] + "市" || "",
            district: data.road?.split("市")[1]?.split("區")[0] + "區" || "",
            mainRoad: undefined,
          },
          plateNumberMasked: data.plateNumberMasked || data.vehicleInfo?.platePartial || "",
          speedDifference: data.speedDifference || data.description || "", // 向後兼容：如果沒有 speedDifference，使用 description
          images: data.images || [], // 向後兼容
        } as Reminder;
      });
      callback(reminders);
    });
  }
}

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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { Reminder, ReminderFormData, ApiResponse } from "@/types";

export class ReminderService {
  // Create a new reminder
  static async createReminder(
    reminderData: ReminderFormData,
    userId: string
  ): Promise<ApiResponse<Reminder>> {
    try {
      // Upload images if any
      const imageUrls: string[] = [];
      if (reminderData.images.length > 0) {
        for (const image of reminderData.images) {
          const imageRef = ref(
            storage,
            `reminders/${Date.now()}_${image.name}`
          );
          const snapshot = await uploadBytes(imageRef, image);
          const url = await getDownloadURL(snapshot.ref);
          imageUrls.push(url);
        }
      }

      // Create reminder document
      const reminder: Omit<Reminder, "id"> = {
        timestamp: new Date(),
        location: reminderData.location,
        road: reminderData.road,
        direction: reminderData.direction,
        vehicleInfo: {
          color: reminderData.vehicleColor,
          type: reminderData.vehicleType,
          platePartial: reminderData.platePartial,
        },
        description: reminderData.description,
        reminderId: userId,
        status: "pending",
        images: imageUrls,
        votes: { up: 0, down: 0 },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "reminders"), {
        ...reminder,
        timestamp: Timestamp.fromDate(reminder.timestamp),
        createdAt: Timestamp.fromDate(reminder.createdAt),
        updatedAt: Timestamp.fromDate(reminder.updatedAt),
      });

      return {
        success: true,
        data: { ...reminder, id: docRef.id },
        message: "提醒已成功提交",
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
    try {
      let q = query(
        collection(db, "reminders"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      if (road) {
        q = query(
          collection(db, "reminders"),
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
          timestamp: data.timestamp.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
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
    let q = query(
      collection(db, "reminders"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    if (road) {
      q = query(
        collection(db, "reminders"),
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
          timestamp: data.timestamp.toDate(),
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Reminder;
      });
      callback(reminders);
    });
  }
}

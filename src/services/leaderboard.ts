import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { LeaderboardItem, ApiResponse } from "@/types";

export class LeaderboardService {
  // Get leaderboard data
  static async getLeaderboard(
    limitCount: number = 10
  ): Promise<ApiResponse<LeaderboardItem[]>> {
    try {
      const q = query(
        collection(db, "leaderboard"),
        orderBy("count", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const leaderboard: LeaderboardItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          lastReminder: data.lastReminder.toDate(),
        } as LeaderboardItem;
      });

      // Calculate percentages
      const totalCount = leaderboard.reduce((sum, item) => sum + item.count, 0);
      const leaderboardWithPercentages = leaderboard.map((item) => ({
        ...item,
        percentage:
          totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0,
      }));

      return {
        success: true,
        data: leaderboardWithPercentages,
      };
    } catch (error) {
      console.error("Error getting leaderboard:", error);
      return {
        success: false,
        error: "獲取排行榜資料失敗",
      };
    }
  }

  // Get leaderboard by time period
  static async getLeaderboardByPeriod(
    period: "day" | "week" | "month",
    limitCount: number = 10
  ): Promise<ApiResponse<LeaderboardItem[]>> {
    try {
      const now = new Date();
      let startDate: Date;

      switch (period) {
        case "day":
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      }

      // In a real implementation, you'd query reminders with date filters
      // and aggregate the data. For now, we'll use the general leaderboard
      return this.getLeaderboard(limitCount);
    } catch (error) {
      console.error("Error getting leaderboard by period:", error);
      return {
        success: false,
        error: "獲取排行榜資料失敗",
      };
    }
  }

  // Get road statistics
  static async getRoadStats(road: string): Promise<
    ApiResponse<{
      totalReminders: number;
      todayReminders: number;
      trend: "up" | "down" | "stable";
      averagePerDay: number;
    }>
  > {
    try {
      // This would typically involve complex queries
      // For now, we'll return mock data based on the road
      console.log(`Getting stats for road: ${road}`);
      const stats = {
        totalReminders: Math.floor(Math.random() * 100) + 10,
        todayReminders: Math.floor(Math.random() * 10) + 1,
        trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as
          | "up"
          | "down"
          | "stable",
        averagePerDay: Math.floor(Math.random() * 5) + 1,
      };

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      console.error("Error getting road stats:", error);
      return {
        success: false,
        error: "獲取路段統計失敗",
      };
    }
  }

  // Listen to leaderboard changes in real-time
  static subscribeToLeaderboard(
    callback: (leaderboard: LeaderboardItem[]) => void
  ): () => void {
    const q = query(
      collection(db, "leaderboard"),
      orderBy("count", "desc"),
      limit(10)
    );

    return onSnapshot(q, (querySnapshot) => {
      const leaderboard: LeaderboardItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          lastReminder: data.lastReminder.toDate(),
        } as LeaderboardItem;
      });

      // Calculate percentages
      const totalCount = leaderboard.reduce((sum, item) => sum + item.count, 0);
      const leaderboardWithPercentages = leaderboard.map((item) => ({
        ...item,
        percentage:
          totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0,
      }));

      callback(leaderboardWithPercentages);
    });
  }
}

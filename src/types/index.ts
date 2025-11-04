// User types
export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  joinDate: Date;
  reminderCount: number;
  isAnonymous?: boolean;
}

// Reminder types
export interface Reminder {
  id: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
  };
  road: string; // 保留用於向後兼容
  direction: "north" | "south" | "east" | "west"; // 保留用於向後兼容
  roadBlock: RoadBlock; // 新增：區塊級路段
  vehicleInfo: {
    color: string;
    type: string;
    platePartial: string; // 保留用於向後兼容
  };
  plateNumber: string; // 完整車牌（私密，僅創建者可見）
  plateNumberMasked: string; // 屏蔽後車牌（公開，例如：A*C-1*34）
  speedDifference: string; // 低於速限的公里數（例如："10公里"、"20公里"）
  reminderId: string;
  status: "pending" | "verified" | "disputed" | "flagged";
  images: string[]; // 保留欄位用於向後兼容，但不再使用
  votes: {
    up: number;
    down: number;
  };
  audit: ReminderAudit; // 新增：稽核資訊
  createdAt: Date;
  updatedAt: Date;
}

// Leaderboard types
export interface LeaderboardItem {
  road: string;
  count: number;
  lastReminder: Date;
  trend: "up" | "down" | "stable";
  percentage: number;
}

// Comment types
export interface Comment {
  id: string;
  reminderId: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Audit Result types
export interface AuditResult {
  passed: boolean;
  reasons: string[];
  autoVerified: boolean;
  auditScore: number;
}

// Road Block types
export interface RoadBlock {
  city: string;
  district: string;
  mainRoad?: string;
}

// Reminder Audit types
export interface ReminderAudit {
  autoVerified: boolean;
  autoVerifiedAt: Date | null;
  adminReviewed: boolean;
  adminReviewedAt: Date | null;
  flagged: boolean;
  flaggedReason?: string;
  auditScore: number; // 0-100, 稽核分數
}

// Form types
export interface ReminderFormData {
  plateNumber: string; // 完整車牌號（例如：ABC-1234）
  roadBlock: RoadBlock; // 區塊級路段
  vehicleColor: string;
  vehicleType: string;
  speedDifference: string; // 低於速限的公里數（例如："10公里"、"20公里"）
  location: {
    lat: number;
    lng: number;
  };
}

// Map types
export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
  road?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "reminder" | "comment" | "system";
  data?: Record<string, any>;
  timestamp: Date;
  read: boolean;
}

// App State types
export interface AppState {
  user: User | null;
  reminders: Reminder[];
  leaderboard: LeaderboardItem[];
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

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
  road: string;
  direction: "north" | "south" | "east" | "west";
  vehicleInfo: {
    color: string;
    type: string;
    platePartial: string; // ABC-****
  };
  description: string;
  reminderId: string;
  status: "pending" | "verified" | "disputed";
  images: string[];
  votes: {
    up: number;
    down: number;
  };
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

// Form types
export interface ReminderFormData {
  road: string;
  direction: "north" | "south" | "east" | "west";
  vehicleColor: string;
  vehicleType: string;
  platePartial: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  images: File[];
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

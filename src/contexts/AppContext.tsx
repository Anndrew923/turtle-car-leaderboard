import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AppState, Reminder, LeaderboardItem, Notification } from "@/types";
import { ReminderService } from "@/services/reminder";
import { LeaderboardService } from "@/services/leaderboard";

type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: any }
  | { type: "SET_REMINDERS"; payload: Reminder[] }
  | { type: "ADD_REMINDER"; payload: Reminder }
  | { type: "UPDATE_REMINDER"; payload: Reminder }
  | { type: "DELETE_REMINDER"; payload: string }
  | { type: "SET_LEADERBOARD"; payload: LeaderboardItem[] }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string };

const initialState: AppState = {
  user: null,
  reminders: [],
  leaderboard: [],
  notifications: [],
  loading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_REMINDERS":
      return { ...state, reminders: action.payload };
    case "ADD_REMINDER":
      return { ...state, reminders: [action.payload, ...state.reminders] };
    case "UPDATE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map((reminder) =>
          reminder.id === action.payload.id ? action.payload : reminder
        ),
      };
    case "DELETE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== action.payload
        ),
      };
    case "SET_LEADERBOARD":
      return { ...state, leaderboard: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loadReminders: (road?: string) => Promise<void>;
  loadLeaderboard: () => Promise<void>;
  addReminder: (reminder: Reminder) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadReminders = async (road?: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await ReminderService.getReminders(road);
      if (response.success && response.data) {
        dispatch({ type: "SET_REMINDERS", payload: response.data });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: response.error || "載入提醒失敗",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "載入提醒失敗" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const loadLeaderboard = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await LeaderboardService.getLeaderboard();
      if (response.success && response.data) {
        dispatch({ type: "SET_LEADERBOARD", payload: response.data });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: response.error || "載入排行榜失敗",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "載入排行榜失敗" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addReminder = (reminder: Reminder) => {
    dispatch({ type: "ADD_REMINDER", payload: reminder });
  };

  const updateReminder = (reminder: Reminder) => {
    dispatch({ type: "UPDATE_REMINDER", payload: reminder });
  };

  const deleteReminder = (id: string) => {
    dispatch({ type: "DELETE_REMINDER", payload: id });
  };

  const addNotification = (notification: Notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };

  const markNotificationRead = (id: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id });
  };

  // Load initial data
  useEffect(() => {
    loadReminders();
    loadLeaderboard();
  }, []);

  const value: AppContextType = {
    state,
    dispatch,
    loadReminders,
    loadLeaderboard,
    addReminder,
    updateReminder,
    deleteReminder,
    addNotification,
    markNotificationRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

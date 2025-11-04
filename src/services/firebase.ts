import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from "firebase/firestore";
import {
  getStorage,
  connectStorageEmulator,
  FirebaseStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 驗證 Firebase 配置
const hasValidConfig = (): boolean => {
  const requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ] as const;

  return requiredKeys.every((key) => {
    const value = firebaseConfig[key];
    return (
      value &&
      value !== `your_${key.toLowerCase()}_here` &&
      !value.includes("your_") &&
      value !==
        `your_project_id.${
          key === "authDomain" ? "firebaseapp.com" : "appspot.com"
        }`
    );
  });
};

// 初始化 Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
  if (!hasValidConfig()) {
    console.warn("⚠️ Firebase 環境變數未正確設定！請檢查 .env 文件。");
    console.warn("應用將繼續運行，但 Firebase 功能可能無法正常工作。");
    console.warn("如需設定 Firebase，請參考 env.example 並填入正確的配置值。");
  } else {
    // 檢查是否已經初始化
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
      console.log("✅ Firebase 初始化成功");
    } else {
      app = getApps()[0];
      console.log("ℹ️ Firebase 已初始化");
    }

    // 初始化 Firebase 服務
    if (app) {
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);

      // 在開發模式下連接到模擬器（如果啟用）
      if (
        import.meta.env.DEV &&
        import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true"
      ) {
        try {
          connectAuthEmulator(auth, "http://localhost:9099", {
            disableWarnings: true,
          });
        } catch (error: any) {
          if (
            error?.message?.includes("already been") ||
            error?.message?.includes("already connected")
          ) {
            console.log("ℹ️ Firebase Auth Emulator 已連接");
          } else {
            console.log(
              "ℹ️ Firebase Auth Emulator 不可用，使用生產環境 Firebase"
            );
          }
        }

        try {
          connectFirestoreEmulator(db, "localhost", 8080);
        } catch (error: any) {
          if (error?.message?.includes("already been")) {
            console.log("ℹ️ Firestore Emulator 已連接");
          } else {
            console.log("ℹ️ Firestore Emulator 不可用，使用生產環境 Firestore");
          }
        }

        try {
          connectStorageEmulator(storage, "localhost", 9199);
        } catch (error: any) {
          if (error?.message?.includes("already been")) {
            console.log("ℹ️ Storage Emulator 已連接");
          } else {
            console.log("ℹ️ Storage Emulator 不可用，使用生產環境 Storage");
          }
        }
      } else if (import.meta.env.DEV) {
        console.log("ℹ️ 使用生產環境 Firebase（模擬器已禁用）");
      }
    }
  }
} catch (error) {
  console.error("❌ Firebase 初始化失敗:", error);
  console.error(
    "應用將繼續運行，但 Firebase 功能將無法使用。請檢查環境變數配置。"
  );
}

// 導出服務（如果初始化失敗，導出 null）
export { auth, db, storage };
export default app;

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { User } from "@/types";

export class AuthService {
  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await this.getUserData(userCredential.user.uid);
      return user;
    } catch (error) {
      throw new Error("登入失敗，請檢查帳號密碼");
    }
  }

  // Sign up with email and password
  static async signUp(
    email: string,
    password: string,
    nickname: string
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: nickname });

      const userData: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        nickname,
        joinDate: new Date(),
        reminderCount: 0,
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      return userData;
    } catch (error) {
      throw new Error("註冊失敗，請稍後再試");
    }
  }

  // Sign in anonymously
  static async signInAnonymously(): Promise<User> {
    try {
      const userCredential = await signInAnonymously(auth);

      const userData: User = {
        id: userCredential.user.uid,
        email: "anonymous@turtlecar.app",
        nickname: `匿名用戶${Math.random().toString(36).substr(2, 9)}`,
        joinDate: new Date(),
        reminderCount: 0,
        isAnonymous: true,
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      return userData;
    } catch (error) {
      throw new Error("匿名登入失敗");
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("登出失敗");
    }
  }

  // Get user data from Firestore
  static async getUserData(uid: string): Promise<User> {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        throw new Error("用戶資料不存在");
      }
    } catch (error) {
      throw new Error("獲取用戶資料失敗");
    }
  }

  // Listen to auth state changes
  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            const user = await this.getUserData(firebaseUser.uid);
            callback(user);
          } catch (error) {
            console.error("Error getting user data:", error);
            callback(null);
          }
        } else {
          callback(null);
        }
      }
    );
  }
}

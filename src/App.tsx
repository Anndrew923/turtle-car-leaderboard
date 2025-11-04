// React import not needed in React 17+ with new JSX transform
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import BottomNavigation from "@/components/Layout/BottomNavigation";
import HomePage from "@/pages/HomePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import SettingsPage from "@/pages/SettingsPage";
import ReminderPage from "@/pages/ReminderPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route
                  path="/community"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-2xl">社群頁面開發中...</h1>
                    </div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-2xl">個人頁面開發中...</h1>
                    </div>
                  }
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/reminder" element={<ReminderPage />} />
                <Route
                  path="/auth/login"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-2xl">登入頁面開發中...</h1>
                    </div>
                  }
                />
                <Route
                  path="/auth/register"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-2xl">註冊頁面開發中...</h1>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <BottomNavigation />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

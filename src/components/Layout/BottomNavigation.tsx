import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, MessageCircle, User, Settings } from "lucide-react";

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "首頁", icon: Home },
    { path: "/leaderboard", label: "排行榜", icon: BarChart3 },
    { path: "/community", label: "社群", icon: MessageCircle },
    { path: "/profile", label: "個人", icon: User },
    { path: "/settings", label: "設定", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-primary-600"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary-600 rounded-full" />
              )}
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-primary-600" : ""}`} />
              <span className={`text-xs ${isActive ? "font-semibold" : "font-normal"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;


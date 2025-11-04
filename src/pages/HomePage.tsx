import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Plus, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import Button from "@/components/UI/Button";

const HomePage: React.FC = () => {
  const { state, loadReminders, loadLeaderboard } = useApp();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalReminders: 0,
    todayReminders: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    loadReminders();
    loadLeaderboard();

    // Mock stats - in real app, this would come from API
    setStats({
      totalReminders: 1234,
      todayReminders: 56,
      activeUsers: 789,
    });
  }, []);

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="載入中..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">龜車排行榜</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              讓駕駛者互相友善提醒的社群平台
            </p>
            <p className="text-lg mb-8 text-primary-200 max-w-3xl mx-auto">
              透過群眾力量改善交通環境，讓大家有個和平發洩的管道。
              排行榜前列的駕駛者，我們計畫提供免費駕駛訓練班。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reminder">
                <Button size="lg" className="w-full sm:w-auto">
                  <Plus className="w-5 h-5 mr-2" />
                  提交提醒
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-600"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  查看排行榜
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <AlertTriangle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.totalReminders.toLocaleString()}
                </h3>
                <p className="text-gray-600">總提醒數</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.todayReminders}
                </h3>
                <p className="text-gray-600">今日提醒</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.activeUsers.toLocaleString()}
                </h3>
                <p className="text-gray-600">活躍用戶</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reminders */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">最新提醒</h2>
            <Link
              to="/community"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              查看全部 →
            </Link>
          </div>

          {state.reminders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.reminders.slice(0, 6).map((reminder) => (
                <div
                  key={reminder.id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {reminder.road}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(reminder.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-900 mb-4 line-clamp-2">
                    {reminder.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        {reminder.vehicleInfo.color} {reminder.vehicleInfo.type}
                      </span>
                      <span>{reminder.vehicleInfo.platePartial}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-green-600">
                        ↑ {reminder.votes.up}
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        ↓ {reminder.votes.down}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                尚無提醒資料
              </h3>
              <p className="text-gray-500 mb-6">成為第一個提交提醒的用戶！</p>
              <Link to="/reminder">
                <Button>提交提醒</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
// LeaderboardItem type will be used in future implementations
// import { LeaderboardItem } from "@/types";

const LeaderboardPage: React.FC = () => {
  const { state, loadLeaderboard } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "day" | "week" | "month"
  >("week");

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendText = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "上升";
      case "down":
        return "下降";
      default:
        return "穩定";
    }
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-red-600 bg-red-50";
      case "down":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="載入排行榜中..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">排行榜</h1>
          <p className="text-lg text-gray-600">
            查看最需要注意的路段，了解交通熱點
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: "day", label: "今日" },
              { key: "week", label: "本週" },
              { key: "month", label: "本月" },
            ].map((period) => (
              <button
                key={period.key}
                onClick={() =>
                  setSelectedPeriod(period.key as "day" | "week" | "month")
                }
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period.key
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedPeriod === "day"
                ? "今日"
                : selectedPeriod === "week"
                ? "本週"
                : "本月"}
              最需要注意路段
            </h2>
          </div>

          {state.leaderboard.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {state.leaderboard.map((item, index) => (
                <div
                  key={item.road}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        {index < 3 ? (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0
                                ? "bg-yellow-500"
                                : index === 1
                                ? "bg-gray-400"
                                : "bg-orange-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                            {index + 1}
                          </div>
                        )}
                      </div>

                      {/* Road Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {item.road}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{item.count} 次提醒</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              最後提醒：
                              {new Date(item.lastReminder).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-4">
                        {/* Percentage */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {item.percentage}%
                          </div>
                          <div className="text-sm text-gray-500">佔比</div>
                        </div>

                        {/* Trend */}
                        <div className="flex items-center space-x-2">
                          <div
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(
                              item.trend
                            )}`}
                          >
                            {getTrendIcon(item.trend)}
                            <span>{getTrendText(item.trend)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                尚無排行榜資料
              </h3>
              <p className="text-gray-500">提交提醒後即可查看排行榜</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                關於排行榜
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                排行榜顯示最需要注意的路段，幫助駕駛者了解交通熱點。
                數據基於用戶友善提醒統計，僅供參考，不構成任何法律事實。
                我們鼓勵友善提醒，而非指責，共同改善交通環境。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;

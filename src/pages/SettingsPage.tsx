import React from "react";
import { Link } from "react-router-dom";
import { Settings, HelpCircle, Shield, FileText, Mail } from "lucide-react";

const SettingsPage: React.FC = () => {
  const supportLinks = [
    { path: "/help", label: "使用說明", icon: HelpCircle },
    { path: "/privacy", label: "隱私政策", icon: Shield },
    { path: "/terms", label: "使用條款", icon: FileText },
    { path: "/contact", label: "聯絡我們", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Settings className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">設定</h1>
          </div>
          <p className="text-gray-600 mt-2">管理您的帳號設定和應用程式偏好</p>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">支援</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-900 font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Placeholder for future settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">帳號設定</h2>
          <p className="text-gray-500">更多設定功能即將推出...</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


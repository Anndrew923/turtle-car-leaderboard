import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Shield, HelpCircle } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">龜車排行榜</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              讓駕駛者互相友善提醒的社群平台，透過群眾力量改善交通環境，讓大家有個和平發洩的管道。
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Shield className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  首頁
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  排行榜
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  社群
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  個人資料
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">支援</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  使用說明
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  隱私政策
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  使用條款
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  聯絡我們
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 龜車排行榜. 保留所有權利.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">
                本平台僅供駕駛者互相提醒使用，提醒內容僅代表個人觀點，不構成任何法律事實。
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

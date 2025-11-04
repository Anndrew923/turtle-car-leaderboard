import React from "react";
import { MapPin, Mail, Shield, HelpCircle } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 改為單一欄位，只顯示品牌資訊 */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">龜車排行榜</span>
          </div>
          <div className="flex space-x-4 mb-6">
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

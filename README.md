# 龜車排行榜 App

一個讓駕駛者互相友善提醒的社群平台，透過群眾力量改善交通環境。

## 功能特色

- 🚗 **友善提醒系統** - 讓用戶互相提醒注意車速
- 📊 **排行榜功能** - 統計最需要注意的路段
- 👥 **社群互動** - 留言討論和用戶互動
- 📱 **跨平台支援** - Web、Android、iOS 全平台
- 🗺️ **地圖整合** - Google Maps 精確定位
- 🔒 **隱私保護** - 匿名化處理車牌資訊

## 技術棧

- **前端**: React 18 + TypeScript + Vite
- **後端**: Firebase (Auth + Firestore + Storage)
- **地圖**: Google Maps API
- **打包**: Capacitor (跨平台)
- **樣式**: Tailwind CSS
- **部署**: Netlify (Web) + Google Play + App Store

## 專案結構

```
src/
├── components/          # 共用組件
│   ├── Layout/         # 佈局組件
│   └── UI/            # UI 組件
├── pages/              # 頁面組件
├── services/           # API 服務
├── contexts/           # React Context
├── hooks/              # 自定義 Hooks
├── utils/              # 工具函數
├── types/              # TypeScript 類型
└── assets/             # 靜態資源
```

## 開發環境設定

### 1. 安裝依賴

```bash
cd turtle-car-app
npm install
```

### 2. 環境變數設定

複製 `env.example` 為 `.env` 並填入您的配置：

```bash
cp env.example .env
```

編輯 `.env` 檔案：

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# App Configuration
VITE_APP_NAME=龜車排行榜
VITE_APP_VERSION=1.0.0
```

### 3. Firebase 設定

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 建立新專案
3. 啟用 Authentication、Firestore、Storage
4. 複製配置到 `.env` 檔案

### 4. Google Maps API

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 啟用 Maps JavaScript API
3. 建立 API 金鑰
4. 複製金鑰到 `.env` 檔案

## 開發指令

### Web 開發

```bash
# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint
```

### 移動應用開發

```bash
# 同步 Capacitor
npm run cap:sync

# 新增 Android 平台
npm run cap:add:android

# 新增 iOS 平台
npm run cap:add:ios

# 執行 Android 應用
npm run cap:run:android

# 執行 iOS 應用
npm run cap:run:ios

# 建構 Android APK
npm run cap:build:android

# 建構 iOS IPA
npm run cap:build:ios
```

## 部署

### Web 部署 (Netlify)

1. 建構專案：`npm run build`
2. 上傳 `dist` 資料夾到 Netlify
3. 設定環境變數

### Android 部署

1. 建構 Web 版本：`npm run build`
2. 同步 Capacitor：`npm run cap:sync`
3. 開啟 Android Studio：`npm run cap:run:android`
4. 建構 APK 或 AAB

### iOS 部署

1. 建構 Web 版本：`npm run build`
2. 同步 Capacitor：`npm run cap:sync`
3. 開啟 Xcode：`npm run cap:run:ios`
4. 建構 IPA

## 功能開發進度

- [x] 專案架構設定
- [x] Firebase 整合
- [x] 基本 UI 組件
- [x] 首頁和排行榜頁面
- [ ] 提醒系統
- [ ] 社群功能
- [ ] 用戶認證
- [ ] 推播通知
- [ ] 地圖整合

## 法律聲明

本平台僅供駕駛者互相提醒使用，提醒內容僅代表個人觀點，不構成任何法律事實。我們鼓勵友善提醒，而非指責，共同改善交通環境。

## 授權

MIT License

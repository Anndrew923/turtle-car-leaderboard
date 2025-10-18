#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 龜車排行榜 App 設定開始...\n");

// 檢查 Node.js 版本
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

if (majorVersion < 16) {
  console.error("❌ 需要 Node.js 16 或更高版本");
  console.error(`   目前版本: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js 版本檢查通過: ${nodeVersion}`);

// 檢查是否已安裝依賴
if (!fs.existsSync("node_modules")) {
  console.log("📦 安裝依賴套件...");
  try {
    execSync("npm install", { stdio: "inherit" });
    console.log("✅ 依賴套件安裝完成");
  } catch (error) {
    console.error("❌ 依賴套件安裝失敗");
    process.exit(1);
  }
} else {
  console.log("✅ 依賴套件已安裝");
}

// 檢查環境變數檔案
if (!fs.existsSync(".env")) {
  if (fs.existsSync("env.example")) {
    console.log("📝 建立環境變數檔案...");
    fs.copyFileSync("env.example", ".env");
    console.log("✅ 已建立 .env 檔案，請編輯並填入您的配置");
  } else {
    console.log("⚠️  找不到 env.example 檔案");
  }
} else {
  console.log("✅ 環境變數檔案已存在");
}

// 建立必要的資料夾
const directories = [
  "src/assets/images",
  "src/assets/icons",
  "public/icons",
  "android/app/src/main/assets",
  "ios/App/App/Assets.xcassets",
];

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 建立資料夾: ${dir}`);
  }
});

console.log("\n🎉 設定完成！");
console.log("\n📋 下一步：");
console.log("1. 編輯 .env 檔案，填入您的 Firebase 和 Google Maps API 配置");
console.log("2. 執行 npm run dev 啟動開發伺服器");
console.log("3. 執行 npm run cap:sync 同步 Capacitor");
console.log("4. 執行 npm run cap:add:android 或 npm run cap:add:ios 新增平台");
console.log("\n📚 更多資訊請查看 README.md");

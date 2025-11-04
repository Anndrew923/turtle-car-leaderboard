@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo Firebase 連接驗證
echo ========================================
echo.

REM 檢查 .env 是否存在
if not exist ".env" (
    echo ❌ 錯誤: 找不到 .env 檔案
    echo 💡 請先執行 setup-firebase-env.bat 建立 .env 檔案
    echo.
    pause
    exit /b 1
)

echo 🔍 檢查 .env 檔案中的 Firebase 配置...
echo.

REM 檢查必要的環境變數（簡單檢查是否有填入值）
set has_error=0

findstr /C:"VITE_FIREBASE_API_KEY=" .env | findstr /V:"your_api_key_here" >nul
if %errorlevel% neq 0 (
    echo ⚠️  警告: VITE_FIREBASE_API_KEY 可能未正確設定
    set has_error=1
) else (
    echo ✅ VITE_FIREBASE_API_KEY 已設定
)

findstr /C:"VITE_FIREBASE_PROJECT_ID=" .env | findstr /V:"your_project_id" >nul
if %errorlevel% neq 0 (
    echo ⚠️  警告: VITE_FIREBASE_PROJECT_ID 可能未正確設定
    set has_error=1
) else (
    echo ✅ VITE_FIREBASE_PROJECT_ID 已設定
)

findstr /C:"VITE_FIREBASE_AUTH_DOMAIN=" .env | findstr /V:"your_project_id.firebaseapp.com" >nul
if %errorlevel% neq 0 (
    echo ⚠️  警告: VITE_FIREBASE_AUTH_DOMAIN 可能未正確設定
    set has_error=1
) else (
    echo ✅ VITE_FIREBASE_AUTH_DOMAIN 已設定
)

findstr /C:"VITE_FIREBASE_STORAGE_BUCKET=" .env | findstr /V:"your_project_id.appspot.com" >nul
if %errorlevel% neq 0 (
    echo ⚠️  警告: VITE_FIREBASE_STORAGE_BUCKET 可能未正確設定
    set has_error=1
) else (
    echo ✅ VITE_FIREBASE_STORAGE_BUCKET 已設定
)

findstr /C:"VITE_FIREBASE_MESSAGING_SENDER_ID=" .env | findstr /V:"your_sender_id" >nul
if %errorlevel% neq 0 (
    echo ⚠️  警告: VITE_FIREBASE_MESSAGING_SENDER_ID 可能未正確設定
    set has_error=1
) else (
    echo ✅ VITE_FIREBASE_MESSAGING_SENDER_ID 已設定
)

findstr /C:"VITE_FIREBASE_APP_ID=" .env | findstr /V:"your_app_id" >nul
if %errorlevel% neq 0 (
    echo ⚠️  警告: VITE_FIREBASE_APP_ID 可能未正確設定
    set has_error=1
) else (
    echo ✅ VITE_FIREBASE_APP_ID 已設定
)

echo.

if %has_error%==1 (
    echo ========================================
    echo ⚠️  發現配置問題
    echo ========================================
    echo.
    echo 💡 請檢查 .env 檔案並確保所有 Firebase 配置值都已正確填入
    echo 💡 如果仍有問題，請重新執行 setup-firebase-env.bat
    echo.
) else (
    echo ========================================
    echo ✅ 所有 Firebase 配置值已設定
    echo ========================================
    echo.
    echo 📋 下一步：
    echo 1. 執行 npm run dev 啟動開發伺服器
    echo 2. 開啟瀏覽器開發者工具 (F12)
    echo 3. 檢查 Console 是否顯示 "✅ Firebase 初始化成功"
    echo.
    echo 💡 如果看到 "⚠️ Firebase 環境變數未正確設定"：
    echo    - 確認 .env 檔案中的所有值都已正確填入
    echo    - 確認沒有多餘的引號或空格
    echo    - 重新啟動開發伺服器 (Ctrl+C 後重新執行 npm run dev)
    echo.
)

pause


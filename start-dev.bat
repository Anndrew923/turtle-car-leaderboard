@echo off
cd /d "%~dp0"
echo ========================================
echo 啟動龜車排行榜 App 開發伺服器
echo ========================================
echo.

echo 檢查環境...
if not exist "node_modules" (
    echo ❌ 錯誤: node_modules 不存在
    echo 💡 請先執行 setup-env.bat 設置環境
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ❌ 錯誤: package.json 不存在
    echo 💡 請確保在正確的專案目錄中執行
    pause
    exit /b 1
)

echo ✅ 環境檢查通過
echo.

echo 選擇啟動模式:
echo 1. 自動開啟 Chrome 開發者模式 (推薦)
echo 2. 手動開啟瀏覽器
echo 3. 僅啟動伺服器，不開啟瀏覽器
echo 4. 使用 npm run dev (預設瀏覽器)
echo.
set /p choice="請選擇 (1-4): "

if "%choice%"=="1" (
    echo 🚀 正在啟動開發伺服器並開啟 Chrome...
    echo 💡 這將自動開啟 Chrome 開發者模式
    call start-dev-chrome.bat
) else if "%choice%"=="2" (
    echo 🚀 正在啟動開發伺服器...
    echo 🌐 成功後請在瀏覽器中訪問: http://localhost:3000
    echo 💡 按 Ctrl+C 可以停止伺服器
    npm run dev:manual
) else if "%choice%"=="3" (
    echo 🚀 正在啟動開發伺服器...
    echo 💡 按 Ctrl+C 可以停止伺服器
    npm run dev:manual
) else if "%choice%"=="4" (
    echo 🚀 正在啟動開發伺服器...
    echo 🌐 將自動開啟預設瀏覽器
    npm run dev
) else (
    echo ⚠️ 無效選擇，使用預設模式...
    echo 🚀 正在啟動開發伺服器...
    npm run dev
)

@echo off
cd /d "%~dp0"
echo ========================================
echo 龜車排行榜 App - 手動開啟模式
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

echo 🚀 正在啟動開發伺服器...
echo ⏳ 請稍候，這可能需要幾秒鐘...
echo.
echo 🌐 成功後請在瀏覽器中訪問: http://localhost:3000
echo 💡 提示: 可以按 Ctrl+C 停止伺服器
echo 🔄 檔案變更會自動重新載入
echo 📱 建議使用 Chrome 瀏覽器以獲得最佳體驗
echo.

npm run dev:manual

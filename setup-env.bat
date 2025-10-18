@echo off
cd /d "%~dp0"
echo ========================================
echo 龜車排行榜 App 環境設置
echo ========================================
echo.

echo 1. 檢查專案目錄...
if not exist "package.json" (
    echo ❌ 錯誤: 找不到 package.json 檔案
    echo 💡 請確保在正確的專案目錄中執行
    pause
    exit /b 1
)
echo ✅ package.json 存在

echo.
echo 2. 檢查 Node.js 版本...
node --version
if %errorlevel% neq 0 (
    echo ❌ 錯誤: Node.js 未安裝或不在 PATH 中
    echo 💡 請安裝 Node.js: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安裝

echo.
echo 3. 安裝依賴套件...
echo 📦 正在執行 npm install...
echo ⏳ 這可能需要幾分鐘，請稍候...
npm install
if %errorlevel% neq 0 (
    echo ❌ 錯誤: npm install 失敗
    echo 💡 請檢查網路連接或嘗試使用 npm install --verbose
    pause
    exit /b 1
)
echo ✅ 依賴套件安裝完成

echo.
echo 4. 檢查 node_modules...
if not exist "node_modules" (
    echo ❌ 錯誤: node_modules 資料夾未建立
    echo 💡 請重新執行 npm install
    pause
    exit /b 1
)
echo ✅ node_modules 資料夾存在

echo.
echo 5. 驗證 TypeScript 配置...
echo 🔍 正在檢查 TypeScript 配置...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo ⚠️ 警告: TypeScript 檢查有問題，但繼續執行
    echo 💡 這不會影響基本功能，但建議修正 TypeScript 錯誤
) else (
    echo ✅ TypeScript 配置正確
)

echo.
echo ========================================
echo 🎉 環境設置完成！
echo ========================================
echo.
echo 📋 下一步操作：
echo 1. 雙擊 start-dev.bat 啟動開發伺服器
echo 2. 或執行 npm run dev 手動啟動
echo 3. 在瀏覽器中訪問 http://localhost:3000
echo.
echo 💡 提示：
echo - 建議使用 Chrome 瀏覽器以獲得最佳體驗
echo - 開發者工具會自動開啟
echo - 檔案變更會自動重新載入
echo.
pause

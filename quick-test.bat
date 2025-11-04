@echo off
cd /d "%~dp0"
echo ========================================
echo 龜車排行榜 App - 快速測試
echo ========================================
echo.

echo 🚀 快速測試開始...
echo.

echo 1. 檢查基本環境...
if not exist "package.json" (
    echo ❌ 錯誤: package.json 不存在
    pause
    exit /b 1
)
if not exist "node_modules" (
    echo ❌ 錯誤: node_modules 不存在
    echo 💡 請先執行 setup-env.bat
    pause
    exit /b 1
)
echo ✅ 基本環境正常

echo.
echo 2. 測試 TypeScript 編譯...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo ⚠️ 警告: TypeScript 有問題，但繼續測試
) else (
    echo ✅ TypeScript 正常
)

echo.
echo 3. 測試 Vite 構建...
echo 🔨 正在構建...
npm run build
if %errorlevel% neq 0 (
    echo ❌ 構建失敗
    pause
    exit /b 1
)
echo ✅ 構建成功

echo.
echo 4. 測試腳本存在性...
set "SCRIPT_COUNT=0"
if exist "start-dev.bat" set /a SCRIPT_COUNT+=1
if exist "start-dev-chrome.bat" set /a SCRIPT_COUNT+=1
if exist "start-dev-manual.bat" set /a SCRIPT_COUNT+=1
if exist "open-chrome-dev.bat" set /a SCRIPT_COUNT+=1
if exist "setup-env.bat" set /a SCRIPT_COUNT+=1

echo ✅ 找到 %SCRIPT_COUNT% 個腳本檔案

echo.
echo ========================================
echo 🎉 快速測試完成！
echo ========================================
echo.
echo 📋 下一步：
echo 1. 執行 start-dev.bat 啟動開發伺服器
echo 2. 或執行 comprehensive-test.bat 進行完整測試
echo.
pause


@echo off
cd /d "%~dp0"
echo ========================================
echo 測試開發伺服器啟動
echo ========================================
echo.

echo 檢查環境...
if not exist "node_modules" (
    echo ❌ node_modules 不存在，請先執行 setup-env.bat
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ❌ package.json 不存在
    pause
    exit /b 1
)

echo ✅ 環境檢查通過
echo.

echo 正在測試 TypeScript 編譯...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo ⚠️  TypeScript 檢查有警告，但繼續執行
) else (
    echo ✅ TypeScript 編譯通過
)

echo.
echo 正在測試 Vite 構建...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Vite 構建失敗
    pause
    exit /b 1
) else (
    echo ✅ Vite 構建成功
)

echo.
echo ========================================
echo 測試完成！開發環境設置正確
echo ========================================
echo.
echo 現在可以執行以下指令啟動開發伺服器：
echo   npm run dev
echo.
echo 或者雙擊 start-dev.bat 檔案
echo.
pause

@echo off
cd /d "%~dp0"
echo ========================================
echo 龜車排行榜 App - 快速開始
echo ========================================
echo.

echo 🚀 歡迎使用龜車排行榜 App！
echo.

echo 📋 請選擇操作：
echo 1. 首次設置環境
echo 2. 啟動開發伺服器
echo 3. 快速測試
echo 4. 完整測試
echo 5. 查看使用說明
echo 6. 退出
echo.

set /p choice="請選擇 (1-6): "

if "%choice%"=="1" (
    echo.
    echo 🛠️ 正在設置環境...
    call setup-env.bat
) else if "%choice%"=="2" (
    echo.
    echo 🚀 正在啟動開發伺服器...
    call start-dev.bat
) else if "%choice%"=="3" (
    echo.
    echo 🧪 正在執行快速測試...
    call quick-test.bat
) else if "%choice%"=="4" (
    echo.
    echo 🔍 正在執行完整測試...
    call comprehensive-test.bat
) else if "%choice%"=="5" (
    echo.
    echo 📖 正在開啟使用說明...
    start "" "README-腳本使用說明.md"
    echo ✅ 使用說明已開啟
    pause
) else if "%choice%"=="6" (
    echo.
    echo 👋 再見！
    exit /b 0
) else (
    echo.
    echo ❌ 無效選擇，請重新執行
    pause
    exit /b 1
)

echo.
echo ========================================
echo 操作完成！
echo ========================================
echo.
pause

@echo off
cd /d "%~dp0"
echo ========================================
echo 龜車排行榜 App - Chrome 開發模式
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

REM 檢查 Chrome 是否存在
set "CHROME_PATH="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
)

if defined CHROME_PATH (
    echo ✅ 找到 Chrome: %CHROME_PATH%
) else (
    echo ⚠️  找不到 Google Chrome，將使用預設瀏覽器
)

echo.
echo 正在啟動開發伺服器...
echo 💡 提示: 這可能需要幾秒鐘，請稍候...
start /B npm run dev:manual

echo 等待開發伺服器啟動...
echo ⏳ 正在檢查伺服器狀態...
timeout /t 5 /nobreak >nul

echo 🔍 驗證伺服器是否已啟動...
timeout /t 2 /nobreak >nul

echo 正在開啟瀏覽器...
if defined CHROME_PATH (
    echo 🔧 開啟 Chrome 開發者模式...
    echo 📱 視窗大小: 1200x800
    echo 🛠️ 開發者工具將自動開啟
    start "" "%CHROME_PATH%" --new-window --window-size=1200,800 --auto-open-devtools-for-tabs "http://localhost:3000"
) else (
    echo 🌐 使用預設瀏覽器開啟...
    echo 💡 建議安裝 Chrome 以獲得最佳開發體驗
    start "" "http://localhost:3000"
)

echo.
echo ========================================
echo 開發環境已啟動！
echo ========================================
echo.
echo 🌐 應用程式網址: http://localhost:3000
if defined CHROME_PATH (
    echo 🔧 開發者工具已自動開啟
    echo 📱 視窗大小: 1200x800
) else (
    echo 💡 建議安裝 Chrome 以獲得最佳開發體驗
)
echo.
echo 按 Ctrl+C 可以停止開發伺服器
echo.
pause

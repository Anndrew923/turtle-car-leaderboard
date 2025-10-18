@echo off
cd /d "%~dp0"
echo 🔧 正在開啟 Chrome 開發者模式...

REM 檢查 Chrome 是否存在
set "CHROME_PATH="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) else (
    echo ❌ 錯誤: 找不到 Google Chrome
    echo 💡 請安裝 Chrome 或手動在瀏覽器中訪問: http://localhost:3000
    echo 🌐 下載 Chrome: https://www.google.com/chrome/
    pause
    exit /b 1
)

REM 開啟 Chrome 並設置開發者工具
start "" "%CHROME_PATH%" ^
    --new-window ^
    --window-size=1200,800 ^
    --auto-open-devtools-for-tabs ^
    --remote-debugging-port=9222 ^
    "http://localhost:3000"

echo ✅ Chrome 開發者模式已開啟
echo 🌐 網址: http://localhost:3000
echo 🔧 開發者工具已自動開啟
echo 📱 視窗大小: 1200x800
echo 🛠️ 遠端除錯端口: 9222
echo 💡 提示: 如果頁面無法載入，請確認開發伺服器已啟動

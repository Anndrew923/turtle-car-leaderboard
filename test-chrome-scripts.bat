@echo off
cd /d "%~dp0"
echo ========================================
echo 測試 Chrome 開發腳本
echo ========================================
echo.

echo 檢查腳本檔案...
if not exist "start-dev.bat" (
    echo ❌ start-dev.bat 不存在
    exit /b 1
)
if not exist "start-dev-chrome.bat" (
    echo ❌ start-dev-chrome.bat 不存在
    exit /b 1
)
if not exist "start-dev-manual.bat" (
    echo ❌ start-dev-manual.bat 不存在
    exit /b 1
)
if not exist "open-chrome-dev.bat" (
    echo ❌ open-chrome-dev.bat 不存在
    exit /b 1
)

echo ✅ 所有腳本檔案存在
echo.

echo 檢查 package.json 腳本...
findstr /C:"dev:" package.json >nul
if %errorlevel% neq 0 (
    echo ❌ package.json 中缺少 dev 腳本
    exit /b 1
)

findstr /C:"dev:chrome:" package.json >nul
if %errorlevel% neq 0 (
    echo ❌ package.json 中缺少 dev:chrome 腳本
    exit /b 1
)

findstr /C:"dev:manual:" package.json >nul
if %errorlevel% neq 0 (
    echo ❌ package.json 中缺少 dev:manual 腳本
    exit /b 1
)

echo ✅ package.json 腳本配置正確
echo.

echo 檢查 Chrome 路徑檢測...
set "CHROME_FOUND=false"
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_FOUND=true"
    echo ✅ 找到 Chrome (Program Files)
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_FOUND=true"
    echo ✅ 找到 Chrome (Program Files x86)
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_FOUND=true"
    echo ✅ 找到 Chrome (LocalAppData)
) else (
    echo ⚠️  未找到 Chrome，將使用預設瀏覽器
)

echo.
echo ========================================
echo 測試完成！
echo ========================================
echo.
echo 📋 可用的腳本:
echo   1. start-dev.bat - 主啟動腳本 (推薦)
echo   2. start-dev-chrome.bat - Chrome 開發者模式
echo   3. start-dev-manual.bat - 手動開啟模式
echo   4. open-chrome-dev.bat - 僅開啟 Chrome
echo.
echo 📋 可用的 npm 指令:
echo   - npm run dev - 自動開啟預設瀏覽器
echo   - npm run dev:chrome - 強制使用 Chrome
echo   - npm run dev:manual - 手動開啟瀏覽器
echo.
echo 🚀 建議測試步驟:
echo   1. 執行 start-dev.bat 並選擇選項 1
echo   2. 檢查 Chrome 是否正常開啟
echo   3. 檢查開發者工具是否自動開啟
echo   4. 檢查視窗大小是否為 1200x800
echo.
pause

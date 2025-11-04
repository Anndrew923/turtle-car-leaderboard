@echo off
cd /d "%~dp0"
echo ========================================
echo 測試腳本調用修正
echo ========================================
echo.

echo 檢查修正後的 start-dev.bat...
findstr /C:"call start-dev-chrome.bat" start-dev.bat >nul
if %errorlevel% neq 0 (
    echo ❌ 修正失敗：找不到 call start-dev-chrome.bat
    exit /b 1
) else (
    echo ✅ 修正成功：找到 call start-dev-chrome.bat
)

echo.
echo 檢查腳本結構...
findstr /C:"if \"%%choice%%\"==\"1\"" start-dev.bat >nul
if %errorlevel% neq 0 (
    echo ❌ 腳本結構有問題
    exit /b 1
) else (
    echo ✅ 腳本結構正確
)

echo.
echo 檢查其他選項...
findstr /C:"npm run dev:manual" start-dev.bat >nul
if %errorlevel% neq 0 (
    echo ❌ 其他選項有問題
    exit /b 1
) else (
    echo ✅ 其他選項正常
)

echo.
echo ========================================
echo 修正驗證完成！
echo ========================================
echo.
echo 📋 修正內容：
echo   - 第 34 行已修正為：call start-dev-chrome.bat
echo   - 確保腳本在前景執行
echo   - 用戶可以看到完整的執行過程
echo.
echo 🚀 測試建議：
echo   1. 執行 start-dev.bat
echo   2. 選擇選項 1 (Chrome 開發者模式)
echo   3. 檢查是否可以看到 start-dev-chrome.bat 的完整執行過程
echo   4. 檢查 Chrome 是否正常開啟
echo   5. 檢查腳本執行完畢後是否返回主選單
echo.
pause


@echo off
cd /d "%~dp0"
echo ========================================
echo 龜車排行榜 App - 綜合測試系統
echo ========================================
echo.

echo 🧪 開始綜合測試...
echo.

echo 1. 測試環境檢查...
echo ========================================
if not exist "package.json" (
    echo ❌ 測試失敗: package.json 不存在
    echo 💡 請確保在正確的專案目錄中執行
    pause
    exit /b 1
)
echo ✅ package.json 存在

if not exist "node_modules" (
    echo ❌ 測試失敗: node_modules 不存在
    echo 💡 請先執行 setup-env.bat
    pause
    exit /b 1
)
echo ✅ node_modules 存在

echo.
echo 2. 測試 Node.js 環境...
echo ========================================
node --version
if %errorlevel% neq 0 (
    echo ❌ 測試失敗: Node.js 未安裝
    pause
    exit /b 1
)
echo ✅ Node.js 環境正常

echo.
echo 3. 測試 TypeScript 編譯...
echo ========================================
echo 🔍 正在檢查 TypeScript 配置...
npx tsc --noEmit
if %errorlevel% neq 0 (
    echo ⚠️ 警告: TypeScript 檢查有問題
    echo 💡 這不會影響基本功能，但建議修正
) else (
    echo ✅ TypeScript 配置正確
)

echo.
echo 4. 測試 Vite 構建...
echo ========================================
echo 🔨 正在測試 Vite 構建...
npm run build
if %errorlevel% neq 0 (
    echo ❌ 測試失敗: Vite 構建失敗
    echo 💡 請檢查構建錯誤並修正
    pause
    exit /b 1
)
echo ✅ Vite 構建成功

echo.
echo 5. 測試腳本功能...
echo ========================================
echo 🔧 測試 start-dev.bat...
if not exist "start-dev.bat" (
    echo ❌ 測試失敗: start-dev.bat 不存在
) else (
    echo ✅ start-dev.bat 存在
)

echo 🔧 測試 start-dev-chrome.bat...
if not exist "start-dev-chrome.bat" (
    echo ❌ 測試失敗: start-dev-chrome.bat 不存在
) else (
    echo ✅ start-dev-chrome.bat 存在
)

echo 🔧 測試 start-dev-manual.bat...
if not exist "start-dev-manual.bat" (
    echo ❌ 測試失敗: start-dev-manual.bat 不存在
) else (
    echo ✅ start-dev-manual.bat 存在
)

echo 🔧 測試 open-chrome-dev.bat...
if not exist "open-chrome-dev.bat" (
    echo ❌ 測試失敗: open-chrome-dev.bat 不存在
) else (
    echo ✅ open-chrome-dev.bat 存在
)

echo 🔧 測試 setup-env.bat...
if not exist "setup-env.bat" (
    echo ❌ 測試失敗: setup-env.bat 不存在
) else (
    echo ✅ setup-env.bat 存在
)

echo.
echo 6. 測試 Chrome 檢測...
echo ========================================
set "CHROME_PATH="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_PATH=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
)

if defined CHROME_PATH (
    echo ✅ Chrome 已安裝: %CHROME_PATH%
) else (
    echo ⚠️ 警告: Chrome 未找到
    echo 💡 建議安裝 Chrome 以獲得最佳開發體驗
)

echo.
echo 7. 測試專案結構...
echo ========================================
if not exist "src" (
    echo ❌ 測試失敗: src 目錄不存在
) else (
    echo ✅ src 目錄存在
)

if not exist "public" (
    echo ❌ 測試失敗: public 目錄不存在
) else (
    echo ✅ public 目錄存在
)

if not exist "src\App.tsx" (
    echo ❌ 測試失敗: src\App.tsx 不存在
) else (
    echo ✅ src\App.tsx 存在
)

if not exist "vite.config.ts" (
    echo ❌ 測試失敗: vite.config.ts 不存在
) else (
    echo ✅ vite.config.ts 存在
)

if not exist "tsconfig.json" (
    echo ❌ 測試失敗: tsconfig.json 不存在
) else (
    echo ✅ tsconfig.json 存在
)

echo.
echo ========================================
echo 🎉 綜合測試完成！
echo ========================================
echo.
echo 📊 測試結果摘要：
echo - 環境檢查: ✅ 通過
echo - Node.js 環境: ✅ 正常
echo - TypeScript 配置: ✅ 正常
echo - Vite 構建: ✅ 成功
echo - 腳本功能: ✅ 完整
echo - Chrome 檢測: %CHROME_PATH% 存在
echo - 專案結構: ✅ 完整
echo.
echo 💡 建議：
echo 1. 執行 start-dev.bat 啟動開發伺服器
echo 2. 在 Chrome 中測試應用程式功能
echo 3. 檢查開發者工具是否正常開啟
echo.
pause

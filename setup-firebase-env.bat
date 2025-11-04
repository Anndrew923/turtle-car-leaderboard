@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo Firebase 環境變數配置
echo ========================================
echo.

REM 檢查 env.example 是否存在
if not exist "env.example" (
    echo ❌ 錯誤: 找不到 env.example 檔案
    echo 💡 請確保在正確的專案目錄中執行
    pause
    exit /b 1
)

REM 檢查 .env 是否已存在
if exist ".env" (
    echo ⚠️  警告: .env 檔案已存在
    echo.
    set /p overwrite="是否要覆蓋現有的 .env 檔案? (Y/N): "
    if /i not "!overwrite!"=="Y" (
        echo ❌ 已取消操作
        pause
        exit /b 0
    )
    echo.
)

REM 從 env.example 複製
echo 📋 正在從 env.example 建立 .env 檔案...
copy /Y "env.example" ".env" >nul
if %errorlevel% neq 0 (
    echo ❌ 錯誤: 無法建立 .env 檔案
    pause
    exit /b 1
)
echo ✅ .env 檔案已建立
echo.

echo ========================================
echo 📝 請填入以下 Firebase 配置值：
echo ========================================
echo.
echo 請前往 Firebase Console 取得以下資訊：
echo https://console.firebase.google.com/
echo.
echo 步驟：
echo 1. 建立或選擇 Firebase 專案
echo 2. 點擊「Web」圖標 (^</^>) 新增 Web 應用程式
echo 3. 複製 Firebase 配置值
echo 4. 填入到 .env 檔案中
echo.
echo 需要的配置值：
echo 1. API 金鑰 (apiKey)
echo 2. 專案 ID (projectId)
echo 3. 應用程式 ID (appId)
echo 4. 訊息發送者 ID (messagingSenderId)
echo.
echo 授權網域 (authDomain) 格式: 專案ID.firebaseapp.com
echo Storage 儲存貯體 (storageBucket) 格式: 專案ID.appspot.com
echo.

REM 開啟 .env 檔案讓用戶編輯
echo 📝 正在開啟 .env 檔案供編輯...
echo 💡 請填入 Firebase 配置值後儲存檔案
echo.
timeout /t 2 >nul
notepad .env
echo.

echo ========================================
echo ✅ 配置完成！
echo ========================================
echo.
echo 📋 下一步：
echo 1. 確認 .env 檔案中的 Firebase 配置值已正確填入
echo 2. 執行 verify-firebase.bat 驗證連接
echo 3. 或執行 npm run dev 啟動開發伺服器
echo 4. 檢查瀏覽器控制台是否顯示 "✅ Firebase 初始化成功"
echo.
pause


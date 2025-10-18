# Chrome 開發者模式設置指南

## 🚀 快速開始

### 方法一：使用 npm 指令（推薦）

```bash
# 自動開啟 Chrome 開發者模式
npm run dev

# 強制使用 Chrome
npm run dev:chrome

# 手動開啟瀏覽器
npm run dev:manual
```

### 方法二：使用便捷腳本

1. **雙擊 `start-dev.bat`** - 選擇啟動模式
2. **雙擊 `start-dev-chrome.bat`** - 直接開啟 Chrome 開發者模式
3. **雙擊 `start-dev-manual.bat`** - 手動開啟瀏覽器

## 🔧 Chrome 開發者模式功能

### 自動開啟的功能

- ✅ **新視窗開啟** - 使用 `--new-window` 參數
- ✅ **開發者工具** - 使用 `--auto-open-devtools-for-tabs` 參數
- ✅ **視窗大小** - 1200x800 像素，適合開發
- ✅ **視窗位置** - 左上角 (100, 100) 位置
- ✅ **遠端除錯** - 端口 9222，可用於 VS Code 除錯
- ✅ **獨立會話** - 使用臨時用戶資料夾

### Chrome 參數說明

```bash
--new-window                    # 開啟新視窗
--window-size=1200,800         # 視窗大小
--window-position=100,100      # 視窗位置
--auto-open-devtools-for-tabs  # 自動開啟開發者工具
--disable-web-security         # 禁用網頁安全限制（開發用）
--remote-debugging-port=9222   # 遠端除錯端口
--user-data-dir="%TEMP%\chrome-dev-session"  # 獨立會話
```

## 📋 可用的腳本

### 主要腳本

- `start-dev.bat` - 主啟動腳本，提供選單選擇
- `start-dev-chrome.bat` - Chrome 開發者模式
- `start-dev-manual.bat` - 手動開啟瀏覽器

### 輔助腳本

- `open-chrome-dev.bat` - 僅開啟 Chrome 開發者模式
- `setup-env.bat` - 環境設置
- `test-dev-server.bat` - 測試環境

### npm 腳本

- `npm run dev` - 自動開啟預設瀏覽器
- `npm run dev:chrome` - 強制使用 Chrome
- `npm run dev:manual` - 手動開啟瀏覽器

## 🛠️ 開發者工具功能

### 自動開啟的開發者工具

- **Console** - 查看日誌和錯誤
- **Elements** - 檢查 DOM 結構
- **Network** - 監控網路請求
- **Sources** - 除錯 JavaScript
- **Application** - 檢查本地儲存和 PWA

### 遠端除錯

- 端口：9222
- 可用於 VS Code 除錯
- 支援 React DevTools
- 支援 Redux DevTools

## 🔍 故障排除

### 問題 1: Chrome 找不到

**解決方案**：

1. 確保已安裝 Google Chrome
2. 檢查 Chrome 安裝路徑
3. 使用 `start-dev-manual.bat` 手動開啟

### 問題 2: 開發者工具沒有自動開啟

**解決方案**：

1. 檢查 Chrome 版本是否支援該參數
2. 手動按 F12 開啟開發者工具
3. 使用 `open-chrome-dev.bat` 重新開啟

### 問題 3: 視窗大小不正確

**解決方案**：

1. 手動調整視窗大小
2. 修改腳本中的 `--window-size` 參數
3. 使用 `start-dev-manual.bat` 手動開啟

### 問題 4: 端口被占用

**解決方案**：

1. 關閉其他使用 3000 端口的程式
2. 修改 Vite 配置使用其他端口
3. 重啟電腦釋放端口

## 🎯 最佳實踐

### 開發流程

1. 執行 `npm run dev` 或雙擊 `start-dev.bat`
2. 選擇 "自動開啟 Chrome 開發者模式"
3. 在 Chrome 中開發和除錯
4. 使用開發者工具檢查問題
5. 按 Ctrl+C 停止伺服器

### 除錯技巧

1. 使用 Console 查看錯誤訊息
2. 使用 Network 監控 API 請求
3. 使用 Elements 檢查 CSS 樣式
4. 使用 Sources 設置斷點
5. 使用 Application 檢查 PWA 功能

## 📱 移動端測試

### 響應式設計測試

1. 按 F12 開啟開發者工具
2. 點擊設備模擬器圖標
3. 選擇不同的設備尺寸
4. 測試觸控功能

### PWA 功能測試

1. 在 Application 標籤中檢查 Manifest
2. 測試 Service Worker 功能
3. 檢查離線功能
4. 測試安裝提示

## 🚀 下一步

1. 啟動開發伺服器
2. 在 Chrome 中查看應用程式
3. 使用開發者工具除錯
4. 開始開發新功能
5. 測試 PWA 功能

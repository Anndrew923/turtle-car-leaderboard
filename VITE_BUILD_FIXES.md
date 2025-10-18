# Vite 構建錯誤修復

## 修復的問題

### 1. 路徑解析錯誤

- **問題**: `Rollup failed to resolve import "@/contexts/AuthContext"`
- **原因**: Vite 構建時無法識別 tsconfig.json 中的路徑映射
- **解決方案**: 在 vite.config.ts 中添加 `resolve.alias` 配置

### 2. PWA 插件文件匹配警告

- **問題**: `One of the glob patterns doesn't match any files`
- **原因**: PWA 插件的文件匹配模式配置不當
- **解決方案**: 添加 `workbox` 配置，修復文件匹配模式

## 修復內容

### 1. 更新 vite.config.ts

#### 添加路徑別名解析

```typescript
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  // ... 其他配置
});
```

#### 修復 PWA 插件配置

```typescript
VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    globIgnores: ["**/node_modules/**/*"],
  },
  // ... manifest 配置
});
```

#### 添加構建優化

```typescript
build: {
  outDir: "dist",
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ["react", "react-dom"],
        router: ["react-router-dom"],
        firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/storage"],
        maps: ["@googlemaps/js-api-loader"],
      },
    },
  },
}
```

## 修復的檔案

1. `vite.config.ts` - 添加路徑別名解析和 PWA 配置修復
2. `test-build.bat` - 創建測試構建腳本

## 技術改進

### 1. 路徑解析

- 使用 `path.resolve(__dirname, "./src")` 確保絕對路徑
- 配置所有 `@/` 路徑別名，與 tsconfig.json 保持一致

### 2. PWA 功能

- 修復文件匹配模式，避免警告
- 保持 PWA 功能完整性

### 3. 構建優化

- 添加代碼分割，提高載入性能
- 分離第三方庫到獨立 chunk

## 預期結果

修復後應該能夠：

- ✅ 成功解析所有 `@/` 路徑別名
- ✅ 成功構建 Vite 專案
- ✅ PWA 功能正常工作，沒有文件匹配警告
- ✅ Netlify 部署成功
- ✅ 所有功能正常運作

## 測試

使用 `test-build.bat` 腳本測試構建：

```cmd
test-build.bat
```

或手動測試：

```cmd
npm install
npx tsc --noEmit
npm run build
```

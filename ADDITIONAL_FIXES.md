# 額外的 TypeScript 修復

## 修復的問題

### 1. 函數參數順序錯誤

- **問題**: `error TS1016: A required parameter cannot follow an optional parameter`
- **位置**: `src/services/reminder.ts` 第 180 行
- **原因**: `subscribeToReminders` 函數中可選參數 `road?` 在必要參數 `callback` 之前

### 2. 類似的參數順序問題

- **位置**: `getReminders` 函數
- **原因**: 可選參數 `road?` 在必要參數 `limitCount` 之前

## 修復內容

### 1. 修復 `subscribeToReminders` 函數

```typescript
// 修復前
static subscribeToReminders(
  road?: string,
  callback: (reminders: Reminder[]) => void
): () => void

// 修復後
static subscribeToReminders(
  callback: (reminders: Reminder[]) => void,
  road?: string
): () => void
```

### 2. 修復 `getReminders` 函數

```typescript
// 修復前
static async getReminders(
  road?: string,
  limitCount: number = 20
): Promise<ApiResponse<Reminder[]>>

// 修復後
static async getReminders(
  limitCount: number = 20,
  road?: string
): Promise<ApiResponse<Reminder[]>>
```

### 3. 更新函數調用

- 更新 `AppContext.tsx` 中的 `getReminders` 調用
- 從 `getReminders(road)` 改為 `getReminders(20, road)`

## 修復的檔案

1. `src/services/reminder.ts` - 修復函數參數順序
2. `src/contexts/AppContext.tsx` - 更新函數調用

## 結果

所有 TypeScript 編譯錯誤應該已經修復，Netlify 部署應該能夠成功。


/**
 * 車號屏蔽工具函數
 * 格式：ABC-1234 -> A*C-1*34
 * 屏蔽規則：第二個英文字和第三個數字
 */

/**
 * 驗證車牌號格式
 * @param plateNumber 車牌號（例如：ABC-1234）
 * @returns 是否為有效格式
 */
export function isValidPlateFormat(plateNumber: string): boolean {
  // 台灣車牌格式：2-3個英文字 + 連字號 + 4個數字
  // 例如：ABC-1234, AB-1234
  const plateRegex = /^[A-Z]{2,3}-[0-9]{4}$/;
  return plateRegex.test(plateNumber.toUpperCase());
}

/**
 * 格式化車牌號（統一轉大寫）
 * @param plateNumber 車牌號
 * @returns 格式化後的車牌號
 */
export function formatPlateNumber(plateNumber: string): string {
  // 移除空白，轉大寫
  return plateNumber.trim().replace(/\s+/g, "").toUpperCase();
}

/**
 * 屏蔽車牌號
 * @param plateNumber 完整車牌號（例如：ABC-1234）
 * @returns 屏蔽後的車牌號（例如：A*C-1*34）
 */
export function maskPlateNumber(plateNumber: string): string {
  const formatted = formatPlateNumber(plateNumber);

  if (!isValidPlateFormat(formatted)) {
    return formatted; // 如果格式無效，返回原值
  }

  // 分割英文字和數字部分
  const [letters, numbers] = formatted.split("-");

  // 屏蔽英文字部分（屏蔽第二個字母）
  let maskedLetters = "";
  if (letters.length === 2) {
    // 兩個字母：屏蔽第二個
    maskedLetters = `${letters[0]}*`;
  } else if (letters.length === 3) {
    // 三個字母：屏蔽第二個
    maskedLetters = `${letters[0]}*${letters[2]}`;
  } else {
    maskedLetters = letters; // 不符合預期，返回原值
  }

  // 屏蔽數字部分（屏蔽第三個數字）
  let maskedNumbers = "";
  if (numbers.length === 4) {
    // 四個數字：屏蔽第三個
    maskedNumbers = `${numbers[0]}${numbers[1]}*${numbers[3]}`;
  } else {
    maskedNumbers = numbers; // 不符合預期，返回原值
  }

  return `${maskedLetters}-${maskedNumbers}`;
}

/**
 * 提取車牌號的英文字部分
 * @param plateNumber 車牌號
 * @returns 英文字部分
 */
export function extractLetters(plateNumber: string): string {
  const formatted = formatPlateNumber(plateNumber);
  const match = formatted.match(/^([A-Z]{2,3})-/);
  return match ? match[1] : "";
}

/**
 * 提取車牌號的數字部分
 * @param plateNumber 車牌號
 * @returns 數字部分
 */
export function extractNumbers(plateNumber: string): string {
  const formatted = formatPlateNumber(plateNumber);
  const match = formatted.match(/-([0-9]{4})$/);
  return match ? match[1] : "";
}


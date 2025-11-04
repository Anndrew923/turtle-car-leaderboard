import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { formatPlateNumber, isValidPlateFormat, maskPlateNumber } from "@/utils/plateNumber";

interface PlateNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onMaskedChange?: (masked: string) => void;
}

const PlateNumberInput: React.FC<PlateNumberInputProps> = ({
  value,
  onChange,
  error,
  onMaskedChange,
}) => {
  const [maskedValue, setMaskedValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (value) {
      const formatted = formatPlateNumber(value);
      if (formatted !== value) {
        onChange(formatted);
        return; // 避免無限循環
      }

      const valid = isValidPlateFormat(formatted);
      setIsValid(valid);

      if (valid) {
        const masked = maskPlateNumber(formatted);
        setMaskedValue(masked);
        onMaskedChange?.(masked);
      } else {
        setMaskedValue("");
        onMaskedChange?.("");
      }
    } else {
      setMaskedValue("");
      onMaskedChange?.("");
      setIsValid(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toUpperCase();
    // 移除空白和特殊字符（保留連字號）
    input = input.replace(/[^A-Z0-9-]/g, "");

    // 自動添加連字號
    if (input.length > 3 && !input.includes("-")) {
      input = input.slice(0, 3) + "-" + input.slice(3);
    }

    // 限制長度（最多 8 個字符，例如：ABC-1234）
    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    onChange(input);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        車牌號碼 <span className="text-red-500">*</span>
      </label>
      <div className="space-y-2">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="例如：ABC-1234"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            error || (value && !isValid)
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          maxLength={8}
        />
        {maskedValue && isValid && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">顯示車號（屏蔽後）：</p>
            <p className="text-lg font-mono font-semibold text-blue-700">
              {maskedValue}
            </p>
          </div>
        )}
        {value && !isValid && (
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>請輸入正確的車牌格式（例如：ABC-1234）</span>
          </div>
        )}
        {error && (
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        <p className="text-xs text-gray-500">
          系統會自動屏蔽部分資訊以保護隱私
        </p>
      </div>
    </div>
  );
};

export default PlateNumberInput;


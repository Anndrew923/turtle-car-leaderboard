import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Car,
  MapPin,
  FileText,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { ReminderFormData, RoadBlock } from "@/types";
import { ReminderService } from "@/services/reminder";
import PlateNumberInput from "@/components/Reminder/PlateNumberInput";
import RoadBlockSelector from "@/components/Reminder/RoadBlockSelector";

type Step = 1 | 2 | 3 | 4;

const ReminderPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { addReminder } = useApp();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 表單數據
  const [formData, setFormData] = useState<ReminderFormData>({
    plateNumber: "",
    roadBlock: {
      city: "",
      district: "",
      mainRoad: undefined,
    },
    vehicleColor: "",
    vehicleType: "汽車",
    speedDifference: "",
    location: {
      lat: 25.0339639,
      lng: 121.5644722,
    },
  });

  // 車牌屏蔽後的值
  const [maskedPlate, setMaskedPlate] = useState("");

  // 表單驗證錯誤
  const [errors, setErrors] = useState<Partial<Record<keyof ReminderFormData, string>>>({});

  // 檢查登入狀態
  useEffect(() => {
    if (!authLoading && !user) {
      // 未登入，導向登入頁面（或允許匿名提交）
      // 這裡可以選擇允許匿名提交或要求登入
      // 暫時允許匿名，但建議登入
    }
  }, [user, authLoading]);

  // 獲取當前位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (error) => {
          console.warn("無法獲取位置:", error);
          // 使用預設位置（台北）
        }
      );
    }
  }, []);

  // 驗證當前步驟
  const validateStep = (step: Step): boolean => {
    const newErrors: typeof errors = {};

    switch (step) {
      case 1:
        if (!formData.plateNumber) {
          newErrors.plateNumber = "請輸入車牌號碼";
        }
        if (!formData.vehicleType) {
          newErrors.vehicleType = "請選擇車輛類型";
        }
        break;
      case 2:
        if (!formData.roadBlock.city || !formData.roadBlock.district) {
          newErrors.roadBlock = "請選擇路段";
        }
        break;
      case 3:
        if (!formData.speedDifference) {
          newErrors.speedDifference = "請選擇低於速限的公里數";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 下一步
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => (prev + 1) as Step);
      }
    }
  };

  // 上一步
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      setErrors({});
    }
  };

  // 提交表單
  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    if (!user) {
      setSubmitError("請先登入");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await ReminderService.createReminder(
        formData,
        user.id
      );

      if (response.success && response.data) {
        addReminder(response.data);
        setSubmitSuccess(true);
        // 3秒後返回首頁
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setSubmitError(response.error || "提交失敗");
      }
    } catch (error) {
      console.error("提交提醒失敗:", error);
      setSubmitError("提交失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };


  // 步驟配置
  const steps = [
    { number: 1, title: "車輛資訊", icon: Car },
    { number: 2, title: "路段選擇", icon: MapPin },
    { number: 3, title: "提醒內容", icon: FileText },
    { number: 4, title: "確認提交", icon: Eye },
  ];

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            提交成功！
          </h2>
          <p className="text-gray-600 mb-4">
            您的提醒已成功提交，感謝您的友善提醒。
          </p>
          <p className="text-sm text-gray-500">
            將在3秒後返回首頁...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            提交友善提醒
          </h1>
          <p className="text-lg text-gray-600">
            幫助其他駕駛者了解需要注意的路段
          </p>
        </div>

        {/* 步驟指示器 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isLast = index === steps.length - 1;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isActive
                          ? "bg-primary-600 border-primary-600 text-white"
                          : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-primary-600"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 表單內容 */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  提交失敗
                </p>
                <p className="text-sm text-red-600 mt-1">{submitError}</p>
              </div>
            </div>
          )}

          {/* 步驟 1: 車輛資訊 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                車輛資訊
              </h2>

              <PlateNumberInput
                value={formData.plateNumber}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, plateNumber: value }))
                }
                onMaskedChange={setMaskedPlate}
                error={errors.plateNumber}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  車輛類型 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vehicleType: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.vehicleType
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="汽車">汽車</option>
                  <option value="機車">機車</option>
                  <option value="貨車">貨車</option>
                  <option value="公車">公車</option>
                  <option value="其他">其他</option>
                </select>
                {errors.vehicleType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vehicleType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  車輛顏色 <span className="text-gray-400">(選填)</span>
                </label>
                <input
                  type="text"
                  value={formData.vehicleColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vehicleColor: e.target.value,
                    }))
                  }
                  placeholder="例如：白色、黑色、紅色"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* 步驟 2: 路段選擇 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                路段選擇
              </h2>

              <RoadBlockSelector
                value={formData.roadBlock}
                onChange={(roadBlock) =>
                  setFormData((prev) => ({ ...prev, roadBlock }))
                }
                error={errors.roadBlock}
              />
            </div>
          )}

          {/* 步驟 3: 提醒內容 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                提醒內容
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  低於速限 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.speedDifference}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      speedDifference: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.speedDifference
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">請選擇低於速限的公里數</option>
                  <option value="10公里">低於速限10公里</option>
                  <option value="20公里">低於速限20公里</option>
                  <option value="30公里">低於速限30公里</option>
                  <option value="40公里">低於速限40公里</option>
                  <option value="50公里">低於速限50公里</option>
                </select>
                {errors.speedDifference && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.speedDifference}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 步驟 4: 確認提交 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                確認提交
              </h2>

              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">顯示車號</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">
                    {maskedPlate || "未輸入"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">路段</p>
                  <p className="text-base font-medium text-gray-900">
                    {formData.roadBlock.city}
                    {formData.roadBlock.district}
                    {formData.roadBlock.mainRoad &&
                      ` ${formData.roadBlock.mainRoad}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">車輛類型</p>
                  <p className="text-base text-gray-900">
                    {formData.vehicleType}
                    {formData.vehicleColor && ` - ${formData.vehicleColor}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">低於速限</p>
                  <p className="text-base font-medium text-gray-900">
                    {formData.speedDifference || "未選擇"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 按鈕區域 */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center px-4 py-2 rounded-lg ${
                currentStep === 1 || isSubmitting
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              上一步
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    提交中...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    確認提交
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderPage;


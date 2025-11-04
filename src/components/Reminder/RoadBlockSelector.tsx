import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { RoadBlock } from "@/types";
import {
  getCities,
  getDistrictsByCity,
  getMainRoadsByDistrict,
} from "@/data/roadBlocks";

interface RoadBlockSelectorProps {
  value: RoadBlock;
  onChange: (roadBlock: RoadBlock) => void;
  error?: string;
}

const RoadBlockSelector: React.FC<RoadBlockSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const cities = getCities();
  const [selectedCity, setSelectedCity] = useState(value.city || "");
  const [selectedDistrict, setSelectedDistrict] = useState(
    value.district || ""
  );
  const [selectedMainRoad, setSelectedMainRoad] = useState(
    value.mainRoad || ""
  );

  const districts = selectedCity ? getDistrictsByCity(selectedCity) : [];
  const mainRoads = selectedCity && selectedDistrict
    ? getMainRoadsByDistrict(selectedCity, selectedDistrict)
    : [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict("");
    setSelectedMainRoad("");
    onChange({ city, district: "", mainRoad: undefined });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedMainRoad("");
    onChange({
      city: selectedCity,
      district,
      mainRoad: undefined,
    });
  };

  const handleMainRoadChange = (mainRoad: string) => {
    setSelectedMainRoad(mainRoad);
    onChange({
      city: selectedCity,
      district: selectedDistrict,
      mainRoad: mainRoad || undefined,
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        <MapPin className="w-4 h-4 inline mr-1" />
        路段選擇 <span className="text-red-500">*</span>
      </label>

      {/* 城市選擇 */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">城市</label>
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              error && !selectedCity
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">請選擇城市</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 區選擇 */}
      {selectedCity && (
        <div>
          <label className="block text-xs text-gray-600 mb-1">區</label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                error && !selectedDistrict
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">請選擇區</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}

      {/* 主要道路選擇（可選） */}
      {selectedCity && selectedDistrict && mainRoads.length > 0 && (
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            主要道路 <span className="text-gray-400">(選填)</span>
          </label>
          <div className="relative">
            <select
              value={selectedMainRoad}
              onChange={(e) => handleMainRoadChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">不指定（僅選擇區塊）</option>
              {mainRoads.map((road) => (
                <option key={road} value={road}>
                  {road}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}

      {/* 顯示選擇結果 */}
      {selectedCity && selectedDistrict && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">已選擇路段：</p>
          <p className="text-base font-medium text-gray-900">
            {selectedCity}
            {selectedDistrict}
            {selectedMainRoad && ` ${selectedMainRoad}`}
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-sm text-red-600">
          <MapPin className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default RoadBlockSelector;


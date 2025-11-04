import { RoadBlock } from "@/types";

export interface CityDistrict {
  name: string;
  mainRoads: string[];
}

export interface CityData {
  name: string;
  districts: CityDistrict[];
}

export const roadBlocksData: CityData[] = [
  {
    name: "台北市",
    districts: [
      {
        name: "信義區",
        mainRoads: ["信義路", "忠孝東路", "松仁路", "基隆路", "光復南路"],
      },
      {
        name: "大安區",
        mainRoads: ["忠孝東路", "敦化南路", "復興南路", "仁愛路", "和平東路"],
      },
      {
        name: "中正區",
        mainRoads: ["忠孝西路", "重慶南路", "中山南路", "羅斯福路", "中華路"],
      },
      {
        name: "中山區",
        mainRoads: ["南京東路", "民生東路", "長安東路", "中山北路", "民權東路"],
      },
      {
        name: "松山區",
        mainRoads: ["南京東路", "八德路", "民生東路", "民權東路", "光復北路"],
      },
      {
        name: "內湖區",
        mainRoads: ["內湖路", "民權東路", "成功路", "瑞光路", "港墘路"],
      },
      {
        name: "士林區",
        mainRoads: ["中正路", "承德路", "中山北路", "文林路", "天母東路"],
      },
      {
        name: "北投區",
        mainRoads: ["中央北路", "石牌路", "關渡路", "知行路", "大業路"],
      },
    ],
  },
  {
    name: "新北市",
    districts: [
      {
        name: "板橋區",
        mainRoads: ["文化路", "中山路", "中正路", "民生路", "縣民大道"],
      },
      {
        name: "新莊區",
        mainRoads: ["中正路", "新泰路", "思源路", "化成路", "新北大道"],
      },
      {
        name: "中和區",
        mainRoads: ["景平路", "中和路", "中山路", "中正路", "連城路"],
      },
      {
        name: "永和區",
        mainRoads: ["永和路", "中正路", "中山路", "保福路", "福和路"],
      },
      {
        name: "三重區",
        mainRoads: ["重新路", "三和路", "中正北路", "重陽路", "自強路"],
      },
      {
        name: "新店區",
        mainRoads: ["北新路", "中興路", "建國路", "民權路", "新烏路"],
      },
      {
        name: "淡水區",
        mainRoads: ["中正路", "英專路", "學府路", "淡金路", "登輝大道"],
      },
      {
        name: "汐止區",
        mainRoads: ["大同路", "新台五路", "中興路", "康寧街", "福德一路"],
      },
    ],
  },
  {
    name: "桃園市",
    districts: [
      {
        name: "桃園區",
        mainRoads: ["中正路", "中山路", "復興路", "三民路", "民生路"],
      },
      {
        name: "中壢區",
        mainRoads: ["中正路", "中山路", "環中東路", "中央西路", "元化路"],
      },
      {
        name: "平鎮區",
        mainRoads: ["中豐路", "環南路", "南豐路", "振興路", "延平路"],
      },
      {
        name: "八德區",
        mainRoads: ["中華路", "介壽路", "興豐路", "和平路", "廣福路"],
      },
    ],
  },
  {
    name: "台中市",
    districts: [
      {
        name: "西屯區",
        mainRoads: ["台灣大道", "中港路", "文心路", "西屯路", "朝富路"],
      },
      {
        name: "北屯區",
        mainRoads: ["文心路", "崇德路", "北屯路", "東山路", "松竹路"],
      },
      {
        name: "南屯區",
        mainRoads: ["文心路", "大墩路", "公益路", "向上路", "永春東路"],
      },
      {
        name: "西區",
        mainRoads: ["台灣大道", "中正路", "五權路", "民權路", "向上路"],
      },
    ],
  },
  {
    name: "高雄市",
    districts: [
      {
        name: "前金區",
        mainRoads: ["中正四路", "中華路", "七賢路", "五福路", "河東路"],
      },
      {
        name: "三民區",
        mainRoads: ["建國路", "民族路", "十全路", "九如路", "建工路"],
      },
      {
        name: "左營區",
        mainRoads: ["博愛路", "民族路", "自由路", "翠華路", "大中路"],
      },
      {
        name: "前鎮區",
        mainRoads: ["中山路", "一心路", "三多路", "中華路", "民權路"],
      },
    ],
  },
];

// 獲取所有城市列表
export const getCities = (): string[] => {
  return roadBlocksData.map((city) => city.name);
};

// 獲取指定城市的所有區
export const getDistrictsByCity = (city: string): string[] => {
  const cityData = roadBlocksData.find((c) => c.name === city);
  return cityData ? cityData.districts.map((d) => d.name) : [];
};

// 獲取指定區的所有主要道路
export const getMainRoadsByDistrict = (
  city: string,
  district: string
): string[] => {
  const cityData = roadBlocksData.find((c) => c.name === city);
  if (!cityData) return [];

  const districtData = cityData.districts.find((d) => d.name === district);
  return districtData ? districtData.mainRoads : [];
};

// 驗證 RoadBlock 是否有效
export const isValidRoadBlock = (roadBlock: RoadBlock): boolean => {
  const cityData = roadBlocksData.find((c) => c.name === roadBlock.city);
  if (!cityData) return false;

  const districtData = cityData.districts.find(
    (d) => d.name === roadBlock.district
  );
  if (!districtData) return false;

  // 如果指定了主要道路，驗證是否存在
  if (roadBlock.mainRoad) {
    return districtData.mainRoads.includes(roadBlock.mainRoad);
  }

  return true;
};


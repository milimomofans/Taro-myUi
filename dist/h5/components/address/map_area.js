import { regionData } from "wl-china-area-data";
console.log(regionData, "regionData");
function mapArea(data) {
  const result = {
    province: [],
    city: {},
    area: {}
  };
  for (const provinceIndex in data) {
    const province = data[provinceIndex];
    const obj = {
      code: Number(province.value),
      name: province.label,
      i: Number(provinceIndex)
    };
    // @ts-ignore
    result.province.push(obj);
    const cityList = province.children;
    if (cityList && cityList.length > 0) {
      result.city[province.value] = [];
      for (let cityIndex in cityList) {
        const city = cityList[cityIndex];
        result.city[province.value].push({
          code: Number(city.value),
          name: city.label,
          i: Number(cityIndex)
        });
        const areaList = city.children;
        if (areaList && areaList.length > 0) {
          result.area[city.value] = [];
          for (let areaIndex in areaList) {
            const area = areaList[areaIndex];
            result.area[city.value].push({
              code: Number(area.value),
              name: area.label,
              i: Number(areaIndex)
            });
          }
        }
      }
    }
  }
  return result;
}
export default mapArea(regionData);
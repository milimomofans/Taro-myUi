/* eslint-disable import/no-commonjs */
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const regionUrl =
  "http://service-3jhg1qrm-1257188045.gz.apigw.tencentcs.com/release/area/json";

function resolvePath(relativePath) {
  return path.resolve(__dirname, "..", relativePath);
}
async function getRegionData(url) {
  try {
    const result = await axios.get(url);
    const jsonPath = resolvePath("src/assets/json/region.json");
    const data = mapData(result.data);
    fs.writeJson(jsonPath, data);
  } catch (error) {
    console.log("出问题了，去问问新玩法的人接口是不是换了？");
    throw error;
  }
}

function mapData(data) {
  let result = {
    province: [],
    city: {},
    area: {}
  };
  for (let provinceIndex in data) {
    const province = data[provinceIndex];
    const obj = {
      code: province.id,
      name: province.name,
      i: Number(provinceIndex)
    };
    result.province.push(obj);
    const cityList = province.children;
    if (cityList.length > 0) {
      result.city[province.id] = [];
      for (let cityIndex in cityList) {
        const city = cityList[cityIndex];
        result.city[province.id].push({
          code: city.id,
          name: city.name,
          i: Number(cityIndex)
        });
        const areaList = city.children;
        if (areaList.length > 0) {
          result.area[city.id] = [];
          for (let areaIndex in areaList) {
            const area = areaList[areaIndex];
            result.area[city.id].push({
              code: area.id,
              name: area.name,
              i: Number(areaIndex)
            });
          }
        }
      }
    }
  }
  return result;
}
getRegionData(regionUrl);

import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { Picker, View } from "@tarojs/components";
import { AtInput } from "taro-ui";
// import REGION_DATA from "../../assets/json/region.json";
import REGION_DATA from "./map_area";
console.log(REGION_DATA);
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
      cityList: [],
      areaList: []
    };
    this.state.provinceList = REGION_DATA.province;
    // @ts-ignore
    if (this.props.province <= 0 || typeof this.props.province === "undefined") {
      // @ts-ignore
      const firstProvinceCode = REGION_DATA.province[0].code;
      this.state.cityList = REGION_DATA.city[firstProvinceCode];
      const firstCityCode = this.state.cityList[0].code;
      this.state.areaList = REGION_DATA.area[firstCityCode];
    } else {
      // const firstProvinceCode =  REGION_DATA.province[0].code;
      this.state.cityList = REGION_DATA.city[this.props.province];
      // const firstCityCode = this.state.cityList[0].code;
      this.state.areaList = REGION_DATA.area[this.props.city];
    }
  }
  componentDidMount() {
    console.log(this.props);
  }
  onRegionChange(v) {
    const { province, city, area } = this.getProvinceAndCityObj(v.detail.value);
    this.props.onAreaChange({
      province: province.code,
      area: area.code,
      city: city.code
    });
  }
  onColumnchange(v) {
    const { column, value } = v.detail;
    if (column === 0) {
      this.onProvinceChange(value);
    } else if (column === 1) {
      this.onCityChange(value);
    }
  }
  onProvinceChange(index) {
    const province = this.state.provinceList[index];
    const cityList = REGION_DATA.city[province.code];
    let areaList = [];
    const cityIndex = this.regionValues[1];
    const city = cityList[cityIndex];
    if (city) {
      areaList = REGION_DATA.area[city.code];
    } else if (cityList[0]) {
      areaList = REGION_DATA.area[cityList[0].code];
    }
    this.setState({ cityList, areaList });
    // this.props.onAreaChange({
    //   province: province.code,
    //   city: cityList[0].code,
    //   area: areaList[0].code
    // })
  }
  onCityChange(index) {
    const city = this.state.cityList[index];
    let areaList = [];
    areaList = REGION_DATA.area[city.code] || [];
    this.setState({ areaList });
  }
  // index => obj
  getProvinceAndCityObj(v) {
    const defaultObj = { code: 0, name: "" };
    const [provinceIndex, cityIndex, areaIndex] = v;
    const province = REGION_DATA.province[provinceIndex] || defaultObj;
    const city = province.code > 0 ? REGION_DATA.city[province.code][cityIndex] : defaultObj;
    const area = city.code > 0 && REGION_DATA.area[city.code] ? REGION_DATA.area[city.code][areaIndex] : defaultObj;
    return {
      province,
      city,
      area
    };
  }
  get proviceAndCity() {
    const { regionValues } = this;
    const { province, city, area } = this.getProvinceAndCityObj(regionValues);
    if (province.name === city.name && province.name === area.name) {
      return province.name;
    } else if (province.name === city.name) {
      return `${province.name}${area.name || ""}`;
    }
    return `${province.name || ""}${city.name || ""}${area.name || ""}`;
  }
  get formateValue() {
    let result = "";
    return result;
  }
  // code =>index
  get regionValues() {
    // const result = [];
    const { province, city, area } = this.props;
    const provinceIndex = REGION_DATA.province.findIndex(item => {
      const { code } = item;
      return code === province;
    });
    let cityIndex = -1;
    let areaIndex = -1;
    if (provinceIndex > -1) {
      const cityList = REGION_DATA.city[province];
      cityIndex = cityList.findIndex(item => item.code === city);
    }
    if (cityIndex > -1) {
      const cityItem = REGION_DATA.city[province][cityIndex];
      if (REGION_DATA.area[cityItem.code]) {
        areaIndex = REGION_DATA.area[cityItem.code].findIndex(item => item.code === area);
      }
    }
    return [provinceIndex, cityIndex, areaIndex];
  }
  render() {
    const { provinceList, cityList, areaList } = this.state;
    const { regionValues, proviceAndCity } = this;
    const { placeholder, title } = this.props;
    return <View className="address-container">
        <Picker className="picker" mode="multiSelector" range={[provinceList, cityList, areaList]} onChange={this.onRegionChange} onColumnChange={this.onColumnchange} rangeKey="name" value={regionValues}>
          <View style="pointer-events: none;">
            <AtInput name="address" type="text" value={proviceAndCity} className="address-input" placeholder={placeholder} title={title} onChange={() => {}} disabled>
              
              {this.props.children}
            </AtInput>
          </View>
        </Picker>
      </View>;
  }
}
Address.options = {
  addGlobalClass: true
};
export default Address;
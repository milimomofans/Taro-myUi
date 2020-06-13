import Taro, {Component, Config} from "@tarojs/taro";
import {View} from "@tarojs/components";
import Address from '@/Components/address/index'
import bind from "bind-decorator";
import "./index.scss";

interface StateProps {
  province: number
  city: number
  area: number
}

export default class Index extends Component<any, StateProps> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };
  state = {
    province: 340000000000,
    area: 340101000000,
    city: 340100000000
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  @bind
  onAreaChange({province, city, area}) {
    this.setState({province, city, area})
  }

  render() {
    const {province, city, area} = this.state
    return (
      <View className="index">
        <Address
          province={province}
          title="地址"
          placeholder="选择地址"
          area={area}
          city={city}
          onAreaChange={this.onAreaChange}
        >

        </Address>
      </View>
    );
  }
}

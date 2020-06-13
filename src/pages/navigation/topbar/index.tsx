import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { WtTopBar } from "water-ui";
import "./index.scss";

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "顶部导航",
    navigationStyle: "custom"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onBack() {
    Taro.showLoading();
    Taro.navigateBack().then(() => Taro.hideLoading());
  }
  render() {
    return (
      <View className="index">
        <WtTopBar
          title="顶部导航1"
          isWhite
          backgroundColor="#000"
          onBack={this.onBack}
          showFilter={false}
        />
        <WtTopBar
          title="顶部导航2"
          isWhite={false}
          showFilter={false}
          backgroundColor="#f8f8f8"
          onBack={this.onBack}
        />
      </View>
    );
  }
}

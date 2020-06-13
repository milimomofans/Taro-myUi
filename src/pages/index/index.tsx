import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
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
    navigationBarTitleText: "首页"
  };

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

  render() {
    return (
      <View className="index">
        <Button
          onClick={() =>
            Taro.navigateTo({url: "/pages/navigation/topbar/index"})
          }
        >
          顶部导航
        </Button>
        <Button
          onClick={() =>
            Taro.navigateTo({url: "/pages/infinite-scroll/index"})
          }
        >
          无限滚动
        </Button>
        <Button
          onClick={() => Taro.navigateTo({ url: "/pages/share-button/index" })}
        >
          分享按钮
        </Button>
        <Button
          onClick={() => Taro.navigateTo({ url: "/pages/coupon-list/index" })}
        >
          优惠券列表
        </Button>
        <Button
          onClick={() => Taro.navigateTo({ url: "/pages/coupon-select/index" })}
          onClick={() => Taro.navigateTo({url: "/pages/coupon-select/index"})}
        >
          优惠券选择
        </Button>
        <Button
          onClick={() => Taro.navigateTo({ url: "/pages/address/index" })}
        >
          地址选择
        </Button>
        <Button
          onClick={() => Taro.navigateTo({ url: "/pages/collect-item/index" })}
          onClick={() => Taro.navigateTo({url: "/pages/collect/index"})}
          onClick={() => Taro.navigateTo({ url: "/pages/collect/index" })}
          onClick={() => Taro.navigateTo({ url: "/pages/collect-item/index" })}
        >
          收藏Item</Button>

         <Button onClick={() => Taro.navigateTo({ url: "/pages/cashier/index" })}>
          收银台
        </Button>
        <Button onClick={() => Taro.navigateTo({ url: "/pages/login-button/login-button" })}>
          登录按钮
          收藏Item
        </Button>
        <Button onClick={() => Taro.navigateTo({url: "/pages/camera/index"})}>
              人脸识别
          收藏Item
          收藏Item</Button>

         <Button onClick={() => Taro.navigateTo({ url: "/pages/cashier/index" })}>
          收银台
        </Button>
        <Button onClick={() => Taro.navigateTo({ url: "/pages/login-button/login-button" })}>
          登录按钮
        </Button>
      </View>
    );
  }
}

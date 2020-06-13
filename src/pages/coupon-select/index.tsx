import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { WtCouponSelect } from "water-ui";

import "./index.scss";
import data from "./data";

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  };

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "优惠券选择"
  };
  state = {
    show1: false,
    show2: false
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

  handleCouponSelectShow(flag, num) {
    this.setState({
      [`show${num}`]: flag
    });
  }

  handleSelectCoupon(coupon) {
    Taro.showToast({
      icon: "none",
      title: `您选中了${coupon.couponsName}`
    });

    console.log("handleSelectCoupon coupon: ", coupon);
  }

  render() {
    const coupons = data.couponList || [];
    const params = {
      payable: 300,
      shop_goods: [
        {
          shopId: "2",
          goodsId: "3",
          goodsCategoryId: "21",
          goodsIdentification: "ydfx",
          price: "50",
          platformCost: "3",
          serviceCharge: "6",
          commission: "6"
        },
        {
          shopId: "0",
          goodsId: "1",
          goodsCategoryId: "12",
          goodsIdentification: "dyfx",
          price: "40",
          platformCost: "5",
          serviceCharge: "5",
          commission: "5"
        }
      ]
    };

    return (
      <View className="index">
        <Button
          style={{ margin: "20px" }}
          onClick={this.handleCouponSelectShow.bind(this, true, 1)}
        >
          选择优惠券(自动获取数据)
        </Button>

        <Button
          style={{ margin: "20px" }}
          onClick={this.handleCouponSelectShow.bind(this, true, 2)}
        >
          选择优惠券(手动传入数据)
        </Button>

        <WtCouponSelect
          scene={1}
          autoLoad={true}
          autoParams={params}
          visible={this.state.show1}
          onSelect={this.handleSelectCoupon}
          onClose={this.handleCouponSelectShow.bind(this, false, 1)}
        ></WtCouponSelect>

        <WtCouponSelect
          scene={1}
          visible={this.state.show2}
          dataList={coupons}
          onSelect={this.handleSelectCoupon}
          onClose={this.handleCouponSelectShow.bind(this, false, 2)}
        ></WtCouponSelect>
      </View>
    );
  }
}

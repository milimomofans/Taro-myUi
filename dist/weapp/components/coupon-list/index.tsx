import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import CouponItem from "./components/item";

interface Props {
  scene: number | string; // 领券场景： 1-领券中心 2-支付成功页 3-每日福利 4-其它,
  list: any[];
  isJumped?: boolean; // 是否可跳转优惠券详情
  isSelect?: boolean; // 是否展示为选择优惠券
  showCollapsed?: boolean; // 是否可折叠规则内容
  showBtn?: boolean; // 是否显示按钮（立即使用/快去抢/领取）
  onBtnClick?: (item: object) => any; // 按钮点击事件-立即使用/快去抢/领取
  onRowClick?: (item: object) => any; // 整行点击事件-查看详情
  env?: "production" | "development"; // 运行环境
}

class CouponList extends Component<Props> {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    scene: 1,
    isSelect: false,
    isJumped: true,
    showBtn: true,
    showCollapsed: true,
    list: [],
    env: "production"
  };

  render() {
    const {
      scene,
      isSelect,
      isJumped,
      showBtn,
      showCollapsed,
      list,
      onBtnClick,
      onRowClick,
      env
    } = this.props;
    return (
      <View className="coupon-list">
        {list &&
          list.map(item => (
            <CouponItem
              key={item.couponsId}
              scene={scene}
              coupon={item}
              showBtn={showBtn}
              isJumped={isJumped}
              isSelect={isSelect}
              showCollapsed={showCollapsed}
              onRowClick={onRowClick}
              onBtnClick={onBtnClick}
              env={env}
            />
          ))}
      </View>
    );
  }
}

export default CouponList;

import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { View } from "@tarojs/components";
import CouponItem from "./components/item";
class CouponList extends Component {
  render() {
    const { scene, isSelect, isJumped, showBtn, showCollapsed, list, onBtnClick, onRowClick, env } = this.props;
    return <View className="coupon-list">
        {list && list.map(item => <CouponItem key={item.couponsId} scene={scene} coupon={item} showBtn={showBtn} isJumped={isJumped} isSelect={isSelect} showCollapsed={showCollapsed} onRowClick={onRowClick} onBtnClick={onBtnClick} env={env} />)}
      </View>;
  }
}
CouponList.options = {
  addGlobalClass: true
};
CouponList.defaultProps = {
  scene: 1,
  isSelect: false,
  isJumped: true,
  showBtn: true,
  showCollapsed: true,
  list: [],
  env: "production"
};
export default CouponList;
import Nerv from "nervjs";
import { __decorate } from "tslib";
import { Component } from "@tarojs/taro-h5";
import { View } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import bind from "bind-decorator";
import request from "../../common/request";
import { COUPON_BASE_URL } from "../../common/api";
import CouponList from "../coupon-list/index";
import Empty from "../empty/index";
class CouponSelect extends Component {
  constructor(props) {
    super(props);
    this.setState({
      isOpend: props.visible
    });
  }
  async componentWillMount() {
    await this.loadData();
  }
  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    const { isOpend } = this.state;
    if (visible !== isOpend) {
      this.setState({
        isOpend: visible
      });
    }
  }
  // 加载页面数据
  async loadData() {
    try {
      this.setState({
        isLoading: true
      });
      const { scene, autoLoad, autoParams = {} } = this.props;
      // 组件自动调用API获取数据
      if (autoLoad) {
        // 下单场景
        if (Number(scene) === 1 && autoParams) {
          await this.getCouponsForOrder(autoParams);
        }
        // 其它场景可扩展
      }
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.log("loadData e >>>", e);
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }
  // 获取订单可选择优惠券
  async getCouponsForOrder(params = {
    payable: 0,
    shop_goods: []
  }) {
    // api地址
    const { env = "production" } = this.props;
    const apiUrl = COUPON_BASE_URL[env];
    const result = await request({
      url: `${apiUrl}/api/couponsApp/getAvailableCoupons`,
      data: {
        pageNum: 1,
        pageSize: 999999,
        data: {
          payable: params.payable,
          shop_goods: params.shop_goods || []
        }
      },
      method: "POST",
      absolute: true
    });
    const { list } = result || { list: [] };
    this.setState({
      autoList: list || []
    });
    console.log("getCouponsForOrder result >>>", result);
  }
  handleClose() {
    this.setState({
      isOpend: false
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    const { autoLoad, dataList, onSelect, env } = this.props;
    const { autoList } = this.state;
    const couponsList = (autoLoad ? autoList : dataList) || [];
    const isEmpty = !couponsList || !couponsList.length;
    return <View className="coupon-select-container">
        <AtFloatLayout title="优惠" isOpened={this.state.isOpend} onClose={this.handleClose}>
          
          {isEmpty && !this.state.isLoading && <Empty text="暂无可用优惠券" />}

          
          {!isEmpty && <View className="coupon-select-list">
              <View className="coupon-select-title">
                可选优惠券（{couponsList.length}）
              </View>
              <CouponList list={couponsList} onBtnClick={onSelect} isSelect isJumped={false} env={env} />
            </View>}
        </AtFloatLayout>
      </View>;
  }
}
CouponSelect.options = {
  addGlobalClass: true
};
CouponSelect.defaultProps = {
  visible: false,
  isLoading: false,
  autoLoad: false,
  autoParams: {},
  dataList: [],
  env: "production"
};
__decorate([bind], CouponSelect.prototype, "handleClose", null);
export default CouponSelect;
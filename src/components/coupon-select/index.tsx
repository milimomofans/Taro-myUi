import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import bind from "bind-decorator";
import request from "../../common/request";
import { COUPON_BASE_URL } from "../../common/api";
import CouponList from "../coupon-list/index";
import Empty from "../empty/index";

interface Props {
  visible: boolean; // 是否显示
  scene: number | string; // 优惠券选择场景(可以扩展)： 1 下单
  autoLoad: boolean; // 是否自动加载，默认为false
  autoParams: object; // 自动调用API加载数据所需的参数,该参数请结合场景传入正确的参数对象,如订单：参数举例 {payable: 300, shop_goods: [{ "shopId":"2", "goodsId":"3", "goodsCategoryId":"21", "goodsIdentification":"ydfx", "price":"50", "platformCost":"3", "serviceCharge":"6", "commission":"6"}]}
  dataList?: any[]; // 传入List数据，需将autoLoad设为false才使用传入的数据
  onClose?: () => void; // 关闭回调
  onSelect?: (coupon) => void; // 点击选择按钮后
  env?: "production" | "development"; // 运行环境,默认是正式环境production
}

interface State {
  isLoading: boolean;
  isOpend: boolean;
  autoList: any[];
}

class CouponSelect extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.setState({
      isOpend: props.visible
    });
  }

  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    visible: false,
    isLoading: false,
    autoLoad: false,
    autoParams: {},
    dataList: [],
    env: "production"
  };

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
  async getCouponsForOrder(
    params: any = {
      payable: 0,
      shop_goods: []
    }
  ) {
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

  @bind
  handleClose() {
    this.setState({
      isOpend: false
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const { autoLoad, dataList, onSelect,env } = this.props;
    const { autoList } = this.state;
    const couponsList = (autoLoad ? autoList : dataList) || [];
    const isEmpty = !couponsList || !couponsList.length;

    return (
      <View className="coupon-select-container">
        <AtFloatLayout
          title="优惠"
          isOpened={this.state.isOpend}
          onClose={this.handleClose}
        >
          {/* 暂无数据 */}
          {isEmpty && !this.state.isLoading && <Empty text="暂无可用优惠券" />}

          {/* 优惠券列表 */}
          {!isEmpty && (
            <View className="coupon-select-list">
              <View className="coupon-select-title">
                可选优惠券（{couponsList.length}）
              </View>
              <CouponList
                list={couponsList}
                onBtnClick={onSelect}
                isSelect
                isJumped={false}
                env={env}
              />
            </View>
          )}
        </AtFloatLayout>
      </View>
    );
  }
}

export default CouponSelect;

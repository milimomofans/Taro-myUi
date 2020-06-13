import Taro, { Component } from "@tarojs/taro";
import { Image, View, Text } from "@tarojs/components";
import dayjs from "dayjs";
import request from "../../../common/request";
import { POINT_BASE_URL, COUPON_BASE_URL } from "../../../common/api";
import throttle from "lodash/throttle";
import {
  getApplyScopeName,
  getValidDateText,
  getValidTipText,
  couponToUsed
} from "../couponMethod";
import icon from "../imgs";

interface Props {
  scene: number | string; // 领券场景： 1-领券中心 2-支付成功页 3-每日福利 4-其它,
  isJumped?: boolean; // 是否可跳转优惠券详情
  isSelect?: boolean; // 是否展示为选择优惠券
  showCollapsed?: boolean; // 是否可折叠规则内容
  showBtn?: boolean; // 是否展示按钮
  onBtnClick?: (item: object) => any; // 按钮点击事件-立即使用/快去抢/领取
  onRowClick?: (item: object) => any; // 整行点击事件-查看详情

  coupon: {
    // 优惠券信息
    couponsId: string; // 优惠券ID
    couponsInstId: string; // 优惠券实例ID (用于一旦领取后，会生成优惠券实例)
    couponsName: string;
    couponsCate: string | number;
    couponsAmount: number;
    discountRatio: number;
    remark: string;
    effectiveTime: string;
    overdueTime: string;
    applyScope: any;
    scopeList: Array<object>;
    bgImg: string;
    receiveType: string | number;
    receiveAmount: number;
    receiveState: string | number; // 0 待领取 1 已领取
  };
  env?: "production" | "development"; // 运行环境
}

class CouponItem extends Component<Props> {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    isSelect: false,
    isJumped: true,
    showBtn: true,
    showCollapsed: true,
    coupon: {},
    env: "production"
  };

  state = {
    // 是否已折叠
    isCollapsed: true,

    // 券领取状态 (state单独维护一个领取状态，默认为待领取，因优惠券可能允许领取多次，能做到领取后即时切换按钮为【去使用】,引导去消费)
    receiveState: 0
  };

  // 渲染按钮
  renderBtn = () => {
    const { isSelect, coupon } = this.props;
    const { receiveState } = this.state;
    const { overdueTime } = coupon;
    const isReceivedCoupon = receiveState || coupon.receiveState;

    // 选择组件且已领取
    if (isSelect && isReceivedCoupon) {
      return (
        <View className="info-action-box-button" onClick={this.handleBtnClick}>
          选择
        </View>
      );
    }

    // 已过期，不展示按钮
    if (this.getIsInvalidCoupon(overdueTime)) {
      return <View></View>;
    }

    // 已领取，引导去使用
    if (isReceivedCoupon) {
      return (
        <View className="info-action-box-button" onClick={this.handleBtnClick}>
          去使用
        </View>
      );
    }

    if (Number(coupon.receiveType) === 1) {
      return (
        <View className="info-action-box-button" onClick={this.handleBtnClick}>
          免费领取
        </View>
      );
    } else if (Number(coupon.receiveType) === 2) {
      return (
        <View className="info-action-box-button" onClick={this.handleBtnClick}>
          {coupon.receiveAmount}积分兑换
        </View>
      );
    } else if (Number(coupon.receiveType) === 3) {
      return (
        <View className="info-action-box-button" onClick={this.handleBtnClick}>
          {coupon.receiveAmount}元抢购
        </View>
      );
    }
  };

  render() {
    const { showBtn, showCollapsed, coupon } = this.props;
    const { applyScope = 0 } = coupon || {};
    const scopeText = getApplyScopeName(Number(applyScope));
    const validDateText = getValidDateText(coupon);
    const validTipText = getValidTipText(coupon);

    return (
      <View className="coupon-item" onClick={this.handleRowClick}>
        {/* 优惠券信息 */}
        <View className="info">
          {/* 背景 */}
          <Image className="info-bg" src={coupon.bgImg} />
          {/* 蒙版层 */}
          <View className="info-mask" />

          {/* 优惠券金额或折扣 */}
          <View className="info-name">
            <View>{coupon.couponsName}</View>
            {Number(coupon.couponsCate) === 1 && (
              <View className="info-name-price">￥{coupon.couponsAmount}</View>
            )}
            {Number(coupon.couponsCate) === 2 && (
              <View className="info-name-price">
                {(Number(coupon.discountRatio) / 10).toFixed(1)}折
              </View>
            )}
          </View>

          <View className="info-date">{validDateText}</View>
          <View className="info-action">
            <View className="info-action-box">
              {/* 操作按钮 */}
              {showBtn && this.renderBtn()}

              {/* 已领取，提示出剩余天数 */}
              {coupon.receiveState && (
                <Text className="info-action-box-tip">{validTipText}</Text>
              )}
            </View>
            {/* 展开图标 */}
            {this.state.isCollapsed && showCollapsed && (
              <View onClick={this.handleExpand} className="icon-wrap">
                <Image src={icon.arrowDownIcon} />
              </View>
            )}
          </View>
        </View>

        {/* 优惠券说明 */}
        {!this.state.isCollapsed && (
          <View className="intro">
            <View className="intro-text">适用范围：{scopeText}</View>
            <View className="intro-text">有效期：{validDateText}</View>
            <View className="intro-button" onClick={this.handleCollapse}>
              <Image src={icon.arrowUpIcon} />
            </View>
          </View>
        )}
      </View>
    );
  }

  // 是否是已过期优惠券
  getIsInvalidCoupon(overdueTime) {
    if (!overdueTime) {
      return false;
    }
    const surplusSecond = dayjs(overdueTime).diff(dayjs(), "millisecond");
    return surplusSecond <= 0;
  }

  // 展开
  handleExpand = e => {
    e.stopPropagation();
    this.setState({ isCollapsed: false });
  };

  // 收起
  handleCollapse = e => {
    e.stopPropagation();
    this.setState({ isCollapsed: true });
  };

  // 整行-点击事件
  handleRowClick = e => {
    e.stopPropagation();

    const {
      isJumped,
      onRowClick,
      isSelect,
      onBtnClick,
      coupon,
      scene
    } = this.props;

    if (isJumped) {
      // 整行点击
      if (onRowClick) {
        if (typeof onRowClick === "function") {
          onRowClick(coupon);
        } else {
          throw new Error("type error, must is a function...");
        }
      } else {
        // 优先以优惠券实例ID查询
        const couponsId = coupon.couponsInstId || coupon.couponsId;

        // 查看详情
        Taro.navigateTo({
          url: `/subPackageCoupon/pages/couponCenter/couponDetail?couponsId=${couponsId}&scene=${scene}`
        });
      }
    } else if (isSelect && onBtnClick) {
      // 已领取，单击直接选中
      const isReceivedCoupon = this.state.receiveState || coupon.receiveState;
      if (typeof onBtnClick === "function") {
        if (isReceivedCoupon) {
          onBtnClick(coupon);
        } else {
          Taro.showToast({
            icon: "none",
            title: `还尚未领取哦~`
          });
        }
      } else {
        throw new Error("type error, must is a function...");
      }
    }
  };

  // 按钮点击事件-立即使用/免费领取/积分兑换/付费获取
  handleBtnClick = e => {
    e.stopPropagation();
    const { onBtnClick, coupon, isSelect } = this.props;
    console.log("event onBtnClick: ", onBtnClick);
    if (onBtnClick) {
      if (typeof onBtnClick === "function") {
        const isReceivedCoupon = this.state.receiveState || coupon.receiveState;
        if (isSelect && isReceivedCoupon) {
          onBtnClick(coupon);
        } else {
          this.doLocalBtnClick(coupon);
        }
      } else {
        throw new Error("type error, must is a function...");
      }
    } else {
      this.doLocalBtnClick(coupon);
    }
  };

  // 执行按钮点击
  doLocalBtnClick = throttle(
    coupon => {
      console.log("doLocalBtnClick local called:", coupon);
      // 1. 立即使用
      if (this.state.receiveState || coupon.receiveState) {
        return this.doUseCoupon(coupon);
      }

      // 2. 免费领取
      if (Number(coupon.receiveType) === 1) {
        return this.doFreeReceiveCoupon(coupon);
      }

      // 3. 积分兑换
      if (Number(coupon.receiveType) === 2) {
        return this.doPointExchangeCoupon(coupon);
      }

      // 4. 付费获取
      if (Number(coupon.receiveType) === 3) {
        return this.doBuyCoupon(coupon);
      }
    },
    1000,
    {
      leading: true,
      trailing: false
    }
  );

  // 优惠券-立即使用
  async doUseCoupon(coupon: any) {
    // 检查是否已过期,剩余可用天数<0,则表示过期
    if (coupon.overdueTime) {
      const surplusSecond = dayjs(coupon.overdueTime).diff(
        dayjs(),
        "millisecond"
      );
      if (surplusSecond <= 0) {
        Taro.showToast({
          icon: "none",
          title: `抱歉，优惠券已过期！`
        });
        return;
      }
    }

    // 延迟生效天数
    if (coupon.effectiveTime) {
      const delayDay = dayjs(coupon.effectiveTime).diff(dayjs(), "day");
      if (delayDay > 0) {
        Taro.showToast({
          icon: "none",
          title: `${delayDay}天后才能使用`
        });
        return;
      }
    }

    // 根据适用范围，跳转至目标页
    Taro.showToast({
      icon: "loading",
      title: "正在跳转"
    });

    couponToUsed(coupon);
  }

  // 优惠券-免费领取
  async doFreeReceiveCoupon(coupon: any) {
    Taro.showLoading({
      title: "正在领取..."
    });
    try {
      const { env = "production" } = this.props;
      const apiUrl = COUPON_BASE_URL[env];

      const res = await request({
        url: `${apiUrl}/api/couponsApp/relateCoupon`,
        data: {
          couponsId: coupon.couponsId,
          receiveSource: this.props.scene,
          receiveType: coupon.receiveType
        },
        method: "POST",
        absolute: true
      });

      console.log("relateCoupon res:", res);

      Taro.showToast({
        icon: "none",
        title: `恭喜，领取成功！`
      });

      // 更新领取状态为已领取
      this.setState({
        receiveState: 1
      });
    } catch (error) {
      const msg = typeof error === "string" ? error : `抱歉，您未抢到！`;
      Taro.showToast({
        icon: "none",
        title: msg
      });
    } finally {
      // 真机会导致showToast一并被关闭，注释掉该句，让showToast自动顶替掉showLoading
      // Taro.hideLoading();
    }
  }

  // 优惠券-积分兑换
  async doPointExchangeCoupon(coupon: any) {
    Taro.showLoading({
      title: "正在兑换..."
    });

    try {
      //  调用积分兑换优惠券
      const { env = "production" } = this.props;
      const apiUrl = POINT_BASE_URL[env];

      const res = await request({
        url: `${apiUrl}/api/exchangeConpons`,
        data: {
          couponsId: coupon.couponsId,
          receiveSource: this.props.scene,
          receiveType: coupon.receiveType
        },
        method: "GET",
        absolute: true
      });

      console.log("exchangeConpons res： >>>", res);

      Taro.showToast({
        icon: "none",
        title: `恭喜，兑换成功！`
      });

      // 更新领取状态为已领取
      this.setState({
        receiveState: 1
      });
    } catch (error) {
      console.log("error >>>", error);

      const msg = typeof error === "string" ? error : `抱歉，兑换失败！`;
      Taro.showToast({
        icon: "none",
        title: msg
      });
    } finally {
      // 真机会导致showToast一并被关闭，注释掉该句，让showToast自动顶替掉showLoading
      // Taro.hideLoading();
    }
  }

  // 优惠券-付费获取
  async doBuyCoupon(coupon: any) {
    const { scene, env = "production" } = this.props;

    Taro.showLoading({
      title: "正在处理..."
    });

    const apiUrl = COUPON_BASE_URL[env];
    try {
      // 订单详情地址
      let orderDetailPage = "";
      switch (Number(scene)) {
        case 1:
          orderDetailPage = `/subPackageCoupon/pages/orderDetail/orderDetail?orderNo=`;
          break;
        case 3:
          orderDetailPage = `/subPackagePoint/pages/orderDetail/orderDetail?orderNo=`;
          break;
        default:
          orderDetailPage = `/subPackageCoupon/pages/orderDetail/orderDetail?orderNo=`;
          break;
      }

      // 1. 创建订单
      const result = await request({
        url: `${apiUrl}/api/couponsApp/order`,
        data: {
          couponsId: coupon.couponsId,
          receiveType: 3, // 付费获取
          receiveSource: scene,
          appId: Taro.getAccountInfoSync().miniProgram.appId,
          path: orderDetailPage
        },
        method: "POST",
        absolute: true
      });

      if (!result || !result.length) {
        Taro.showToast({
          icon: "none",
          title: "抱歉，抢购失败！"
        });
      }

      const { order_no } = result[0] || {};
      if (!order_no) {
        Taro.showToast({
          icon: "none",
          title: "抱歉，抢购失败！"
        });
        return;
      }

      // 2. 跳转收银页面 (领券场景： 1-领券中心 2-支付成功页 3-每日福利 4-其它)
      let url = "";
      switch (Number(scene)) {
        case 1:
          url = `/subPackageCoupon/pages/orderPayment/orderPayment?orderNo=${order_no}`;
          break;
        case 3:
          url = `/subPackagePoint/pages/orderPayment/orderPayment?orderNo=${order_no}`;
          break;
        default:
          url = `/subPackageCoupon/pages/orderPayment/orderPayment?orderNo=${order_no}`;
          break;
      }

      Taro.navigateTo({
        url: url
      });

      Taro.hideLoading();
    } catch (error) {
      console.log("error >>>", error);
      const msg = typeof error === "string" ? error : `抱歉，抢购失败！`;
      Taro.showToast({
        icon: "none",
        title: msg
      });
    } finally {
      // 真机会导致showToast一并被关闭，注释掉该句，让showToast自动顶替掉showLoading
      // Taro.hideLoading();
    }
  }
}

export default CouponItem;

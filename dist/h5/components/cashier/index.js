import Nerv from "nervjs";
/**
 * created by frank on 2020/03/12
 */
import { __decorate } from "tslib";
import Taro, { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import bind from "bind-decorator";
import classNames from 'classnames';
import $wulongPay from 'wulong-pay';
import { wxLog } from 'water-utils';
import debounce from 'lodash/debounce';
import CashierGoods from "./components/cashier-goods/cashier-goods";
import CashierSuccess from "./components/cashier-success/cashier-success";
import './index.scss';
class Cashier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: {},
      couponData: {},
      loading: true,
      paySuccess: false
    };

    this.baseUrl = process.env.NODE_ENV === 'production' ? 'https://api-pro-out.trip.wlkst.com' : 'http://service-0wal9i5k-1257188045.gz.apigw.tencentcs.com/release';
    this.header = { Authorization: this.props.token };
    this.appid = Taro.getAccountInfoSync().miniProgram.appId;
    this.submitOrder = debounce(this.onsubmitOrder, 500);
  }
  async componentWillMount() {
    wxLog.info('打开收银台');
    wxLog.info(`当前环境 ${process.env.NODE_ENV}`);
    wxLog.info(`当前订单号 ${JSON.stringify(this.props.orderNo)}`);
    // 每次都会用设置第一个订单号为关键字
    const firstOrder = this.props.orderNo[0];
    wxLog.setFilterMsg(firstOrder);
    // 执行正常逻辑
    await Taro.setNavigationBarTitle({ title: '收银台' });
    this.getOrderGoods();
  }
  async getOrderGoods() {
    // 请求加载的数据
    try {
      this.setState({ loading: true });
      await Taro.showLoading({ title: '加载中...' });
      const res = await Taro.request({
        url: this.baseUrl + '/service/user-order/order/pay/page',
        data: { order_nos: this.props.orderNo },
        header: this.header,
        method: 'POST'
      });
      if (!res.data || res.data.code !== 0) {
        await Taro.showToast({ title: res.data.message, icon: 'none' });
        throw new Error(res.data || res);
      }
      const nowData = res.data.data;
      this.setState({ orderData: nowData });
      // 不要钱 直接唤起
      if (nowData.pay_fee === 0) {
        await this.onsubmitOrder();
      }
      Taro.hideLoading();
    } catch (e) {
      await Taro.showToast({ title: '网络繁忙，请稍后再试', icon: 'none' });
      wxLog.error(`获取订单数据出错 ${JSON.stringify(e)}`);
      throw e;
    } finally {
      this.setState({ loading: false });
    }
  }
  async getCoupon(trans_no) {
    await Taro.showLoading({ title: '加载中...' });
    const { data: { data } } = await Taro.request({
      url: this.baseUrl + '/service/user-order/order/pay/show',
      data: { trans_no },
      header: this.header,
      method: 'POST'
    });
    this.setState({ couponData: data });
    wxLog.info(`支付成功，获取优惠券 ${JSON.stringify(data)}`);
  }
  payOrderFn(payInfo) {
    wxLog.info(`调用米大师支付接口  ${payInfo}`);
    return new Promise((resolve, reject) => {
      $wulongPay('app05184f16acb89', 'midas', payInfo, async res => {
        const { resultMsg, resultCode } = res;
        if (resultCode === 0) {
          wxLog.info(`支付成功！米大师返回成功数据 ${JSON.stringify(res)}`);
          // await Taro.showToast({ title: resultMsg, icon: 'success' })
          resolve();
        } else {
          reject(resultMsg);
          console.error(payInfo, 'payInfo');
          wxLog.error(`支付失败，米大师返回失败数据 ${JSON.stringify(res)}`);
        }
      });
    });
  }
  async pay() {
    const { data: { data: { pay } } } = await Taro.request({
      url: this.baseUrl + '/service/user-order/order/pay',
      data: { order_nos: this.props.orderNo, pay_type: 1, app_id: this.appid },
      header: this.header,
      method: 'POST'
    });
    const { out_trade_no, pay_info } = pay;
    wxLog.info(`支付接口回调成功 ${JSON.stringify(pay)}`);
    if (this.state.orderData.pay_fee > 0) {
      // 支付
      await this.payOrderFn(pay_info);
      return out_trade_no;
    }
    return out_trade_no;
  }
  async onsubmitOrder() {
    // 支付
    try {
      await Taro.showLoading({ title: '加载中...' });
      const transNo = await this.pay();
      await this.getCoupon(transNo);
      await Taro.setNavigationBarTitle({ title: '' });
      await Taro.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#00CB74'
      });
      this.setState({ paySuccess: true });
      Taro.hideLoading();
    } catch (e) {
      const err = typeof e === 'string' ? e : '网络错误，请稍后再试';
      await Taro.showToast({ title: err, icon: 'none' });
      wxLog.error(`支付时发生错误，错误为 ${JSON.stringify(e)}`);
      // this.props.onPayFail()
      throw e;
    }
  }
  paySuccess() {
    const { onPaySuccess } = this.props;
    wxLog.info('用户调用业务传入的pay success 方法');
    if (onPaySuccess) {
      onPaySuccess();
    }
  }
  render() {
    const { orderData, loading, paySuccess, couponData } = this.state;
    const { customClass, customStyle } = this.props;
    const nowClass = classNames(['cashier-wrapper', customClass, { 'white': paySuccess }]);
    return <View className={nowClass} style={customStyle}>
        {loading ? <View /> : <View>
              {paySuccess ? <CashierSuccess payFee={orderData.pay_fee} couponData={couponData} onPaySuccess={this.paySuccess} /> : <CashierGoods onPay={this.submitOrder} orderData={orderData} />}
            </View>}
      </View>;
  }
  config = {
    navigationBarTitleText: '收银台'
  };
}
Cashier.options = {
  addGlobalClass: true
};
__decorate([bind], Cashier.prototype, "getOrderGoods", null);
__decorate([bind], Cashier.prototype, "getCoupon", null);
__decorate([bind], Cashier.prototype, "pay", null);
__decorate([bind], Cashier.prototype, "onsubmitOrder", null);
__decorate([bind], Cashier.prototype, "paySuccess", null);
export default Cashier;
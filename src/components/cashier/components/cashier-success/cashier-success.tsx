import Taro from "@tarojs/taro";
import {Button, Image, Text, View} from "@tarojs/components";
import CouponItem from "../../../coupon-list/components/item";
import successIcon from './images/icon-success.png'

interface Props {
  onPaySuccess: () => any
  payFee: string
  couponData
}

const CashierSuccess = ({onPaySuccess, couponData, payFee}: Props) => {
  return (
    <View className="cashier-success-wrapper">
      <View className="cashier-success-top" />
      <View className="cashier-success-main">
        <View className="cashier-success-main-status">
          <Image className="cashier-success-icon" src={successIcon} />
          <View className="cashier-success-title">支付成功</View>
          <View className="cashier-success-amount">
            <Text className="cashier-success-mark">￥</Text>
            <Text className="cashier-success-number">{payFee}</Text>
          </View>
        </View>
        {couponData && couponData.length > 0 && (
          <View className="cashier-success-main-coupon">
            <View className="cashier-success-main-coupon-title">
              恭喜你获得{couponData && couponData.length}张优惠券
            </View>
            <View className="cashier-success-coupon-wrapper" style={{width: '100%'}}>
              {couponData
              && couponData.length > 0
              && couponData.map(item => <CouponItem showBtn={false} coupon={item} key={item.couponsId} scene={4}/>)}
            </View>
            <View className="cashier-success-alter-text">
              优惠券可在“个人中心”中查看
            </View>
          </View>
        )}
      </View>
      <Button className="cashier-success-button" onClick={onPaySuccess}>完成</Button>
    </View>
  )
}

CashierSuccess.defaultProps = {
  onPaySuccess: () => {
  },
  couponData: []
}

CashierSuccess.options = {
  addGlobalClass: true
}

export default CashierSuccess

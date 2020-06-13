import Nerv from "nervjs";
import { useMemo } from "@tarojs/taro-h5";
import { Button, Image, Text, View } from "@tarojs/components";
import classNames from 'classnames';

class CashierGoods extends Taro.Component {
  render() {
    const { orderData, onPay } = this.props;

    const priceArr = useMemo(() => {
      if (!orderData) return {};
      const keyObj = {
        total_fee: {
          name: '商品合计金额',
          class: '',
          extra: '￥'
        },
        discount_fee: {
          name: '优惠金额',
          class: 'special',
          extra: '-￥'
        }
      };
      return Object.keys(keyObj).map(keyItem => {
        const nowItem = keyObj[keyItem];
        const nowPrice = orderData[keyItem] || 0;
        return {
          price: nowItem.extra + nowPrice,
          className: classNames([nowItem.class, 'cashier-goods-price-item-price']),
          name: nowItem.name
        };
      });
    }, [orderData]);
    const goods = useMemo(() => {
      let result = {
        goodsList: [],
        goodsNum: 0
      };
      if (!orderData || !orderData.goods_list) {
        return result;
      }
      const defaultGoods = orderData.goods_list;
      const defaultGoodsLength = defaultGoods.length;
      if (defaultGoods.length > 3) {
        result.goodsList = defaultGoods.slice(0, 3);
      } else {
        result.goodsList = defaultGoods;
      }
      result.goodsNum = defaultGoodsLength;
      return result;
    }, [orderData]);
    if (!orderData) return null;
    return <View className="cashier-goods-wrapper">
      <View className="cashier-goods-goods">
        <View className="cashier-goods-goods-wrapper">
          <View className="cashier-goods-goods-title">
            您选购的商品
          </View>
          <View className="cashier-goods-goods-main">
            <View className="cashier-goods-goods-left">
              {goods && goods.goodsList.map((goodsItem, index) => <Image mode="aspectFill" webp className="cashier-goods-goods-items-image" key={`${goodsItem.thumb_url}${index}`} src={goodsItem.thumb_url} />)}
            </View>
            <View className="cashier-goods-goods-right">
              共{goods.goodsNum}件商品
            </View>
          </View>
          {orderData.coupon_name && <View className="cashier-goods-goods-coupon">
              <View className="cashier-goods-goods-coupon-title">优惠券</View>
              <View className="cashier-goods-goods-coupon-name">{orderData.coupon_name}</View>
            </View>}
        </View>
      </View>
      <View className="cashier-goods-price">
        <View className="cashier-goods-price-item-wrapper">
          {priceArr.map(priceItem => <View className="cashier-goods-price-item" key={priceItem.name}>
              <View className="cashier-goods-price-item-title">{priceItem.name}</View>
              <View className={priceItem.className}>{priceItem.price}</View>
            </View>)}
        </View>
        <View className="cashier-goods-price-total">
          <Text className="cashier-goods-price-total-title">需要支付金额：</Text>
          <Text className="cashier-goods-price-total-price">￥{orderData.pay_fee}</Text>
        </View>
      </View>
      <Button className="cashier-goods-button" onClick={onPay}>确认支付</Button>
    </View>;
  }

}

CashierGoods.defaultProps = {
  data: {
    orderData: {
      "coupon_name": "",
      "discount_fee": 1,
      "express_fee": 2,
      "goods_list": [{
        "item_code": "",
        "thumb_url": ""
      }, {
        "item_code": "",
        "thumb_url": ""
      }],
      "goods_num": 2,
      "pay_fee": 2.46,
      "total_fee": 2.46
    },
    onPay: () => {}
  }
};
CashierGoods.options = {
  addGlobalClass: true
};
export default CashierGoods;
# CouponSelect 优惠券选择弹出框

---

优惠券选择弹出框

:::demo

```js
import { WtCouponSelect } from "water-ui";
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~taro-ui/dist/style/components/float-layout.scss";
@import "~water-ui/dist/style/components/coupon-select.scss";
```

:::

## 一般用法

说明：

- 该组件为受控组件，因 water-ui 样式打包问题，使用该组件的页面必须引入 taro-ui 的 float-layout 样式

- 组件自动调用 API 获取数据，需根据 scene 传入正确的参数，一旦 autoLoad 为 true，传入的 dataList 将无效

```
  例如： scene 为 1 表示下单时选择优惠券，此时传入参数数据结构：
  {
    payable: 109, // number 订单金额(元)
    shop_goods:[
          {
              "shopId":"2",  // string 商户ID
              "goodsId":"3", // string 商品ID
              "goodsCategoryId":"21", // string 商品类目ID
              "goodsIdentification":"ydfx", // string 商品业务标识（子类标识）
              "price":"50", // string 分销商品价格（单位：元）
              "platformCost":"3", // string 平台费用（单位：元）
              "serviceCharge":"6", // string 手续费用（单位：元）
              "commission":"6" // string 分销佣金（单位：元）
          }
      ]
  }

  字段详细文档，请查阅yapi: https://yapi.qqmylife.com/project/288/interface/api/8186
```

```
<WtCouponSelect
  scene={1}
  autoLoad={true}
  autoParams={{
    payable: 300,
    shop_goods: []
  }}
  visible={this.state.show1}
  onSelect={this.handleSelectCoupon}
></WtCouponSelect>
```

- 组件直接展示传入的数据，将 dataList 传入即可

```
<WtCouponSelect
  scene={1}
  visible={this.state.show2}
  dataList={coupons}
  onSelect={this.handleSelectCoupon}
></WtCouponSelect>
```

## 参数

| 参数       | 说明                                        | 类型             | 可选值                 | 默认值     |
| ---------- | ------------------------------------------- | ---------------- | ---------------------- | ---------- |
| visible    | 是否显示                                    | Boolean          | -                      | false      |
| scene      | 场景值 (如果需要自动加载数据，该字段值必传) | number 或 string | 1 下单                 | ''         |
| autoLoad   | 是否自动加载数据                            | Boolean          | -                      | false      |
| autoParams | 自动加载数据的参数                          | object           | -                      | {}         |
| dataList   | 优惠券数组                                  | Array            | -                      | []         |
| env        | 运行环境(非必传项)                          | String           | production development | production |

## 事件

| 事件名称 | 说明                 | 返回参数       |
| -------- | -------------------- | -------------- |
| onClose  | 弹窗关闭回调事件     | () => {}       |
| onSelect | 优惠券选择后回调事件 | (coupon)= > {} |

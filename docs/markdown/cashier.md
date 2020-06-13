# WtCashier 武隆小程序收银台

---
武隆小程序收银台组件

```js
import { WtCashier } from 'water-ui'
```

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~water-ui/dist/style/components/coupon-list.scss";
@import "~water-ui/dist/style/components/cashier.scss";
```

:::

## 一般用法

```
 <WtCashier orderNo={orderNO}
            onPayFail={this.onPayFail}
            onPaySuccess={this.onPaySuccess}
            token={token}/>
```

## 参数

| 参数         | 说明     | 类型    | 可选值      | 默认值   | 是否必填 |
| ----------  | ------ | -------| ---------- | -------- |-----|
| orderNo     | 订单号 | String[ ]  | - | - |是|
| token       | 请求需要带的token | String  | - | - | 是 |
| customClass       | 用户自定义class| String  | - | - | 否 |
| customStyle       | 用户自定义style| String  | - | - | 否 |

## 事件

| 事件名称 | 说明          | 返回参数  |  是否必填 |
|---------- |-------------- |---------- | ---- |
| onPayFail   | 支付失败的时候执行的方法| () => any  | 是 |
| onPaySuccess| 支付成功后执行的方法| () => any  | 是 |

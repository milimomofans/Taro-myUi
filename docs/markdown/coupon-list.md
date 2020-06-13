# CouponList 优惠券列表

---

优惠券列表

:::demo

```js
import { WtCouponList } from "water-ui";
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~water-ui/dist/style/components/coupon-list.scss";
```

:::

## 一般用法

说明：该组件为受控组件，通过传入 list 数据展示

```
<WtCouponList scene={1} list={couponList}>
</WtCouponList>
```

## 参数

| 参数          | 说明                 | 类型    | 可选值                                    | 默认值 |
| ------------- | -------------------- | ------- | ----------------------------------------- | ------ |
| scene         | 场景                 | Number  | 1-领券中心 2-支付成功页 3-每日福利 4-其它 | 4      |
| list          | 优惠券数组           | Array   | -                                         | []     |
| isJumped      | 是否允许跳转详情     | Boolean | -                                         | true   |
| isSelect      | 是否展示为选择优惠券 | Boolean | -                                         | false  |
| showCollapsed | 是否可折叠规则内容   | Boolean | -                                         | true   |
| isJumped      | 是否允许跳转详情     | Boolean | -                                         | true   |
| showBtn       | 是否展示列表项上按钮 | Boolean | -                                         | true   |

## 事件

| 事件名称 | 说明           | 返回参数        |
| -------- | -------------- | --------------- |
| onBtnClick | 按钮点击回调   | (coupon) => any |
| onRowClick | 列表项点击回调 | (coupon) => any |

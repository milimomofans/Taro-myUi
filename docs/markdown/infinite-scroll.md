# InfiniteScroll 无限滚动组件

---

可以快速自定义 无限滚动组件

:::demo

```js
import { WtInfiniteScroll } from "water-ui";

<WtInfiniteScroll
  isEmpty={isEmpty}
  loading={loading}
  hasMore={hasMore}
  customClass="container"
  onScrollToLower={this.loadMore}
  showFiller
>
  {list.map(item => (
    <Card data={item} />
  ))}
</WtInfiniteScroll>;
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~water-ui/dist/style/components/inifinite-scroll.scss";
```

:::

## 一般用法

说明：

- 该组件为受控组件，

## 参数

| 参数            | 说明                         | 类型    | 可选值 | 默认值 |
| --------------- | ---------------------------- | ------- | ------ | ------ |
| isEmpty         | 是否为空               | Boolean | -      | false  |
| loading           | 是否在加载中                         | Boolean  | -      | false      |
| hasMore | 后面是否还有更多                       | String  | -      | #333   |
| customStyle        | 自定义容器样式（可选）     | String | -      | -   |
| customClass        | 自定义容器class（可选）   | String | -      | -   |
| showFiller       | 是否展示 填充（可选）       | Boolean | -      | false   |
| showBtmFiller       | 是否展示 填充（可选）       | Boolean | -      | false   |
| lowerThreshold       | 滚动到距离底边多长触发onScrollToLower（可选）       | Number | -      | 80   |

## 事件

| 事件名称 | 说明                     | 返回参数   |
| -------- | ------------------------ | ---------- |
| onScrollToLower   | 滚动到底部触发     | () => void |

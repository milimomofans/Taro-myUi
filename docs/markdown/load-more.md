# LoadMore 用于下滑加载状态提示

---

下滑加载状态展示

:::demo

```js
import { WtLoadMore } from "water-ui";
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~water-ui/dist/style/components/wt-load-more.scss";
@import '~taro-ui/dist/style/components/loading.scss';
@import "~taro-ui/dist/style/components/activity-indicator.scss";

.at-loading__ring {
  border-color: #1bbc9c transparent transparent transparent;
}
```

:::

## 一般用法

说明：

- 该组件为受控组件
- 该组件的父元素必须显式指定宽度

```
<WtLoadMore
  status='noLoading'
/>
```

## 参数

| 参数             | 说明                             | 类型   | 可选值            | 默认值    |
| ---------------- | -------------------------------- | ------ | ----------------- | --------- |
| customStyle      | 自定义样式                       | String | -                 | -         |
| customImageStyle | 图片（noLoading 状态）自定义样式 | String | -                 | -         |
| imageUrl         | 图片地址（noLoading 状态）       | String | -                 | -         |
| status           | 状态                             | String | loading/noLoading | noLoading |

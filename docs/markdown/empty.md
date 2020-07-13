# Empty 小程序 内容为空提示 组件

---

内容为空提示组件

:::demo

```js
import { GlyEmpty } from "TaroGly";
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~TaroGly/dist/style/components/empty.scss";
```

:::

## 一般用法

说明：

- 该组件为受控组件

```
<GlyEmpty
  text='暂无数据'
  img='xxxxx'
</GlyEmpty>
```

## 参数

| 参数 | 说明     | 类型   | 可选值 | 默认值             |
| ---- | -------- | ------ | ------ | ------------------ |
| img  | 提示图片 | String | -      | -                 |
| text | 文字提示 | String | -      | 暂无数据 |

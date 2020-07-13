# TopBar 小程序自定义顶部导航

---

可以快速自定义 TopBar,暂不支持自定义按钮

:::demo

```js
import { GlyTopBar } from "TaroGly";

// 黑色背景，白色按钮，文字
<WtTopBar
  title="顶部导航1"
  isWhite
  backgroundColor="#000"
  onBack={this.onBack}
/>;
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~TaroGly/dist/style/components/top-bar.scss";
```

:::

## 一般用法

说明：

- 该组件为受控组件，

## 参数

| 参数            | 说明                                         | 类型    | 可选值 | 默认值 |
| --------------- | -------------------------------------------- | ------- | ------ | ------ |
| isWhite         | 按钮及字的颜色                               | Boolean | -      | false  |
| title           | 标题                                         | String  | -      | -      |
| backgroundColor | 背景色                                       | String  | -      | #333   |
| showBack        | 是否展示返回按钮（可选）                     | Boolean | -      | true   |
| showHome        | 是否展示返回首页按钮（可选）                 | Boolean | -      | true   |
| showTitle       | 是否展示 title（可选）                       | Boolean | -      | true   |
| showFilter      | 是否显示 filter（可选），为 false 则拉通背景 | Boolean | -      | true   |

## 事件

| 事件名称 | 说明                     | 返回参数   |
| -------- | ------------------------ | ---------- |
| onBack   | 点击返回按钮触发事件     | () => void |
| onHome   | 点击返回首页按钮触发事件 | () => void |

# ShareButton 小程序自定义分享按钮

---

ShareButton,暂不支持自定义按钮

:::demo

```js
import { WtShareButton } from "water-ui";

// 黑色背景，白色按钮，文字
<WtShareButton
          activityDescription="张三的活动"
          activityPrice="100元"
          codeDescription="二维码描述"
          themeColor="#0f0"
          codeUrl="https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png"
          activityUrl="https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png"
        >
         <Button>分享</Button>
        </WtShareButton>
```

:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo

```scss
@import "~water-ui/dist/style/components/share-button.scss";
```

:::

## 一般用法

说明：

- 该组件为受控组件，

## 参数

| 参数                | 说明       | 类型   | 可选值 | 默认值 |
| ------------------- | ---------- | ------ | ------ | ------ |
| activityDescription | 活动描述   | String | -      | -      |
| activityUrl         | 活动图片   | String | -      | -      |
| activityPrice       | 活动价格   | String | -      | -      |
| codeUrl             | 小程序码   | String | -      | -      |
| codeDescription     | 二维码描述 | String | -      | -      |
| themeColor          | 主题色     | String | -      | -      |

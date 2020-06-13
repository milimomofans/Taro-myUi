# ShareButton 小程序自定义分享按钮

---

ShareButton,暂不支持自定义按钮

:::demo

```js
import { WtShareButton } from "water-ui";

// 黑色背景，白色按钮，文字
<ShareButton
          activityPrice='￥100'
          activityDescription='活动描述描述描述描述描述描述'
          activityUrl='https://static-cms-api.qqmylife.com/WechatIMG569.jpeg'
          <Button>分享</Button>
        </ShareButton>
```


:::

## 一般用法

说明：

- 该组件为受控组件，

## 参数

| 参数                  | 说明                     | 类型    | 可选值 | 默认值 | 是否必填 |
| --------------------- | ------------------------ | ------- | ------ | ------ | -------- |
| activityDescription   | 活动描述                 | String  | -      | -      | 是       |
| activityUrl           | 活动图片链接             | String  | -      | -      | 是       |
| activityPrice         | 活动价格                 | String  | -      | -      | 是       |
| activityOriginalPrice | 活动原价                 | String  | -      | -      | 否       |
| pagePath              | 用户扫描二维码进入的页面 | String  | -      | -      | 是       |
| pageParams            | 页面的参数               | String  | -      | -      | 否       |
| children              | 子组件                   | String  | -      | -      | 是       |
| userDescription       | 用户头像旁描述           | String  | -      | -      | 否       |
| themeColor            | 主体色                   | String  | -      | -      | 否       |
| onCloseShareButton    | 用户点击关闭的回调函数   | Funtion | -      | -      | 否       |
| posterGenerateSuccess | 生成海报成功的回调       | Funtion | -      | -      | 否       |
| posterGenerateFail    | 生成海报失败的回调       | Funtion | -      | -      | 否       |


另外分享到朋友还需要做页面当中配置：

```js
 onShareAppMessage() {
    return {
      title: "标题",
      path: this.$router.path,
      imageUrl: poster_url
    }
  }
```

| 字段     | 类型                                                                                         | 说明                                        |
| -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| title    | 转发标题                                                                                     | 当前小程序名称                              |
| path     | 转发路径                                                                                     | `当前页面 path ，必须是以 / 开头的完整路径` |
| imageUrl | 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持 PNG 及 JPG 。显示图 | 片长宽比是 5:4                              |


## 当用户扫码进入页面时要对参数做判断处理

qs.parse()是将URL解析成对象的形式
qs.stringify()是将对象 序列化成URL的形式，以&进行拼接

```js
    let id = this.$router.params.id
    let scene: any = this.$router.params.scene
    if (scene) {
      scene = decodeURIComponent(scene)
      const obj = qs.parse(scene)
      id = obj.id
    }
```

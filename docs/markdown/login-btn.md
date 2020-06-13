# LoginBtn 小程序登陆按钮

---
快速获取手机号登陆

:::demo
```js
import { WtLoginBtn } from 'water-ui'
```
:::

**组件依赖的样式文件（仅按需引用时需要）**

:::demo
```scss
@import "~water-ui/dist/style/components/login-btn.scss";
@import "~taro-ui/dist/style/components/float-layout.scss";
```
:::

## 登录流程
在组件willmount的时候，会通过微信的wx.login来获取当前用户的code，然后拿上code去请求session，并将session储存在storage中，
详细操作请参考`components/login-btn/loginMethod`中的`getSession`方法

然后通过storage里是否有token，来检测用户是否登陆，如果已登陆，则调用业务传入方法，正常执行业务流程，如果未登录则：
1. 将当前用户需要点击的button的type替换为getuserinfo，唤起用户头像、昵称授权，调用后台接口，参考`components/login-btn/index.tsx`中的`getUserInfo`方法
2. 然后弹出弹窗，弹窗里有两个按钮，一个是手机号登录，一个是微信一键登录，微信一键登录的逻辑，请参考`components/login-btn/components/login_button/index.tsx`,
手机号登陆请参考`components/login-btn/components/login_phone/login_phone.tsx`
3. 登陆成功之后，继续执行用户在登陆前想要执行的操作
4. 如果是有token但是登陆过期的情况，你所在的主小程序中集成了个人中心分包，可以直接跳转`/personCenterSubpkg/pages/login/index`，如果没有集成个人中心分包，需自己做一个登陆页面

注意：登录成功之后，会在storage中保存以下字段：
1. `token`，即当登陆成功之后，后端返回的`access_token`
2. `userInfo`，登陆成功之后返回的所有字段，包括`access_token`,`token_type`,`expres_in`,`user_phone`,`user_avatar`,`user_nick`

## 一般用法

```
<WtLoginBtn source='ywl'
            onNormalClick={this.onLoginSuccess}
            onLoginBack={this.onLoginSuccess}
            onLoginFail={this.onLoginFail}>
      <View>点击登录</View>
</WtLoginBtn>
```

## 注意
1. 不管是主包、普通分包、独立分包都需要在`app.tsx`中找到`config`属性，在其中的`navigateToMiniProgramAppIdList`中加入`'wx5a3a7366fd07e119'`
```
config = {pages:['pages/index/index'],navigateToMiniProgramAppIdList:['wx5a3a7366fd07e119']}
```
2. 如果是独立分包，需要在独立分包中的`utils/subPkgLifeCycle.ts`中找到`Taro.onAppShow`方法，在其中加入如下代码
```
if (typeof(referrerInfo.extraData) !== "undefined" && referrerInfo.appId === 'wx5a3a7366fd07e119' && referrerInfo.extraData){
      Taro.setStorageSync('captchaTicketResult',referrerInfo.extraData)
    }
```
3. 如果是主包或普通分包，需要在`app.tsx`文件中找到`componentDidShow`方法,在其中加入如下代码
```
const { referrerInfo } = this.$router.params
if (typeof(referrerInfo.extraData) !== "undefined" && referrerInfo.appId === 'wx5a3a7366fd07e119' && referrerInfo.extraData) {
      Taro.setStorageSync('captchaTicketResult', referrerInfo.extraData)
    }
```
4. 登陆成功后，在storage中会储存用户信息和token，可以通过`Taro.getStorageSync('token');`和`Taro.getStorageSync('userInfo')`获取

## 参数

| 参数         | 说明     | 类型    | 可选值      | 默认值   | 是否必填 |
| ----------  | ------ | -------| ---------- | -------- | --------|
| source| 业务子类型| String  | - | 参考[此文档](https://docs.qq.com/sheet/DSVlQSHZVT3JYUlJE?c=A1A0B0)中的业务子类标识，下面也会列出业务类型 | 是 |
| className   | 登陆按钮的类名| String  | - | - | 否 |
| style       | 登陆按钮的style| String  | - | - | 否 |
| loginSuccess| 外部传入的是否登陆成功| Boolean  | - | false | 否 |

## 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| onNormalClick     | 已登陆后调用的方法 | () => any  |
| onLoginBack | 登陆成功之后调用 |  () => any    |
| onLoginFail | 登陆失败（用户拒绝授权）之后调用 | () => any   |

## 业务类型
- jq: 景区
- wf: 玩法
- dr: 达人
- yj: 游记
- wl: 玩乐
- lx: 礼信
- jd: 酒店
- mp: 门票
- ylp: 娱乐票
- ccp: 车船票
- yc: 演出
- ms: 美食
- xl: 线路
- ydfx: 分销商品
- ywl: 一部手机游武隆
- tc: 停车
- zb: 直播
- cx: 诚信
- ts: 投诉
- dy: 导游
- dyfx: 分销商品
- jjfw: 讲解服务
- grzc: 个人租车
- ycfx: 分销商品
- grbc: 个人包车
- dwbc: 单位包车
- dwdz: 单位短租
- dwcz: 单位长租
- gjxl: 公交线路
- djfw: 度假服务
- wyfwgd: 物业服务工单
- wyf: 物业费
- sqps: 社区配送
- bmwf: 便民服务
- zzwl: 住在武隆
- dj: 代驾
- yhq: 优惠券
- jf: 积分
- tdfx: 团队分销
- b2bfx: b2b分销
- qmfx: 全民分销
- dl: 导览

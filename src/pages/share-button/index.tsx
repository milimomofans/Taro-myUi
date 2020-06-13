import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
// import ShareButton from "../../components/taro-share-button";
import { WtShareButton,WtShareButtonStyleTwo } from "water-ui";
import "./index.scss";

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "分享按钮"
  };

  state = {
    img:
      "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png"
  };
  onShareAppMessage() {
    return {
      title: "分享",
      path: "/pages/share-button/index",
      imageUrl:
        "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png"
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  posterGenerateSuccess(detail) {
    console.log("画布生成成功", detail);
  }
  posterGenerateFail(e) {
    console.log("画布生成失败", e);
  }
  onBack() {
    Taro.showLoading();
    Taro.navigateBack().then(() => Taro.hideLoading());
  }

  render() {
    return (
      <View className="index">
        <WtShareButton
          activityDescription="张三的活动吾问无为谓"
          activityPrice="100元"
          codeDescription="二维码描述"
          themeColor="#d6b887"
          posterGenerateSuccess={this.posterGenerateSuccess.bind(this)}
          posterGenerateFail={this.posterGenerateFail.bind(this)}
          codeUrl="https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png"
          activityUrl="https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png"
        >
          <Button>分享1</Button>
        </WtShareButton>
        <WtShareButtonStyleTwo
          activityPrice='￥100'
          activityDescription='活动描述描述描述描述描述描述'
          pageUrlCode='https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png'
          activityUrl='https://static-cms-api.qqmylife.com/WechatIMG569.jpeg'>
          <Button>分享2</Button>
        </WtShareButtonStyleTwo>
      </View>
    );
  }
}

import Nerv from "nervjs";
import { Button, View, Image } from '@tarojs/components';
import Taro, { Component } from "@tarojs/taro-h5";
import TaroCanvasDrawer from "./taro-plugin-canvas/index";
import icons from './imgs';
import './index.scss';
import { defaultPosterConfig } from "./canvasConfig";
// 设定一个显示错误的图片
const erroPhotoUrl = 'https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201911061508/E3lnDHh13Ghc7sOOXr26NhWDIC1ct3807uJfepBy.png';
class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      config: {},
      posterUrl: "",
      canvasStatus: false,
      generatePosterStatus: false
    };
    this.posterConfig = defaultPosterConfig;
    // 调用绘画 => canvasStatus 置为true、同时设置config
  }
  async componentWillMount() {}
  async componentDidMount() {}
  async onShare(res) {
    // 判断用户是否已授权头像
    const isGetUserInfo = res.detail.errMsg.indexOf('ok');
    if (isGetUserInfo > -1) {
      this.setState({
        showModel: true,
        generatePosterStatus: false
      });
      Taro.showLoading({
        title: "绘制中..."
      });
      // 设置用户的昵称
      this.posterConfig.texts[0].text = res.detail.userInfo.nickName;
      // 设置用户的头像
      this.posterConfig.images[0].url = res.detail.userInfo.avatarUrl || erroPhotoUrl;
      //设置用户头像旁的描述
      this.posterConfig.texts[1].text = this.props.userDescription || '推荐你来看看这个';
      // 设置页面的二维码
      this.posterConfig.images[2].url = this.props.pageUrlCode || erroPhotoUrl;
      // 设置活动的图片
      this.posterConfig.images[1].url = this.props.activityUrl || erroPhotoUrl;
      // 设置活动的描述
      this.posterConfig.texts[2].text = this.props.activityDescription;
      // 设置活动的价格
      this.posterConfig.texts[3].text = this.props.activityPrice;
      // 设置价格的颜色
      this.posterConfig.texts[3].color = '#FF8A00';
      // 设置活动的原始价格
      if (this.props.activityOriginalPrice) {
        this.posterConfig.texts[4].text = this.props.activityOriginalPrice;
      } else {
        this.posterConfig.texts[4].opacity = 0;
        this.posterConfig.texts[4].textDecoration = 'none';
      }
      // 开始绘制
      this.canvasDrawFunc(this.posterConfig);
    } else {
      console.log('用户没有授权用户信息权限');
      await Taro.showModal({
        title: '提示',
        content: '生成海报需要获取用户头像',
        showCancel: false
      });
    }
  }
  onCancel() {
    this.setState({
      showModel: false
    });
    this.onCloseShareButton("关闭分享模态框");
  }
  onCloseShareButton(message) {
    const { onCloseShareButton } = this.props;
    if (onCloseShareButton) {
      onCloseShareButton(message);
    }
  }
  // 生成海报成功
  posterGenerateSuccess(result) {
    console.log(result);
    const { tempFilePath, errMsg } = result;
    if (errMsg === "canvasToTempFilePath:ok") {
      this.setState({
        posterUrl: tempFilePath,
        canvasStatus: false,
        generatePosterStatus: true,
        config: null
      }, () => {
        Taro.hideLoading();
      });
    } else {
      this.setState({
        canvasStatus: false,
        config: null
      }, () => {
        Taro.hideLoading();
      });
      Taro.showToast({ icon: "none", title: errMsg || "出现错误" });
      console.log(errMsg);
    }
    // 抛出给外部组件的回调
    const { posterGenerateSuccess } = this.props;
    if (posterGenerateSuccess) {
      posterGenerateSuccess(tempFilePath);
    }
  }
  posterGenerateFail(e) {
    Taro.hideLoading();
    this.setState({
      canvasStatus: false,
      config: null
    });
    console.log(e);
    const { posterGenerateFail } = this.props;
    if (posterGenerateFail) {
      posterGenerateFail(e);
    }
  }
  // 点击保存图片
  async onSavePoster(posterUrl) {
    try {
      await Taro.saveImageToPhotosAlbum({
        filePath: posterUrl
      });
      await Taro.showModal({
        title: '保存成功',
        content: '海报已经保存到您的相册，现在去相册找到图片发朋友圈吧',
        showCancel: false
      });
      this.onCancel();
    } catch (e) {
      const res = await Taro.showModal({
        title: '授权提示',
        content: '保存图片需要获取相册权限',
        confirmText: '授权',
        showCancel: false
      });
      if (res.confirm) {
        // 打开设置
        const resSetting = await Taro.openSetting();
        if (!resSetting.authSetting['scope.writePhotosAlbum']) {
          console.log('用户设置完成后还是没有授权相册');
        } else {
          console.log('用户相册授权成功');
          await Taro.saveImageToPhotosAlbum({
            filePath: posterUrl
          });
        }
      }
    }
  }
  onMovie(e) {
    e.stopPropagation();
  }
  render() {
    const { showModel } = this.state;
    return <View className="poster" onTouchMove={this.onMovie}>
        <Button className="children" openType="getUserInfo" onGetUserInfo={this.onShare.bind(this)}>
          {this.props.children}
        </Button>
        {showModel && <View className="content-share">
            <View className="top-bar"></View>
            <View className="poster">
              {this.state.generatePosterStatus && <Image className="share-image" src={this.state.posterUrl} mode="widthFix" lazy-load />}

              {this.state.canvasStatus && <View className="share-image">
                  <TaroCanvasDrawer config={this.state.config} // 绘制配置
            onCreateSuccess={this.posterGenerateSuccess.bind(this)} // 绘制成功回调
            onCreateFail={this.posterGenerateFail.bind(this)} // 绘制失败回调
            />
                </View>}

              {this.state.generatePosterStatus && <View className="close">
                 <Image className="image" onClick={this.onCancel.bind(this)} src={icons.closeIcon} />
               </View>}


            </View>

            <View className="share">
              <Button open-type="share" className="weixin">
                <Image className="image" src={icons.wechatIcon} />
                <View className="text">分享给微信朋友</View>
              </Button>
              <View className="line"></View>
              <Button className="friend" onClick={this.onSavePoster.bind(this, this.state.posterUrl)}>
                <Image className="image" src={icons.friendIcon} />
                <View className="text">保存分享海报</View>
              </Button>
            </View>
          </View>}
      </View>;
  }
  canvasDrawFunc = config => {
    this.setState({
      canvasStatus: true,
      config: config
    });
  };
}
ShareButton.options = { addGlobalClass: true };
export default ShareButton;
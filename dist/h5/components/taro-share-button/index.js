import Nerv from "nervjs";
import { Button, View, Image } from "@tarojs/components";
import Taro, { Component } from "@tarojs/taro-h5";
import icons from "./imgs";
import { defaultPosterConfig } from "./canvasConfig";
import { TaroCanvasDrawer } from "taro-plugin-canvas";
class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posterConfig: defaultPosterConfig,
      showModel: false,
      savePosterSuccess: false,
      showPoster: false,
      // 绘图配置文件
      config: null,
      // 生成的海报链接
      posterUrl: "",
      // 绘制的图片
      shareImage: null,
      // TaroCanvasDrawer 组件状态
      canvasStatus: false
    };
    // 调用绘画 => canvasStatus 置为true、同时设置config
  }
  componentWillMount() {}
  componentDidMount() {}
  // 点击生成海报
  async onSharaFriend({ detail }) {
    let tempObj = JSON.parse(JSON.stringify(this.state.posterConfig));
    tempObj.images[0].url = detail.userInfo.avatarUrl;
    tempObj.texts[0].text = detail.userInfo.nickName;
    this.setState({
      showPoster: true,
      showModel: false,
      posterConfig: tempObj
    }, () => {
      this.canvasDrawFunc(this.state.posterConfig);
    });
  }
  // 子组件点击
  onShare() {
    this.setState({
      showModel: true
    });
  }
  // 点击取消
  onCancel() {
    let tempObj = JSON.parse(JSON.stringify(this.state.posterConfig));
    tempObj.images[1].url = this.props.activityUrl;
    tempObj.texts[2].text = this.props.activityDescription;
    tempObj.texts[3].text = this.props.activityPrice;
    tempObj.images[2].url = this.props.codeUrl;
    tempObj.texts[5].text = this.props.codeDescription;
    tempObj.texts[3].color = this.props.themeColor;
    tempObj.texts[1].color = this.props.themeColor;
    tempObj.blocks[0].borderColor = this.props.themeColor;
    tempObj.images[0].borderColor = this.props.themeColor;
    tempObj.lines[0].color = this.props.themeColor;
    this.setState({
      posterConfig: tempObj,
      showModel: false,
      showPoster: false
    });
  }
  // 生成海报成功
  posterGenerateSuccess(result) {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === "canvasToTempFilePath:ok") {
      this.setState({
        posterUrl: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null
      });
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
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
  // 生成海报失败
  posterGenerateFail(e) {
    const { posterGenerateFail } = this.props;
    if (posterGenerateFail) {
      posterGenerateFail(e);
    }
  }
  // 保存海报
  async onSavePoster(posterUrl) {
    try {
      // 保存图片
      await Taro.saveImageToPhotosAlbum({
        filePath: posterUrl
      });
      this.setState({
        savePosterSuccess: true
      });
      this.onCancel();
      await Taro.showModal({
        title: "保存成功",
        content: "海报已经保存到您的相册，现在去相册找到图片发朋友圈吧",
        showCancel: false
      });
      console.log("保存到相册成功");
    } catch (e) {
      const res = await Taro.showModal({
        title: "授权提示",
        content: "保存图片需要获取相册权限",
        confirmText: "授权",
        showCancel: false
      });
      if (res.confirm) {
        // 打开设置
        const res1 = await Taro.openSetting();
        if (!res1.authSetting["scope.writePhotosAlbum"]) {
          this.setState({
            savePosterSuccess: false
          });
        } else {
          await Taro.saveImageToPhotosAlbum({
            filePath: posterUrl
          });
          this.setState({
            savePosterSuccess: true
          });
        }
      }
    }
  }
  render() {
    let { showModel, showPoster, savePosterSuccess } = this.state;
    return <View className="poster">
        <View className="children" onClick={this.onShare.bind(this)}>
          {this.props.children}
        </View>
        {showModel && <View className="content-share">
            <View className="share">
              <Button open-type="share" className="weixin">
                <Image className="image" src={icons.wechatIcon} />
                <View>分享给朋友</View>
              </Button>
              <Button className="friend" openType="getUserInfo" onGetUserInfo={this.onSharaFriend.bind(this)}>
                <Image className="image" src={icons.friendIcon} />
                <View>朋友圈海报</View>
              </Button>
            </View>
            <Button className="button" onClick={this.onCancel.bind(this)}>
              取消
            </Button>
          </View>}
        {showPoster && <View className="content-poster">
            <View className="poster" style={"top:30px;left:30px"}>
              <Image className="shareImage" src={this.state.posterUrl} mode="widthFix" lazy-load />
              {this.state.canvasStatus && <TaroCanvasDrawer config={this.state.config} // 绘制配置
          onCreateSuccess={this.posterGenerateSuccess.bind(this)} // 绘制成功回调
          onCreateFail={this.posterGenerateFail.bind(this)} // 绘制失败回调
          />}
            </View>
            <View className="share">
              {savePosterSuccess ? <Button onClick={this.onCancel.bind(this)} className="share-button">
                  去分享
                </Button> : <Button className="share-button" onClick={this.onSavePoster.bind(this, this.state.posterUrl)}>
                  保存图片
                </Button>}
            </View>
          </View>}
      </View>;
  }
  canvasDrawFunc = (config = this.state.posterConfig) => {
    this.setState({
      canvasStatus: true,
      config: config
    });
    Taro.showLoading({
      title: "绘制中..."
    });
  };
}
ShareButton.options = { addGlobalClass: true };
export default ShareButton;
import Nerv from "nervjs";
import { __decorate } from "tslib";
import { Image, View } from "@tarojs/components";
import Taro, { Component } from "@tarojs/taro-h5";
import bind from "bind-decorator";
import homePageMap from "utils/lib/page_map";
import icons from "./imgs";
const { homeBlackIcon, homeWhiteIcon, backBlackIcon, backWhiteIcon } = icons;
class TopBar extends Component {
  constructor() {
    super(...arguments);
    this.state = { hasBack: true, statusBarHeight: 20 };
    this.appidMap = {};
  }
  componentWillMount() {
    if (Taro.ENV_TYPE.WEAPP === Taro.getEnv()) {
      const pages = Taro.getCurrentPages(); // 获取当前页面信息栈
      const prevPage = pages[pages.length - 2]; // 获取上一个页面信息栈
      // console.log(pages, prevPage)
      if (!prevPage) {
        this.setState({ hasBack: false });
      }
      Taro.getSystemInfo().then(res => {
        const statusBarHeight = res.statusBarHeight;
        this.setState({ statusBarHeight });
      });
    }
  }
  back() {
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      Taro.navigateBack();
    }
  }
  get homePageUrl() {
    const { miniProgram } = Taro.getAccountInfoSync();
    const { appId } = miniProgram;
    const pageObj = homePageMap(appId);
    return pageObj.home;
  }
  goHome() {
    if (this.props.onHome) {
      this.props.onHome();
    } else {
      Taro.switchTab({ url: this.homePageUrl });
    }
  }
  clickTitle() {
    if (this.props.onTitleClick) {
      this.props.onTitleClick();
    }
  }
  render() {
    const { backgroundColor, title, isWhite, showBack, showHome, showTitle, showFilter, children, showChildren } = this.props;
    const { hasBack, statusBarHeight } = this.state;
    return <View id="topBarContainer">
        <View className="wt-top-bar" style={`background-color:${backgroundColor};padding-top:${statusBarHeight + "px"}`}>
          <View className="wt-icons">
            {showBack && hasBack && <Image className="wt-icon wt-back" src={isWhite ? backWhiteIcon : backBlackIcon} onClick={this.back} />}
            {showHome && <Image className="wt-icon wt-home" src={isWhite ? homeWhiteIcon : homeBlackIcon} onClick={this.goHome} />}
          </View>
          {showTitle && !showChildren && <View onClick={this.clickTitle} className="wt-title" style={`color:${isWhite ? "#FFF" : "#313131"}`}>
              {title}
            </View>}
          {showTitle && showChildren && <View onClick={this.clickTitle} className="wt-title" style={`color:${isWhite ? "#FFF" : "#313131"}`}>
              {children}
            </View>}
          <View className="wt-icons-filler" />
        </View>
        {showFilter && <View className="wt-filler" style={`height:${statusBarHeight + 44}px`} />}
      </View>;
  }
}
TopBar.options = { addGlobalClass: true };
TopBar.defaultProps = {
  showBack: true,
  showHome: true,
  showTitle: true,
  showFilter: true,
  showChildren: false,
  backgroundColor: "#333"
};
__decorate([bind], TopBar.prototype, "back", null);
__decorate([bind], TopBar.prototype, "goHome", null);
__decorate([bind], TopBar.prototype, "clickTitle", null);
export default TopBar;
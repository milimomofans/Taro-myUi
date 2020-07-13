import { Image, View } from "@tarojs/components";
import Taro, { Component } from "@tarojs/taro";
import bind from "bind-decorator";
import icons from "./imgs";
import '../../style/components/top-bar.scss'
const { homeBlackIcon, homeWhiteIcon, backBlackIcon, backWhiteIcon } = icons;

interface Props {
  backgroundColor: string;
  title: string;
  isWhite: boolean; // 按钮以及字的颜色
  showBack?: boolean;
  showHome?: boolean;
  showTitle?: boolean;
  showChildren?: boolean;
  showFilter: boolean;
  onBack?: () => void; // onBack 拦截器
  onHome?: () => void; // 点击回到首页拦截器
  onTitleClick?: () => void; // 点击title时触发
  children?: any; // 自定义title处的element
}

interface State {
  hasBack: boolean;
  statusBarHeight: number;
}

class TopBar extends Component<Props, State> {
  static options = { addGlobalClass: true };
  static defaultProps = {
    showBack: true,
    showHome: true,
    showTitle: true,
    showFilter: true,
    showChildren: false,
    backgroundColor: "#333"
  };
  state = { hasBack: true, statusBarHeight: 20 };

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

  @bind
  back() {
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      Taro.navigateBack();
    }
  }
  appidMap = {};
  get homePageUrl(): string {
    return '/pages/login/index';
  }
  @bind
  goHome() {
    if (this.props.onHome) {
      this.props.onHome();
    } else {
      Taro.switchTab({ url: this.homePageUrl });
    }
  }

  @bind
  clickTitle() {
    if (this.props.onTitleClick) {
      this.props.onTitleClick();
    }
  }

  render() {
    const {
      backgroundColor,
      title,
      isWhite,
      showBack,
      showHome,
      showTitle,
      showFilter,
      children,
      showChildren
    } = this.props;
    const { hasBack, statusBarHeight } = this.state;
    return (
      <View id="topBarContainer">
        <View
          className="wt-top-bar"
          style={`background-color:${backgroundColor};padding-top:${statusBarHeight +
            "px"}`}
        >
          <View className="wt-icons">
            {showBack && hasBack && (
              <Image
                className="wt-icon wt-back"
                src={isWhite ? backWhiteIcon : backBlackIcon}
                onClick={this.back}
              />
            )}
            {showHome && (
              <Image
                className="wt-icon wt-home"
                src={isWhite ? homeWhiteIcon : homeBlackIcon}
                onClick={this.goHome}
              />
            )}
          </View>
          {showTitle && !showChildren && (
            <View
              onClick={this.clickTitle}
              className="wt-title"
              style={`color:${isWhite ? "#FFF" : "#313131"}`}
            >
              {title}
            </View>
          )}
          {showTitle && showChildren && (
            <View
              onClick={this.clickTitle}
              className="wt-title"
              style={`color:${isWhite ? "#FFF" : "#313131"}`}
            >
              {children}
            </View>
          )}
          <View className="wt-icons-filler" />
        </View>
        {showFilter && (
          <View className="wt-filler" style={`height:${statusBarHeight + 44}px`} />
        )}
      </View>
    );
  }
}

export default TopBar;

import Nerv from "nervjs";
import { __decorate } from "tslib";
import '@tarojs/async-await';
import { Button, View } from '@tarojs/components';
import Taro, { Component } from "@tarojs/taro-h5";
import bind from 'bind-decorator';
import throttle from 'lodash/throttle';
import { AtFloatLayout } from 'taro-ui';
import getSession, { loginSuccessInit, loginStore, appid } from 'water-utils/lib/lib/loginMethod';
import LoginFloat from "./components/login_float/index";
import loginRequest from "./service/index";
class LoginBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      openFloat: false
    };
    this.getSession = throttle(async () => {
      const { onLoginBack } = this.props;
      if (loginStore) {
        await loginStore.getSession();
        // @ts-ignore
        const { access_token, expires_in } = loginStore.getNowSessionData() || {};
        // 如果有token  就表明无需再授权登录
        if (access_token) {
          loginSuccessInit({ access_token, expires_in });
          if (onLoginBack) {
            onLoginBack();
          }
        }
      }
    }, 1000);
  }
  async componentWillMount() {
    if (Taro.ENV_TYPE.WEAPP !== Taro.getEnv()) {
      return;
    }
  }
  // 获取头像
  async getUserInfo({ detail }) {
    const userDeny = detail.errMsg === 'getUserInfo:fail user deny' || detail.errMsg === 'getUserInfo:user deny' || detail.errMsg === 'getUserInfo:fail:user deny' || detail.errMsg === 'getUserInfo:fail auth deny';
    if (userDeny) {
      return false;
    }
    try {
      await Taro.showLoading({ title: '加载中...' });
      const sessionData = await getSession();
      const { encryptedData, iv } = detail;
      const { session_id } = sessionData;
      const nowUserInfo = await loginRequest['login/postUserInfo']({
        encrypt_data: encryptedData,
        iv,
        session_id,
        appid
      });
      Taro.setStorageSync('userInfo', nowUserInfo);
      this.setState({ openFloat: true });
    } finally {
      Taro.hideLoading();
    }
  }
  loginSuccessFn() {
    this.onFloatClose();
    if (this.props.onLoginBack) {
      this.props.onLoginBack();
    }
  }
  onFloatClose() {
    this.setState({ openFloat: false });
  }
  onNormalClick(e) {
    const { onNormalClick } = this.props;
    const nowClick = onNormalClick;
    if (nowClick) {
      nowClick(e);
    }
  }
  get nowLoginStatus() {
    return !!Taro.getStorageSync('token');
  }
  stopE(e) {
    e.stopPropagation();
  }
  render() {
    const { isLoading, openFloat } = this.state;
    const { className = '', style, loginSuccess } = this.props;
    const nowLoading = !loginStore.isEmpty() || isLoading;
    const nowLogin = this.nowLoginStatus || !!loginSuccess;
    if (!nowLogin) {
      this.getSession();
    }
    return <View className="login-btn-container" onClick={this.stopE}>
        <AtFloatLayout isOpened={openFloat} onClose={this.onFloatClose}>
          <LoginFloat source={this.props.source || 'ywl'} isOpenFloat={openFloat} onLoginSuccess={this.loginSuccessFn} />
        </AtFloatLayout>
        {nowLogin ? <Button className={`login-btn ${className}`} onClick={this.onNormalClick}>
                {this.props.children}
              </Button> : <Button openType="getUserInfo" onGetUserInfo={this.getUserInfo} loading={nowLoading} disabled={nowLoading} className={`login-btn ${className}`} style={style}>
                {this.props.children}
              </Button>}
      </View>;
  }
}
LoginBtn.options = {
  addGlobalClass: true
};
__decorate([bind], LoginBtn.prototype, "getUserInfo", null);
__decorate([bind], LoginBtn.prototype, "loginSuccessFn", null);
__decorate([bind], LoginBtn.prototype, "onFloatClose", null);
__decorate([bind], LoginBtn.prototype, "onNormalClick", null);
export default LoginBtn;
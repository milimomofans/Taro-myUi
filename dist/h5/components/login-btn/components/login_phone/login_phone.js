import Nerv from "nervjs";
import { Button, Input, Text, View } from '@tarojs/components';
import Taro, { Component } from "@tarojs/taro-h5";
import classNames from 'classnames';
import throttle from 'lodash/throttle';
import { postBehavior } from 'wl-analytics/dist';
import getWeSession, { appid, loginSuccessInit } from 'water-utils/lib/lib/loginMethod';
import { checkRules, handleError } from '../../utils/validator';
import loginPhoneStore from './login_phone_store';
import loginRequest from "../../service/index";
class LoginPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      error: {
        phone: {
          status: false,
          msg: ''
        },
        code: {
          status: false,
          msg: ''
        }
      },
      btnObj: {
        string: '获取验证码',
        class: 'item-right-button'
      },
      isFocus: false
    };
    this.timmer = undefined;
    this.time = 60;
    this.getMsg = throttle(async () => {
      // todo 更改获取方式
      const captchaTicketResult = Taro.getStorageSync('captchaTicketResult');
      if (captchaTicketResult) {
        const { ret, ticket, randstr } = captchaTicketResult;
        if (ret === 0) {
          if (loginPhoneStore.isGet) {
            return false;
          }
          try {
            await Taro.showLoading({ title: '加载中...' });
            const phone = Taro.getStorageSync('userPhone');
            const { session_id } = await getWeSession();
            await loginRequest['login/getCheckCode']({
              phone,
              tcaptcha_ticket: ticket,
              tcaptcha_randstr: randstr,
              session_id,
              tcaptcha: '2062664312',
              appid
            });
            this.setBtnString();
            loginPhoneStore.isGet = true;
            Taro.removeStorageSync('captchaTicketResult');
          } finally {
            Taro.hideLoading();
          }
        }
      }
    }, 3000);
  }
  handleChange(key, value) {
    const obj = {};
    obj[key] = value.target.value;
    this.setState(obj, () => this.check(key));
  }
  check(nowKey, errorFn) {
    // 默认规则
    const { phone, code, error } = this.state;
    const rules = [{
      value: phone,
      type: 'address',
      rules: [{ rule: 'required', msg: '请填写手机号码!' }, {
        rule: 'isMobile',
        msg: '请填写正确的手机号码，仅支持中国大陆手机号!'
      }]
    }, {
      value: code,
      type: 'code',
      rules: [{ rule: 'required', msg: '请填写验证码!' }]
    }];
    checkRules(rules, error, this, nowKey, errorFn);
  }
  // 获取验证码
  async getCheckCode(e) {
    if (this.state.btnObj.string !== '获取验证码') {
      return false;
    }
    if (!this.state.phone || this.state.phone.length < 11) {
      await Taro.showToast({ icon: 'none', title: '请检查电话号码的填写' });
      return false;
    }
    e.stopPropagation();
    Taro.setStorageSync('userPhone', this.state.phone);
    await this.toTCaptcha();
    loginPhoneStore.isGet = false;
  }
  // 跳转防水墙小程序
  async toTCaptcha() {
    await Taro.navigateToMiniProgram({
      appId: 'wx5a3a7366fd07e119',
      path: '/pages/captcha/index',
      extraData: {
        appId: '2062664312'
      }
    });
  }
  setBtnFn() {
    this.time -= 1;
    if (this.time > 0) {
      const btnObj = {
        class: classNames(['item-right-button', 'special']),
        string: this.time + '″重新获取'
      };
      this.setState({ btnObj });
    } else {
      clearInterval(this.timmer);
      this.timmer = null;
      this.time = 60;
      const btnObj = {
        class: classNames(['item-right-button']),
        string: '获取验证码'
      };
      this.setState({ btnObj });
    }
  }
  // 获取验证码后倒计时的方法
  setBtnString() {
    this.setBtnFn();
    this.timmer = setInterval(() => this.setBtnFn(), 1000);
  }
  // 登陆方法
  async userLogin() {
    try {
      await Taro.showLoading({ title: '加载中...' });
      const { phone, code } = this.state;
      const { session_id } = await getWeSession();
      const result = await loginRequest['login/login']({
        phone, code, session_id, appid, source: this.props.source
      });
      loginSuccessInit(result);
      // 记录用户行为数据
      postBehavior({
        app_id: this.props.source,
        act_code: 'login'
      });
      if (this.props.onSuccess) {
        this.props.onSuccess();
      }
      Taro.hideLoading();
    } catch (e) {
      const message = e === 'INVALID CODE' || e.code === 82400 ? '验证码错误' : '网络错误，请稍后再试';
      await Taro.showToast({ title: message, icon: 'none' });
      const { phone, code } = this.state;
      Taro.reportAnalytics('login', {
        requestment: {
          phone,
          code
        },
        error: e
      });
    }
  }
  async onSubmit() {
    this.check('', async () => {
      const { error } = this.state;
      const nowError = handleError(error);
      if (nowError) {
        await Taro.showToast({ icon: 'none', title: nowError.msg });
        return false;
      } else {
        await this.userLogin();
      }
    });
  }
  handleFocus() {
    this.setState({ isFocus: true });
  }
  handleBlur() {
    this.setState({ isFocus: false });
  }
  async componentDidShow() {
    Taro.setStorageSync('orderNeedReload', true);
    this.getMsg();
  }
  render() {
    const { phone, code, btnObj, isFocus } = this.state;
    const outerClass = isFocus ? 'login-main-form focus' : 'login-main-form';
    console.log(outerClass);
    return <View className={outerClass}>
        <View className="login-main-form-item">
          <Input onFocus={this.handleFocus} onBlur={this.handleBlur} className="item-right-input-item" onInput={this.handleChange.bind(this, 'phone')} value={phone} type="text" placeholder="输入手机号" placeholderClass="item-placeholder" />
          <Text className={btnObj.class} onClick={this.getCheckCode}>
            {btnObj.string}
          </Text>
        </View>
        <View className="login-main-form-item">
          <Input onFocus={this.handleFocus} onBlur={this.handleBlur} value={code} type="number" onInput={this.handleChange.bind(this, 'code')} className="item-right-input-item" placeholder="输入短信验证码" placeholderClass="item-placeholder" />
        </View>
        <Button className="login-confirm-button" onClick={this.onSubmit}>
          登录
        </Button>
      </View>;
  }
}
LoginPhone.options = {
  addGlobalClass: true
};
export default LoginPhone;
import '@tarojs/async-await'
import {Button, View} from '@tarojs/components'
import Taro, {Component} from '@tarojs/taro'
import bind from 'bind-decorator'
import throttle from 'lodash/throttle'
import {
  loginSuccessInit,
  loginStore,
  loginNotExpire
} from './loginMethod'

interface LoginBtn {
  props: {
    api: () => any // api实例
    onLoginBack?: () => any // 登录成功之后调用
    onLoginFail?: () => any // 登录失败调用
    onNormalClick?: (e) => void // 已登录调用2
    className?: string
    style?: any
    loginSuccess?: boolean
    children: any
  }
}

class LoginBtn extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props)
  }

  state = {
    isLoading: false
  }

  async componentWillMount() {
    if (Taro.ENV_TYPE.WEAPP !== Taro.getEnv()) {
      return
    }
    this.loginTimer()
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  timer: any = null

  getSession = throttle(async () => {
    const {onLoginBack} = this.props
    if (loginStore && this.props.api) {
      await loginStore.getSession(this.props.api)
      const {access_token, expires_in} = loginStore.getNowSessionData()
      // 如果有token  就表明无需再授权登录
      if (access_token) {
        loginSuccessInit({access_token, expires_in})
        if (onLoginBack) {
          onLoginBack()
        }
      }
    }
  },1000)

  loginTimer() {
    const remainTime = loginNotExpire()
    if (remainTime) {
      // 提前三秒结束
      const timerRemain = remainTime - 3000
      this.timer = setTimeout(() => {
        Taro.setStorageSync('token', '')
      }, timerRemain)
    }
  }

  // 直接调起登录接口完成登录
  getPhone = async res => {
    try {
      this.setState({isLoading: true})
      const userDeny =
        res.detail.errMsg === 'getPhoneNumber:fail user deny' ||
        res.detail.errMsg === 'getPhoneNumber:user deny' ||
        res.detail.errMsg === 'getPhoneNumber:fail:user deny'
      const {session_id} = loginStore.getNowSessionData()
      if (res.detail && !userDeny) {
        const {encryptedData, iv} = res.detail
        await this.props.api['login/postPhone']({
          session_id,
          iv,
          encrypt_data: encryptedData
        })
        const result = await this.props.api['login/loginByWechat']({
          session_id
        })
        Taro.setStorageSync('userInfo', result)
        loginSuccessInit(result)
        // 登录完成之后调取loginBack
        if (this.props.onLoginBack) {
          this.props.onLoginBack()
        }
      } else {
        if (this.props.onLoginFail) {
          this.props.onLoginFail()
        }
      }
    } catch (error) {
      Taro.reportAnalytics('login', {
        error
      })
      console.error(error)
    } finally {
      this.setState({isLoading: false})
    }
  }

  @bind
  onNormalClick(e) {
    const {onNormalClick} = this.props
    const nowClick = onNormalClick
    if (nowClick) {
      nowClick(e)
    }
  }

  get nowLoginStatus() {
    return !!Taro.getStorageSync('token')
  }

  render() {
    const {isLoading} = this.state
    const {className = '', style, loginSuccess} = this.props
    const nowLoading = !loginStore.isEmpty() || isLoading
    const nowLogin = this.nowLoginStatus || loginSuccess
    if (!nowLogin) {
      this.getSession()
    }
    return (
      <View className="login-btn-container">
        {nowLogin ? (
          <Button
            className={`login-btn ${className}`}
            onClick={this.onNormalClick}
          >
            {this.props.children}
          </Button>
        ) : (
          <Button
            loading={nowLoading}
            disabled={nowLoading}
            className={`login-btn ${className}`}
            style={style}
            open-type="getPhoneNumber"
            onGetPhoneNumber={this.getPhone.bind(this)}
          >
            {this.props.children}
          </Button>
        )}
      </View>
    )
  }
}

export default LoginBtn

import '@tarojs/async-await'
import { Button, View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import bind from 'bind-decorator'
import throttle from 'lodash/throttle'
import { AtFloatLayout } from 'taro-ui'
import getSession, {
  loginSuccessInit,
  loginStore, appid
} from 'water-utils/lib/lib/loginMethod'
import LoginFloat from './components/login_float'
import loginRequest from './service'

interface LoginBtn {
  props: {
    source: string // 业务子类标识
    env?:'production'| 'development' // 当前环境
    onLoginBack?: () => any // 登录成功之后调用
    onLoginFail?: () => any // 登录失败调用
    onNormalClick?: (e) => void // 已登录调用2
    className?: string
    style?: any
    loginSuccess?: boolean
    children: any
  },
  state: {
    isLoading: boolean
    openFloat: boolean
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
    isLoading: false,
    openFloat: false
  }

  async componentWillMount() {
    if (Taro.ENV_TYPE.WEAPP !== Taro.getEnv()) {
      return
    }
  }

  getSession = throttle(async () => {
    const { onLoginBack } = this.props
    if (loginStore) {
      await loginStore.getSession()
      // @ts-ignore
      const { access_token, expires_in } = loginStore.getNowSessionData() || {}
      // 如果有token  就表明无需再授权登录
      if (access_token) {
        loginSuccessInit({ access_token, expires_in })
        if (onLoginBack) {
          onLoginBack()
        }
      }
    }
  }, 1000)

  // 获取头像
  @bind
  async getUserInfo({ detail }) {
    const userDeny =
      detail.errMsg === 'getUserInfo:fail user deny' ||
      detail.errMsg === 'getUserInfo:user deny' ||
      detail.errMsg === 'getUserInfo:fail:user deny' ||
      detail.errMsg === 'getUserInfo:fail auth deny'
    if (userDeny) {
      return false
    }
    try{
      await Taro.showLoading({title:'加载中...'})
      const sessionData = await getSession()
      const { encryptedData, iv } = detail
      const { session_id } = sessionData
      const nowUserInfo = await loginRequest['login/postUserInfo']({
        encrypt_data: encryptedData,
        iv,
        session_id,
        appid
      })
      Taro.setStorageSync('userInfo', nowUserInfo)
      this.setState({ openFloat: true })
    }finally {
      Taro.hideLoading()
    }
  }

  @bind
  loginSuccessFn() {
    this.onFloatClose()
    if (this.props.onLoginBack) {
      this.props.onLoginBack()
    }
  }

  @bind
  onFloatClose() {
    this.setState({ openFloat: false })
  }

  @bind
  onNormalClick(e) {

    const { onNormalClick } = this.props
    const nowClick = onNormalClick
    if (nowClick) {
      nowClick(e)
    }
  }

  get nowLoginStatus() {
    return !!Taro.getStorageSync('token')
  }

  stopE(e){
    e.stopPropagation()
  }

  render() {
    const { isLoading, openFloat } = this.state
    const { className = '', style, loginSuccess } = this.props
    const nowLoading = !loginStore.isEmpty() || isLoading
    const nowLogin = this.nowLoginStatus || !!loginSuccess
    if (!nowLogin) {
      this.getSession()
    }
    return (
      <View className="login-btn-container" onClick={this.stopE}>
        <AtFloatLayout isOpened={openFloat} onClose={this.onFloatClose}>
          <LoginFloat source={this.props.source || 'ywl'} isOpenFloat={openFloat} onLoginSuccess={this.loginSuccessFn} />
        </AtFloatLayout>
        {
          nowLogin ?
            (
              <Button
                className={`login-btn ${className}`}
                onClick={this.onNormalClick}
              >
                {this.props.children}
              </Button>
            )
            :
            (
              <Button
                openType="getUserInfo"
                onGetUserInfo={this.getUserInfo}
                loading={nowLoading}
                disabled={nowLoading}
                className={`login-btn ${className}`}
                style={style}
              >
                {this.props.children}
              </Button>
            )
        }
      </View>
    )
  }
}

export default LoginBtn

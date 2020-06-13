import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import { loginStore, loginSuccessInit, appid } from 'water-utils/lib/lib/loginMethod'
import {postBehavior} from 'wl-analytics/dist'
import wechatIcon from './images/wechatIcon.png'
import phoneIcon from './images/phoneIcon.png'
import loginRequest from '../../service'


const LoginButtonComponent = ({ onLoginSuccess, onLoginFail, source }) => {
  async function getPhone(res) {
    try {
      const userDeny =
        res.detail.errMsg === 'getPhoneNumber:fail user deny' ||
        res.detail.errMsg === 'getPhoneNumber:user deny' ||
        res.detail.errMsg === 'getPhoneNumber:fail:user deny'
      const { session_id } = loginStore.getNowSessionData()
      if (res.detail && !userDeny) {
        await Taro.showLoading({ title: '加载中...' })
        const { encryptedData, iv } = res.detail
        await loginRequest['login/postPhone']({
          session_id,
          iv,
          encrypt_data: encryptedData,
          appid
        })
        const result = await loginRequest['login/loginByWechat']({
          session_id,
          appid,
          source
        })
        loginSuccessInit(result)
        // 记录用户行为数据
        postBehavior({
          app_id: source,
          act_code: 'login'
        });
        // 登录完成之后调取loginBack
        if (onLoginSuccess) {
          onLoginSuccess()
        }
      } else {
        if (onLoginFail) {
          onLoginFail()
        }
      }
    } catch (error) {
      Taro.reportAnalytics('login', {
        error
      })
      console.error(error)
    } finally {
      Taro.hideLoading()
    }
  }

  return (
    <View className="login-button-component-wrapper">
      <Button
        className="login-button-component-item"
        open-type="getPhoneNumber"
        onGetPhoneNumber={getPhone}
      >
        <Image src={wechatIcon} className="login-button-component-icon" />
        <View className="login-button-component-text">微信授权登录</View>
      </Button>
      <View className="login-button-component-item phone">
        <Image src={phoneIcon} className="login-button-component-icon" />
        <View className="login-button-component-text" onClick={onLoginFail}>手机验证码登录</View>
      </View>
    </View>
  )
}

LoginButtonComponent.options = {
  addGlobalClass: true
}

LoginButtonComponent.defaultProps = {
  onLoginSuccess: () => {
  },
  onLoginFail: () => {
  }
}
export default LoginButtonComponent

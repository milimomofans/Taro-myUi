import Taro, { useEffect, useState } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import LoginBtn from '../login_button/index'
import LoginPhone from '../login_phone/login_phone'
import titleIcon from './images/titleIcon.png'

const LoginFloat = ({ onLoginSuccess, isOpenFloat, source }) => {
  const [showPhone, setShowPhone] = useState<boolean>(false)
  useEffect(() => {
    if (!isOpenFloat) {
      setShowPhone(false)
    }
  }, [isOpenFloat, showPhone])

  const loginFail = () => {
    setShowPhone(true)
  }

  const loginSuccess = () => {
    setShowPhone(false)
    onLoginSuccess()
  }

  return (
    <View className='login-float-wrapper'>
      <View className='login-float-title'>
        <Image className='login-float-title-icon' src={titleIcon} />
        <View className='login-float-title-title'>一部手机游武隆</View>
      </View>
      {
        showPhone ?
          <LoginPhone onSuccess={loginSuccess} source={source} />
          :
          <LoginBtn onLoginFail={loginFail} onLoginSuccess={loginSuccess} source={source} />
      }
    </View>
  )
}

LoginFloat.options = {
  addGlobalClass: true
}

LoginFloat.defaultProps = {
  onLoginSuccess: () => {
  }
}

export default LoginFloat

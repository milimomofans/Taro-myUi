/**
 * created by frank on 2020/4/17
 */
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import LoginBtn from "@/Components/login-btn";

interface Props {

}

interface State {

}

class LoginButton extends Component<Props, State> {
  constructor(props) {
    super(props)
  }
  onLoginSuccess(){
    console.log('loginSuccess')
  }
  onLoginFail(){
    console.log('loginFail')
  }
  testfn(){
    console.log('testestsetr')
  }

  render(): any {
    return (
      <View className='login-button-wrapper' onClick={this.testfn}>
        <LoginBtn source='ywl'
                  onNormalClick={this.onLoginSuccess}
                  onLoginBack={this.onLoginSuccess}
                  onLoginFail={this.onLoginFail}>
          <View>点击登录</View>
        </LoginBtn>
      </View>
    )
  }
}

export default LoginButton

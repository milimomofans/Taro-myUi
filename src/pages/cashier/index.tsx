/**
 * created by frank on 2020/3/31
 */
import CashierComponent from "@/Components/cashier";
import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import bind from "bind-decorator";

interface Props {

}

interface State {

}

class Cashier extends Component<Props, State> {
  constructor(props) {
    super(props)
  }


  @bind
  onPayFail() {
    console.log('payFail')
  }

  @bind
  onPaySuccess() {
    console.log('paySuccess')
  }

  render(): any {
    const orderNO = ['2020052214070872343808']
    const access_token = Taro.getStorageSync('token')
    const token_type = 'bearer'
    const token = token_type + ' ' + access_token
    return (
      <View className="cashier-wrapper">
        <CashierComponent orderNo={orderNO}
          onPayFail={this.onPayFail}
          onPaySuccess={this.onPaySuccess}
          token={token}
        />
      </View>
    )
  }
}

export default Cashier

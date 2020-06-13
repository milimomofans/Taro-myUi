import Taro , { Component } from '@tarojs/taro';
import { View} from '@tarojs/components';
import {WtCollectItem} from 'water-ui'


export default class CollectItem extends Component {

   config = {
       navigationBarTitleText: ''
  }

  state={}

  componentWillMount () {}
  componentDidMount () {}
  componentWillReceiveProps () {}
  componentWillUnmount () {}
  componentDidShow () {}
  componentDidHide () {}
  componentDidCatchError () {}
  componentDidNotFound () {}
  render() {
    return (
      <View>
        <WtCollectItem></WtCollectItem>
      </View>
    );
  }
}

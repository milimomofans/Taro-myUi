import Taro , { Component } from '@tarojs/taro';
import { View,Image} from '@tarojs/components';
import './Avatar'

interface Props {
  nickUrl:string,
  nickName:string
}

export default class Avatar extends Component <Props>{

  constructor(props:Props){
    super(props)
  }

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
      <View className='avatar'>
        <Image className='img' src={this.props.nickUrl}></Image>
        <View className='name' >{this.props.nickName}</View>
      </View>
    );
  }
}

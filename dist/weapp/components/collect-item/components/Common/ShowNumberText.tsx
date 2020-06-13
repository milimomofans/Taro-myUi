import Taro , { Component } from '@tarojs/taro';
import { View} from '@tarojs/components';
import './ShowNumberText.scss'

interface Props {
  numberText:string
}

export default class ShowNumberText extends Component<Props> {

  constructor(props:Props){
    super(props)
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
      <View className='show-number-text'>{this.props.numberText}</View>
    );
  }
}

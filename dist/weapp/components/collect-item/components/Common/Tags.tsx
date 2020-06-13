import Taro , { Component } from '@tarojs/taro';
import { View} from '@tarojs/components';
import './Tags.scss'

interface Props{
  tagList:string[]
}

export default class Tags extends Component<Props> {

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
      <View className='tags'>
        {this.props.tagList.map(item =>{
          return <View className='tag'>{item}</View>
        })}
      </View>
    );
  }
}

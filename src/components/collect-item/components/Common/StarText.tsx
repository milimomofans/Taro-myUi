import { View} from '@tarojs/components';
import './StarText.scss'

interface Props{
  starNumber:number,
  text:string
}

export default function Title(props:Props){

  return <View className='star'>
    <View className='left'><View className='at-icon at-icon-star'></View></View>
    <View className='right'>{props.text}</View>
  </View>

}

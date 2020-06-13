import { View} from '@tarojs/components';
import './ShowPrice.scss'

interface Props{
  price:string,
}

export default function Title(props:Props){

  return <View className='price'>{props.price}</View>

}

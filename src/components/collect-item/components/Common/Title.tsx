import { View} from '@tarojs/components';
import './Title.scss'

interface Props{
  title:string,
}

export default function Title(props:Props){

  return <View className='title'>{props.title}</View>

}

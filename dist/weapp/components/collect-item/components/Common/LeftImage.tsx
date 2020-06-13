import { Image} from '@tarojs/components';
import './LeftImage.scss'

interface Props{
  imgUrl:string,
}

export default function Title(props:Props){

  return  <Image  className='img' src={props.imgUrl}></Image>

}

import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { Image } from '@tarojs/components';
import './LeftImage.scss';
export default class Title extends Taro.Component {
  render() {
    const props = this.props;

    return <Image className="img" src={props.imgUrl}></Image>;
  }

}
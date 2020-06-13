import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './ShowPrice.scss';
export default class Title extends Taro.Component {
  render() {
    const props = this.props;

    return <View className="price">{props.price}</View>;
  }

}
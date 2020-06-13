import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import './Title.scss';
export default class Title extends Taro.Component {
  render() {
    const props = this.props;

    return <View className="title">{props.title}</View>;
  }

}
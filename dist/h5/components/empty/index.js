import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text, Image } from "@tarojs/components";
import classNames from 'classnames';
import icon from "./imgs";
import '../../style/components/empty.scss';
export default class Empty extends Taro.Component {
  render() {
    const { text, img, customClass, customStyle } = this.props;
    const emptyImg = img || icon.emptyIcon;
    const nowClass = classNames(['comp-empty-container', customClass]);
    return <View className={nowClass} style={customStyle}>
        <Image className="comp-empty-img" src={emptyImg} />
        <Text className="comp-empty-txt">{text || "暂无数据"}</Text>
      </View>;
  }
}
Empty.options = {
  addGlobalClass: true
};
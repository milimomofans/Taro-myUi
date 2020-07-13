import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import classNames from 'classnames'
import icon from "./imgs";
import '../../style/components/empty.scss'

interface Props {
  text?: string;
  img?: string;
  customClass?: string
  customStyle?: any
}

export default class Empty extends Component<Props> {
  static options = {
    addGlobalClass: true
  }
  
  render() {
    const { text, img, customClass, customStyle} = this.props;
    const emptyImg = img || icon.emptyIcon;
    const nowClass = classNames(['comp-empty-container', customClass])
    return (
      <View className={nowClass} style={customStyle}>
        <Image className="comp-empty-img" src={emptyImg} />
        <Text className="comp-empty-txt">{text || "暂无数据"}</Text>
      </View>
    );
  }
}

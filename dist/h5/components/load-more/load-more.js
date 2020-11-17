import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import '../../style/components/load-more.scss';
export default class LoadMore extends Taro.Component {
  render() {
    const { customStyle, status } = this.props;

    return <View className="load-more-wrapper" style={customStyle}>
      {status === "loading" && <View>
          <AtActivityIndicator isOpened />
        </View>}
      {status === "noLoading" && <View className="noMore">已经到底啦</View>}
    </View>;
  }

}
LoadMore.defaultProps = {
  status: "noLoading"
};
LoadMore.options = {
  addGlobalClass: true
};
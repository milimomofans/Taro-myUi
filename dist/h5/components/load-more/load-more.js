import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
export default class LoadMore extends Taro.Component {
  render() {
    const { customStyle, status } = this.props;

    return <View className="load-more-wrapper" style={customStyle}>
      {status === "loading" && <View>
          <AtActivityIndicator isOpened />
        </View>}
      {status === "noLoading" && <View>没有更多了~</View>}
    </View>;
  }

}
LoadMore.defaultProps = {
  status: "noLoading"
};
LoadMore.options = {
  addGlobalClass: true
};
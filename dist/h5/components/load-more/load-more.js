import Taro from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import '../../style/components/load-more.scss';
export default class LoadMore extends Taro.Component {
  render() {
    const { customStyle, status, noMoreTitle } = this.props;

    return <View className="load-more-wrapper" style={customStyle}>
      {status === "loading" && <View>
          <AtActivityIndicator isOpened />
        </View>}
      
    </View>;
  }

}
LoadMore.defaultProps = {
  status: "noLoading",
  noMoreTitle: "已经到底啦"
};
LoadMore.options = {
  addGlobalClass: true
};
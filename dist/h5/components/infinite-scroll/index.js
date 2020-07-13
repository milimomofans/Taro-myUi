import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { ScrollView, View } from "@tarojs/components";
// import { AtLoadMore } from "taro-ui"; // 之后看是否抄到water-ui里面
import classNames from "classnames";
import WtLoadMore from "../load-more/load-more";
import '../../style/components/inifinite-scroll.scss';
class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
  }
  onScrollToLower() {
    this.props.onScrollToLower();
  }
  render() {
    const { isEmpty, loading, hasMore, customClass, showFiller, lowerThreshold, showBtmFiller } = this.props;
    const coverClass = classNames([customClass, "scrollview"]);
    const customStyle = this.props.customStyle || "";
    return <ScrollView className={coverClass} scrollY scrollWithAnimation style={"height: 100vh;" + customStyle} scrollTop={0} lowerThreshold={lowerThreshold ? lowerThreshold : 80} onScrollToLower={this.onScrollToLower}>
        {showFiller && <View className="infinite-scroll-filler" />}
        {this.props.children}
        <WtLoadMore status={loading ? "loading" : "noLoading"} />
        {showBtmFiller && !hasMore && !isEmpty && <View className="no-more" />}
      </ScrollView>;
  }
}
InfiniteScroll.defaultProps = {
  showFiller: false
};
InfiniteScroll.options = {
  addGlobalClass: true
};
export default InfiniteScroll;
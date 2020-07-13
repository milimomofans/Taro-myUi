import Taro, { Component } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
// import { AtLoadMore } from "taro-ui"; // 之后看是否抄到water-ui里面
import classNames from "classnames";
import WtLoadMore from "../load-more/load-more";

interface ComponentProps {
  isEmpty: boolean;
  loading: boolean;
  hasMore: boolean;
  customStyle?: any;
  customClass?: string;
  lowerThreshold?: number;
  onScrollToLower: () => void;
  showFiller?: boolean;
  showBtmFiller?: boolean;
  noWl?:boolean
}

class InfiniteScroll extends Component<ComponentProps> {
  static defaultProps = {
    showFiller: false,
  };

  constructor(props) {
    super(props);
  }

  static options = {
    addGlobalClass: true,
  };

  onScrollToLower() {
    this.props.onScrollToLower();
  }

  render() {
    const {
      isEmpty,
      loading,
      hasMore,
      customClass,
      showFiller,
      lowerThreshold,
      showBtmFiller
    } = this.props;
    const coverClass = classNames([customClass, "scrollview"]);
    const customStyle = this.props.customStyle || "";
    return (
      <ScrollView
        className={coverClass}
        scrollY
        scrollWithAnimation
        style={"height: 100vh;" + customStyle}
        scrollTop={0}
        lowerThreshold={lowerThreshold ? lowerThreshold : 80}
        onScrollToLower={this.onScrollToLower}
      >
        {showFiller && <View className="infinite-scroll-filler" />}
        {this.props.children}
        <WtLoadMore status={loading ? "loading" : "noLoading"} />
        {showBtmFiller && !hasMore && !isEmpty && <View className="no-more" />}
      </ScrollView>
    );
  }
}

export default InfiniteScroll;

import Taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import '../../style/components/load-more.scss'

interface Props {
  customStyle?: string;
  status: "loading" | "noLoading";
}

export default function LoadMore({
  customStyle,
  status
}: Props) {
  return (
    <View className="load-more-wrapper" style={customStyle}>
      {status === "loading" && (
        <View>
          <AtActivityIndicator isOpened />
        </View>
      )}
      {status === "noLoading" && <View className='noMore'>没有更多了...</View>}
    </View>
  );
}
LoadMore.defaultProps = {
  status: "noLoading"
};
LoadMore.options = {
  addGlobalClass: true
};

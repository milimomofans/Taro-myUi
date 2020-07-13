import Taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";

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
      {status === "noLoading" && <View>没有更多了~</View>}
    </View>
  );
}
LoadMore.defaultProps = {
  status: "noLoading"
};
LoadMore.options = {
  addGlobalClass: true
};

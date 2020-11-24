import Taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import '../../style/components/load-more.scss'

interface Props {
  customStyle?: string;
  status: "loading" | "noLoading";
  noMoreTitle?:string
}

export default function LoadMore({
  customStyle,
  status,
  noMoreTitle
}: Props) {
  return (
    <View className="load-more-wrapper" style={customStyle}>
      {status === "loading" && (
        <View>
          <AtActivityIndicator isOpened />
        </View>
      )}
      {/* {status === "noLoading" && <View className='noMore'>{noMoreTitle}</View>} */}
    </View>
  );
}
LoadMore.defaultProps = {
  status: "noLoading",
  noMoreTitle:"已经到底啦"
};
LoadMore.options = {
  addGlobalClass: true
};

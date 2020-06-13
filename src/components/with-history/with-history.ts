import Taro from "@tarojs/taro";
import postHistory from "wl-analytics/dist/api/post_history";
import dayjs from "dayjs";
import qs from "qs";

export default function withHistory(obj: {
  app_id: string; // 业务子类标示 https://docs.qq.com/sheet/DSVlQSHZVT3JYUlJE?tab=BB08J2&c=L8E0B0
  obj_type: string;
}) {
  const { app_id, obj_type } = obj;
  return (WrapComponent: any): any => {
    class History extends WrapComponent {
      constructor(props) {
        super(props);
      }
      history_start = "";
      componentWillMount() {
        // this.start = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        if (super.componentWillMount) {
          super.componentWillMount();
        }
      }
      paramPath() {
        const { path, params } = this.$router;
        return `${path}${qs.stringify(params) ? "?" : ""}${qs.stringify(
          params
        )}`;
      }
      componentDidShow() {
        this.history_start = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const storageNow = Taro.getStorageSync("nowPage");
        // const storagePre = Taro.getStorageSync('prePage')
        const nowPath = this.paramPath();
        if (!storageNow) {
          Taro.setStorageSync("nowPage", nowPath);
        } else if (storageNow && storageNow !== nowPath) {
          Taro.setStorageSync("nowPage", nowPath);
          Taro.setStorageSync("prePage", storageNow);
        }
        if (super.componentDidShow) {
          super.componentDidShow();
        }
      }
      postHistory() {
        const now = Taro.getStorageSync("nowPage");
        const pre = Taro.getStorageSync("prePage");
        const start = this.history_start;
        postHistory(
          {
            app_id,
            obj_type,
            in_time: start,
            pre_url: pre,
            now_url: now,
            obj_title: this.objTitle,
            obj_id: this.objId
          },
          process.env.NODE_ENV === "production"
        );
      }
      componentWillUnmount() {
        this.postHistory();
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
      }
      componentDidHide() {
        this.postHistory();
        if (super.componentDidHide) {
          super.componentDidHide();
        }
      }
      render() {
        return super.render();
      }
    }
    return History;
  };
}

import Taro from "@tarojs/taro";
import "./style/index.scss";
import "./style/themes/red.scss";
import "./style/themes/purple.scss";

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} });

export { default as WtTopBar } from "./components/top-bar/index";
export { default as WtLoginBtn } from "./components/login-btn/index";
export { default as WtDyLoginBtn } from "./components/dy-login-btn/index";
export { default as WtInfiniteScroll } from "./components/infinite-scroll/index";
export { default as WtShareButton } from "./components/taro-share-button/index";
export { default as WtShareButtonStyleTwo } from "./components/share-button-style-two/index";
export { default as WtCouponList } from "./components/coupon-list/index";
export { default as WtCouponSelect } from "./components/coupon-select/index";
export { default as WtEmpty } from "./components/empty/index";
export { default as WtAddress } from "./components/address/index";
export { default as WtCollectItem } from "./components/collect-item/index";
export { default as WtCashier } from "./components/cashier/index";
export { default as WtWithHistory } from "./components/with-history/with-history";
export { default as WtLoadMore } from "./components/load-more/load-more";
export { default as WtqmfxShareButton } from './components/qmfxShareButton/shareButton'

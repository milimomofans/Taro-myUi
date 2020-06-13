import Taro from "@tarojs/taro";

Taro.initPxTransform({
  designWidth: 750
});

export {
  // eslint-disable-next-line import/prefer-default-export
  default as WtTopBar
} from "./components/top-bar/index";

export { default as WtInfiniteScroll } from "./components/infinite-scroll/index";

export { default as WtLoginBtn } from "./components/login-btn/index";

export { default as WtDyLoginBtn } from "./components/dy-login-btn/index";

export { default as WtShareButton } from "./components/taro-share-button/index";

export { default as WtCouponList } from "./components/coupon-list/index";

export { default as WtCouponSelect } from "./components/coupon-select/index";

export { default as WtEmpty } from "./components/empty/index";

export { default as WtAddress } from "./components/address/index";
export { default as WtCollectItem } from "./components/collect-item/index";
export {default as WtShareButtonStyleTwo} from './components/share-button-style-two/index'

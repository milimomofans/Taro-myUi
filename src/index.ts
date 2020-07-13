import Taro from "@tarojs/taro";
import "./style/index.scss";
import "./style/themes/red.scss";
import "./style/themes/purple.scss";

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} });

export { default as GlyTopBar } from "./components/top-bar/index";
export { default as GlyInfiniteScroll } from "./components/infinite-scroll/index";
export { default as GlyEmpty } from "./components/empty/index";
export { default as GlyLoadMore } from "./components/load-more/load-more";
export { default as Cqaddress } from './components/Cqaddress/index';
export { default as Accordion } from './components/Accordion/index';
export { default as Glyinput } from './components/inputAccordition/index';
export { default as GlyError } from './components/Cqerror/index';

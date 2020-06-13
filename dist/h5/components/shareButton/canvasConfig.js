import { canvasBg } from './imgs';
const themeColor = "#f00";
const defaultPosterConfig = {
  width: 702,
  height: 1000,
  // backgroundColor: "#fff",
  pixelRatio: 1,
  debug: true,
  blocks: [{
    x: 30,
    y: 30,
    width: 642,
    height: 900,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 20,
    zIndex: 2
  }],
  texts: [{
    fontSize: 26,
    color: "#606060",
    width: 582,
    zIndex: 10,
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    x: 60,
    y: 540,
    text: "分享商品:",
    lineNum: 1
  }, {
    fontSize: 36,
    color: "#0D0D0D",
    width: 582,
    zIndex: 10,
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 500,
    x: 60,
    y: 588,
    text: "重庆武隆山3天2夜的完美耍法",
    lineNum: 1
  }, {
    fontSize: 36,
    color: "#FF5567",
    zIndex: 10,
    fontFamily: "PingFangSC-Semibold,PingFang SC",
    fontWeight: 600,
    x: 60,
    y: 648,
    text: "￥200.00"
  }, {
    fontSize: 24,
    color: "#ACACAC",
    zIndex: 10,
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    x: 234,
    y: 648,
    text: "￥400.00",
    textDecoration: "line-through"
  }, {
    fontSize: 30,
    color: "#0D0D0D",
    zIndex: 10,
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    x: 66,
    y: 792,
    text: "长按或扫描二维码"
  }, {
    fontSize: 30,
    color: "#0D0D0D",
    zIndex: 10,
    fontFamily: "PingFangSC-Regular,PingFang SC",
    fontWeight: 400,
    x: 66,
    y: 842,
    text: "识别小程序，查看详情"
  }],
  images: [{
    url: canvasBg,
    width: 702,
    height: 1000,
    x: 0,
    y: 0,
    zIndex: 1
  }, {
    url: "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png",
    width: 582,
    height: 436,
    y: 60,
    x: 60,
    borderColor: themeColor,
    zIndex: 10
  }, {
    url: "https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png",
    width: 216,
    height: 216,
    y: 694,
    x: 420,
    zIndex: 10
  }]
};
export { defaultPosterConfig };
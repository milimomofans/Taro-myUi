import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './ScenicCollectItem.scss';
import Tags from '../Common/Tags';
import Title from '../Common/Title';
import LeftImage from '../Common/LeftImage';
export default class ScenicCollectItem extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  componentDidNotFound() {}
  render() {
    return <View className="scenic-item">
          <LeftImage imgUrl={`https://qqmylife-dev-1251517655.file.myqcloud.com/console/20200331/ts0IR/31a4186e33345fa206bca6f5ac8fc641`}></LeftImage>
        <View className="content">
        <View className="title"><Title title={`武隆天生三桥(5A)`}></Title></View>
        <View className="tags"> <Tags tagList={['旅游', '体验', '科技展']}></Tags></View>



        </View>

      </View>;
  }
}
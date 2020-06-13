import Nerv from "nervjs";
// 活动的收藏组件
import { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './ActivityCollectItem.scss';
import Tags from '../Common/Tags';
import Title from '../Common/Title';
import LeftImage from '../Common/LeftImage';
import ShowPrice from '../Common/ShowPrice';
import ShowNumberText from '../Common/ShowNumberText';
export default class ActivityCollectItem extends Component {
  constructor(props) {
    super(props);

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
    return <View className="activity-item">
           <LeftImage imgUrl={`https://qqmylife-dev-1251517655.file.myqcloud.com/console/20200331/ts0IR/31a4186e33345fa206bca6f5ac8fc641`}></LeftImage>
        <View className="content">
        <Title title={`武隆乌江名俗文化陈列馆展览1`}></Title>
        <Tags tagList={['旅游', '体验', '科技展']}></Tags>
          <View className="price">
            <ShowPrice price="￥300"></ShowPrice>
            <ShowNumberText numberText="209人报名"></ShowNumberText>
          </View>
        </View>
      </View>;
  }
  config = {
    navigationBarTitleText: ''
  };
}
import Nerv from "nervjs";
// 玩法收藏组件
import { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './TravleCollectItem.scss';
import Avatar from '../Common/Avatar';
import ShowNumberText from '../Common/ShowNumberText';
import Title from '../Common/Title';
import LeftImage from '../Common/LeftImage';
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
        <View className="price">
            <Avatar nickName="骡子姐姐" nickUrl="https://qqmylife-dev-1251517655.file.myqcloud.com/console/20200331/ts0IR/31a4186e33345fa206bca6f5ac8fc641"></Avatar>
            <ShowNumberText numberText={`2019.12.23`}></ShowNumberText>
          </View>
         <Title title={`武隆乌江名俗文化陈列馆展览`}></Title>
         <View className="price">
         <ShowNumberText numberText={`老于家烤面等6家店`}></ShowNumberText>
            <ShowNumberText numberText={`120人浏览`}></ShowNumberText>
          </View>
        </View>
      </View>;
  }
  config = {
    navigationBarTitleText: ''
  };
}
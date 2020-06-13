import Nerv from "nervjs";
// 玩法收藏组件
import { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './PlayCollectItem.scss';
import Avatar from '../Common/Avatar';
import Tags from '../Common/Tags';
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
         <Title title={`武隆乌江名俗文化陈列馆展览`}></Title>
          <Tags tagList={['旅游', '体验', '科技展']}></Tags>
          <View className="price">
            <Avatar nickName="骡子姐姐" nickUrl="https://qqmylife-dev-1251517655.file.myqcloud.com/console/20200331/ts0IR/31a4186e33345fa206bca6f5ac8fc641"></Avatar>
            <ShowNumberText numberText={`201人浏览`}></ShowNumberText>
          </View>
        </View>
      </View>;
  }
  config = {
    navigationBarTitleText: ''
  };
}
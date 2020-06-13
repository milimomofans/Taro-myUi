import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import ActivityCollectItem from './components/ActivityCollectItem/ActivityCollectItem';
import PlayCollectItem from './components/PlayCollectItem/PlayCollectItem';
import ScenicCollectItem from './components/ScenicCollectItem/ScenicCollectItem';
import TravleCollectItem from './components/TravleCollectItem/TravleCollectItem';
export default class CollectItem extends Component {
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
    return <View>
          <ActivityCollectItem></ActivityCollectItem>
          <PlayCollectItem></PlayCollectItem>
          <ScenicCollectItem></ScenicCollectItem>
          <TravleCollectItem></TravleCollectItem>
      </View>;
  }
  config = {
    navigationBarTitleText: ''
  };
}
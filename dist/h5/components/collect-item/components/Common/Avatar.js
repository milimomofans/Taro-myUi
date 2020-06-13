import Nerv from "nervjs";
import { Component } from "@tarojs/taro-h5";
import { View, Image } from '@tarojs/components';
import './Avatar';
export default class Avatar extends Component {
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
    return <View className="avatar">
        <Image className="img" src={this.props.nickUrl}></Image>
        <View className="name">{this.props.nickName}</View>
      </View>;
  }
  config = {
    navigationBarTitleText: ''
  };
}
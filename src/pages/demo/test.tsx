import { TransProps } from '@/Typings/index'
import { Button, Text, View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import Taro, { Component, Config } from '@tarojs/taro'
import { ComponentType } from 'react'
import _ from 'dayjs'
import './index.scss'
import {WtqmfxShareButton} from 'qmfxShare'
import api from '../../utils/api'

interface PageStateProps extends TransProps {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
    trans: (e) => {}
  }
}

interface Index {
  props: PageStateProps
}

@inject('counterStore')
@observer
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {
    console.log(_)
  }

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }
  changeLng = () => {
    this.props.trans.changeLang('en')
    this.forceUpdate()
    // Taro.reLaunch({ url: '/pages/index/index' })
  }

  onTransform(){
    let {test} = this.state
    return api['poster/poster']({goodsid:test})
  }

  onPosterGenerateSuccess(){
    console.log('生成海报成功')
  }

  onPosterGenerateFail(err){
    console.log('生成海报失败')
  }

  onShareAppMessage(e){
    if(e.from == 'button'){
      return this.shareRef.getShareData()
    }
  }

  shareRef = {}


  nav = () => {
    Taro.navigateTo({ url: '/subPackageI18n/pages/i18n/i18n' })
  }
  render() {
    const {
      counterStore: { counter }
    } = this.props
    console.log(this.props.counterStore)
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.changeLng}>Add Async</Button>
        <Button className='asdf' onClick={this.nav}>
          跳转分包
        </Button>
        <Text>{counter}</Text>
        <WtqmfxShareButton 
          onShareFunc={this.onTransform.bind(this)} 
          posterGenerateSuccess={this.onPosterGenerateSuccess.bind(this)}
          posterGenerateFail={this.onPosterGenerateFail.bind(this)}
          goodsPic='https://test-static.trip.wlkst.com/book/1EAD12A5-C97D-1ADA-7A6A.png'
          goodsPrice={150}
          goodsLinePrice={0.3}
          goodsTitle='测试测试测试测试'
          ref={ (node)=>{this.shareRef = node} }
        >
          <View>点击转链</View>
        </WtqmfxShareButton>
      </View>
    )
  }
}

export default Index as ComponentType

import { Button, View } from '@tarojs/components'
import Taro, { Component, Config } from '@tarojs/taro'
import api from '../../utils/api'
import ShareButton from '../../components/shareButton/shareButton';


export default class Demo extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '分包页面',
    disableScroll: true,
    navigationStyle:'custom'
  }

  state = {
    test:'123'
  }

  componentWillMount() {
    // api['poster|poster']().then(_r=>{
    //   console.log(_r)
    //  })
    console.log(api)
  }

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  
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

  render() {
    return (
      <View className='index'>
        <ShareButton 
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
        </ShareButton>
      </View>
    )
  }
}


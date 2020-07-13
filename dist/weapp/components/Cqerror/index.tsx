import Taro, { Component, Config, getCurrentPages } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import {errorIcon} from './img'

interface Props {
    msg?:string
    img?:string
    onCallBack?:()=>void
}

export default class Index extends Component <Props,{}>{
    
    static defaultProps = {
        msg:'',
        img:''
    }

    onReload(){
        let {onCallBack} = this.props
        if(onCallBack){
            onCallBack()
        }else{
            console.error('未传入回调函数')
        }
    }

    onBack(){
        let page = Taro.getCurrentPages()
        if(page.length == 1){ //只有一页的数据
            Taro.reLaunch({
                url:'/pages/home/index'
            })
        }else{
            Taro.navigateBack()
        }
    }

    render(){
        let {
            img,
            msg
        } = this.props
        
        img = img ? img : errorIcon
        msg = msg ? msg : '网络出错啦，请重新加载'

        return (
            <View>
                <Image className='__error_img' src={img} mode='widthFix'/>
                <View className='__error_title'>{msg}</View>
                <Button className='__error_btn' onClick={this.onReload.bind(this)}>重新加载</Button>
                <Button className='__error_btn' onClick={this.onBack.bind(this)}>返回上一页</Button>
            </View>
        )
        
    }
}
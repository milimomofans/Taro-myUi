import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
import {addIcon,locationIcon} from './img'

interface Props {
    name?:string
    mobile?:string
    location?:string
    street?:string
    onCallBack?:()=>void
}

export default class Index extends Component <Props,{}> {
    static defaultProps = {
        name:'',
        mobile:'',
        location:'',
        street:''   
    }

    state = {

    }
    
    oncallBack(){
        let {onCallBack} = this.props
        if(onCallBack && typeof onCallBack == 'function'){
            try{
                onCallBack()
            }catch(err){
                console.error(`方法调用失败${err}`)
            }
        }else{
            return
        }
    }

    render(){
        const {
            name,
            mobile,
            location,
            street,
            onCallBack
        } = this.props
        return (
            <View className='container' onClick={this.oncallBack.bind(this)}>
                {
                    name && location ?
                    (
                        <View className='__display'>
                            <Image src={locationIcon} />
                            <View className='__display_info'>
                                <View className='__display_info_top'>
                                    <Text style='margin-right:40rpx'>{name}</Text>
                                    <Text>{mobile}</Text>
                                </View>
                                <View className='__display_info_bottom'>
                                    <Text className='__def'>默认</Text>
                                    <Text style='margin-right:5rpx'>{location}</Text>
                                    <Text>{street}</Text>
                                </View>
                            </View>
                            {
                                onCallBack && (
                                    <View style='margin-left:auto;margin-right:20rpx;flex-shrink:0'>
                                        <AtIcon value='chevron-right' color='#999' size='24'/>
                                    </View>
                                )
                            }
                          
                        </View>
                    ) :
                    (
                        <View className='__noAddress'>
                            <Image src={addIcon} />
                            <View>请添加收货地址</View>
                            {
                                onCallBack && (
                                    <View style='margin-left:auto;margin-right:20rpx;flex-shrink:0'>
                                        <AtIcon value='chevron-right' color='#999' size='24'/>
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </View>
        )
    }
}
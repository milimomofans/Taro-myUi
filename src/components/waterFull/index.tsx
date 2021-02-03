import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import {Goods} from './type'
import './index.scss'

interface Props {
    goodsList:Goods[]
}

class WaterFullMethod extends Component <Props> {
    
    constructor(props){
        super(props)
    }

    static defaultProps = {
        goodsList:[]
    }

    state = {
        leftList:[],
        rightList:[],
        index:0
    }

    fillRender(){
        
    }

    componentWillReceiveProps(newProps){
        
    }

    

}


export default class WaterFullRender extends WaterFullMethod {
    
    goodsCardRender(params){
        return (
            <View className='goods_main'>
                <Image className='goods_image' src={params.image}></Image>
                <View className='goods_name'>{params.name}</View>
                {
                    params.tags.length && (
                        <View className='goods_tags'>
                            {
                                params.tags.map((tagItem,tagIndex)=>{
                                    return (
                                        <View className='goods_tag_item'>{tagItem}</View>
                                    )
                                })
                            }
                        </View>
                    ) 
                }
                <View className='goods_price'>
                    <View className='goods_price_style'>{params.price}</View>
                    <View className='goods_fullPrice_style'>{params.fullPrice}</View>
                </View>   
            </View>
        )
    }

    render(){
        const {
            goodsList
        } = this.props
        return (
            <View>
                {
                    goodsList.map(goodsItem=>{
                        return this.goodsCardRender(goodsItem)      
                    })
                }
            </View>
        )
    }
}
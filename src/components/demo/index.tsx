import Taro, { Component, Config, render } from "@tarojs/taro";
import { View } from "@tarojs/components";


interface Props {
    list:any[]
    onJSXcallback:(item:any)=> any
}

export default class demo extends Component <Props>{

    render(){
        const {list} = this.props
        return (
            <View>
                {
                    list.map((item,index)=>{
                        return this.props.onJSXcallback(item)
                    })
                }
            </View>
        )
       
    }
}
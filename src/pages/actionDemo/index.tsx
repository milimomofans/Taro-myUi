import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import DEMO from '../../components/demo/index'

export default class Demo extends Component {
    
    state = {
        markData:[1,2,3,4,5,6,7,8]
    }
    
    testCallback(item){
        return (
            <View>{item}</View>
        )
    }

    render(){
        const {
            markData
        } = this.state
        return (
            <View>
                {/* {
                    markData.map((item,index)=>{
                        return (
                            <View >{item}</View>
                        )
                    })
                } */}
                <DEMO list={markData} onJSXcallback={this.testCallback}></DEMO>
            </View>
        )
    }
}
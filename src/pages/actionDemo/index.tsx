import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import WaterFull from '../../components/waterFull/index'
import MockData from '../../mock/listMock' 

export default class Demo extends Component {
    
    state = {
        list:[],
        loading:false
    }

    componentDidMount(){
        this.getList()
    }

    getList(){
        this.setState({
            loading:true
        },()=>{
            setTimeout(() => {
                let {list} = this.state
                this.setState({
                    list:[...list,...MockData],
                    loading:false
                })
            }, 1000);
        })
      
    }


    onReachBottom(){
        if (!this.state.loading) {
            this.getList()
        }
    }
    

    render(){
        const {
            list
        } = this.state
        return (
            <View>
                <WaterFull
                    goodsList={list}
                ></WaterFull>
            </View>
        )
    }
}
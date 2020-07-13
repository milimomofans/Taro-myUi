import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image,ScrollView } from '@tarojs/components'
import classNames from 'classnames'

interface Props {
    list:any[]                      //option列表
    current:number                  //当前选择的下标
    keyName:string                  //list的键值
    onSelect:(index:number)=>any    //选择时的回调
}

interface PageState {
    isOpen:boolean
}

export default class Accordion extends Component <Props,PageState> {

    static defaultProps = {
        keyName:'name'
    }

    state = {
        isOpen:false
    }

    optionsSwitch(){
        let {isOpen} = this.state
        this.setState({
            isOpen:!isOpen
        })
    }

    onSelect(index){
        let {onSelect} = this.props
        this.setState({
            isOpen:false
        },()=>{
            onSelect(index)
        })
    }

    render(){
        const {
            list,
            current,
            keyName
        } = this.props
        const _cur = list[current][keyName] || '' //当前选择的名字
        const {
            isOpen
        } = this.state
        return (
            <View className='_Accordion'>
                <View className={classNames(isOpen ? 'options_main' : 'options_close')} >
                    <View className={classNames('options_cur',isOpen && 'borderBottom')} onClick={this.optionsSwitch.bind(this)}>
                        <View>{_cur}</View>
                        <View className={classNames('at-icon at-icon-chevron-down',isOpen ? 'open' : 'close')} ></View>
                    </View>
                    <ScrollView scrollY className='scroll-view'>  
                            {
                                list.map((item,index)=>{
                                    return (
                                        <View className='options_cur' onClick={this.onSelect.bind(this,index)}>
                                            <View>{item[keyName]}</View>
                                            <View className={classNames(index == current && 'at-icon at-icon-check')}></View>
                                        </View>
                                    )
                                })
                            }
                    </ScrollView>
                </View>
            </View>
        )
    }
}
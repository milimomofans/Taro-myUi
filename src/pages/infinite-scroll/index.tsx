import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { WtInfiniteScroll } from "water-ui";
import "./index.scss";

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "无限滚动",
  };
  state = {
    page: 1,
    data:[],
    isEmpty:false,
    loading:false,
    hasMore:true
  };
  componentWillMount() {
    this.getData(this.state.page)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}
  returnData(page:number):Promise<{currentPage:number,data:string[], lastPage:number}>{
    const initData = [0,1,2,3,4,5,6,7,8,9]
    const promise:Promise<{currentPage:number,data:string[],  lastPage:number}> = new Promise((res)=>{
      const timer = setTimeout(() => {
        res({
          currentPage:page,
          data:initData.map(v=>''+page+v),
          lastPage:10
        })
        clearTimeout(timer)
      }, 1000);
    })
    return promise
  }
  async getMoreData(){
    this.setState({page:this.state.page+1},()=>{
      this.getData(this.state.page+1)
    })
  }
  async getData(page:number) {
    if(!this.state.hasMore)return
    this.setState({loading:true})
    try {
      const {currentPage, lastPage, data} = await this.returnData(page)
      const newData = [...this.state.data, ...data]
      const hasMore = currentPage < lastPage
      const isEmpty = newData.length === 0
      this.setState({loading:false, isEmpty, hasMore, data:newData})
    } catch (error) {
      
    }
  }
  componentDidHide() {}

  render() {
    const {data, hasMore, loading, isEmpty}= this.state
    return (
      <View className="index">
        <WtInfiniteScroll
          hasMore={hasMore}
          loading={loading}
          isEmpty={isEmpty}
          onScrollToLower={this.getMoreData.bind(this)}
        >
        <View className="sdf">配合utils中的pagination使用更佳</View>
        {
          data.map(item=><View className="item" key={item}>{item}</View>)
        }</WtInfiniteScroll>
      </View>
    );
  }
}

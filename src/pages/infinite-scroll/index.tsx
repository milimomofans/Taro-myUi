import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { WtInfiniteScroll } from "water-ui";
import classNames from 'classnames'
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
          lastPage:5
        })
        clearTimeout(timer)
      }, 1000);
    })
    return promise
  }
  async getMoreData(){
    if (this.state.hasMore) {
      this.setState({page:this.state.page+1},()=>{
        this.getData(this.state.page+1)
      })
    }
   
  }
  async getData(page:number) {
    if(!this.state.hasMore)return
    this.setState({loading:true})
    try {
      const {currentPage, lastPage, data} = await this.returnData(page)
      const newData = [...this.state.data, ...data]
      // const newData = []
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
        <View style='height:50vh'>我是吸顶的头部</View>
        <WtInfiniteScroll
          hasMore={hasMore}
          loading={loading}
          isEmpty={isEmpty}
          onScrollToLower={this.getMoreData.bind(this)}
          noMoreTitle='暂无更多数据了哦'
          pageNo={this.state.page}
          customStyle='height:50vh !important'
          noWl={true}
        >
        <View className="sdf">配合utils中的pagination使用更佳</View>
        <View className='main'>
          {
            data.map((item,index)=>
              <View 
                className={
                  classNames('item',index % 2 == 0 && 'item0',item % 3 == 0 && 'item1',item % 5 == 0 && 'item2',item % 7 == 0 && 'item3')
                }  
                key={item}
              >
                {item}
              </View>
            )
          }
        </View>
        </WtInfiniteScroll>
      </View>
    );
  }
}

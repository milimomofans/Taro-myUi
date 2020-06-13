## 全民分销分享组件

### 调用参数

    goodsPrice?:string;                             // 商品价格
    goodsPic?:string;                               // 商品图片
    goodsLinePrice?:string;                         // 商品划线价
    goodsTitle?:string                              // 商品标题
    onShareFunc:()=>Promise<{T}>                    // 转链接口。
    onTransformFail?:(err:any)=>any                 // 转链调用失败后调用
    posterGenerateSuccess?: (detail: any) => any;   // 海报生成成功后调用
    posterGenerateFail?: (err: any) => any;         // 转链海报生成失败后调用

### onShareFunc说明
    因各小程序请求地址不统一。所以请传入转链接口返回promise给组件。
    例：
         onTransform(){
            return api['poster|poster']({goodsid:123})
         }

### 引用
    import ShareButton from '../../components/share-button/shareButton'
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
    请自行写按钮样式。

### 转链接口说明
    文档：https://www.tapd.cn/50930656/markdown_wikis/?#1150930656001000760
    1.使用该组件请默认将type传1
    2.默认设置接口权限登录

### onShareMessage返回数据
    若需要使用转链信息path 请将设置refs如 ref={ (node)=>{this.shareRef = node} }
    调用则使用this.shareRef.getShareData() 
    返回值 {
        imageUrl:string,
        title:string,
        path:string
    }
    若未点击该组件调用转链接口或转链接口出错  返回的数据则是小程序默认值。建议设置判断条件。
import Taro, { Component, Config } from '@tarojs/taro'
import { Button, View, Text, Image } from '@tarojs/components'
import './index.scss'
import { wechat_icon,poster_icon } from './imgs'
import { defaultPosterConfig } from "./canvasConfig"
import {CanvasDrawer} from "taro-plugin-canvas";


interface PageStateProps {
    goodsPrice?:string;                             // 商品价格
    goodsPic?:string;                               // 商品图片
    goodsLinePrice?:string;                         // 商品划线价
    goodsTitle?:string                              // 商品标题
    onShareFunc:()=>Promise<{T}>                    //转链接口
    onTransformFail?:(err:any)=>any                 //转链调用失败后调用
    posterGenerateSuccess?: (detail: any) => any;   //海报生成成功后调用
    posterGenerateFail?: (err: any) => any;         // 转链海报生成失败后调用
}

interface PageState {
    showModal:boolean
    showPoster:boolean
    transformData:any
    posterImg:string
    posterConfig:any
    canvasStatus:boolean
}

export default class Index extends Component <PageStateProps,PageState> {
    
    static defaultProps = {
        goodsPrice:0.00,
        goodsPic:'https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201907301427/8JmUDPuPtu6jE1PSeQ2b6sNMYWlqakaAkJ7oxACw.png',
        goodsLinePrice:0.00,
        goodsTitle:'测试用例'
    }
    
    state = {
        showModal:false,
        showPoster:false,
        transformData:null,
        posterImg:'',
        posterConfig:defaultPosterConfig,
        canvasStatus:false
    }
    
    /**
     * 调用转链接口
     * 如果调用成功则打开模态框
     * 若失败则将错误信息抛出并不打开模态框
     */
    toShare(){    
        console.log(wechat_icon,poster_icon)
        let { onShareFunc } = this.props,
            { transformData } = this.state
        
        if(transformData){
            return this.setState({
                showModal:true
            })
        }

        try{
            onShareFunc().then(_r=>{
                let stopMsg = this.checkParameter(_r)
                if(stopMsg){
                    return this.TransError(`转链缺少参数${stopMsg.toString()}`)
                }

                this.setState({
                    transformData:_r,
                    showModal:true
                })
            })
            .catch(err=>{
                this.TransError(err)
            })
        }catch(err){    
            this.TransError(err)
        }
    }

    checkParameter(params){     //检测转链的参数
        let checkArr = ['extraData','shopId','userId','link','qrcodeLink'],
            errorArr:string[] = []

        for(let i = 0,len = checkArr.length; i < len; i++){
            let _cur = checkArr[i]
            if(!params[_cur]){
                errorArr.push(_cur)
            }
        }

        if(errorArr.length > 0 ){
            return errorArr
        }
    }

    TransError(err:any){   //转链信息报错方法
        let { onTransformFail } = this.props
        if(onTransformFail && typeof onTransformFail == 'function'){
            onTransformFail(err)
        }else{
            console.error('转链调用失败',err)
        }
    }


    onCancel(){ //关闭Modal弹框
        this.setState({
            showModal:false
        })
    }

    onCancelPoster(){ //关闭海报显示
        this.setState({
            showPoster:false
        })
    }

    onSharaFriend(){        //打开生成海报
        if(this.state.posterImg.length > 0){
            this.setState({
                showModal:false,
                showPoster:true
            })
        }else{
            let { transformData,posterConfig } = this.state,
                tempObj = JSON.parse(JSON.stringify(posterConfig)),
                { goodsPrice,goodsPic,goodsLinePrice,goodsTitle } = this.props
            console.log(goodsTitle, goodsPrice,goodsLinePrice)
            
            tempObj.images[1].url = goodsPic
            tempObj.texts[1].text = goodsTitle
            tempObj.texts[2].text = '￥' + goodsPrice 
            tempObj.texts[3].text = '￥' + goodsLinePrice
            tempObj.images[2].url = transformData.qrcodeLink
            

            this.setState({
                posterConfig:tempObj,
                showModal:false,
                canvasStatus:true
            })
        }
    }

    posterGenerateSuccess(detail:any){ //海报生成成功回调
        console.log(detail)
        let {posterGenerateSuccess} = this.props
        if(posterGenerateSuccess && typeof posterGenerateSuccess == 'function'){
            posterGenerateSuccess(detail)
        }else{
            console.log('海报生成成功',detail)
        }
        this.setState({
            posterImg:detail.tempFilePath,
            showPoster:true        
        })
    }

    posterGenerateFail(err){
        let {posterGenerateFail} = this.props
        if(posterGenerateFail && typeof posterGenerateFail == 'function'){
            posterGenerateFail(err)
        }else{
            console.error(err)
        }
        this.setState({
            showPoster:false,
            showModal:false,
            canvasStatus:false
        })
    }

    async onSavePoster() {   //保存图片
        let that = this,
        { posterImg } = this.state
        try {
          // 保存图片
          await Taro.saveImageToPhotosAlbum({
            filePath: posterImg
          });
          that.showToast('保存成功')
        } catch (e) {
          if(e.errMsg == 'saveImageToPhotosAlbum:fail cancel') return
          const res = await Taro.showModal({
            title: "授权提示",
            content: "保存图片需要获取相册权限",
            confirmText: "授权",
            showCancel: false
          });
          if (res.confirm) {
            // 打开设置
            const res1 = await Taro.openSetting();
            if (!res1.authSetting["scope.writePhotosAlbum"]) {
                that.showToast('保存失败')     
            } else {
              await Taro.saveImageToPhotosAlbum({
                filePath: posterImg
              });
              that.showToast('保存成功')
            }
          }
        }
    }

    showToast(msg:string,cb:any = null){  //提示弹窗
        Taro.showToast({
            title:msg,
            icon:"none",
            duration:1000,
            success:()=>{
                if(cb && typeof cb == 'function'){
                    cb()
                }
            }
        })
    }

    getShareData(){
        let { link,extraData } = this.state.transformData,
            {goodsPic,goodsTitle} = this.props
        console.log('跳转参数为',this.getSharePath(link,extraData))

        return {
            imageUrl:goodsPic,
            title:goodsTitle,
            path:this.getSharePath(link,extraData)
        }
    }

    getSharePath(url,shareParam){   //分享跳转参数
        if(Object.keys(shareParam).length > 0){
          url += '?'
          for(var i in shareParam){
            url += `${i}=${shareParam[i]}&`
          }
          url = url.substring(0,url.length - 1)
        }
        return url
    }

    render(){
        const {showModal,showPoster,posterImg,canvasStatus} = this.state
        return (
            <View className='poster'>
                <View onClick={this.toShare.bind(this)}>
                    {this.props.children}
                </View>
                {
                    showModal && (
                        <View className='content-share' onClick={this.onCancel.bind(this)}>
                            <View className='content-share-main'>
                                <View className='title'>
                                    <View>该商品已参与全民分销</View>
                                    <View className='cancel' onClick={this.onCancel.bind(this)}>取消</View>
                                </View>
                                <View className='share'>
                                    <Button open-type='share' className='weixin'>
                                        <Image className='image' src={wechat_icon} />
                                        <View>分享给朋友</View>
                                    </Button>
                                    <Button
                                      className='friend'
                                      onClick={this.onSharaFriend.bind(this)}
                                    >
                                        <Image className='image' src={poster_icon} />
                                        <View>朋友圈海报</View>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    )
                }
                {
                    showPoster && (
                        <View className='content-poster' onClick={this.onCancelPoster.bind(this)}>         
                            <Image className='poster-img' mode='widthFix' src={posterImg}></Image>
                            <View className='share-btn' >
                                <View className='share_btn_item' onClick={this.onSavePoster.bind(this)} style='background:rgba(47,203,136,1);color:rgba(255,255,255,1);margin-right:30rpx'>保存海报</View>
                                <Button className='share_btn_item' open-type='share' style='border:2rpx solid rgba(47,203,136,1);color:rgba(47,203,136,1);'>分享海报</Button>
                            </View>
                        </View>
                    )
                }
                {
                    canvasStatus && (
                        <View className='canvas'>
                            <CanvasDrawer
                              config={this.state.posterConfig} // 绘制配置
                              onCreateSuccess={this.posterGenerateSuccess.bind(this)} // 绘制成功回调
                              onCreateFail={this.posterGenerateFail.bind(this)} // 绘制失败回调
                            />
                        </View>
                    )
                }
                
            </View>
        )
    }
}
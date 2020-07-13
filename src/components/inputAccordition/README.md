| 参数 | 类型 | 是否必须 | 说明 |
| :-- | :-- | :-- | :-- |
| serachApi | function | false | 搜索的api |
| isSerach | boolean | false | 是否使用搜索 | 
| inputValue | Object | true | input的参数，placehodler，rules判断等 | 

#### 组件内说明
value在组件内进行控制，在最后取值使用ref来获取值

#### 关于rules

```
    //固定格式如下
    {
         rules:{                    
            rule:string
            msg:string
        }[]
    }
```
_关于rule规则_：
'required':是否为空 
'isLongThan':是否等于指定长度 
'isRepeat':是否其中有长度相同的 
'isMobile':是否为中国大陆手机号 
'isLineNumber':是否为长号码 
'isIdCard':是否为身份证 
'isNumber':是否为数字


#### 组件格式 

```
     const inputValue = {
        placeholder:'输入名字',
        type:'text',
        rules:[
            {
                rule:'required',
                msg:'寄件人姓名不能为空'
            }
        ]
    }
    
    render(){
        return (
            <View>
                <InputAccordion
                    inputValue={inputValue}
                    isSerach
                    serachApi={this.testPromise.bind(this)}
                />
            <View>
        )
    }
```

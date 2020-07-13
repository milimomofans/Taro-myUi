### 长青项目地址展示栏
 | 名称 | 介绍 | 类型 | 是否必须 |
 | :-- | :-- | :-- | :-- |
 | name | 用户名称 | string | 否 | 
 | mobile | 电话号码 | string | 否 |
 | location | 地址信息 | string | 否 |
 | street | 街道信息 | string | 否 |
 | onCallBack | 点击之后的回调 | function | 否 |

###### 如果判断存在name和location 则显示有地址的图标  
若不存在则显示无地址的信息   根据页面业务来  如未传入回调函数则向右箭头则将隐藏
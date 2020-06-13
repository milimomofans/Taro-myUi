export const defaultPosterConfig = {
  width: 618,
  height: 860,
  backgroundColor: '#fff',
  pixelRatio: 1,
  debug:false,
  // blocks: [
  //   {
  //     x: 10,
  //     y: 10,
  //     width: 670,
  //     height: 988,
  //     borderWidth: 20,
  //     borderColor: themeColor,
  //     borderRadius:50
  //   }
  // ],
  texts: [
    {
      x: 151,
      y: 375,
      text: '用户名',
      fontSize: 32,
      opacity: 1,
      baseLine: 'top',
      pixelRatio:4
    },
    {
      x: 151,
      y: 421,
      text: '用户旁的描述',
      fontSize: 24,
      baseLine: 'top',
      color:'#8A8A8A'
    },
    {
      x: 41,
      y: 508,
      width: 536,
      lineNum: 2,
      lineHeight: 30,
      fontWeight: 600,
      text: '活动描述',
      fontSize: 28,
      opacity: 1,
      baseLine: 'top'
    },
    {
      x: 41,
      y: 600,
      text: '价格',
      fontSize: 26,
      color: "",
      opacity: 1,
      baseLine: 'top',
      color: '#FF8A00',
    },
    {
      x: 150,
      y: 600,
      text: '原价',
      fontSize: 24,
      color:'#CCCCCC',
      opacity: 0.5,
      baseLine: 'top',
      textDecoration:'line-through'
    },
    {
      x: 488,
      y: 790,
      width:140,
      text: '长按小程序码',
      fontSize: 18,
      color: '#8A8A8A',
      opacity: 1,
      lineHeight:30,
      baseLine: 'top'
    },
    // {
    //   x: 455,
    //   y: 810,
    //   width:140,
    //   text: '进入向西游小程序',
    //   fontSize: 18,
    //   lineHeight:30,
    //   color: '#8A8A8A',
    //   opacity: 1,
    //   baseLine: 'top'
    // },
  ],
  images: [
    // 头像
    {
      url:
        'https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201911061508/E3lnDHh13Ghc7sOOXr26NhWDIC1ct3807uJfepBy.png',
      width: 80,
      height: 80,
      y: 374,
      x: 41,
      borderRadius: 80,
    },
    // 活动
    {
      url:
        'https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201911061508/E3lnDHh13Ghc7sOOXr26NhWDIC1ct3807uJfepBy.png',
      width: 570,
      height: 320,
      y: 24,
      x: 24,
      borderRadius: 24,
    },
    // 二维码
    {
      url:
        'https://qqmylife-dev-1251517655.file.myqcloud.com/mch/att/201911061508/E3lnDHh13Ghc7sOOXr26NhWDIC1ct3807uJfepBy.png',
      width: 100,
      height: 100,
      y: 670,
      x: 494,
      borderRadius: 100
    }
  ],
  lines:[
    {
      startX:40,
      startY:484,
      endX:580,
      endY:484,
      color:'#A9A9A9'
    }
  ]
}



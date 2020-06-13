export default [
  {
    name: 'checkPhoneNumber',
    method: 'GET',
    desc: '检测手机是否注册',
    path: '/passport/auth/check',
    mockEnable: true,
    mockPath: '/passport/auth/check',
    params: {
      phone: ''
    },
    auth: false
  },
  {
    name: 'absoluteUrl',
    method: 'GET',
    desc: '测试绝对路径',
    path: 'https://www.baidu.com',
    absolute: true,
    mockEnable: false,
    mockPath: '/test/11',
    params: {
      test: 'ko'
    },
    auth: false
  },
  {
    name: 'dynamicParams',
    method: 'GET',
    desc: '测试动态参数',
    path: 'https://www.baidu.com/:test/:ko',
    absolute: true,
    mockEnable: false,
    auth: false
  }
]

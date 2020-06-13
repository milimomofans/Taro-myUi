export default [
  {
    name: 'getSession',
    method: 'POST',
    desc: '获取session',
    path: '/onedevice/auth/session',
    mockEnable: false,
    auth: false,
    needTime: true,
    mockPath: '/303/auth/session',
    params: { code: '' }
  },
  {
    name: 'postPhone',
    method: 'POST',
    desc: '提交手机号获取sessionRefreshId',
    path: '/onedevice/auth/phone',
    mockEnable: false,
    auth: false,
    mockPath: '/303/auth/phone',
    params: { session_id: '', iv: '', encrypt_data: '' }
  },
  {
    name: 'getUserInfo',
    method: 'POST',
    desc: '登陆后获取用户信息',
    path: '/activity/auth/user',
    dealLoginSelf: true,
    auth: true,
    mockEnable: false,
    needTime: true,
    mockPath: '/303/auth/login',
    params: {}
  },
  {
    name: 'login',
    method: 'POST',
    desc: '登录',
    path: '/onedevice/auth/login',
    auth: false,
    mockEnable: false,
    needTime: true,
    mockPath: '/303/auth/login',
    params: { session_id: '', phone: '', code: '' }
  },
  {
    name: 'loginByWechat',
    method: 'POST',
    desc: '登录',
    path: '/onedevice/auth/login',
    auth: false,
    mockEnable: false,
    needTime: true,
    mockPath: '/303/auth/login',
    params: { session_id: '' }
  },
  {
    name: 'getCheckCode',
    method: 'POST',
    desc: '获取验证码',
    path: '/onedevice/auth/code',
    auth: false,
    mockEnable: false,
    needTime: true,
    mockPath: '/303/auth/code',
    params: {
      phone: '',
      tcaptcha: '2062664312',
      tcaptcha_ticket: '',
      tcaptcha_randstr: '',
      session_id: ''
    }
  },
  {
    name: 'postUserInfo',
    method: 'POST',
    desc: '提交用户信息',
    path: '/activity/auth/userinfo',
    auth: true,
    mockEnable: false,
    needTime: true,
    mockPath: '/303/auth/code',
    params: {
      session_id: '',
      encrypt_data: '',
      iv: ''
    }
  }
]

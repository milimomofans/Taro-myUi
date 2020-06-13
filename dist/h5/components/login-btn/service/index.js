import MakeApi from 'api';
const config = {
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api-pro-out.trip.wlkst.com/service/mnp' : 'https://service-0wal9i5k-1257188045.gz.apigw.tencentcs.com/v1/mnp',
  redirectLoginPage: '/personCenterSubpkg/pages/login/index',
  sep: '/'
};
const login = [{
  name: 'getSession',
  method: 'POST',
  desc: '获取session',
  path: '/union/auth/session',
  mockEnable: false,
  auth: false,
  needTime: true,
  mockPath: '/303/auth/session',
  params: { code: '', appid: '' }
}, {
  name: 'postPhone',
  method: 'POST',
  desc: '提交手机号获取sessionRefreshId',
  path: '/union/auth/phone',
  mockEnable: false,
  auth: false,
  mockPath: '/303/auth/phone',
  params: { session_id: '', iv: '', encrypt_data: '', appid: '' }
}, {
  name: 'getUserInfo',
  method: 'POST',
  desc: '登陆后获取用户信息',
  path: '/activity/auth/user',
  dealLoginSelf: true,
  auth: false,
  mockEnable: false,
  needTime: true,
  mockPath: '/303/auth/login',
  params: {}
}, {
  name: 'login',
  method: 'POST',
  desc: '登录',
  path: '/union/auth/login',
  auth: false,
  mockEnable: false,
  needTime: true,
  mockPath: '/303/auth/login',
  params: { session_id: '', phone: '', code: '', appid: '', source: '' }
}, {
  name: 'loginByWechat',
  method: 'POST',
  desc: '登录',
  path: '/union/auth/login',
  auth: false,
  mockEnable: false,
  needTime: true,
  mockPath: '/303/auth/login',
  params: { session_id: '', appid: '', source: '' }
}, {
  name: 'getCheckCode',
  method: 'POST',
  desc: '获取验证码',
  path: '/union/auth/code',
  auth: false,
  mockEnable: false,
  needTime: true,
  mockPath: '/303/auth/code',
  params: {
    phone: '',
    tcaptcha: '2062664312',
    tcaptcha_ticket: '',
    tcaptcha_randstr: '',
    session_id: '',
    appid: ''
  }
}, {
  name: 'postUserInfo',
  method: 'POST',
  desc: '提交用户信息',
  path: '/union/auth/userinfo',
  auth: false,
  mockEnable: false,
  needTime: true,
  mockPath: '/303/auth/code',
  params: {
    session_id: '',
    encrypt_data: '',
    iv: '',
    appid: ''
  }
}];
const loginRequest = new MakeApi({
  config: {
    login
  },
  ...config
}).api;
export default loginRequest;
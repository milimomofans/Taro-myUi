// config/index.js
import { MNP_REQUEST_DEFAULT_CONFIG_TYPING } from '../typings'
import { MOCK_BASE_URL } from '../consts/api'

export const NODE_ENV = process.env.NODE_ENV || 'prod'

// 是否强制所有请求访问本地，每个请求也可以单独控制是否请求 MOCK
export const AJAX_LOCALLY_ENABLE = false

// 是否开启监控
export const MONITOR_ENABLE = true

// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'history',
  base: ''
}
const isProduction = process.env.NODE_ENV === 'production'
// axios 默认配置
export const MNP_REQUEST_DEFAULT_CONFIG: MNP_REQUEST_DEFAULT_CONFIG_TYPING = {
  timeout: 20000,
  maxContentLength: 2000,
  baseURL: isProduction
    ? 'http://bigscreen.tuidanke.com/'
    : 'http://bigscreen.tuidanke.com/',
  headers: {},
  redirectLoginPage: '/pages/login/login'
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: process.env.NODE_ENV !== 'production'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  // mockBaseURL: 'http://mch.qqmylife.com/v1/mch',
  mockBaseURL: MOCK_BASE_URL,
  mock: false,
  debug: false,
  sep: '/'
}

// CONST 默认配置
export const CONST_DEFAULT_CONFIG = {
  sep: '/'
}

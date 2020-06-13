import '@tarojs/async-await'
import Taro from '@tarojs/taro'

// 微信自带login,获取code
export async function weLogin(): Promise<any> {
  const res = await Taro.login()
  if (typeof res.code !== 'undefined') {
    Taro.setStorageSync('code', res.code)
    return res.code
  } else {
    throw new Error('wx login 调用失败')
  }
}

// 获取微信session id  如果已经登录，这里也会返回access_token
export async function getSession(api, code: string) {
  const data = await api['login/getSession']({
    code
  })
  if (typeof data !== 'undefined' && (data.session_id || data.access_token)) {
    return data
  } else {
    throw Error('未能获取到session id')
  }
}

export function clearSession() {
  Taro.removeStorageSync('session')
  Taro.removeStorageSync('code')
}

export async function getWeSession(api) {
  try {
    const code = await weLogin()
    const sessionData = await getSession(api, code)
    const {expires_in} = sessionData
    // 在基础上减少20秒
    sessionData.expireTime = Date.now() + expires_in * 1000 - 20000
    Taro.setStorageSync('session', sessionData)
    return sessionData
  } catch (e) {
    Taro.removeStorageSync('session')
    Taro.removeStorageSync('code')
    await Taro.showToast({title: '网络繁忙，请稍后再试', icon: 'none'})
    throw e
  }
}

export function loginSuccessInit({access_token, expires_in}) {
  Taro.setStorageSync('token', access_token)
  Taro.setStorageSync('loginExpireTime', expires_in * 1000 + Date.now())
  Taro.setStorageSync('orderNeedReload', true)
  Taro.setStorageSync('orderRefreshTime', null)
}

export function loginNotExpire() {
  const loginExpireTime = Taro.getStorageSync('loginExpireTime')
  if (!loginExpireTime) return false
  const remainTime = Date.now() - loginExpireTime
  return remainTime > 0 ? remainTime : false
}

export function validateLoginType() {
  const notLogin = loginNotExpire()
  if (!notLogin) {
    clearSession()
  }
}

async function defaultGetWeSession(api) {
  const sessionData = Taro.getStorageSync('session')
  const now = Date.now()
  if (sessionData && sessionData.expireTime > now) {
    return sessionData
  }
  return await getWeSession(api)
}

export default defaultGetWeSession

let isGetting = false

class LoginStore {
  private nowSessionData = {session_id: '', access_token: '', expires_in: ''}

  getNowSessionData() {
    return this.nowSessionData || {}
  }

  isEmpty() {
    return (
      !this.nowSessionData ||
      !this.nowSessionData.session_id ||
      !this.nowSessionData.access_token
    )
  }

  async getSession(api) {
    // 不是空的，或者有数据，都不继续执行
    if (isGetting || !this.isEmpty()) {
      return
    }
    isGetting = true
    this.nowSessionData = await defaultGetWeSession(api)
    isGetting = false
  }
}

export const loginStore = new LoginStore()

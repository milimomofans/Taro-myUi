import Taro from "@tarojs/taro";
import * as Qs from 'qs'
import homePageMap from "utils/lib/page_map";
import { HTTP_STATUS } from "./status";

// 获取主包tbar页面配置
export function getHomeTbarPage() {
  const { miniProgram } = Taro.getAccountInfoSync();
  // 返回 {login,me,home}
  return homePageMap(miniProgram.appId) || { me: "/pages/me/me" };
}

const NOT_LOGIN_ERROR = 'authFail'

export const MNP_REQUEST_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  baseURL:"https://test-api-pro-out.trip.wlkst.com/service/coupons/coupon-app",
  headers: {},
  redirectLoginPage: getHomeTbarPage().me
};

const taroDefaultRequest = {
  url: "",
  method: "GET",
  dataType: "json",
  responseType: "text",
  header: {
    "content-type": "application/json",
    Authorization: "",
    Accept: "application/json"
  }
};

const validateTokenName = "token";

const packRequest = (newRequestObj: {
  url: string
  data: any
  method: 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined
  header: any
  dealLoginSelf: boolean
  dealErrorSelf:boolean
}) => {
  let response: any
  return Taro.request(newRequestObj)
    .then(resp => {
      // handle HTTP_STATUS Code
      // console.log(resp)
      response = resp
      let errorMessage = "";
      let errorObj = { code: "", message: "" };
      switch (resp.statusCode) {
        case HTTP_STATUS.SUCCESS:
          if (typeof resp.data.code !== "undefined") {
            switch (resp.data.code) {
              case 82401:
                // errorMessage = '登录过期'
                errorObj = { ...resp.data };
                // Raven.captureException(
                //   "invalid session code " + resp.data.code
                // );
                break;
              case 82402:
                errorObj = { ...resp.data };
                // Promise.reject({ code: 82402 })
                // Raven.captureException("invalid session id" + resp.data.code);
                break;
              case 82403:
                errorObj = { ...resp.data };
                // Raven.captureException("decrypt data failed" + resp.data.code);
                break;
              case 82404:
                errorObj = { ...resp.data };
                // Raven.captureException("invalid access id" + resp.data.code);
                break;
              case 0:
                // 正常交互 不需要收集
                return resp.data.data;
              default:
                errorObj = { ...resp.data };
                // Raven.captureException("未定义后端错误");
                break;
            }
          }
          // 外部地图接口
          if (resp.data.result) {
            return resp.data.result;
          }

          // 拉取活动详情Json
          if (resp.data.act_id) {
            return resp.data
          }
          break;
        case HTTP_STATUS.CLIENT_ERROR:
          errorMessage = "客户端错误";
          // Raven.captureException(errorMessage);
          break;
        case HTTP_STATUS.AUTHENTICATE:
          Taro.removeStorageSync('token')
          // token 过期重新登录, 登录成功用back
          if (newRequestObj.dealLoginSelf) {
            return Promise.reject(NOT_LOGIN_ERROR)
          } else {
            Taro.reLaunch({
              url: MNP_REQUEST_DEFAULT_CONFIG.redirectLoginPage,
            })
          }
          break
        case HTTP_STATUS.FORBIDDEN:
          errorMessage = "禁止请求";
          break;
        case HTTP_STATUS.NOT_FOUND:
          errorMessage = "未发现服务, 请联系客服";
          break;
        case HTTP_STATUS.SERVER_ERROR:
          errorMessage = "服务器问题, 请联系客服";
          break;
        default:
          errorMessage = "未知问题，请联系客服";
          break;
      }
      // 统一在catch中catch
      // Raven.captureException(errorMessage)
      // TODO handle the errorMessage with modal
      if (errorMessage) {
        return Promise.reject(errorMessage);
      } else if (errorObj.code) {
        return Promise.reject(errorObj);
      }
    })
    .catch((e): any => {
      console.log('newRequestObj', newRequestObj)
      console.log('response', response)
      console.error(e, 'requesterror')
      // Raven.captureException({ requestError: e });
      // common error
      if(newRequestObj.dealErrorSelf){
        return Promise.reject(e)
      }
      else
      if (typeof e === 'string') {
        // Taro.showToast({title:e, icon:'error'})
        return Promise.reject(e)
      } else if (e instanceof Object) {
        return Promise.reject(e.message)
      }
      // Raven.captureMessage(e)
    });
};

const request = ({
  baseURL = MNP_REQUEST_DEFAULT_CONFIG.baseURL,
  url,
  data,
  method,
  auth = true,
  absolute = false,
  dealLoginSelf = false,
  dealErrorSelf = false
}) => {
  const path = absolute ? url : baseURL + url;
  // const path = taroDefaultRequest.url + url
  const newRequestObj = {
    ...taroDefaultRequest,
    url: path,
    method,
    data,
    dealLoginSelf,
    dealErrorSelf
  };
  // 序列化get参数到url
  if (method === 'GET') {
    const stringy = Qs.stringify(newRequestObj.data, {
      arrayFormat: 'brackets',
    })
    newRequestObj.url = `${newRequestObj.url}?${stringy}`
    newRequestObj.data = {}
  }
  // handle token
  if (auth) {
    const res = Taro.getStorageSync(validateTokenName)
    if (!res && !dealLoginSelf) {
      Taro.reLaunch({ url: MNP_REQUEST_DEFAULT_CONFIG.redirectLoginPage })
      throw new Error('没有token')
    } else {
      newRequestObj.header = {
        ...newRequestObj.header,
        Authorization: 'Bearer ' + res,
      }
      return packRequest(newRequestObj)
    }
  } else {
    return packRequest(newRequestObj)
  }
};

export default request;

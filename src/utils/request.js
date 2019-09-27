import axios from 'axios'
import md5 from 'js-md5';
import {
  getProductCode
} from '../utils/session'
import {
  getYYMMDD,
  getUUID
} from '../utils/dateFormate'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASEURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    const _time = new Date().getTime()
    config.headers['code'] = '1166174399441244162'
    config.headers['time'] = _time
    config.headers['sign'] = md5('1166174399441244162' + 'eda73754516247a89c78a1eb4784aaf8' + _time).toString()
    config.headers['requestNo'] = '1166174399441244162' + getProductCode().toString() + getYYMMDD().toString() + getUUID().toString()
    config.headers['version'] = '1.0.0'
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    return res
  },
  error => {
    // const status = error.response.status

    // if (status === 999) {
    //   // 如果 token 过期
    //   store.dispatch('user/removeSession').then(() => {
    //     Message.warning("登录信息已过期，请重新登录！")
    //     cookies.removeCurrentMenuIndex();
    //     router.push({
    //       path: "/login"
    //     });
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
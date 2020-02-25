/*
 * @Description: api 拦截器
 * @Author: leo
 * @Date: 2019-09-18 20:33:59
 * @LastEditors: leo
 * @LastEditTime: 2019-09-19 13:59:57
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 请求超时时间
axios.defaults.timeout = 10000

// 请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.baseURL = '/api'
  // 需要向 headers 里面添加 token
  config.headers.Authorization = ''
  return config
}, (error: Error) => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((response:AxiosResponse<any>) => {
  if (response.status === 200) {
    return response.data
  }
}, (error: any) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        console.log('未登录')
        break
      case 403:
        console.log('token 过期')
        break
      case 400:
        console.log(400)
        break
      case 500:
        console.log(500)
        break
      case 502:
        console.log(502)
        break
      default:
        break
    }
    return Promise.reject(error.response)
  }
})

// 通用方法封装
export default {
  get (params: any, url: string) {
    return axios({
      method: 'get',
      url,
      params
    })
  },
  post (data: any, url: string) {
    return axios({
      method: 'post',
      url,
      data
    })
  },
  put (params: any, url: string) {
    return axios({
      method: 'put',
      url,
      params
    })
  },
  delete (params: any, url: string) {
    return axios({
      method: 'delete',
      url,
      params
    })
  }
}

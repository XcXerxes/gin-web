/*
 * @Description: token认证
 * @Author: leo
 * @Date: 2019-09-19 14:30:07
 * @LastEditors: leo
 * @LastEditTime: 2020-02-25 16:38:48
 */
import Cookie from 'js-cookie'
const tokenName: string = 'Authorization'
/**
 * 获取 token
 */
export const getToken = () => {
  return Cookie.get(tokenName)
}

export const setToken = (token: string) => {
  Cookie.set(tokenName, token)
}

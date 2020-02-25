/*
 * @Description: 分类模块
 * @Author: leo
 * @Date: 2019-09-26 20:37:50
 * @LastEditors: leo
 * @LastEditTime: 2019-09-26 20:37:50
 */
import api from 'api'
import * as types from '../action-types'
import { iSuccessResult } from '@interface/global.interface'
import { Dispatch } from 'redux'

export function fetchCateList () {
  return async (dispatch: Dispatch) => {
    try {
      const result:iSuccessResult = await api.cateList({})
      if (result.code === 200) {
        dispatch({
          type: types.RECEIVE_CATE_LIST,
          data: result.data
        })
      }
    } catch (error) {
      Promise.reject(error)
    }
  }
}

/*
 * @Description: 状态管理根
 * @Author: leo
 * @Date: 2019-09-26 20:36:54
 * @LastEditors: leo
 * @LastEditTime: 2019-09-26 20:40:07
 */
import { createStore, compose, applyMiddleware } from 'redux'
import reducers from './reducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger({ predicate: (_getState, _action) => process.env.NODE_ENV !== 'production' })

export default compose(applyMiddleware(...[loggerMiddleware, thunkMiddleware]))(createStore)(reducers)

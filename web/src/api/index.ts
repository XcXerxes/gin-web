/*
 * @Description: api目录结构
 * @Author: leo
 * @Date: 2019-09-18 20:33:50
 * @LastEditors: leo
 * @LastEditTime: 2019-09-25 19:04:53
 */
import Request from './Request'

export default {
  // 登录接口
  signin (params: any) {
    return Request.post(params, '/user/signin')
  },
  // 获取分类列表
  cateList (params: any) {
    return Request.get(params, '/tags')
  },
  // 创建文章
  createArticle (params: any) {
    return Request.post(params, '/article/create')
  },
  // 文章列表
  articleList (params: any) {
    return Request.get(params, '/articles')
  },
  // 文章单条详情
  articleDetailById (params: any) {
    return Request.get({}, `/articles/${params.id}`)
  }
}

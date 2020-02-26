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
  // 创建分类
  createCate (params: any) {
    return Request.post(params, '/category/create')
  },
  // 获取分类列表
  cateList (params: any) {
    return Request.get(params, '/category/list')
  },
  // 单条分类
  cateItemById (params: any) {
    return Request.get({}, `/category/${params.id}`)
  },
  // 更新分类
  updateCate (params: any) {
    return Request.post(params, '/category/update')
  },
  // 删除分类
  deleteCateById (params: any) {
    return Request.get({}, `/category/delete/${params.id}`)
  },
  // 创建文章
  createArticle (params: any) {
    return Request.post(params, '/article/create')
  },
  // 文章列表
  articleList (params: any) {
    return Request.get(params, '/article/list')
  },
  // 文章单条
  articleItemById (params: any) {
    return Request.get({}, `/article/${params.id}`)
  },
  // 文章单条详情
  articleDetailById (params: any) {
    return Request.get({}, `/articleDetail/${params.id}`)
  },
  // 删除文章
  deleteArticleById (params: any) {
    return Request.get({}, `/article/delete/${params.id}`)
  }
}

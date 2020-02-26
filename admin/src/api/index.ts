/*
 * @Description: api目录结构
 * @Author: leo
 * @Date: 2019-09-18 20:33:50
 * @LastEditors: leo
 * @LastEditTime: 2020-02-26 16:43:34
 */
import Request from './Request'

export default {
  // 登录接口
  signin(params: any) {
    return Request.post(params, '/signin')
  },
  // 创建分类
  createCate(params: any) {
    return Request.post(params, '/tags')
  },
  // 获取分类列表
  cateList(params: any) {
    return Request.get(params, '/tags')
  },
  // 更新分类
  updateCate(params: any) {
    return Request.put(params, `/tags/${params.id}`)
  },
  // 删除分类
  deleteCateById(params: any) {
    return Request.delete(params, `/tags/${params.id}`)
  },
  // 创建文章
  createArticle(params: any) {
    return Request.post(params, '/articles')
  },
  // 文章列表
  articleList(params: any) {
    return Request.get(params, '/articles')
  },
  // 文章单条
  articleItemById(params: any) {
    return Request.get({}, `/articles/${params.id}`)
  },
  // 删除文章
  deleteArticleById(params: any) {
    return Request.delete({}, `/articles/${params.id}`)
  }
}

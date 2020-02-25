/*
 * @Description: 文章管理的路由
 * @Author: leo
 * @Date: 2019-09-17 12:00:32
 * @LastEditors: leo
 * @LastEditTime: 2019-09-17 12:35:38
 */
import loadable from 'utils/loadable'
import { iRoute } from '@interface/router.interface'

// 文章列表
const Article = loadable(() => import('views/article/Article'))
// 发布文章
const CreateArticle = loadable(() => import('views/article/CreateArticle'))
// 分类列表
const Categroies = loadable(() => import('views/article/Categroies'))

export const ArticleRoutes : iRoute[] = [
  {
    name: '文章列表',
    path: '/article/list',
    component: Article
  },
  {
    name: '发布文章',
    path: '/article/create',
    component: CreateArticle
  },
  {
    name: '分类列表',
    path: '/article/cate',
    component: Categroies
  }
]

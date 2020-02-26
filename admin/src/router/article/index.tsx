/*
 * @Description: 文章管理的路由
 * @Author: leo
 * @Date: 2019-09-17 12:00:32
 * @LastEditors: leo
 * @LastEditTime: 2020-02-26 16:51:39
 */
import { lazy } from 'react'
import { iRoute } from '@interface/router.interface'

// 文章列表
const Article = lazy(() => import('views/article/Article'))
// 发布文章
const CreateArticle = lazy(() => import('views/article/CreateOrUpdateArticle'))

export const ArticleRoutes: iRoute[] = [
  {
    name: '文章列表',
    path: '/article/list',
    component: Article
  },
  {
    name: '文章编辑',
    path: '/article/create',
    component: CreateArticle
  }
]

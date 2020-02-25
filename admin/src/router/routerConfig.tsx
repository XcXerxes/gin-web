/*
 * @Description: 路由配置页面
 * @Author: leo
 * @Date: 2019-09-16 20:37:18
 * @LastEditors: leo
 * @LastEditTime: 2020-02-25 19:29:22
 */
import React, { lazy } from 'react'
import { ArticleRoutes } from './article'
import { CategoryRoutes } from './categroy'
import { BookFilled, TagsFilled } from '@ant-design/icons'

// 管理控制台
const Article = lazy(() => import('views/article/route'))
const Categroy = lazy(() => import('views/categroy/route'))

const RouterConfig: any = [
  {
    name: '分类管理',
    path: '/categroy',
    component: Categroy,
    icon: <TagsFilled />,
    routes: [...CategoryRoutes]
  },
  {
    name: '文章管理',
    path: '/article',
    component: Article,
    icon: <BookFilled />,
    routes: [...ArticleRoutes]
  }
]
export default RouterConfig

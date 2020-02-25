/*
 * @Description: 路由配置页面
 * @Author: leo
 * @Date: 2019-09-16 20:37:18
 * @LastEditors: leo
 * @LastEditTime: 2019-09-17 12:34:13
 */
import loadable from 'utils/loadable'
import { ArticleRoutes } from './article'

// 管理控制台
const Article = loadable(() => import('views/article/route'))

const RouterConfig: any = [
  {
    name: '文章管理',
    path: '/article',
    component: Article,
    icon: 'control',
    routes: [...ArticleRoutes]
  }
]
export default RouterConfig

import { lazy } from 'react'
import { iRoute } from '@interface/router.interface'

// 分类列表
const Categroies = lazy(() => import('views/categroy/Categroies'))

export const CategoryRoutes: iRoute[] = [
  {
    name: '分类列表',
    path: '/categroy/list',
    component: Categroies
  }
]

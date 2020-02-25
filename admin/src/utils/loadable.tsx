// 按需加载
import React from 'react'
import Loadable from 'react-loadable'
import { Skeleton } from 'antd'

const LoadSkeleton = () => (
  <Skeleton active />
)

// 组件默认采用通用的loading, 如传入loading，则采用传入的过场组件
export default (loader: any, loading = LoadSkeleton) => {
  return Loadable({
    loader,
    loading
  })
}

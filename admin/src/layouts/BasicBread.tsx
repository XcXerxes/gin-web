import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {searchRouterLinkList} from 'router/util'

interface BasicBreadType {
  history?: any;
}
const BasicBread:React.FC<BasicBreadType> = ({ history }) => {
  const { pathname } = history.location
  const c = searchRouterLinkList( pathname )
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {c.map(BreadcrumbItem)}
    </Breadcrumb>
  )
}

interface BreadcrumbItem {
  name: string
  path?: string
}

const BreadcrumbItem: React.FC<BreadcrumbItem> = ({name, path}) => {
  return (
    <Breadcrumb.Item key={name}>
      {path ? (
        <Link to={path}>{name}</Link>
      ) : <span>{name}</span>}
    </Breadcrumb.Item>
  )
}

export default BasicBread

import React from 'react'
import { iRoute } from '@interface/router.interface'
import {matchMenuPath, matchOpenPath} from 'router/util'
import RouterConfig from 'router/routerConfig'
import { Menu, Icon } from 'antd'
const {SubMenu, ItemGroup} = Menu

interface BasicMenuProps {
  title?: string;
  history?: any;
}
const BasicMenu:React.FC<BasicMenuProps> = ({ history }) => {
  const { pathname } = history.location
  const defaultSelectedKeys = matchMenuPath(pathname)
  const defaultOpenKeys = matchOpenPath(pathname)
  console.log(defaultOpenKeys)
  // 切换菜单
  function handleMenu (e: any) {
    history.push(e.key)
  }
  return (
    <Menu
      defaultSelectedKeys={[defaultSelectedKeys]}
      defaultOpenKeys={[defaultOpenKeys]}
      mode="inline"
      theme="dark"
      style={{ height: '100%', borderRight: 0 }}
      onClick={handleMenu}
    >
      {
        RouterConfig.map(MenuSub)
      }
    </Menu>
  )
}

type SubPropsType = {
  routes?: iRoute[],
  name: string,
  path?: string,
  icon?: string
}

const MenuSub: React.FC<SubPropsType> = ({routes, name, path, icon}) => {
  if (path && routes && routes.length > 0) {
    console.log('-------subMenu', path)
    return (
    <SubMenu key={path} title={<TitleRender {...{name, icon}} />}>
        {routes.map(MenuSub)}
      </SubMenu>
    )
  } else if (!path && routes && routes.length > 0) {
    return (
      <ItemGroup key={name} title={name}>
        {routes.map(MenuSub)}
      </ItemGroup>
    )
  } else {
    return (
      <Menu.Item key={path}>
        <TitleRender {...{name, icon}} />
      </Menu.Item>
    )
  }
}

type TitlePropsType = {
  name: string,
  icon?: string | any
}

const TitleRender: React.FC<TitlePropsType> = ({name, icon}) => {
  if (icon && typeof icon === 'string') {
    return (
      <span>
        <Icon type={icon} />
        <span>{name}</span>
      </span>
    )
  } else if (icon && typeof icon === 'object' && icon.type) {
    return (
      <span>
        <Icon type={icon.type} theme={icon.theme} />
        <span>{name}</span>
      </span>
    )
  } else {
    return (
      <span>
        <span>{name}</span>
      </span>
    )
  }
}


export default BasicMenu

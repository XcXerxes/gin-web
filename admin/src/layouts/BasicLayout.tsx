import React, { useState } from 'react'
import BaseRouters from 'router'
import BasicMenu from './BasicMenu'
import BasicBread from './BasicBread'
import BasicHeader from './BasicHeader'
import { withRouter } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
const { Content, Sider } = Layout

interface BasicLayoutProps {

}
const BasicLayout:React.FC<BasicLayoutProps> = (props) => {
  const [collapsed, setcollapsed] = useState(false)
  function onCollapse (value: boolean) {
    setcollapsed(value)
  }
  return (
    <Layout>
      <BasicHeader />
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          theme="dark"
          onCollapse={onCollapse}
        >
          <BasicMenu title="11111" {...props} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <BasicBread {...props} />
          <Content
            style={{
              background: '#fff',
              margin: 0,
            }}
          >
            <BaseRouters />
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
      <BackTop />
    </Layout>
  )
}

export default withRouter(BasicLayout)

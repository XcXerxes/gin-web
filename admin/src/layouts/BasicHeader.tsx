import React from 'react'
import style from './style.module.less'
import { Layout, Avatar, Row, Col, Popover, Icon } from 'antd'

interface PropsType {
  title?: string,
}

class BasicHeader extends React.Component<PropsType> {

  render () {
    return (
      <Layout.Header className={style['my-header']}>
        <Row type="flex" justify="end" align="middle">
          <Col style={{paddingRight: '24px'}}>
            <Icon type="bell" />
          </Col>

          <Col style={{paddingRight: '24px'}}>
            <Icon type="question-circle" />
          </Col>

          <Col style={{paddingRight: '24px'}}>
            <Icon type="home" />
          </Col>

          <Col style={{paddingRight: '24px'}}>
            <span>简体中文</span>
          </Col>

          <Col style={{paddingRight: '24px'}}>
            <Popover content={<UserMenu />} placement="bottomRight" arrowPointAtCenter>
              <div className={style['my-header__user']}>
                <Avatar />
                <span className={style['my-header__name']}>123</span>
                <Icon type="caret-down" />
              </div>
            </Popover>
          </Col>

        </Row>
      </Layout.Header>
    )
  }
}
interface UserMenuProps {
  name?: string,
  level?: any;
  isVerify?: boolean;
  avatar?: string;
}
// 用户hover后
const UserMenu: React.FC<UserMenuProps> = ({name, level, isVerify, avatar}) => {
  return (
    <div className={style['my-header-menu']}>
      <Row type="flex" className={style['my-header-menu__bottom']}>
        <Col span={12} style={{textAlign: "left", paddingLeft: "8px"}}>
          <a className={style["bottom-link"]} href="/">
            <span style={{fontSize: "12px"}}>联系客服</span>
            <Icon type="question-circle" />
          </a>
        </Col>
        <Col span={12} style={{textAlign: "right", paddingRight: "8px"}}>
          <a className={style["bottom-link"]} href="/">
            <span style={{fontSize: "12px"}}>退出登录</span>
            <Icon type="logout" />
          </a>
        </Col>
      </Row>
    </div>
  )
}

export default BasicHeader

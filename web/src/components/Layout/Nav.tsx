import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

const navs = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '资讯',
    path: '/message'
  },
  {
    name: 'H5案例',
    path: '/demo'
  },
  {
    name: '关于',
    path: '/about'
  },
  {
    name: '联系',
    path: '/conncat'
  },
]

const StyledNav = styled.div`
  height: 100%;
  padding-left: 50px;
  @media only screen and (max-width: 992px) {
    padding-left: 0;
    margin: 0;
  }
`
const StyledUl = styled.ul`
  display: flex;
  height: 100%;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`
const StyledLi = styled.li<{ active: boolean }>`
  margin: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;
  transition: all .25s ease;
  ${({ active }: any) => active && 'border-bottom: 2px solid #6190e8'};
`
const StyledLink = styled(Link)`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 15px;
  transition: color .25s ease;
  &:hover {
    color: #6190e8;
  }
`
export interface XNavProps {
  location?: any;
}
const XNav:React.FC<XNavProps> = ({ location }) => {
  return (
    <StyledNav>
      <StyledUl>
        { navs.map((item: any) => (
          <StyledLi key={item.path} active={item.path === location.pathname}>
            <StyledLink to={item.path} >{item.name}</StyledLink>
          </StyledLi>
        ))}
      </StyledUl>
    </StyledNav>
  )
}

export default withRouter(XNav)

import React from 'react'
import styled from 'styled-components'

const StyledAside = styled.aside`
  width: 240px;
  padding: 20px 0 20px 15px;
  @media only screen and (max-width: 992px) {
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #ddd;
  }
`
const StyledLinks = styled.div`
  
`
const StyledTitleWrapper = styled.div`
  position: relative;
  padding-left: 15px;
  height: 20px;
  line-height: 20px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 3px;
    top: 0;
    background-color: #6190e8;
  }
`
const StyledTitle = styled.h2`
  font-size: 16px;
  font-weight: 400;
`
const StyledLinksBody = styled.div`
  padding: 10px 15px;
  @media only screen and (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
  }
`
const StyledLinkItem = styled.a`
  display: flex;
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all .25s ease;
  &:hover {
    color: #6190e8;
  }
  @media only screen and (max-width: 992px) {
    width: 45%;
    margin-right: 10%;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
`
const links = [
  {
    path: 'https://ling.jd.com',
    name: '玲珑智能设计'
  },
  {
    path: 'http://fex.baidu.com',
    name: '百度FEX'
  },
  {
    path: 'http://taobaofed.org',
    name: '淘宝FED'
  },
  {
    path: 'http://isux.tencent.com',
    name: 'ISUX'
  },
  {
    path: 'http://eux.baidu.com/',
    name: '百度EUX'
  }
]
const Aside:React.FC = () => {
  return (
    <StyledAside>
      <StyledLinks>
        <StyledTitleWrapper>
          <StyledTitle>友情链接</StyledTitle>
        </StyledTitleWrapper>
        <StyledLinksBody>
          {links.map((item: any) => (
            <StyledLinkItem target="_blank" href={item.path} key={item.path}>
              {item.name}
            </StyledLinkItem>
          ))}
        </StyledLinksBody>
      </StyledLinks>
    </StyledAside>
  )
}
export default Aside

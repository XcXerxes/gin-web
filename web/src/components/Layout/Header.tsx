import React from 'react'
import styled from 'styled-components'
import XNav from './Nav'
import SearchInput from '../SearchInput'

const StyledHeader = styled.header`
  height: 60px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 2px -3px 10px 0px rgba(0, 0, 0, 0.3);
  position: sticky;
  z-index: 10;
  top: 0;
  @media only screen and (max-width: 992px) {
    border-bottom: 1px solid #eee;
    padding: 0 15px;
  }
`
const StyledContent = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
`
const StyledLogo = styled.div`
  height: 100%;
  padding: 12px 0%;
`
const StyledLink = styled.a`
  display: flex;
  width: 105px;
  height: 36px;
`
const StyledLogoImg = styled.img`
  max-height: 100%;
`
const StyleLogoText = styled.h1`
  color: #6190e8;
  font-size: 24px;
`
const StyledNav = styled.div`
  @media only screen and (max-width: 992px) {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    background-color: #fff;
    height: 0;
    overflow: hidden;
  }
`

const StyledLeft = styled.div`
  display: flex;
  height: inherit;
`
const XHeader: React.FC = () => {
  return (
    <StyledHeader>
      <div className="grid">
        <StyledContent>
          <StyledLeft>
            <StyledLogo>
              <StyledLink href="https://github.com/XcXerxes" target="_blank">
                <StyleLogoText>Xcxerxes</StyleLogoText>
                {/* <StyledLogoImg src={require('../../assets/images/o2logo@2x.png')} alt="xcxerxes"/> */}
              </StyledLink>
            </StyledLogo>
            <StyledNav>
              <XNav />
            </StyledNav>
          </StyledLeft>
          <SearchInput placeholder="搜索" />
        </StyledContent>
      </div>
    </StyledHeader>
  )
}

export default XHeader

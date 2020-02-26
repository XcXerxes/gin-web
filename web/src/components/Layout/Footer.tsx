import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.footer`
  margin-top: 30px;
  background: #f8f8f8;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #eee;
`
const StyledCopyRight = styled.div`
  margin: 10px 0;
  font-size: 12px;
`
const StyledCaption = styled.p`
  margin-bottom: 5px;
`
const XFooter = () => {
  return (
    <StyledWrapper>
      <StyledCopyRight>
        <StyledCaption>Designed by XcXerxes</StyledCaption>
        <StyledCaption>Copyright © 2019. All Rights Reserved.</StyledCaption>
      </StyledCopyRight>
    </StyledWrapper>
  )
}

export default XFooter

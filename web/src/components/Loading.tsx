import React from 'react'
import styled from 'styled-components'
const StyledSpinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
`
const StyledDouble = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #6190e8;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2.0s infinite ease-in-out;

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
    }
  }
`
const StyledDouble2 = styled(StyledDouble)`
  animation-delay: -1.0s;
`
const Loading = () => {
  return (
    <StyledSpinner>
      <StyledDouble />
      <StyledDouble2 />
    </StyledSpinner>
  )
}
export default Loading

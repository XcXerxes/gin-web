import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
`
const StyledSearchIcon = styled.i`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  background-color: #eee;
  &::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    top: 50%;
    left: 50%;
    background: url(${require('../assets/images/search.png')}) no-repeat center center;
    background-size: cover;
    transform: translate(-50%, -50%);
  }
  &.hide {
    background: none;
  }
`

const StyledForm = styled.form`
  width: 200px;
  opacity: 1;
  transition: all .25s ease;
  &.hide {
    width: 0;
    opacity: 0;
  }
`
const StyledInput = styled.input`
  height: 30px;
  line-height: 20px;
  width: 100%;
  padding: 5px;
  border: 1px solid #eee;
  background-color: #fcfcfc;
  outline: 0;
`
export interface SearchInputProps {
  placeholder: string;
}
const SearchInput:React.FC<SearchInputProps> = (props) => {
  const [open, setopen] = useState(false)
  function toggle () {
    setopen(open => !open)
  }
  return (
    <StyledSearch className={open ? '' : 'hide'}>
      <StyledSearchIcon className={open ? '' : 'hide'} onClick={toggle} />
      <StyledForm className={open ? '' : 'hide'}>
        <StyledInput {...props} />
      </StyledForm>
    </StyledSearch>
  )
}

export default SearchInput

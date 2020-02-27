import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  font-size: 16px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff;
`
const StyledUl = styled.ul`
  display: flex;
  height: inherit;
  align-items: center;
  white-space: nowrap;
  position: relative;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  overflow-y: hidden;
`
const StyledLi = styled.li`
  padding: 0 10px;
  margin-right: 10px;
  height: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all .25s ease;
  &:hover {
    color: #6190e8;
  }
  &.active {
    background-color: #6190e8;
    color: #fff;
  }
`
export interface TabsProps {
  tabs: Array<any>;
  activeIndex: number;
  itemClick: (item: any, i: number) => void
}

const Tabs:React.FC<TabsProps> = ({ tabs, activeIndex, itemClick }) => {
  return (
    <StyledWrapper>
      <StyledUl>
        {tabs.map((item: any, index: number) => (
          <StyledLi onClick={() => itemClick(item, index)}
            className={ activeIndex === index ? 'active' : '' } key={item.id}>{item.name}</StyledLi>
        ))}
      </StyledUl>
    </StyledWrapper>
  )
}

export default Tabs

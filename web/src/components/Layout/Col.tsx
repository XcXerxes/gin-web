import React from 'react'
import styled from 'styled-components'

function getWidthString (span: string): string {
  if (!span) return ''
  let width = Number(span) / 12 * 100
  return `flex: 0 0 ${width}%`
}

const StyledCol = styled.div`
  ${({ xs }: any) => (xs ? getWidthString(xs) : 'flex: 0 0 100%')};
  @media only screen and (min-width: 768px) {
    ${({ sm }: any) => sm && getWidthString(sm)};
    ${({ gutter }: any) => gutter && `padding: 0 ${gutter / 2}px`};
  }
  @media only screen and (min-width: 992px) {
    ${({ md }: any) => md && getWidthString(md)};
    ${({ gutter }: any) => gutter && `padding: 0 ${gutter / 2}px`};
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg }: any) => lg && getWidthString(lg)};
    ${({ gutter }: any) => gutter && `padding: 0 ${gutter / 2}px`};
  }
  @media only screen and (min-width: 1600px) {
    ${({ xlg }: any) => xlg && getWidthString(xlg)};
    ${({ gutter }: any) => gutter && `padding: 0 ${gutter / 2}px`};
  }
`
export interface ColProps {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xlg?: string;
  gutter?: number;
}
const Col:React.FC<ColProps> = (props) => (
  <StyledCol {...props}>
    {props.children}
  </StyledCol>
)

export default Col

import React from 'react'
import styled from 'styled-components'
import Col from './Layout/Col'
import { Link } from 'react-router-dom'

const StyledArticle = styled(Link)`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  position: relative;
  transition: all 0.25s ease;
  overflow: hidden;
  &:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  @media only screen and (max-width: 992px) {
    margin: 0 15px 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`
const StyledLight = styled.i`
  cursor: pointer;
  position: absolute;
  left: -110%;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: -webkit-linear-gradient(
    0deg,
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.5),
    hsla(0, 0%, 100%, 0)
  );
  transform: skewx(-25deg);

  ${StyledArticle}:hover & {
    transition: all 0.6s ease;
    left: 100%;
  }
`
const StyledMedia = styled.div`
  width: 100%;
  overflow: hidden;
  height: 113px;
  @media (min-width: 992px) and (max-width: 1200px) {
    height: 130px;
  }
  @media only screen and (max-width: 992px) {
    height: auto;
  }
`
const StyledImg = styled.img`
  width: 100%;
`
const StyledFooter = styled.div`
  padding: 10px;
`
const StyledTitle = styled.h2`
  height: 24px;
  line-height: 24px;
  font-size: 1.1em;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 5px;
  text-overflow: ellipsis;
`
const StyledDesc = styled.p`
  height: 40px;
  line-height: 20px;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  box-orient: vertical;
  word-wrap: break-word;
  font-size: 0.8em;
`
export interface ArticleItemProps {
  title: string
  desc: string
  cover_image_url: string
  style?: any
  id: number
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  id,
  title,
  desc,
  cover_image_url,
  style
}) => {
  return (
    <Col sm="12" md="6" lg="4" xlg="3" gutter={20}>
      <StyledArticle to={`/article/${id}`} style={style}>
        <StyledMedia>
          <StyledImg
            src={`http://localhost:8000/${cover_image_url}`}
            alt={title}
          />
        </StyledMedia>
        <StyledFooter>
          <StyledTitle>{title}</StyledTitle>
          <StyledDesc>{desc}</StyledDesc>
        </StyledFooter>
        <StyledLight />
      </StyledArticle>
    </Col>
  )
}

export default ArticleItem

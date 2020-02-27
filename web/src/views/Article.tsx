import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import MarkdownIt from 'markdown-it'
import 'assets/styles/markdown.css'
import dayjs from 'dayjs'

import api from 'api'
// import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const StyledHeading = styled.div`
  margin: 30px 0;
`
const StyledHeadingImg = styled.img`
  max-width: 100%;
`
const StyledHeadingTitle = styled.h1`
  font-size: 30px;
`
const StyledAuthorWrapper = styled.div`
  margin: 30px 0 60px;
  display: flex;
`

const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'language-'
})

interface ArticleProps {
  location?: any
  match?: any
}
const Article: React.FC<ArticleProps> = props => {
  const [articleInfo, setarticleInfo] = useState<any>({})
  const articleRef = useRef(null)
  async function fetchArticleDetail() {
    try {
      console.log(props)
      const { id } = props.match.params
      const result: any = await api.articleDetailById({ id })
      if (result.code === 200) {
        setarticleInfo({ ...result.data })
      }
    } catch (error) {
      console.warn(error)
    }
  }
  useEffect(() => {
    // const md = new MarkdownIt({
    //   highlight: function (str, lang) {
    //     if (lang && hljs.getLanguage(lang)) {
    //       try {
    //         return hljs.highlight(lang, str).value;
    //       } catch (__) {}
    //     }

    //     return ''; // use external default escaping
    //   }
    // })
    fetchArticleDetail()
  }, [])
  const _html = React.useMemo(
    () =>
      articleInfo.content ? markdownParser.render(articleInfo.content) : '',
    [articleInfo.content]
  )
  return (
    <div className="container">
      <div className="grid">
        <StyledHeading>
          <StyledHeadingImg
            src={`http://localhost:8000/${articleInfo.cover_image_url}`}
            alt={articleInfo.title}
          />
        </StyledHeading>
        <StyledHeadingTitle>{articleInfo.title}</StyledHeadingTitle>
        <StyledAuthorWrapper>
          by {articleInfo.created_by} on{' '}
          {dayjs.unix(articleInfo.modified_on).format('YYYY-MM-DD HH:mm:ss')}
        </StyledAuthorWrapper>
        <div
          className="markdown-body"
          ref={articleRef}
          dangerouslySetInnerHTML={{ __html: _html }}
        />
      </div>
    </div>
  )
}
export default Article

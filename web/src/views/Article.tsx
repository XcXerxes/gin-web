import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Viewer from 'tui-editor/dist/tui-editor-Viewer'
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

interface ArticleProps {
  location?: any
  match?: any
}
const Article: React.FC<ArticleProps> = props => {
  const [articleInfo, setarticleInfo] = useState<any>({})
  const [content, setcontent] = useState('')
  const articleRef = useRef(null)
  async function fetchArticleDetail() {
    try {
      console.log(props)
      const { id } = props.match.params
      const result: any = await api.articleDetailById({ id })
      debugger
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
  return (
    <div className="container">
      <div className="grid">
        <StyledHeading>
          <StyledHeadingImg
            src={`http://localhost:7001/public/${articleInfo.thumbnail}`}
            alt={articleInfo.name}
          />
        </StyledHeading>
        <StyledHeadingTitle>{articleInfo.name}</StyledHeadingTitle>
        <StyledAuthorWrapper>
          by {articleInfo.author} on {articleInfo.updatedAt}
        </StyledAuthorWrapper>
        <div
          className="tui-editor-contents"
          ref={articleRef}
          dangerouslySetInnerHTML={{ __html: articleInfo.content }}
        />
      </div>
    </div>
  )
}
export default Article

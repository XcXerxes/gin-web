import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Tabs from 'components/Tab'
import Aside from 'components/Layout/Aside'
import ArticleItem from 'components/ArticleItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from 'components/Loading'
import api from 'api'


const StyledBannerWrapper = styled.div`
  height: 500px;
  @media only screen and (max-width: 992px) {
    height: 200px;
  }
`
const StyledBannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  @media only screen and (max-width: 768px) {
    object-fit: cover;
  }
`
const StyledContent = styled.div`
  display: flex;
  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
`
const StyledMain = styled.main`
  width: 930px;
  margin-right: 20px;
  @media only screen and (min-width: 1600px) {
    width: 1230px;
  }
  @media (max-width: 1200px) and (min-width: 992px) {
    width: 730px;
  }
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`
const StyledTabs = styled.div`
  margin-top: 20px;
  @media only screen and (max-width: 992px) {
    padding: 0 15px;
  }
`
const StyledPost = styled(InfiniteScroll)`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`
interface HomePorps {
  history?: any;
}
const Home:React.FC<HomePorps> = () => {
  const [list, setlist] = useState([])
  const [page, setpage] = useState(1)
  const [cateList, setcateList] = useState([])
  function fetchMoreData () {
    setpage(page => page + 1)
    console.log('-----')
    // setTimeout(() => {
    //   setlist(list.concat(data))
    // }, 1500)
  }
  async function fetchCate () {
    try {
      const result:any = await api.cateList({})
      if (result.code === 200) {
        setcateList(result.data)
      }
    } catch (error) {
      
    }
  }
  async function fetchArticleList () {
    try {
      const result:any = await api.articleList({ rows: 9, page})
      if (result.code === 200) {
        setlist(result.data.list)
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    fetchCate()
  }, [])
  useEffect(() => {
    fetchArticleList()
  }, [page])
  return (
    <div className="container">
      <StyledBannerWrapper>
        <StyledBannerImg src={require('../assets/images/banner.jpg')} alt="banner" />
      </StyledBannerWrapper>
      <div className="grid">
        <StyledContent>
          <StyledMain>
            <StyledTabs>
              <Tabs tabs={cateList} />
            </StyledTabs>
            <StyledPost
              dataLength={list.length}
              next={fetchMoreData}
              hasMore={false}
              loader={<Loading />}
            >
              {list.map((item:any, index: number) => (
                <ArticleItem {...item} key={item._id} />
              ))}
            </StyledPost>
          </StyledMain>
          <Aside />
        </StyledContent>
      </div>
    </div>
  )
}

export default Home

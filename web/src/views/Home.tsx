import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Tabs from 'components/Tab'
import Aside from 'components/Layout/Aside'
import ArticleItem from 'components/ArticleItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from 'components/Loading'
import api from 'api'

const StyledBannerWrapper = styled.div`
  height: 400px;
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
  history?: any
}
const Home: React.FC<HomePorps> = () => {
  const [list, setlist] = useState([])

  const [page, setpage] = useState(1)
  const [queryParams, setqueryParams] = useState({ page: 1, tag_id: -1 })
  const [cateList, setcateList] = useState<any>([])
  const [activeIndex, setactiveIndex] = useState(0)
  function fetchMoreData() {
    setpage(page => page + 1)
    console.log('-----')
    // setTimeout(() => {
    //   setlist(list.concat(data))
    // }, 1500)
  }
  async function fetchCate() {
    try {
      const result: any = await api.cateList({ page: 1 })
      if (result.code === 200) {
        setcateList(result.data.lists)
        setqueryParams((r: any) => ({ ...r, tag_id: result.data.lists[0].id }))
      }
    } catch (error) {}
  }
  async function fetchArticleList() {
    try {
      const result: any = await api.articleList(queryParams)
      if (result.code === 200) {
        setlist(result.data.lists)
      }
    } catch (error) {}
  }
  useEffect(() => {
    ;(async () => {
      await fetchCate()
    })()
  }, [])
  useEffect(() => {
    if (queryParams.tag_id !== -1) {
      fetchArticleList()
    }
  }, [queryParams.page, queryParams.tag_id])
  function itemClick(v: any, i: number) {
    setactiveIndex(i)
    setqueryParams((r: any) => ({ ...r, tag_id: cateList[i].id }))
  }
  return (
    <div className="container">
      <StyledBannerWrapper>
        <StyledBannerImg
          src={require('../assets/images/banner.jpg')}
          alt="banner"
        />
      </StyledBannerWrapper>
      <div className="grid">
        <StyledContent>
          <StyledMain>
            <StyledTabs>
              <Tabs
                itemClick={itemClick}
                tabs={cateList}
                activeIndex={activeIndex}
              />
            </StyledTabs>
            <StyledPost
              dataLength={list.length}
              next={fetchMoreData}
              hasMore={false}
              loader={<Loading />}
            >
              {list.map((item: any, index: number) => (
                <ArticleItem {...item} key={item.id} />
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

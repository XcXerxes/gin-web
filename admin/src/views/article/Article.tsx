import React, { useState, useEffect } from 'react'
import { Table, Form, Divider, Layout, Button, Modal, message } from 'antd'
import api from 'api'
import { iSuccessResult } from '@interface/global.interface'
import dayjs from 'dayjs'

const { Content } = Layout

const data:any = Array.from({ length: 6 }).map((_item, index: number) => {
  return {
    id: index + 1,
    title: `第一技术 ${index}`,
    caption: `第一生产力 ${index}`,
    createdAt: '2019-09-23'
  }
})

export interface ArticleProps {
  history?: any;
}
const Article:React.FC<ArticleProps> = ({ history }) => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center'
    },
    {
      title: '描述',
      dataIndex: 'caption',
      key: 'caption',
      align: 'center' as 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as 'center',
      render: (_text: any, record: any) => (
        <span>{dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      )
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center' as 'center',
      render: (_text: any, record:any) => (
        <span>
          <Button size="small" type="primary" onClick={() => editHandle(record)}>编辑</Button>
          <Divider type="vertical" />
          <Button size="small" type="danger" onClick={() => deleteHandle(record)}>删除</Button>
        </span>
      )
    }
  ]

  const [loading, setloading] = useState(false)
  const [list, setlist] = useState([])
  const [count, setcount] = useState(0)
  const [page, setpage] = useState(1)
  // 分页配置
  const paginationOptions = {
    showQuickJumper: true,
    total: count,
    onChange: (page: number) => setpage(page),
    showTotal: (total: number) => `总条数 ${total} 条`
  }
  // 发布文章
  function createArticle () {
    history.push('/article/create')
  }
  // 编辑文章
  function editHandle (record: any) {
    history.push(`/article/create?id=${record._id}`)
  }
  // 删除文章
  function deleteHandle (record: any) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      icon: null,
      onOk: () => {
        deleteArticleById(record._id)
      }
    })
  }
  // 删除当前的文章
  async function deleteArticleById (id: string) {
    try {
      const result:iSuccessResult = await api.deleteArticleById({id})
      if (result.code === 200) {
        message.success(result.message || '删除成功')
        fetchList()
      } else {
        message.error(result.message)
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 获取文章列表
  async function fetchList () {
    try {
      setloading(true)
      const result:iSuccessResult = await api.articleList({page, rows: 10})
      setloading(false)
      if (result.code === 200) {
        setcount(result.data.count)
        setlist(result.data.list)
      }
    } catch (error) {
      setloading(false)
      throw error
    }
  }
  useEffect(() => {
    fetchList()
  }, [page])
  return (
    <Content>
      <Form layout="inline">
        <Form.Item>
          <Button type="primary" onClick={createArticle}>发布文章</Button>
        </Form.Item>
      </Form>
      <Table
        size="small"
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={list}
        pagination={paginationOptions}
      />
    </Content>
  )
}

export default Article

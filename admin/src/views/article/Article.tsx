import React, { useState, useEffect } from 'react'
import {
  Table,
  Divider,
  Layout,
  Button,
  Modal,
  message,
  Form,
  Input
} from 'antd'
import api from 'api'
import { iSuccessResult } from '@interface/global.interface'
import dayjs from 'dayjs'
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons'
import styles from './article.module.less'

const { Content } = Layout

export interface ArticleProps {
  history?: any
}
const Article: React.FC<ArticleProps> = ({ history }) => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center' as 'center'
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center' as 'center'
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center' as 'center',
      render: (text: any) => <span>{text === 0 ? '启用' : '禁用'}</span>
    },
    {
      title: '创建时间',
      dataIndex: 'created_on',
      key: 'created_on',
      align: 'center' as 'center',
      render: (_text: any) => (
        <span>{dayjs.unix(_text).format('YYYY-MM-DD HH:mm')}</span>
      )
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center' as 'center',
      render: (_text: any, record: any) => (
        <span>
          <Button
            size="small"
            type="primary"
            onClick={() => editHandle(record)}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="danger"
            onClick={() => deleteHandle(record)}
          >
            删除
          </Button>
        </span>
      )
    }
  ]

  const [tableData, settableData] = useState({
    lists: [],
    total: 0,
    loading: false
  })
  const [page, setpage] = useState(1)

  // 发布文章
  function createArticle() {
    history.push('/article/create')
  }
  // 编辑文章
  function editHandle(record: any) {
    history.push(`/article/create?id=${record.id}`)
  }
  // 删除文章
  function deleteHandle(record: any) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteArticleById(record.id)
      }
    })
  }
  // 删除当前的文章
  async function deleteArticleById(id: string) {
    try {
      const result: iSuccessResult = await api.deleteArticleById({ id })
      if (result.code === 200) {
        message.success(result.msg || '删除成功')
        fetchList()
      } else {
        message.error(result.msg)
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 获取文章列表
  async function fetchList() {
    try {
      settableData((r: any) => ({ ...r, loading: true }))
      const result: iSuccessResult = await api.articleList({ page })
      if (result.code === 200) {
        settableData({
          lists: result.data.lists,
          total: result.data.total,
          loading: false
        })
      } else {
        settableData((r: any) => ({ ...r, loading: false }))
      }
    } catch (error) {
      settableData((r: any) => ({ ...r, loading: false }))
      throw error
    }
  }
  useEffect(() => {
    fetchList()
  }, [page])
  return (
    <Content>
      <div className={styles.heading}>
        <Form layout="inline">
          <Form.Item label="标题">
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="分类">
            <Input placeholder="请选择分类" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              onClick={createArticle}
            >
              发布文章
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        size="small"
        rowKey="id"
        loading={tableData.loading}
        columns={columns}
        bordered
        dataSource={tableData.lists}
        pagination={{
          showQuickJumper: true,
          total: tableData.total,
          current: page,
          onChange: (page: number) => setpage(page),
          showTotal: (total: number) => `总条数 ${total} 条`
        }}
      />
    </Content>
  )
}

export default Article

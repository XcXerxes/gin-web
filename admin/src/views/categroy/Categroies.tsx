import React, { useState, useEffect } from 'react'
import {
  Table,
  Divider,
  Layout,
  Button,
  Modal,
  Input,
  message,
  Form,
  Switch
} from 'antd'
import { iSuccessResult } from '@interface/global.interface'
import api from 'api'
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons'
import styles from './categroies.module.less'
import dayjs from 'dayjs'

const { Content } = Layout

export interface CategroiesProps {}

const Categroies: React.FC<CategroiesProps> = () => {
  const [form] = Form.useForm()
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
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
      key: 'state',
      align: 'center' as 'center',
      render: (text: any) => (
        <span>{dayjs.unix(text).format('YYYY-MM-DD HH:mm')}</span>
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
  const [list, setlist] = useState([])
  const [visible, setvisible] = useState(false)
  const [tableLoading, settableLoading] = useState(false)
  const [id, setid] = useState('')
  const [formData, setformData] = useState<any>({ name: '', state: true })
  const [queryParams, setqueryParams] = useState({
    page: 1,
    name: '',
    state: -1
  })
  // 判断是更新还是新增
  const [isAdd, setisAdd] = useState(true)

  // 编辑单条数据
  function editHandle(record: any) {
    setformData((r: any) => ({
      name: record.name,
      state: record.state === 0 ? true : false
    }))
    setid(record.id)
    setisAdd(false)
    setvisible(true)
  }
  // 删除单条 api
  async function deleteCateById(id: string) {
    try {
      const result: iSuccessResult = await api.deleteCateById({ id })
      if (result.code === 200) {
        message.success(result.msg || '删除成功')
        getCateList()
      } else {
        message.error(result.msg)
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 删除单条数据
  function deleteHandle(record: any) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteCateById(record.id)
      }
    })
  }
  // 创建数据
  async function createCate(values: any) {
    try {
      const result: iSuccessResult = await api.createCate(values)
      if (result.code === 200) {
        message.success(result.msg || '创建成功')
        form.resetFields()
        setvisible(false)
        getCateList()
      } else {
        message.error(result.msg || '创建失败')
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 更新数据
  async function updateCate(values: any) {
    try {
      const result: iSuccessResult = await api.updateCate({
        ...values,
        id
      })
      if (result.code === 200) {
        message.success(result.msg || '更新成功')
        form.resetFields()
        setvisible(false)
        getCateList()
      } else {
        message.error(result.msg || '更新失败')
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 提交创建分类
  function handleSubmit(values: any) {
    const newValues = { ...values, state: values.state ? 0 : 1 }
    if (isAdd) {
      createCate(newValues)
    } else {
      updateCate(newValues)
    }
  }
  // 点击创建分类
  function handlecreateCate() {
    setisAdd(true)
    setvisible(true)
  }
  // 取消
  function onCancel() {
    setvisible(false)
    form.resetFields()
  }
  // 重置表单
  function reset() {
    form.resetFields()
  }
  // 获取分类列表
  async function getCateList() {
    try {
      settableLoading(true)
      const result: iSuccessResult = await api.cateList(queryParams)
      settableLoading(false)
      if (result.code === 200) {
        setlist(result.data.lists)
      } else {
        message.error(result.msg)
      }
    } catch (error) {
      settableLoading(false)
      message.error(error.toString())
    }
  }
  useEffect(() => {
    getCateList()
  }, [queryParams.name, queryParams.page])
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 21,
        offset: 3
      }
    }
  }
  // 页数改变时
  function handleChange(page: number) {
    setqueryParams((r: any) => ({ ...r, page }))
  }
  return (
    <Content>
      <div className={styles.heading}>
        <Form layout="inline">
          <Form.Item>
            <Input placeholder="请输入标签名" />
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
              onClick={handlecreateCate}
            >
              创建分类
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        size="small"
        rowKey="id"
        bordered
        loading={tableLoading}
        columns={columns}
        dataSource={list}
        pagination={{
          showQuickJumper: true,
          current: queryParams.page,
          onChange: handleChange,
          showTotal: (total: number) => `总条数 ${total}`
        }}
      />
      <Modal
        title="创建分类"
        visible={visible}
        footer={null}
        onCancel={onCancel}
      >
        <Form
          onFinish={handleSubmit}
          form={form}
          initialValues={formData}
          {...formItemLayout}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入名称!'
              }
            ]}
            hasFeedback
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="状态" name="state" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              style={{ width: '150px', marginRight: '10px' }}
              type="default"
              onClick={reset}
            >
              重置
            </Button>
            <Button style={{ width: '150px' }} type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}

export default Categroies

import React, { useState, useEffect, FormEvent } from 'react'
import { Table, Form, Divider, Layout, Button, Modal, Input, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { iSuccessResult } from '@interface/global.interface'
import api from 'api'

const { Content } = Layout

export interface CategroiesProps extends FormComponentProps {

}
type formTypes = {
  name: string,
  sort: number
}
const Categroies:React.FC<CategroiesProps> = ({ form }) => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center'
    },
    {
      title: '排序',
      dataIndex: 'sortNum',
      key: 'sortNum',
      align: 'center' as 'center'
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
          <Button size="small" type="danger" onClick={() => deleteHandle(record)} >删除</Button>
        </span>
      )
    }
  ]
  const [list, setlist] = useState([])
  const [visible, setvisible] = useState(false)
  const [tableLoading, settableLoading] = useState(false)
  const [name, setname] = useState('')
  const [sort, setsort] = useState('')
  const [id, setid] = useState('')
  // 判断是更新还是新增
  const [isAdd, setisAdd] = useState(true)

  // 编辑单条数据
  function editHandle (record: any) {
    getCateById(record._id)
  }
  // 获取单条数据
  async function getCateById (id: string) {
    try {
      const result:iSuccessResult = await api.cateItemById({ id })
      if (result.code === 200) {
        const { name, sortNum, _id } = result.data
        setvisible(true)
        setname(name)
        setsort(sortNum)
        setid(_id)
        console.log('-----------false')
        setisAdd(false)
      } else {
        message.error(result.message)
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 删除单条 api
  async function deleteCateById (id: string) {
    try {
      const result:iSuccessResult = await api.deleteCateById({id})
      if (result.code === 200) {
        message.success(result.message || '删除成功')
        getCateList()
      } else {
        message.error(result.message)
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 删除单条数据
  function deleteHandle (record: any) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      icon: null,
      onOk: () => {
        deleteCateById(record._id)
      }
    })
  }
  // 创建数据
  async function createCate (values: any) {
    try {
      const result:iSuccessResult = await api.createCate(values)
      if (result.code === 200) {
        message.success(result.message || '创建成功')
        form.resetFields()
        setvisible(false)
        getCateList()
      } else {
        message.error(result.message || '创建失败')
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 更新数据
  async function updateCate (values: any) {
    try {
      const result:iSuccessResult = await api.updateCate({ ...values, _id: id })
      if (result.code === 200) {
        message.success(result.message || '创建成功')
        form.resetFields()
        setvisible(false)
        getCateList()
      } else {
        message.error(result.message || '创建失败')
      }
    } catch (error) {
      message.error(error.toString())
    }
  }
  // 分页配置
  const paginationOptions = {
    showQuickJumper: true,
    showTotal: (total: number) => `总条数 ${total}`
  }
  // 提交创建分类
  function handleSubmit (e: FormEvent) {
    e.preventDefault()
    validateFields(async(err: any, values: formTypes) => {
      if (!err) {
        debugger
        if (isAdd) {
          console.log('-----------------')
          createCate(values)
        } else {
          updateCate(values)
        }
      }
    })
  }
  // 点击创建分类
  function handlecreateCate () {
    setvisible(true)
  }
  // 取消
  function onCancel () {
    setvisible(false)
    form.resetFields()
  }
  // 重置表单
  function reset () {
    form.resetFields()
  }
  // 获取分类列表
  async function getCateList () {
    try {
      settableLoading(true)
      const result:iSuccessResult = await api.cateList({})
      settableLoading(false)
      if (result.code === 200) {
        setlist(result.data)
      } else {
        message.error(result.message)
      }
    } catch (error) {
      settableLoading(false)
      message.error(error.toString())
    }
  }
  useEffect(() => {
    getCateList()
  }, [])
  const { getFieldDecorator, validateFields } = form
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 21,
        offset: 3,
      },
    },
  }
  return (
    <Content>
      <Form layout="inline">
        <Form.Item>
          <Button type="primary" onClick={handlecreateCate}>创建分类</Button>
        </Form.Item>
      </Form>
      <Table
        size="small"
        rowKey="_id"
        loading={tableLoading}
        columns={columns}
        dataSource={list}
        pagination={paginationOptions}
      />
      <Modal title="创建分类" visible={visible} footer={null} onCancel={onCancel}>
        <Form onSubmit={handleSubmit} {...formItemLayout}>
          <Form.Item label="名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [
                {
                  required: true,
                  message: '请输入名称!'
                },
              ],
            })(<Input placeholder="请输入名称" />)}
          </Form.Item>
          <Form.Item label="排序" hasFeedback>
            {getFieldDecorator('sort', {
              initialValue: sort,
              rules: [
                {
                  required: true,
                  message: '请输入排序!'
                },
              ],
            })(<Input placeholder="请输入名称" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button style={{ width: '150px', marginRight: '10px'}} type="default" onClick={reset}>
              重置
            </Button>
            <Button style={{ width: '150px'}} type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}

const CategroiesForm = Form.create({name: 'cateCreate'})(Categroies)
export default CategroiesForm

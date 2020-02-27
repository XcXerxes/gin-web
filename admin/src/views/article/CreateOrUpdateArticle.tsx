import React, { useState, useEffect, useCallback } from 'react'
import {
  Card,
  Input,
  Select,
  Upload,
  Button,
  Col,
  Modal,
  message,
  Switch,
  Form
} from 'antd'
// import Editor from 'tui-editor'
import MarkdownIt from 'markdown-it'
import ReactMarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useSelector } from 'react-redux'
import { iSuccessResult } from '@interface/global.interface'
import api from 'api'
import { PlusCircleFilled } from '@ant-design/icons'

const mdParser = new MarkdownIt()

export interface IAdverCreateProps {
  test: string
  history?: any
  location?: any
}

const AdverCreate: React.FC<IAdverCreateProps> = props => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [cardLoading, setCardLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<any>([])
  const [formData, setformData] = useState({
    tag_id: '',
    title: '',
    desc: '',
    cover_image_url: '',
    content: '',
    state: true
  })
  const { categroy } = useSelector(
    useCallback(
      (state: any) => ({
        categroy: state.categroy
      }),
      []
    )
  )
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  }
  const contentItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 22 }
    }
  }
  const ButtonItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8, offset: 3 }
    }
  }
  useEffect(() => {
    const { location } = props
    if (location.search) {
      const id = location.search.split('=')[1]
      getInfo(id)
    }
  }, [])
  /**
   * 获取单个的信息
   * @param id
   */
  async function getInfo(id: string) {
    try {
      setCardLoading(true)
      const result: iSuccessResult = await api.articleItemById({ id })
      setCardLoading(false)
      if (result.code === 200) {
        const {
          tag_id,
          title,
          desc,
          content,
          state,
          cover_image_url
        } = result.data
        setformData((r: any) => ({
          tag_id,
          title,
          desc,
          content,
          state: state === 0,
          cover_image_url
        }))
        form.resetFields()
      } else {
        message.error(result.msg || '获取失败')
      }
    } catch (error) {
      setCardLoading(false)
      throw error
    }
  }
  /**
   * 提交信息
   * @param e
   */
  function handleSubmit(values: any) {
    const { content, cover_image_url } = formData
    const newValues = {
      ...values,
      state: values.state ? 0 : 1,
      cover_image_url,
      content
    }
    const { location } = props
    if (location.search) {
      const id = location.search.split('=')[1]
      updateAdver(id)
    } else {
      createArticle(newValues)
    }
  }
  async function createArticle(params: any) {
    try {
      setLoading(true)
      const result: iSuccessResult = await api.createArticle(params)
      setLoading(false)
      if (result.code === 200) {
        message.success(result.msg || '创建成功')
        props.history.push('/article/list')
      } else {
        message.error(result.msg || '创建失败')
      }
    } catch (error) {
      setLoading(false)
      message.error(error.toString())
      throw error
    }
  }
  async function updateAdver(id: string) {
    try {
      setLoading(true)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  /**
   * 上传图片
   * @param info
   */
  const uploadHandleChange = ({ file, fileList }: any) => {
    setFileList(fileList)
    if (file.status === 'uploading') {
      // setLoading(true)
    }
    if (file.status === 'done') {
      setformData((r: any) => ({
        ...r,
        cover_image_url: file.response.data.image_save_url
      }))
      // setLoading(false)
    }
  }
  /**
   * 取消预览
   */
  function handleCancel() {
    setPreviewVisible(false)
  }
  /**
   * 打开预览
   */
  function handlePreview() {
    setPreviewVisible(true)
  }
  const uploadButton = (
    <div>
      <PlusCircleFilled style={{ fontSize: '28px' }} />
      <div className="ant-upload-text">上传图片</div>
    </div>
  )
  // 预览图片
  const previewImage: string = React.useMemo(
    () => 'http://localhost:8000/' + formData.cover_image_url,
    [formData.cover_image_url]
  )
  // markdown 内容改变时调用
  function handleEditorChange({ text }: any) {
    setformData((r: any) => ({ ...r, content: text }))
  }
  return (
    <Card loading={cardLoading}>
      <Form
        form={form}
        initialValues={formData}
        onFinish={handleSubmit}
        {...formItemLayout}
      >
        <Form.Item
          label="文章名称："
          name="title"
          rules={[
            {
              required: true,
              message: '请输入文章名称!'
            }
          ]}
          hasFeedback={true}
        >
          <Input placeholder="请输入文章名称" />
        </Form.Item>
        <Form.Item
          label="文章描述："
          name="desc"
          rules={[
            {
              required: true,
              message: '请输入描述!'
            }
          ]}
          hasFeedback={true}
        >
          <Input.TextArea placeholder="请输入描述" rows={4} />
        </Form.Item>
        <Form.Item
          label="文章分类："
          name="tag_id"
          rules={[
            {
              required: true,
              message: '请选择分类!'
            }
          ]}
          hasFeedback={true}
        >
          <Select placeholder="请选择分类">
            {categroy.cateList.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="缩略图："
          name="cover_image_url"
          rules={[
            {
              required: true,
              message: '请选择分类!'
            }
          ]}
        >
          <div className="clearfix">
            <Upload
              name="image"
              action={'http://localhost:8000/api/v1/admin/upload'}
              listType="picture-card"
              onChange={uploadHandleChange}
              fileList={fileList}
              onPreview={handlePreview}
            >
              {formData.cover_image_url ? (
                <img
                  src={previewImage}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </Form.Item>
        <Form.Item label="状态：" name="state" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          {...contentItemLayout}
          rules={[
            {
              required: true,
              message: '请输入文章内容!'
            }
          ]}
          label="文章内容："
        >
          <ReactMarkdownEditor
            value={formData.content}
            onChange={handleEditorChange}
            renderHTML={text => mdParser.render(text)}
          />
        </Form.Item>
        <Form.Item {...ButtonItemLayout}>
          <Col xs={24} sm={8}>
            <Button block={true}>重置信息</Button>
          </Col>
          <Col xs={24} sm={8} offset={2}>
            <Button
              loading={loading}
              block={true}
              htmlType="submit"
              type="primary"
            >
              提交信息
            </Button>
          </Col>
        </Form.Item>
      </Form>
    </Card>
  )
}
export default AdverCreate

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef, useCallback } from 'react'
import { Card, Form, Input, Select, Upload, Icon, Button, Col, Modal, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import Editor from 'tui-editor'
import { useMappedState } from 'redux-react-hook'
import { iSuccessResult } from '@interface/global.interface'
import api from 'api'

export interface IAdverCreateProps extends FormComponentProps {
  test: string;
  history?: any;
  location?: any;
}

const AdverCreate:React.FC<IAdverCreateProps> = (props) => {
  const [name, setname] = useState('')
  const [caption, setcaption] = useState('')
  const [author, setauthor] = useState('')
  const [cateId, setcateId] = useState(1)
  const [thumbnail, setthumbnail] = useState('')
  const [loading, setLoading] = useState(false)
  const [cardLoading, setCardLoading] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<any>([])
  const [simplemd, setsimplemd] = useState<any>(null)
  // const [content, setcontent] = useState('')
  const editorRef = useRef<any>()
  const { categroy } = useMappedState(
    useCallback(
      (state: any) => ({
        categroy: state.categroy
      }),
      []
    )
  )
  console.log('----------=============', categroy)
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }
  const contentItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 22 },
    },
  }
  const ButtonItemLayout = {
    wrapperCol: {
      xs: { span: 24},
      sm: { span: 8, offset: 3 }
    }
  }
  useEffect(() => {
    let currentSimplemd:any = new Editor({
      el: editorRef.current,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '300px'
    })
    const { location } = props
    if (location.search) {
      const id = location.search.split('=')[1]
      getInfo(id, currentSimplemd)
    } else {
      setsimplemd(currentSimplemd)
    }
  }, [])
  /**
   * 获取单个的信息
   * @param id
   */
  async function getInfo (id: string, currentSimplemd: any) {
    try {
      setCardLoading(true)
      const result: iSuccessResult = await api.articleItemById({ id })
      setCardLoading(false)
      if (result.code === 200) {
        const { data } = result
        setname(data.name)
        setcaption(data.caption)
        setauthor(data.author)
        setcateId(data.cateId)
        setthumbnail(data.thumbnail)
        setsimplemd(currentSimplemd)
        currentSimplemd.value(data.content)
      } else {
        message.error(result.message || '获取失败')
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
  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.form.validateFields(async(err, values) => {
      if (!err) {
        const { location } = props
        if (location.search) {
          const id = location.search.split('=')[1]
          updateAdver(id)
        } else {
          createArticle(values)
        }
      }
    })
  }
  async function createArticle (params: any) {
    try {
      setLoading(true)
      const result:iSuccessResult = await api.createArticle({...params, content: simplemd.getMarkdown(), thumbnail: thumbnail.replace(/.*\/$/, '')})
      setLoading(false)
      if (result.code === 200) {
        message.success(result.message || '创建成功')
        props.history.push('/article/list')
      } else {
        message.error(result.message || '创建失败')
      }
    } catch (error) {
      setLoading(false)
      message.error(error.toString())
      throw error
    }
  }
  async function updateAdver (id: string) {
    try {
      setLoading(true)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  function handleSelectChange (value: number) {
    console.log('======================')
    setcateId(value)
  }
  /**
   * 上传图片
   * @param info 
   */
  const uploadHandleChange = (info:any) => {
    setFileList(info.fileList)
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
    console.log('========================', info)
    if (info.file.status === 'done') {
      setLoading(false)
      setthumbnail(info.fileList[0].name)
    }
  }
  /**
   * 取消预览
   */
  function handleCancel () {
    setPreviewVisible(false)
  }
  /**
   * 打开预览
   */
  function handlePreview () {
    setPreviewVisible(true)
  }
  const { getFieldDecorator } = props.form
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传图片</div> 
    </div>
  )
  const previewImage:string = 'http://localhost:7001/public/' + thumbnail
  return (
    <Card>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label="文章名称" hasFeedback={true}>
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [
              {
                required: true,
                message: '请输入文章名称!'
              },
            ],
          })(<Input placeholder="请输入文章名称" />)}
        </Form.Item>
        <Form.Item label="文章描述" hasFeedback={true}>
          {getFieldDecorator('caption', {
            initialValue: caption,
            rules: [
              {
                required: true,
                message: '请输入描述!'
              },
            ],
          })(<Input.TextArea placeholder="请输入描述" rows={4} />)}
        </Form.Item>
        <Form.Item label="作者名称" hasFeedback={true}>
          {getFieldDecorator('author', {
            initialValue: author,
            rules: [
              {
                required: true,
                message: '请输入作者名称!'
              },
            ],
          })(<Input placeholder="请输入作者名称" />)}
        </Form.Item>
        <Form.Item label="文章分类" hasFeedback={true}>
          {getFieldDecorator('cateId', {
            initialValue: cateId,
            rules: [
              {
                required: true,
                message: '请选择分类!',
              },
            ],
          })(<Select
            placeholder="请选择分类"
            onChange={handleSelectChange}
          >
            {categroy.cateList.map((item: any) => (
              <Select.Option key={item._id} value={item.sortNum}>{item.name}</Select.Option>
            ))}
          </Select>)}
        </Form.Item>
        <Form.Item label="缩略图">
          {getFieldDecorator('thumbnail', {
            initialValue: thumbnail
          })(
            <div className="clearfix">
              <Upload name="logo" action={`/api/upload`} listType="picture-card" onChange={uploadHandleChange}
                fileList={fileList}
                onPreview={handlePreview}
              >
                { thumbnail ? null : uploadButton }
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          )}
        </Form.Item>
        <Form.Item {...contentItemLayout} label="文章内容">
        {getFieldDecorator('content', {
            rules: [
              {
                required: false,
                message: '请输入名称!'
              },
            ],
          })(<div ref={editorRef} />)}
        </Form.Item>
        <Form.Item {...ButtonItemLayout}>
          <Col xs={24} sm={8}>
            <Button block={true}>重置信息</Button>
          </Col>
          <Col xs={24} sm={8} offset={2}>
            <Button loading={loading} block={true} htmlType="submit" type="primary">提交信息</Button>
          </Col>
        </Form.Item>
      </Form>
    </Card>
  )
}
const WrapperAdverCreateForm = Form.create({name: 'adverCreate'})(AdverCreate)
export default (WrapperAdverCreateForm)

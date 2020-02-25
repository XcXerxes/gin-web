import React, { useState } from 'react'
import styles from './user.module.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Button, Card, Col, Row, message, Form } from 'antd'
import api from 'api'
import { iSuccessResult } from '@interface/global.interface'
import { setToken } from 'utils/auth'

interface LoginProps {
  history?: any
}
const Login: React.FC<LoginProps> = ({ history }) => {
  const [form] = Form.useForm()
  const [loading, setloading] = useState(false)
  // 提交登录
  async function handleSubmit(values: any) {
    try {
      setloading(true)
      const result: iSuccessResult = await api.signin(values)
      setloading(false)
      if (result && result.code === 200) {
        message.success(result.msg || '登录成功')
        setToken(result.data.token)
        history.push('/')
        form.resetFields()
      } else {
        message.error(result.msg || '登录失败')
      }
    } catch (error) {
      setloading(false)
      message.error(error.toString())
    }
  }
  // input 改变时
  return (
    <Row justify="center" className={styles['user-wrapper']}>
      <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
        <Card title="后台系统管理" className={styles['login-card']}>
          <Form
            form={form}
            onFinish={handleSubmit}
            className={styles['login-form']}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Login

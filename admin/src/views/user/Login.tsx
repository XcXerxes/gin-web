import React, { FormEvent, useState } from 'react'
import styles from './user.module.less'
import { Form, Icon, Input, Button, Card, Col, Row, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import api from 'api'
import { iSuccessResult } from '@interface/global.interface'
import { setToken } from 'utils/auth'

interface LoginProps {
  form?: any;
  history?: any;
}
const Login:React.FC<LoginProps> = ({ form, history }) => {
  const [loading, setloading] = useState(false)
  const { getFieldDecorator, validateFields } = form
  // 提交登录
  function handleSubmit (e: FormEvent) {
    e.preventDefault()
    validateFields( async (err: any, values: any) => {
      if (!err) {
        try {
          setloading(true)
          const result:iSuccessResult = await api.signin(values)
          setloading(false)
          if (result && result.code === 200) {
            message.success(result.message || '登录成功')
            setToken(result.data)
            history.push('/')
            form.resetFields()
          } else {
            message.error(result.message || '登录失败')
          }
        } catch (error) {
          setloading(false)
          message.error(error.toString())
        }
      }
    })
  }
  // input 改变时
  return (
    <Row type="flex" justify="center" className={styles['user-wrapper']}>
      <Col xs={24} sm={16} md={12} lg={10} xl={8} xxl={6}>
        <Card title="后台系统管理" className={styles['login-card']}>
          <Form onSubmit={handleSubmit} className={styles['login-form']}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Form.create<FormComponentProps>({name: 'login'})(Login)

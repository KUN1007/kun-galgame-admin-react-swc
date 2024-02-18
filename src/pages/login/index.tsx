import React, { useState, ChangeEvent } from 'react'
import { Input, Flex, Button } from 'antd'
import { loginApi } from '@/api/login/login'

interface LoginState {
  name: string
  password: string
}

const LoginPage: React.FC = () => {
  const [state, setState] = useState<LoginState>({
    name: '',
    password: '',
  })

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, name: e.target.value })

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, password: e.target.value })

  const handleLogin = async () => {
    const userInfo = await loginApi({
      name: state.name,
      password: state.password,
    })
    console.log(userInfo)
  }

  return (
    <Flex justify="center" align="center" vertical style={{ height: '100dvh' }}>
      <Flex style={{ maxWidth: '24rem', width: '100%' }} gap="middle" vertical>
        <Flex justify="center" align="center">
          <h1
            style={{ marginBottom: '30px', color: 'var(--kungalgame-blue-4)' }}
          >
            KUN Visualnovel
          </h1>
          <span style={{ margin: '0.5rem', color: 'var(--kungalgame-red-5)' }}>
            admin
          </span>
        </Flex>

        <div>
          <label htmlFor="name">用户名或邮箱</label>
          <Input
            size="large"
            style={{ marginTop: '1rem' }}
            id="name"
            placeholder="Basic usage"
            value={state.name}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          <label htmlFor="password">密码</label>
          <Input
            size="large"
            style={{ marginTop: '1rem' }}
            id="password"
            placeholder="Basic usage"
            value={state.password}
            onChange={handlePasswordChange}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button size="large" block type="primary" onClick={handleLogin}>
            登录
          </Button>
        </div>
      </Flex>

      <Flex>
        <Button size="large" block style={{ marginTop: '5rem' }} type="dashed">
          主站
        </Button>
      </Flex>
    </Flex>
  )
}

export default LoginPage

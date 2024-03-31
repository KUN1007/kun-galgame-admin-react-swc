import React, { useState, ChangeEvent } from 'react'
import { Input, Flex, Button, notification } from 'antd'
import { loginApi } from '@/api/login/login'
import { useUserStore } from '@/store/modules/userStore'
import { Form, useNavigate } from 'react-router-dom'

interface LoginState {
  name: string
  password: string
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const [api, contextHolder] = notification.useNotification()

  const [state, setState] = useState<LoginState>({
    name: '',
    password: ''
  })

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, name: e.target.value })

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, password: e.target.value })

  const handleLogin = async () => {
    const userInfo = await loginApi({
      name: state.name,
      password: state.password
    })

    console.log(userInfo)

    if (userInfo.data) {
      navigate('/overview')
      userStore.setInfo(userInfo.data)
    } else {
      api['error']({
        message: userInfo.message,
        placement: 'top'
      })
    }
  }

  return (
    <>
      {contextHolder}
      <Flex justify='center' align='center' vertical className='h-dvh'>
        <Flex className='w-fall max-w-96' gap='middle' vertical>
          <Flex justify='center' align='center'>
            <h1 className='mb-5 text-3xl font-bold text-blue-500'>
              KUN Visualnovel
            </h1>
            <span className='m-3 text-red-700'>admin</span>
          </Flex>

          <Form className='flex flex-col'>
            <label htmlFor='name'>Username or Email</label>
            <Input
              size='large'
              className='my-4'
              id='name'
              type='text'
              autoComplete='username'
              placeholder='Please input your username or email'
              value={state.name}
              onChange={handleEmailChange}
            />

            <label htmlFor='password'>Password</label>
            <Input
              size='large'
              className='mt-4'
              id='password'
              type='password'
              autoComplete='password'
              placeholder='Please input your password'
              value={state.password}
              onChange={handlePasswordChange}
            />
          </Form>

          <div className='mt-2'>
            <Button size='large' block type='primary' onClick={handleLogin}>
              LOGIN
            </Button>
          </div>
        </Flex>

        <Flex>
          <a className='mt-20 w-fll' href='https://www.kungal.com'>
            GO TO Forum
          </a>
        </Flex>
      </Flex>
    </>
  )
}

export default LoginPage

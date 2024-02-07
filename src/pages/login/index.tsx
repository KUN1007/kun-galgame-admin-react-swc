import { FC } from 'react'
import { Input, Flex, Button } from 'antd'

const LoginPage: FC = () => {
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
          <label htmlFor="email">用户名或邮箱</label>
          <Input
            size="large"
            style={{ marginTop: '1rem' }}
            id="email"
            placeholder="Basic usage"
          />
        </div>

        <div>
          <label htmlFor="password">密码</label>
          <Input
            size="large"
            style={{ marginTop: '1rem' }}
            id="password"
            placeholder="Basic usage"
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button size="large" block type="primary">
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

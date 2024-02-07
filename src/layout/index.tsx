import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'
import { Layout, theme, Flex, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { LayoutMenu } from './menu'

const { Content, Sider } = Layout

const KunLayout: FC = () => {
  useTitle()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ height: '100dvh' }}>
      <Flex align="center" style={{ padding: '1rem' }}>
        <img width={50} src="/favicon.webp" alt="鲲 Galgame" />
        <h2 style={{ marginLeft: '1rem' }}>鲲 Galgame Admin</h2>
      </Flex>
      <Layout>
        <Sider
          collapsed={collapsed}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <LayoutMenu />

          <Button
            block
            size="large"
            type="text"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Sider>
        <Layout style={{ padding: '0 1rem 1rem' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default KunLayout

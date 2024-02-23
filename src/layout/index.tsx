import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'
import { Layout, theme, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { LayoutMenu } from './menu'
import { KunHeader } from './header'

const { Content, Sider } = Layout

const KunLayout: FC = () => {
  useTitle()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="h-dvh">
      <KunHeader />

      <Layout>
        <Sider
          collapsed={collapsed}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <LayoutMenu />

          <Button block size="large" type="text" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Sider>
        <Layout className="px-4">
          <Content className="max-h-full p-8 m-0 bg-white rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default KunLayout

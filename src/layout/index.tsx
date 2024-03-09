import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/modules/userStore'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { LayoutMenu } from './menu'
import { KunHeader } from './header'

const { Content, Sider } = Layout

const KunLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const userStore = useUserStore()
  const navigate = useNavigate()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    if (!userStore.user.token) {
      navigate('/login')
    }
  }, [navigate, userStore.user.token])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="max-h-dvh h-dvh">
      <KunHeader />

      <Layout>
        <Sider
          collapsed={collapsed}
          width={200}
          style={{ background: colorBgContainer }}
          className="overflow-hidden rounded-lg"
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

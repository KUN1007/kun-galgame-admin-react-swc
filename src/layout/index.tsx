import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useTitle } from '@/hooks/useTitle'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'

const { Content, Sider } = Layout

const items2: MenuProps['items'] = []

const KunLayout: FC = () => {
  useTitle()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ height: '100dvh' }}>
      <Sider width={200} style={{ background: colorBgContainer }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items2}
        />
      </Sider>
      <Layout style={{ padding: '1rem' }}>
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
  )
}

export default KunLayout

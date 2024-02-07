import { FC, createElement } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import {
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  RollbackOutlined,
  CommentOutlined,
  NotificationOutlined,
} from '@ant-design/icons'

interface MenuItem {
  key: string
  label: string
}

const itemName: MenuItem[] = [
  {
    key: 'overview',
    label: '论坛概览',
  },
  {
    key: 'user',
    label: '用户管理',
  },
  {
    key: 'topic',
    label: '话题管理',
  },
  {
    key: 'reply',
    label: '回复管理',
  },
  {
    key: 'comment',
    label: '评论管理',
  },
  {
    key: 'notice',
    label: '公告管理',
  },
]

const menuItems: MenuProps['items'] = [
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  RollbackOutlined,
  CommentOutlined,
  NotificationOutlined,
].map((icon, index) => ({
  key: itemName[index].key,
  icon: createElement(icon),
  label: itemName[index].label,
}))

export const LayoutMenu: FC = function () {
  const navigate = useNavigate()
  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ borderRight: 0 }}
      items={menuItems}
      onClick={handleMenuClick}
    />
  )
}

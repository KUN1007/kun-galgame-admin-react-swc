import { FC, createElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Modal } from 'antd'
import {
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  RollbackOutlined,
  CommentOutlined,
  NotificationOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useUserStore } from '@/store/modules/userStore'
import { menuItem } from './menuItem'
import type { MenuProps } from 'antd'

const menuItems: MenuProps['items'] = [
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  RollbackOutlined,
  CommentOutlined,
  NotificationOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
].map((icon, index) => ({
  key: menuItem[index].key,
  icon: createElement(icon),
  label: menuItem[index].label,
}))

export const LayoutMenu: FC = function () {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
    userStore.resetInfo()
    navigate('/login')
  }

  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    if (key === 'logout') {
      setIsModalOpen(true)
    } else {
      navigate(key)
    }
  }

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={menuItems}
        onClick={handleMenuClick}
      />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <h2>确定退出登录吗</h2>
        <p>通常情况下登录状态将会持续一周</p>
      </Modal>
    </>
  )
}

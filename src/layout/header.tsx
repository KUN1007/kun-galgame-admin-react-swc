import { FC } from 'react'
import { Flex, Image, Avatar } from 'antd'
import { useUserStore } from '@/store/modules/userStore'

export const KunHeader: FC = () => {
  const store = useUserStore()

  return (
    <Flex align="center" justify="space-between" style={{ padding: '1rem' }}>
      <Flex align="center">
        <Image width={50} src="/favicon.webp" alt="鲲 Galgame" />
        <h2 style={{ marginLeft: '1rem' }}>鲲 Galgame Admin</h2>
      </Flex>

      <div>
        <Avatar src={store.user.avatar} size="large" />
        <span>{store.user.name}</span>
      </div>
    </Flex>
  )
}

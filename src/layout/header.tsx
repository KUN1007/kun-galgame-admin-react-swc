import { FC } from 'react'
import { Flex, Image, Avatar } from 'antd'
import { useUserStore } from '@/store/modules/userStore'

export const KunHeader: FC = () => {
  const store = useUserStore()

  return (
    <Flex align="center" justify="space-between" className="p-4">
      <Flex align="center">
        <Image
          width={50}
          preview={false}
          src="/favicon.webp"
          alt="KUN Visual Novel"
        />
        <h2 className="m-0 ml-4 font-bold">KUN Visual Novel Admin</h2>
      </Flex>

      <Flex align="center">
        <span className="text-lg">{store.user.name}</span>
        <Avatar className="ml-8 mr-4" src={store.user.avatar} size="large" />
      </Flex>
    </Flex>
  )
}

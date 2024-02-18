import { FC } from 'react'
import { Flex } from 'antd'

export const KunHeader: FC = () => {
  return (
    <Flex align="center" style={{ padding: '1rem' }}>
      <img width={50} src="/favicon.webp" alt="鲲 Galgame" />
      <h2 style={{ marginLeft: '1rem' }}>鲲 Galgame Admin</h2>
    </Flex>
  )
}

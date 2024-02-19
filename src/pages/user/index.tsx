import { FC, useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

const UserPage: FC = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState('')

  const onSearch = (value: string) => {}

  return (
    <div>
      <h2>请输入用户的 uid</h2>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  )
}

export default UserPage

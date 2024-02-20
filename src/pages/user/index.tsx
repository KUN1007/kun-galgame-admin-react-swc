import { FC, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Input } from 'antd'
import { getUserByUid } from '@/api/user/user'

const { Search } = Input

const UserPage: FC = () => {
  const [userData, setUserData] = useState('')

  const handleUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUserData(e.target.value)

  const onSearch = async (value: string) => {
    const response = await getUserByUid(parseInt(value))

    console.log(response)
  }

  return (
    <div>
      <h2>请输入用户的 uid</h2>
      <Search
        placeholder="input search text"
        value={userData}
        onChange={handleUidChange}
        onSearch={onSearch}
        enterButton
      />

      <p></p>
    </div>
  )
}

export default UserPage

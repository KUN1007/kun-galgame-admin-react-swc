import { FC, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Input } from 'antd'
import { getUserByUid, banUserByUid, unbanUserByUid } from '@/api/user/user'

const { Search } = Input

const UserPage: FC = () => {
  const [findUid, setFindUid] = useState('')
  const [banUid, setBanUid] = useState('')
  const [unbanUid, setUnbanUid] = useState('')
  const [deleteUid, setDeleteUid] = useState('')

  const handleUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFindUid(e.target.value)

  const handleBanUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBanUid(e.target.value)

  const handleUnbanUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUnbanUid(e.target.value)

  const handleDeleteUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDeleteUid(e.target.value)

  const onSearchUser = async (value: string) => {
    const response = await getUserByUid(parseInt(value))

    console.log(response)
  }

  const onBanUser = async (value: string) => {
    const response = await banUserByUid(parseInt(value))

    console.log(response)
  }

  const onUnbanUser = async (value: string) => {
    const response = await unbanUserByUid(parseInt(value))

    console.log(response)
  }

  const onDeleteUser = async (value: string) => {
    const response = await unbanUserByUid(parseInt(value))

    console.log(response)
  }

  return (
    <div>
      <h2>请输入用户的 uid</h2>
      <Search
        placeholder="input search text"
        value={findUid}
        onChange={handleUidChange}
        onSearch={onSearchUser}
        enterButton="确定"
        className="mb-8"
      />

      <h2>请输入要封禁用户的 uid</h2>
      <Search
        placeholder="input search text"
        value={banUid}
        onChange={handleBanUidChange}
        onSearch={onBanUser}
        enterButton="确定"
        className="mb-8"
      />

      <h2>请输入要解封用户的 uid</h2>
      <Search
        placeholder="input search text"
        value={unbanUid}
        onChange={handleUnbanUidChange}
        onSearch={onUnbanUser}
        enterButton="确定"
        className="mb-8"
      />

      <h2>请输入要删除用户的 uid</h2>
      <Search
        placeholder="input search text"
        value={deleteUid}
        onChange={handleDeleteUidChange}
        onSearch={onDeleteUser}
        enterButton="确定"
      />
    </div>
  )
}

export default UserPage

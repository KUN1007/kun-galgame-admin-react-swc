import { FC, useState } from 'react'
import dayjs from 'dayjs'
import { Input, Avatar, Card, Descriptions, Switch, message, Flex } from 'antd'
import {
  getUserByUid,
  getUserByUsername,
  updateUserRoles,
} from '@/api/user/user'
import { SingleUser } from './SingleUser'
import { useUserStore } from '@/store/modules/userStore'
import type { DescriptionsProps } from 'antd'
import type { User } from '@/types/api/user'
import type { UserResponseData } from '@/api/user/user'

const { Search } = Input
const { Meta } = Card

const UserPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const roles = useUserStore().user.roles

  const [uid, setUid] = useState('')
  const [name, setName] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [user, setUser] = useState<User>({
    uid: 0,
    name: '',
    email: '',
    ip: '',
    avatar: '',
    roles: 0,
    status: 0,
    time: 0,
    moemoepoint: 0,
    bio: '',
    upvote: 0,
    like: 0,
    dislike: 0,

    daily_topic_count: 0,
    daily_image_count: 0,
    daily_check_in: 0,

    friend_count: 0,
    followed_count: 0,
    follower_count: 0,
    topic_count: 0,
    reply_count: 0,
    comment_count: 0,

    friend: [],
    followed: [],
    follower: [],
    topic: [],
    reply: [],
    comment: [],
    like_topic: [],
    dislike_topic: [],
    upvote_topic: [],
    reply_topic: [],
  })
  const [users, setUsers] = useState<UserResponseData[]>([])

  const onChange = async (uid: number, checked: boolean) => {
    if (checked) {
      await updateUserRoles(uid, 2)
      messageApi.open({
        type: 'success',
        content: `已将用户 ${user.name} 设置为管理员`,
      })
      setUser({ ...user, roles: 2 })
    } else {
      await updateUserRoles(uid, 1)
      messageApi.open({
        type: 'success',
        content: `已取消用户 ${user.name} 的管理员`,
      })
      setUser({ ...user, roles: 1 })
    }
  }

  const userFields = (user: User): DescriptionsProps['items'] => {
    return Object.keys(user).map((key, index) => {
      const label =
        key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
      let value = user[key as keyof User]
      if (Array.isArray(value)) {
        value = `[${value.length}]`
      } else if (label === 'Time') {
        value = dayjs(value).format('MM-D-YYYY - HH:mm:ss')
      }
      return {
        key: (index + 1).toString(),
        label,
        children: value !== '' ? value : 'NULL',
      }
    })
  }

  const onSearchUserUid = async (value: string) => {
    const userUid = parseInt(value)
    if (isNaN(userUid)) {
      messageApi.open({
        type: 'error',
        content: '请输入正确的用户 UID',
      })
    } else {
      const response = await getUserByUid(parseInt(value))
      setUser(response.data)
    }
  }

  const onSearchUserName = async (value: string) => {
    if (value.trim()) {
      const response = await getUserByUsername(value)
      setUsers(response.data)
    } else {
      messageApi.open({
        type: 'error',
        content: '输入不可为空',
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div
        className="overflow-y-scroll"
        style={{ maxHeight: 'calc(100dvh - 150px)' }}
      >
        <h2>精确查询</h2>
        <Search
          placeholder="请输入用户的 uid"
          value={uid}
          onChange={(event) => setUid(event.target.value)}
          onSearch={onSearchUserUid}
          enterButton="确定"
          className="mb-8"
        />

        {user.name && (
          <Card
            size="small"
            title={`UID: ${user.uid}`}
            extra={
              <>
                展示更多信息
                <Switch
                  className="ml-4"
                  onChange={(checked) => setShowInfo(checked)}
                ></Switch>
              </>
            }
          >
            <Meta
              avatar={
                user.avatar ? (
                  <Avatar size={64} src={user.avatar} />
                ) : (
                  <Avatar size={64} className="text-white bg-blue-500">
                    {user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <Flex justify="space-between">
                  <a
                    className="mr-4"
                    href={`https://www.kungal.com/kungalgamer/${user.uid}/info`}
                    target="_blank"
                  >
                    {user.name}
                  </a>

                  {roles > 2 && user.roles <= 2 && (
                    <div>
                      <span className="text-sm font-normal">
                        是否设置为管理员
                      </span>
                      <Switch
                        className="ml-4"
                        checked={user.roles >= 2}
                        onChange={(checked) => onChange(user.uid, checked)}
                      ></Switch>
                    </div>
                  )}
                </Flex>
              }
              description={user.bio}
            />
            {showInfo && (
              <Descriptions
                className="mt-4"
                title="User Info"
                items={userFields(user)}
              />
            )}
          </Card>
        )}

        <h2 className="mt-8">模糊查询</h2>
        <Search
          placeholder="请输入用户的部分用户名"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onSearch={onSearchUserName}
          enterButton="确定"
          className="mb-8"
        />

        <SingleUser
          userList={users}
          reload={() => onSearchUserName(name)}
        ></SingleUser>
      </div>
    </>
  )
}

export default UserPage

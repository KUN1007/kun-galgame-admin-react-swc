import { FC, useState } from 'react'
import { Input, Avatar, Card, Descriptions, Switch } from 'antd'
import { getUserByUid, getUserByUsername } from '@/api/user/user'
import type { DescriptionsProps } from 'antd'
import type { User } from '@/types/api/user'
import dayjs from 'dayjs'

const { Search } = Input
const { Meta } = Card

const UserPage: FC = () => {
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

  const userFields = (user: User): DescriptionsProps['items'] => {
    return Object.keys(user).map((key, index) => {
      const label =
        key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
      let value = user[key as keyof User]
      if (Array.isArray(value)) {
        value = `[${value.length}]`
      } else if (label === 'Time') {
        value = dayjs(value).format('MM-D-YYYY - h:mm:ss A')
      }
      return {
        key: (index + 1).toString(),
        label,
        children: value !== '' ? value : 'NULL',
      }
    })
  }

  const onSearchUserUid = async (value: string) => {
    const response = await getUserByUid(parseInt(value))
    setUser(response.data)
  }

  const onSearchUserName = async (value: string) => {
    const response = await getUserByUsername(value)

    console.log(response)
  }

  return (
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
          title={
            <>
              <a
                className="mr-4"
                href={`https://www.kungal.com/kungalgamer/${user.uid}/info`}
                target="_blank"
              >
                用户主页
              </a>
              {`UID: ${user.uid}`}
            </>
          }
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
            title={user.name}
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
    </div>
  )
}

export default UserPage

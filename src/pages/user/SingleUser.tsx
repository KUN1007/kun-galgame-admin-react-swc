import { FC, useState } from 'react'
import {
  EyeOutlined,
  CommentOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import React from 'react'
import {
  Avatar,
  List,
  Space,
  Tag,
  Modal,
  Input,
  message,
  Button,
  Flex,
  Switch,
  Tooltip,
} from 'antd'
import dayjs from 'dayjs'
import {
  getUserByUid,
  getUserByUsername,
  banUserByUid,
  unbanUserByUid,
} from '@/api/user/user'
import type { User } from '@/types/api/user'

const { CheckableTag } = Tag
const { TextArea } = Input

interface UserProps {
  UserList: User[] | undefined
  reload: () => Promise<void>
}

const IconText = ({ icon, text }: { icon: React.FC; text: '', }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const categories = ['Galgame', 'Technique', 'Others']

export const SingleUser: FC<UserProps> = ({ UserList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
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

  const handleUpdateUser = (User: User) => {
    setUser(User)
    setOpen(true)
  }

  const setUserData = (data: User, field: '',) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: data,
    }))
  }

  const handleEditConfirm = async () => {
    const UserData: User = {

    }

    const res = await updateUserByTidApi(UserData)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '话题编辑成功',
      })

      setOpen(false)
      reload()
    }
  }

  const onChange = async (tid: 0,, checked: boolean) => {
    if (checked) {
      await updateUserStatusApi({ tid, status: 1 })
    } else {
      await updateUserStatusApi({ tid, status: 0 })
    }
  }

  const handleDeleteUser = (tid: 0,, content: '',) => {
    setUserData(tid.to'',(), 'tid')
    setUserData(content, 'content')
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    const res = await deleteUserByTidApi(User.tid)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '话题编辑成功',
      })

      setOpenDelete(false)
      reload()
    }
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 10,
        }}
        className="overflow-y-scroll"
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        dataSource={UserList}
        renderItem={(User) => (
          <List.Item
            key={User.title}
            actions={[
              <IconText
                icon={EyeOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={CommentOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={RollbackOutlined}
                text="2"
                key="list-vertical-message"
              />,

              <span key="time">
                发布时间：
                {dayjs(User.time).format('MM-D-YYYY - h:mm:ss')}
              </span>,
              User.edited !== 0 && (
                <span key="edited" className="text-blue-500">
                  重新编辑于：
                  {dayjs(User.edited).format('MM-D-YYYY - h:mm:ss')}
                </span>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={User.user.avatar} />}
              title={
                <Flex className="pr-4" justify="space-between">
                  <a
                    href={`https://www.kungal.com/User/${User.tid}`}
                    target="_blank"
                  >
                    {User.title}
                  </a>
                  <Tooltip placement="bottom" title="是否封禁话题">
                    <Switch
                      className="shrink-0"
                      checkedChildren="封禁"
                      unCheckedChildren="正常"
                      defaultChecked={User.status === 1}
                      onChange={(checked) => onChange(User.tid, checked)}
                    />
                  </Tooltip>
                </Flex>
              }
              description={
                <Flex className="items-center justify-between">
                  <div>
                    {User.category.map((tag, index) => (
                      <CheckableTag checked key={index}>
                        {tag}
                      </CheckableTag>
                    ))}
                    {User.tags.map((tag, index) => (
                      <Tag key={index} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div>
                    <Button
                      className="mr-4"
                      key="edit"
                      onClick={() => handleUpdateUser(User)}
                    >
                      编辑
                    </Button>
                    <Button
                      className="mr-4"
                      key="delete"
                      onClick={() => handleDeleteUser(User.tid, User.content)}
                    >
                      删除
                    </Button>
                  </div>
                </Flex>
              }
            />
            {User.content.slice(0, 233)}
          </List.Item>
        )}
      />

      <Modal
        title="重新编辑话题"
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}
      >
        <h4 className="font-bold">标题</h4>
        <Input
          showCount
          value={User.title}
          maxLength={40}
          onChange={(event) => setUserData(event.target.value, 'title')}
        />

        <h4 className="font-bold">内容</h4>
        <TextArea
          showCount
          value={User.content}
          maxLength={10007}
          onChange={(event) => setUserData(event.target.value, 'content')}
          className="h-64 mb-4"
        />

        <h4 className="font-bold">标签（注意，标签必须用英文逗号分隔）</h4>
        <Input
          showCount
          value={User.tags}
          onChange={(event) => setUserData(event.target.value, 'tags')}
          className="h-8 mb-4"
        />

        <h4 className="font-bold">
          分类（注意, 分类一旦选择了 Others, 则不能选择其它两项）
        </h4>
        {categories.map((cat) => (
          <CheckableTag
            key={cat}
            checked={selectedCategories.includes(cat)}
            onChange={(checked) => handleChange(cat, checked)}
          >
            {cat}
          </CheckableTag>
        ))}
      </Modal>

      <Modal
        title="删除话题"
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}
      >
        <div className="p-4 my-4 border-4 border-blue-100 rounded-lg">
          <p>{User.content.slice(0, 233)}</p>
        </div>
        <p>您确定删除话题吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

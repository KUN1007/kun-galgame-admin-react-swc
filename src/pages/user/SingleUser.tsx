import { FC, useState } from 'react'
import {
  Avatar,
  List,
  Modal,
  message,
  Button,
  Flex,
  Switch,
  Tooltip,
} from 'antd'
import dayjs from 'dayjs'
import { banUserByUid, unbanUserByUid, deleteUserByUid } from '@/api/user/user'
import type { UserResponseData } from '@/api/user/user'

interface UserProps {
  userList: UserResponseData[] | undefined
  reload: () => Promise<void>
}

export const SingleUser: FC<UserProps> = ({ userList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [openDelete, setOpenDelete] = useState(false)
  const [user, setUser] = useState<UserResponseData>({
    uid: 0,
    name: '',
    avatar: '',
    bio: '',
    time: 0,
    status: 0,
  })

  const onChange = async (uid: number, checked: boolean) => {
    if (checked) {
      await banUserByUid(uid)
      messageApi.open({
        type: 'success',
        content: '用户已封禁',
      })
    } else {
      await unbanUserByUid(uid)
      messageApi.open({
        type: 'success',
        content: '用户已解封',
      })
    }
  }

  const handleDeleteUser = (uid: number, name: string) => {
    const userInfo: UserResponseData = {
      uid,
      name,
      avatar: '',
      bio: '',
      time: 0,
      status: 0,
    }
    setUser(userInfo)
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    const res = await deleteUserByUid(user.uid)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '用户删除成功',
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
        dataSource={userList}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                user.avatar ? (
                  <Avatar src={user.avatar} />
                ) : (
                  <Avatar className="text-white bg-blue-500">
                    {user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <Flex justify="space-between" className="pr-4">
                  <a
                    className="mr-4"
                    href={`https://www.kungal.com/kungalgamer/${user.uid}/info`}
                    target="_blank"
                  >
                    {user.name}
                  </a>

                  <div>
                    <Tooltip placement="bottom" title="是否封禁用户">
                      <Switch
                        className="shrink-0"
                        checkedChildren="封禁"
                        unCheckedChildren="正常"
                        defaultChecked={user.status === 1}
                        onChange={(checked) => onChange(user.uid, checked)}
                      />
                    </Tooltip>

                    <Button
                      type="primary"
                      className="mx-4"
                      key="delete"
                      danger
                      onClick={() => handleDeleteUser(user.uid, user.name)}
                    >
                      删除
                    </Button>
                  </div>
                </Flex>
              }
              description={user.bio}
            />
            {
              <Flex justify="space-between" className="pr-4">
                <span>UID: {user.uid}</span>
                <span>
                  注册时间: {dayjs(user.time).format('MM-D-YYYY - h:mm:ss A')}
                </span>
              </Flex>
            }
          </List.Item>
        )}
      />

      <Modal
        title={`删除用户: ${user.name}`}
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}
      >
        <h2 className="font-bold text-red-600">
          严重警告 ⚠ 您确定删除该用户吗, 该操作不可撤销
        </h2>
        <p>
          该用户的一切信息将会被从论坛删除，不留一切痕迹，访问用户主页时会显示用户未找到
        </p>
      </Modal>
    </>
  )
}

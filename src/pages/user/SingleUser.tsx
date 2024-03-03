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
import { banUserByUid, unbanUserByUid } from '@/api/user/user'
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
    } else {
      await unbanUserByUid(uid)
    }
  }

  const handleDeleteUser = () => {}

  const handleDeleteConfirm = async () => {
    // if (res.code === 200) {
    //   messageApi.open({
    //     type: 'success',
    //     content: '用户删除成功',
    //   })
    //   setOpenDelete(false)
    //   reload()
    // }
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
                  <Tooltip placement="bottom" title="是否封禁用户">
                    <Switch
                      className="shrink-0"
                      checkedChildren="封禁"
                      unCheckedChildren="正常"
                      defaultChecked={user.status === 1}
                      onChange={(checked) => onChange(user.uid, checked)}
                    />
                  </Tooltip>
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
        title="删除用户"
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}
      >
        <div className="p-4 my-4 border-4 border-blue-100 rounded-lg">
          <p>{user.name}</p>
        </div>
        <p>您确定删除话题吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

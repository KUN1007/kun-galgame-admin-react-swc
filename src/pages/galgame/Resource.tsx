import { FC, useState } from 'react'
import { List, Avatar, Button, Modal, message } from 'antd'
import { deleteGalgameResourceApi } from '@/api/galgame/galgame'
import type { GalgameResource } from '@/api/galgame/galgame'

interface ResourceProps {
  resourceList: GalgameResource[] | undefined
  reload: () => Promise<void>
}

export const Resource: FC<ResourceProps> = ({ resourceList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [openDelete, setOpenDelete] = useState(false)
  const [grid, setGrid] = useState(0)
  const [modalText, setModalText] = useState('')

  const handleDeleteResource = (grid: number, content: string) => {
    setGrid(grid)
    setModalText(content)
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    await deleteGalgameResourceApi(grid)
    setOpenDelete(false)
    reload()
    messageApi.open({
      type: 'success',
      content: '删除 Galgame 资源成功'
    })
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout='horizontal'
        dataSource={resourceList}
        className='overflow-y-scroll'
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        pagination={{
          defaultCurrent: 1,
          total: resourceList?.length
        }}
        renderItem={(resource) => (
          <List.Item
            actions={[
              <Button
                key='delete'
                onClick={() =>
                  handleDeleteResource(resource.grid, resource.link)
                }>
                删除
              </Button>
            ]}>
            <List.Item.Meta
              avatar={
                resource.user.avatar ? (
                  <Avatar src={resource.user.avatar} />
                ) : (
                  <Avatar className='text-white bg-blue-500'>
                    {resource.user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <a
                  href={`https://www.kungal.com/galgamer/${resource.user.uid}/info`}
                  target='_blank'>
                  {`${resource.user.name}`}
                </a>
              }
              description={<p className='break-words'>{resource.link}</p>}
            />
          </List.Item>
        )}
      />

      <Modal
        title='删除 Galgame 资源'
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}>
        <div className='p-4 my-4 border-4 border-blue-100 rounded-lg'>
          <p>{modalText}</p>
        </div>
        <p>您确定删除 Galgame 资源吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

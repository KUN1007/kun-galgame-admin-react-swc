import { FC, useState } from 'react'
import { List, Avatar, Button, Modal, message } from 'antd'
import { deleteGalgameCommentApi } from '@/api/galgame/galgame'
import type { GalgameComment } from '@/api/galgame/galgame'

interface CommentProps {
  commentList: GalgameComment[] | undefined
  reload: () => Promise<void>
}

export const Comment: FC<CommentProps> = ({ commentList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [openDelete, setOpenDelete] = useState(false)
  const [commentGcid, setCommentGcid] = useState(0)
  const [modalText, setModalText] = useState('')

  const handleDeleteComment = (cid: number, content: string) => {
    setCommentGcid(cid)
    setModalText(content)
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    await deleteGalgameCommentApi(commentGcid)
    setOpenDelete(false)
    reload()
    messageApi.open({
      type: 'success',
      content: '删除 Galgame 评论成功'
    })
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout='horizontal'
        dataSource={commentList}
        className='overflow-y-scroll'
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        pagination={{
          defaultCurrent: 1,
          total: commentList?.length
        }}
        renderItem={(comment) => (
          <List.Item
            actions={[
              <Button
                key='delete'
                onClick={() =>
                  handleDeleteComment(comment.gcid, comment.content)
                }>
                删除
              </Button>
            ]}>
            <List.Item.Meta
              avatar={
                comment.user.avatar ? (
                  <Avatar src={comment.user.avatar} />
                ) : (
                  <Avatar className='text-white bg-blue-500'>
                    {comment.user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <a
                  href={`https://www.kungal.com/galgamer/${comment.user.uid}/info`}
                  target='_blank'>
                  {`${comment.user.name}`}
                </a>
              }
              description={<p className='break-words'>{comment.content}</p>}
            />
          </List.Item>
        )}
      />

      <Modal
        title='删除评论'
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}>
        <div className='p-4 my-4 border-4 border-blue-100 rounded-lg'>
          <p>{modalText}</p>
        </div>
        <p>您确定删除评论吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

import { FC, useState } from 'react'
import { List, Avatar, Button, Modal, Input, message } from 'antd'
import {
  updateCommentByCidApi,
  deleteCommentByCidApi,
} from '@/api/comment/comment'
import type { Comment } from '@/api/comment/comment'

const { TextArea } = Input

interface SingleCommentProps {
  commentList: Comment[] | undefined
  reload: () => Promise<void>
}

export const SingleComment: FC<SingleCommentProps> = ({
  commentList,
  reload,
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [commentCid, setCommentCid] = useState(0)
  const [modalText, setModalText] = useState('')

  const handleUpdateComment = (cid: number, content: string) => {
    setCommentCid(cid)
    setModalText(content)
    setOpen(true)
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setModalText(e.target.value)
  }

  const handleEditConfirm = async () => {
    const res = await updateCommentByCidApi(commentCid, modalText)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '评论编辑成功',
      })

      setOpen(false)
      reload()
    }
  }

  const handleDeleteComment = (cid: number, content: string) => {
    setCommentCid(cid)
    setModalText(content)
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    await deleteCommentByCidApi(commentCid)
    setOpenDelete(false)
    reload()
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout="horizontal"
        dataSource={commentList}
        className="overflow-y-scroll"
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(comment) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                onClick={() =>
                  handleUpdateComment(comment.cid, comment.content)
                }
              >
                编辑
              </Button>,
              <Button
                key="delete"
                onClick={() =>
                  handleDeleteComment(comment.cid, comment.content)
                }
              >
                删除
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                comment.c_user.avatar ? (
                  <Avatar src={comment.c_user.avatar} />
                ) : (
                  <Avatar className="text-white bg-blue-500">
                    {comment.c_user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <a
                  href={`https://www.kungal.com/topic/${comment.tid}`}
                  target="_blank"
                >
                  {`${comment.c_user.name}-${comment.c_user.uid} => ${comment.to_user.name}-${comment.to_user.uid}`}
                </a>
              }
              description={<p className="break-words">{comment.content}</p>}
            />
          </List.Item>
        )}
      />

      <Modal
        title="重新编辑评论"
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}
      >
        <TextArea
          showCount
          value={modalText}
          maxLength={107}
          onChange={onChange}
          className="h-32 mb-4"
        />
      </Modal>

      <Modal
        title="删除评论"
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}
      >
        <div className="p-4 my-4 border-4 border-blue-100 rounded-lg">
          <p>{modalText}</p>
        </div>
        <p>您确定删除评论吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

import { FC, useState } from 'react'
import { List, Avatar, Button, Modal, Input, message, Tag } from 'antd'
import { updateReplyByRidApi, deleteReplyByRidApi } from '@/api/reply/reply'
import dayjs from 'dayjs'
import type { UpdateReplyRequestData } from '@/api/reply/reply'
import type { Reply } from '@/api/reply/reply'

const { TextArea } = Input

interface SingleReplyProps {
  replyList: Reply[] | undefined
  reload: () => Promise<void>
}

export const SingleReply: FC<SingleReplyProps> = ({ replyList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [replyTid, setReplyTid] = useState(0)
  const [replyRid, setReplyRid] = useState(0)
  const [replyContent, setReplyContent] = useState('')
  const [replyTags, setReplyTags] = useState<string>('')

  const handleUpdateReply = (reply: Reply) => {
    setReplyTid(reply.tid)
    setReplyRid(reply.rid)
    setReplyTags(reply.tags.toString())
    setReplyContent(reply.content)
    setOpen(true)
  }

  const handleEditConfirm = async () => {
    const replyData: UpdateReplyRequestData = {
      tid: replyTid,
      rid: replyRid,
      content: replyContent,
      tags: replyTags.split(',').map((tag) => tag.trim()),
    }
    const res = await updateReplyByRidApi(replyData)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '回复编辑成功',
      })

      setOpen(false)
      reload()
    }
  }

  const handleDeleteReply = (rid: number, content: string) => {
    setReplyRid(rid)
    setReplyContent(content)
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    await deleteReplyByRidApi(replyRid)
    setOpenDelete(false)
    reload()
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout="horizontal"
        dataSource={replyList}
        pagination={{
          defaultCurrent: 1,
          total: replyList?.length,
        }}
        className="overflow-y-scroll"
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        renderItem={(reply) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => handleUpdateReply(reply)}>
                编辑
              </Button>,
              <Button
                key="delete"
                onClick={() => handleDeleteReply(reply.rid, reply.content)}
              >
                删除
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                reply.r_user.avatar ? (
                  <Avatar src={reply.r_user.avatar} />
                ) : (
                  <Avatar className="text-white bg-blue-500">
                    {reply.r_user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <a
                  href={`https://www.kungal.com/topic/${reply.tid}`}
                  target="_blank"
                  className="font-bold"
                >
                  {`${reply.r_user.name}-${reply.r_user.uid} => ${reply.to_user.name}-${reply.to_user.uid}`}
                </a>
              }
              description={
                <div>
                  <p className="break-words">{reply.content.slice(0, 233)}</p>
                  {reply.tags.map((tag, index) => (
                    <Tag key={index} color="blue" className="mb-4">
                      {tag}
                    </Tag>
                  ))}
                  <p>
                    发布时间：
                    {dayjs(reply.time).format('MM-D-YYYY - h:mm:ss A')}
                  </p>
                  {reply.edited !== 0 && (
                    <p className="text-blue-500">
                      重新编辑于：
                      {dayjs(reply.edited).format('MM-D-YYYY - h:mm:ss A')}
                    </p>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title="重新编辑回复"
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}
      >
        <h4 className="font-bold">回复内容编辑</h4>
        <TextArea
          showCount
          value={replyContent}
          maxLength={10007}
          onChange={(event) => setReplyContent(event.target.value)}
          className="h-64 mb-4"
        />

        <h4 className="font-bold">
          回复标签编辑（注意，标签必须用英文逗号分隔）
        </h4>
        <TextArea
          showCount
          value={replyTags}
          maxLength={10007}
          onChange={(event) => setReplyTags(event.target.value)}
          className="h-8 mb-4"
        />
      </Modal>

      <Modal
        title="删除回复"
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}
      >
        <div className="p-4 my-4 border-4 border-blue-100 rounded-lg">
          <p>{replyContent.slice(0, 233)}</p>
        </div>
        <p>您确定删除回复吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

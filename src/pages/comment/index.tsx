import { FC, useState } from 'react'
import { Input } from 'antd'
import { getCommentCidByContentApi } from '@/api/comment/comment'
import SingleComment from './SingleComment'
import type { Comment } from '@/api/comment/comment'
import type { ChangeEvent } from 'react'

const { Search } = Input

const CommentPage: FC = () => {
  const [content, setContent] = useState('')
  const [banUid, setBanUid] = useState('')
  const [unbanUid, setUnbanUid] = useState('')
  const [comment, setComment] = useState<Comment[]>()

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const handleBanUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBanUid(e.target.value)

  const handleUnbanUidChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUnbanUid(e.target.value)

  const onSearchComment = async (value: string) => {
    const response = await getCommentCidByContentApi(value)

    setComment(response.data)
  }

  const onBanUser = async (value: string) => {
    const response = await banUserByUid(parseInt(value))

    console.log(response)
  }

  const onUnbanUser = async (value: string) => {
    const response = await unbanUserByUid(parseInt(value))

    console.log(response)
  }

  return (
    <div>
      <h2>请输入评论的内容关键字以查询评论的 cid</h2>
      <Search
        placeholder="input search text"
        value={content}
        onChange={handleContentChange}
        onSearch={onSearchComment}
        enterButton="确定"
        className="mb-8"
      />

      <SingleComment commentList={comment} />

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
        value={unbanUid}
        onChange={handleUnbanUidChange}
        onSearch={onUnbanUser}
        enterButton="确定"
      />
    </div>
  )
}

export default CommentPage

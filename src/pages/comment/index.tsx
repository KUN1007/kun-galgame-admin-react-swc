import { FC, useState } from 'react'
import { Input, message } from 'antd'
import { getComments } from '@/api/comment/comment'
import { SingleComment } from './SingleComment'
import type { Comment } from '@/api/comment/comment'
import type { ChangeEvent } from 'react'

const { Search } = Input

const CommentPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [content, setContent] = useState('')
  const [comment, setComment] = useState<Comment[]>()

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const onSearchComment = async (value: string) => {
    if (value.trim()) {
      const response = await getComments(value)
      setComment(response.data)
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
      <div>
        <h2>请输入评论的内容关键字以查询评论</h2>
        <Search
          placeholder="input search text"
          value={content}
          onChange={handleContentChange}
          onSearch={onSearchComment}
          enterButton="确定"
          className="mb-8"
        />

        <SingleComment
          commentList={comment}
          reload={() => onSearchComment(content)}
        />
      </div>
    </>
  )
}

export default CommentPage

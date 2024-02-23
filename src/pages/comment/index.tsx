import { FC, useState } from 'react'
import { Input } from 'antd'
import { getCommentCidByContentApi } from '@/api/comment/comment'
import { SingleComment } from './SingleComment'
import type { Comment } from '@/api/comment/comment'
import type { ChangeEvent } from 'react'

const { Search } = Input

const CommentPage: FC = () => {
  const [content, setContent] = useState('')
  const [comment, setComment] = useState<Comment[]>()

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const onSearchComment = async (value: string) => {
    const response = await getCommentCidByContentApi(value)

    setComment(response.data)
  }

  return (
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
  )
}

export default CommentPage

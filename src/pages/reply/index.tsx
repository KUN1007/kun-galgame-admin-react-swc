import { FC, useState } from 'react'
import { Input, message } from 'antd'
import { getRepliesByContentApi } from '@/api/reply/reply'
import { SingleReply } from './SingleReply'
import type { Reply } from '@/api/reply/reply'
import type { ChangeEvent } from 'react'

const { Search } = Input

const ReplyPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [content, setContent] = useState('')
  const [reply, setReply] = useState<Reply[]>()

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const onSearchReply = async (value: string) => {
    if (value.trim()) {
      const response = await getRepliesByContentApi(value)
      setReply(response.data)
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
        <h2>请输入回复的内容关键字以查询回复</h2>
        <Search
          placeholder="input search text"
          value={content}
          onChange={handleContentChange}
          onSearch={onSearchReply}
          enterButton="确定"
          className="mb-8"
        />

        <SingleReply replyList={reply} reload={() => onSearchReply(content)} />
      </div>
    </>
  )
}

export default ReplyPage

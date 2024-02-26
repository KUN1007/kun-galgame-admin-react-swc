import { FC, useState } from 'react'
import { Input } from 'antd'
import { getTopicsByContentApi } from '@/api/topic/topic'
import { SingleTopic } from './SingleTopic'
import type { Topic } from '@/api/topic/topic'
import type { ChangeEvent } from 'react'

const { Search } = Input

export const TopicPage: FC = () => {
  const [content, setContent] = useState('')
  const [topics, setTopics] = useState<Topic[]>()

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value)

  const onSearchTopic = async (value: string) => {
    const response = await getTopicsByContentApi(value)
    setTopics(response.data)
  }

  return (
    <div>
      <h2>请输入话题的内容以查询话题</h2>
      <Search
        placeholder="input search text"
        value={content}
        onChange={handleContentChange}
        onSearch={onSearchTopic}
        enterButton="确定"
        className="mb-8"
      />

      <SingleTopic topicList={topics} reload={() => onSearchTopic(content)} />
    </div>
  )
}

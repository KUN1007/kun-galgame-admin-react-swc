import { FC, useState } from 'react'
import { message, Flex, Switch, Tooltip, Radio } from 'antd'
import { updateTopicStatusApi } from '@/api/topic/topic'
import { getKeyByValue } from '@/utils/getKeyByValue'
import type { Topic } from '@/api/topic/topic'

interface TopicProps {
  topic: Topic
  reload: () => Promise<void>
}

const statusMap: Record<number, string> = {
  0: 'normal',
  1: 'banned',
  2: 'pinned',
  3: 'essential',
}

export const TopicHeader: FC<TopicProps> = ({ topic, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [showStatus, setShowStatus] = useState(false)

  const onChange = async (value: string) => {
    const key = getKeyByValue(statusMap, value)
    await updateTopicStatusApi({ tid: topic.tid, status: key ?? 0 })
    messageApi.open({
      type: 'success',
      content: '更新话题状态完成',
    })
    reload()
  }

  return (
    <>
      {contextHolder}
      <Flex justify="space-between">
        <a href={`https://www.kungal.com/topic/${topic.tid}`} target="_blank">
          {topic.title}
        </a>

        <Flex>
          {showStatus && (
            <Radio.Group
              onChange={(event) => onChange(event.target.value)}
              defaultValue={statusMap[topic.status]}
              className="mr-4"
              size="small"
            >
              <Radio.Button value="normal">正常</Radio.Button>
              <Radio.Button value="banned">封禁</Radio.Button>
              <Radio.Button value="pinned">置顶</Radio.Button>
              <Radio.Button value="essential">精华</Radio.Button>
            </Radio.Group>
          )}

          <Tooltip placement="bottom" title="状态选项">
            <Switch className="shrink-0" onChange={setShowStatus} />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  )
}

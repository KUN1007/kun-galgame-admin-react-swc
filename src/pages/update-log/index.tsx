import { FC, useState } from 'react'
import { Input, DatePicker, Flex, Button, message } from 'antd'
import { createUpdateLogApi } from '@/api/update-log/updateLog'
import TodoList from './TodoList'
import type { UpdateLogRequestData } from '@/api/update-log/updateLog'
import type { DatePickerProps } from 'antd'

const { TextArea } = Input

const UpdateLogPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [data, setData] = useState<UpdateLogRequestData>({
    description: '',
    language: 'en-us',
    time: '',
    version: ',',
  })
  const [enContent, setEnContent] = useState('')
  const [zhContent, setZhContent] = useState('')

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    setData({ ...data, time: dateString.toString() })
  }

  const handlePublishUpdate = async () => {
    const enUpdateLog: UpdateLogRequestData = {
      ...data,
      description: enContent,
    }
    await createUpdateLogApi(enUpdateLog)

    const zhUpdateLog: UpdateLogRequestData = {
      ...data,
      description: zhContent,
      language: 'zh-cn',
    }
    await createUpdateLogApi(zhUpdateLog)

    messageApi.open({
      type: 'success',
      content: '更新记录创建成功',
    })
  }

  return (
    <>
      {contextHolder}
      <h2>待办列表</h2>
      <TodoList />

      <h2 className="mt-8">创建更新记录</h2>

      <Flex>
        <TextArea
          className="mb-4 mr-4"
          value={enContent}
          onChange={(event) => setEnContent(event.target.value)}
          rows={6}
          placeholder="English"
        />
        <TextArea
          className="mb-4"
          value={zhContent}
          onChange={(event) => setZhContent(event.target.value)}
          rows={6}
          placeholder="中文版"
        />
      </Flex>

      <Flex>
        <DatePicker onChange={onChange} placeholder="更新日期" />
        <Input
          className="mx-4"
          onChange={(event) =>
            setData({ ...data, version: event.target.value })
          }
          placeholder="更新版本"
        />
        <Button type="primary" onClick={handlePublishUpdate}>
          确定发布更新
        </Button>
      </Flex>
    </>
  )
}

export default UpdateLogPage

import { FC, useState } from 'react'
import { Input, DatePicker, Flex, Button, message, Select } from 'antd'
import { createUpdateLogApi } from '@/api/update-log/updateLog'
import TodoList from './TodoList'
import type {
  UpdateType,
  UpdateLogRequestData
} from '@/api/update-log/updateLog'
import type { DatePickerProps } from 'antd'

const { TextArea } = Input

const UpdateLogPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [data, setData] = useState<UpdateLogRequestData>({
    type: 'feat',
    content: {
      'en-us': '',
      'ja-jp': '',
      'zh-cn': ''
    },
    time: '',
    version: ','
  })

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    setData({ ...data, time: dateString.toString() })
  }

  const handlePublishUpdate = async () => {
    await createUpdateLogApi(data)

    messageApi.open({
      type: 'success',
      content: '更新记录创建成功'
    })
    setData({
      type: 'feat',
      content: {
        'en-us': '',
        'ja-jp': '',
        'zh-cn': ''
      },
      time: '',
      version: ','
    })
  }

  return (
    <div
      className='overflow-y-scroll'
      style={{ maxHeight: 'calc(100dvh - 150px)' }}>
      {contextHolder}
      <h2>创建待办</h2>
      <TodoList />

      <h2 className='mt-8'>创建更新记录</h2>

      <Flex>
        <TextArea
          className='mb-4 mr-4'
          value={data.content['en-us']}
          onChange={(event) =>
            setData({
              ...data,
              content: {
                ...data.content,
                'en-us': event.target.value
              }
            })
          }
          rows={6}
          placeholder='English'
        />
        <TextArea
          className='mb-4'
          value={data.content['zh-cn']}
          onChange={(event) =>
            setData({
              ...data,
              content: {
                ...data.content,
                'zh-cn': event.target.value
              }
            })
          }
          rows={6}
          placeholder='中文版'
        />
      </Flex>

      <Flex className='mb-4'>
        <DatePicker onChange={onChange} placeholder='更新日期' />
        <Input
          className='mx-4'
          onChange={(event) =>
            setData({ ...data, version: event.target.value })
          }
          placeholder='更新版本'
        />
      </Flex>

      <Flex justify='space-between'>
        <div>
          <span>请选择更新的类型: </span>
          <Select
            defaultValue='feat'
            onChange={(value) =>
              setData({ ...data, type: value as UpdateType })
            }
            className='w-40'
            options={[
              { value: 'feat', label: 'feat - 增加功能' },
              { value: 'pref', label: 'pref - 性能优化' },
              { value: 'fix', label: 'fix - 错误修复' },
              { value: 'styles', label: 'styles - 样式修改' },
              { value: 'mod', label: 'mod - 功能更改' },
              { value: 'chore', label: 'chore - 其它修改' },
              { value: 'sec', label: 'sec - 安全提升' },
              { value: 'refactor', label: 'refactor - 代码重构' },
              { value: 'docs', label: 'docs - 文档修改' },
              { value: 'test', label: 'test - 测试用例' }
            ]}
          />
        </div>

        <Button type='primary' onClick={handlePublishUpdate}>
          确定发布更新
        </Button>
      </Flex>
    </div>
  )
}

export default UpdateLogPage

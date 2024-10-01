import { FC, useState, useEffect } from 'react'
import { toTraditional } from 'chinese-simple2traditional'
import { Input, Flex, Button, message, List, Popconfirm } from 'antd'
import {
  getMessageAdminsApi,
  createMessageAdminApi,
  deleteMessageAdminApi
} from '@/api/message-admin/message-admin'
import type { MessageAdmin } from '@/api/message-admin/message-admin'

const { TextArea } = Input

const MessageAdminPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [messages, setMessages] = useState<MessageAdmin[]>([])
  const [content, setContent] = useState<KunLanguage>({
    'en-us': '',
    'ja-jp': '',
    'zh-cn': '',
    'zh-tw': ''
  })

  const getMessageAdmins = async () => {
    const res = await getMessageAdminsApi(1, 10)
    setMessages(res.data)
  }

  const handlePublishUpdate = async () => {
    await createMessageAdminApi(content)

    messageApi.open({
      type: 'success',
      content: '全体消息发布成功'
    })

    setContent({
      'en-us': '',
      'ja-jp': '',
      'zh-cn': '',
      'zh-tw': ''
    })
    await getMessageAdmins()
  }

  const handleDeleteAdminMessage = async (maid: number) => {
    await deleteMessageAdminApi(maid)
    messageApi.open({
      type: 'success',
      content: '删除全体消息成功'
    })
    await getMessageAdmins()
  }

  useEffect(() => {
    getMessageAdmins()
  }, [])

  return (
    <div
      className='overflow-y-scroll'
      style={{ maxHeight: 'calc(100dvh - 150px)' }}>
      {contextHolder}
      <h2>发布全体消息</h2>

      <List
        bordered
        dataSource={messages}
        pagination={{
          defaultPageSize: 3,
          defaultCurrent: 1,
          total: messages?.length
        }}
        className='my-4'
        renderItem={(msg) => (
          <List.Item
            actions={[
              <span key={msg.maid}>{`ID: ${msg.maid}`}</span>,
              <span key={msg.status}>
                {msg.status === 'read' ? 'Read' : 'Unread'}
              </span>,
              <Popconfirm
                key={msg.maid}
                title='删除全体消息'
                description={`确定删除 ${msg.content['zh-cn']} 吗`}
                onConfirm={() => handleDeleteAdminMessage(msg.maid)}
                okText='Yes'
                cancelText='No'>
                <Button danger>删除</Button>
              </Popconfirm>
            ]}>
            <Flex vertical>
              <p>{msg.content['en-us']}</p>
              <p>{msg.content['zh-cn']}</p>
            </Flex>
          </List.Item>
        )}
      />

      <Flex vertical>
        <TextArea
          className='mb-4 mr-4'
          value={content['en-us']}
          onChange={(event) =>
            setContent({
              ...content,
              'en-us': event.target.value
            })
          }
          rows={6}
          placeholder='English'
        />
        <TextArea
          className='mb-4'
          value={content['ja-jp']}
          onChange={(event) =>
            setContent({
              ...content,
              'ja-jp': event.target.value
            })
          }
          rows={6}
          placeholder='日本語'
        />
        <TextArea
          className='mb-4'
          value={content['zh-cn']}
          onChange={(event) =>
            setContent({
              ...content,
              'zh-cn': event.target.value
            })
          }
          rows={6}
          placeholder='中文版'
        />
        {/* TODO: StrictMode double print text? */}
        <TextArea
          className='mb-4'
          value={content['zh-tw']}
          onChange={(event) =>
            setContent({
              ...content,
              'zh-tw': toTraditional(event.target.value)
            })
          }
          rows={6}
          placeholder='繁体中文'
        />
      </Flex>

      <Flex justify='space-between'>
        <Button type='primary' onClick={handlePublishUpdate}>
          确定发布全体消息
        </Button>
      </Flex>
    </div>
  )
}

export default MessageAdminPage

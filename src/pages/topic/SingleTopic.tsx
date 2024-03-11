import { FC, useState } from 'react'
import {
  EyeOutlined,
  CommentOutlined,
  RollbackOutlined,
} from '@ant-design/icons'
import React from 'react'
import {
  Avatar,
  List,
  Space,
  Tag,
  Modal,
  Input,
  message,
  Button,
  Flex,
  Switch,
  Tooltip,
} from 'antd'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/modules/userStore'
import {
  updateTopicByTidApi,
  deleteTopicByTidApi,
  updateTopicStatusApi,
} from '@/api/topic/topic'
import type { Topic, UpdateTopicRequestData } from '@/api/topic/topic'

const { CheckableTag } = Tag
const { TextArea } = Input

interface TopicProps {
  topicList: Topic[] | undefined
  reload: () => Promise<void>
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const categories = ['Galgame', 'Technique', 'Others']

export const SingleTopic: FC<TopicProps> = ({ topicList, reload }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const roles = useUserStore().user.roles

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [topic, setTopic] = useState<Topic>({
    tid: 0,
    user: {
      uid: 0,
      avatar: '',
      name: '',
    },
    title: '',
    category: [],
    tags: [],
    content: '',
    time: 0,
    views: 0,
    comments: 0,
    replies: 0,

    edited: 0,
    status: 0,
  })

  const handleUpdateTopic = (topic: Topic) => {
    setTopic(topic)
    setSelectedCategories(topic.category)
    setOpen(true)
  }

  const setTopicData = (data: string, field: string) => {
    setTopic((prevTopic) => ({
      ...prevTopic,
      [field]: data,
    }))
  }

  const handleEditConfirm = async () => {
    if (!selectedCategories.length || !topic.tags.length) {
      messageApi.open({
        type: 'warning',
        content: '请至少选择一个标签或分类',
      })
    }
    const topicData: UpdateTopicRequestData = {
      tid: topic.tid,
      title: topic.title,
      content: topic.content,
      tags: topic.tags
        .toString()
        .split(',')
        .map((tag) => tag.trim()),
      category: selectedCategories,
    }

    const res = await updateTopicByTidApi(topicData)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '话题编辑成功',
      })

      setOpen(false)
      reload()
    }
  }

  const onChange = async (tid: number, checked: boolean) => {
    if (checked) {
      await updateTopicStatusApi({ tid, status: 1 })
    } else {
      await updateTopicStatusApi({ tid, status: 0 })
    }
  }

  const handleDeleteTopic = (tid: number, content: string) => {
    setTopicData(tid.toString(), 'tid')
    setTopicData(content, 'content')
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    const res = await deleteTopicByTidApi(topic.tid)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '话题删除成功',
      })

      setOpenDelete(false)
      reload()
    }
  }

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedCategories, tag]
      : selectedCategories.filter((t) => t !== tag)
    setSelectedCategories(nextSelectedTags)
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout="vertical"
        className="overflow-y-scroll"
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        pagination={{
          defaultCurrent: 1,
          total: topicList?.length,
        }}
        dataSource={topicList}
        renderItem={(topic) => (
          <List.Item
            key={topic.title}
            actions={[
              <IconText
                icon={EyeOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={CommentOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={RollbackOutlined}
                text="2"
                key="list-vertical-message"
              />,

              <span key="time">
                发布时间：
                {dayjs(topic.time).format('MM-D-YYYY - h:mm:ss')}
              </span>,
              topic.edited !== 0 && (
                <span key="edited" className="text-blue-500">
                  重新编辑于：
                  {dayjs(topic.edited).format('MM-D-YYYY - h:mm:ss')}
                </span>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={
                topic.user.avatar ? (
                  <Avatar src={topic.user.avatar} />
                ) : (
                  <Avatar className="text-white bg-blue-500">
                    {topic.user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={
                <Flex justify="space-between">
                  <a
                    href={`https://www.kungal.com/topic/${topic.tid}`}
                    target="_blank"
                  >
                    {topic.title}
                  </a>
                  <Tooltip placement="bottom" title="是否封禁话题">
                    <Switch
                      className="shrink-0"
                      checkedChildren="封禁"
                      unCheckedChildren="正常"
                      defaultChecked={topic.status === 1}
                      onChange={(checked) => onChange(topic.tid, checked)}
                    />
                  </Tooltip>
                </Flex>
              }
              description={
                <Flex className="items-center justify-between">
                  <div>
                    {topic.category.map((tag, index) => (
                      <CheckableTag checked key={index}>
                        {tag}
                      </CheckableTag>
                    ))}
                    {topic.tags.map((tag, index) => (
                      <Tag key={index} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div>
                    <Button
                      className="mr-4"
                      key="edit"
                      onClick={() => handleUpdateTopic(topic)}
                    >
                      编辑
                    </Button>
                    {roles > 2 && (
                      <Button
                        className="mr-4"
                        key="delete"
                        type="primary"
                        danger
                        onClick={() =>
                          handleDeleteTopic(topic.tid, topic.content)
                        }
                      >
                        删除
                      </Button>
                    )}
                  </div>
                </Flex>
              }
            />
            {<p className="break-words">{topic.content.slice(0, 233)}</p>}
          </List.Item>
        )}
      />

      <Modal
        title="重新编辑话题"
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}
      >
        <h4 className="font-bold">标题</h4>
        <Input
          showCount
          value={topic.title}
          maxLength={40}
          onChange={(event) => setTopicData(event.target.value, 'title')}
        />

        <h4 className="font-bold">内容</h4>
        <TextArea
          showCount
          value={topic.content}
          maxLength={10007}
          onChange={(event) => setTopicData(event.target.value, 'content')}
          className="h-64 mb-4"
        />

        <h4 className="font-bold">标签（注意，标签必须用英文逗号分隔）</h4>
        <Input
          showCount
          value={topic.tags}
          onChange={(event) => setTopicData(event.target.value, 'tags')}
          className="h-8 mb-4"
        />

        <h4 className="font-bold">
          分类（注意, 分类一旦选择了 Others, 则不能选择其它两项）
        </h4>
        {categories.map((cat) => (
          <CheckableTag
            key={cat}
            checked={selectedCategories.includes(cat)}
            onChange={(checked) => handleChange(cat, checked)}
          >
            {cat}
          </CheckableTag>
        ))}
      </Modal>

      <Modal
        title="删除话题"
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}
      >
        <div className="p-4 my-4 border-4 border-blue-100 rounded-lg">
          <p>{topic.content.slice(0, 233)}</p>
        </div>
        <p>您确定删除话题吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

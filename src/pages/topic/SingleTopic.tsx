import { FC, useState } from 'react'
import {
  EyeOutlined,
  CommentOutlined,
  RollbackOutlined
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
  Checkbox
} from 'antd'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/modules/userStore'
import { updateTopicByTidApi, deleteTopicByTidApi } from '@/api/topic/topic'
import { section, sectionMap, sectionColorMap } from './category'
import { TopicHeader } from './TopicHeader'
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
  const [topicData, setTopicData] = useState<Topic>({
    tid: 0,
    user: {
      uid: 0,
      avatar: '',
      name: ''
    },
    title: '',
    category: [],
    section: [],
    tags: [],
    content: '',
    time: 0,
    views: 0,
    comments: 0,
    replies: 0,

    edited: 0,
    status: 0
  })

  const handleUpdateTopic = (topic: Topic) => {
    setTopicData(topic)
    setOpen(true)
  }

  const handleEditConfirm = async () => {
    if (
      !topicData.category.length ||
      !topicData.section.length ||
      !topicData.tags.length
    ) {
      messageApi.open({
        type: 'warning',
        content: '请至少选择一个标签、分类、分区'
      })
      return
    }
    const requestData: UpdateTopicRequestData = {
      tid: topicData.tid,
      title: topicData.title,
      content: topicData.content,
      tags: topicData.tags
        .toString()
        .split(',')
        .map((tag) => tag.trim()),
      category: topicData.category,
      section: topicData.section
    }

    const res = await updateTopicByTidApi(requestData)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '话题编辑成功'
      })

      setOpen(false)
      reload()
    }
  }

  const handleDeleteTopic = (tid: number, content: string) => {
    setTopicData({ ...topicData, tid, content })
    setOpenDelete(true)
  }

  const handleDeleteConfirm = async () => {
    console.log(topicData.tid)

    const res = await deleteTopicByTidApi(topicData.tid)
    if (res.code === 200) {
      messageApi.open({
        type: 'success',
        content: '话题删除成功'
      })

      setOpenDelete(false)
      reload()
    }
  }

  const handleChange = (cat: string, checked: boolean) => {
    const nextSelectedCategories = checked
      ? [...topicData.category, cat]
      : topicData.category.filter((c) => c !== cat)
    setTopicData({ ...topicData, category: nextSelectedCategories })
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout='vertical'
        className='overflow-y-scroll'
        style={{ maxHeight: 'calc(100dvh - 233px)' }}
        pagination={{
          defaultCurrent: 1,
          total: topicList?.length
        }}
        dataSource={topicList}
        renderItem={(topic) => (
          <List.Item
            key={topic.title}
            actions={[
              <IconText
                icon={EyeOutlined}
                text={topic.views.toString()}
                key='list-vertical-star-o'
              />,
              <IconText
                icon={CommentOutlined}
                text={topic.comments.toString()}
                key='list-vertical-like-o'
              />,
              <IconText
                icon={RollbackOutlined}
                text={topic.replies.toString()}
                key='list-vertical-message'
              />,

              <span key='time'>
                发布时间：
                {dayjs(topic.time).format('MM-D-YYYY - HH:mm:ss')}
              </span>,
              topic.edited !== 0 && (
                <span key='edited' className='text-blue-500'>
                  重新编辑于：
                  {dayjs(topic.edited).format('MM-D-YYYY - HH:mm:ss')}
                </span>
              )
            ]}>
            <List.Item.Meta
              avatar={
                topic.user.avatar ? (
                  <Avatar src={topic.user.avatar} />
                ) : (
                  <Avatar className='text-white bg-blue-500'>
                    {topic.user.name[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={<TopicHeader topic={topic} reload={reload} />}
              description={
                <Flex className='items-center justify-between'>
                  <Flex align='center'>
                    {topic.category.map((tag, index) => (
                      <CheckableTag checked key={index}>
                        {tag}
                      </CheckableTag>
                    ))}

                    {topic.section.map((sec, index) => (
                      <span
                        className={`leading-5 px-2 mr-2 text-xs border ${
                          sectionColorMap[sec[0]]
                        } rounded`}
                        key={index}>
                        {sectionMap[sec]}
                      </span>
                    ))}

                    {topic.tags.map((tag, index) => (
                      <Tag key={index} color='blue'>
                        {tag}
                      </Tag>
                    ))}
                  </Flex>

                  <div>
                    <Button
                      className='mr-4'
                      key='edit'
                      onClick={() => handleUpdateTopic(topic)}>
                      编辑
                    </Button>
                    {roles > 2 && (
                      <Button
                        className='mr-4'
                        key='delete'
                        type='primary'
                        danger
                        onClick={() =>
                          handleDeleteTopic(topic.tid, topic.content)
                        }>
                        删除
                      </Button>
                    )}
                  </div>
                </Flex>
              }
            />
            {<p className='break-words'>{topic.content.slice(0, 233)}</p>}
          </List.Item>
        )}
      />

      <Modal
        title='重新编辑话题'
        open={open}
        onOk={handleEditConfirm}
        onCancel={() => setOpen(false)}>
        <h4 className='font-bold'>标题</h4>
        <Input
          showCount
          value={topicData.title}
          maxLength={40}
          onChange={(event) =>
            setTopicData({ ...topicData, title: event.target.value })
          }
        />
        <h4 className='font-bold'>内容</h4>
        <TextArea
          showCount
          value={topicData.content}
          maxLength={10007}
          onChange={(event) =>
            setTopicData({ ...topicData, content: event.target.value })
          }
          className='h-64 mb-4'
        />
        <h4 className='font-bold'>标签（注意，标签必须用英文逗号分隔）</h4>
        <Input
          showCount
          value={topicData.tags}
          onChange={(event) =>
            setTopicData({ ...topicData, tags: [event.target.value] })
          }
          className='h-8 mb-4'
        />
        <h4 className='font-bold'>
          分类（注意, 分类一旦选择了 Others, 则不能选择其它两项）
        </h4>
        {categories.map((cat) => (
          <CheckableTag
            key={cat}
            checked={topicData.category.includes(cat)}
            onChange={(checked) => handleChange(cat, checked)}>
            {cat}
          </CheckableTag>
        ))}
        <h4 className='mt-4 font-bold'>分区（注意, 一个分类只能有一个分区）</h4>

        <Checkbox.Group
          options={section}
          value={topicData.section}
          onChange={(value) => setTopicData({ ...topicData, section: value })}
        />
      </Modal>

      <Modal
        title='删除话题'
        open={openDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setOpenDelete(false)}>
        <div className='p-4 my-4 border-4 border-blue-100 rounded-lg'>
          <p>{topicData.content.slice(0, 233)}</p>
        </div>
        <p>您确定删除话题吗, 该操作不可撤销</p>
      </Modal>
    </>
  )
}

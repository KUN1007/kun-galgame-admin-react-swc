import { FC, useState, useEffect } from 'react'
import { List, Avatar, Flex } from 'antd'
import dayjs from 'dayjs'
import { getInfoApi } from '@/api/info/info'
import type { Info } from '@/api/info/info'

const InfoTypeMap: Record<string, string> = {
  get: 'bg-green-600',
  post: 'bg-yellow-600',
  update: 'bg-blue-600',
  delete: 'bg-red-600',
  global: 'bg-gray-600',
}

const InfoPage: FC = () => {
  const [info, setInfo] = useState<Info[]>([])

  const getInfo = async () => {
    const res = await getInfoApi(1, 20)
    setInfo(res.data)
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <List
      itemLayout="horizontal"
      dataSource={info}
      className="overflow-y-scroll"
      style={{ maxHeight: 'calc(100dvh - 233px)' }}
      pagination={{
        pageSize: 10,
      }}
      renderItem={(info) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <a
                href={`https://www.kungal.com/kungalgamer/${info.user.uid}/info`}
                target="_blank"
              >
                <Flex vertical align="center">
                  {info.user.avatar ? (
                    <Avatar src={info.user.avatar} />
                  ) : (
                    <Avatar className="text-white bg-blue-600">
                      {info.user.name[0].toUpperCase()}
                    </Avatar>
                  )}
                </Flex>
              </a>
            }
            title={
              <pre className="break-words whitespace-pre-wrap">
                {info.content}
              </pre>
            }
            description={
              <Flex justify="space-between">
                <span
                  className={`px-2 ${
                    InfoTypeMap[info.type]
                  } text-white rounded-lg`}
                >
                  {info.type.toLocaleUpperCase()}
                </span>
                <span>{dayjs(info.time).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Flex>
            }
          />
        </List.Item>
      )}
    />
  )
}

export default InfoPage

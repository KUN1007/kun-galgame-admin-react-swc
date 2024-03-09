import { FC, useState, useEffect } from 'react'
import { List, Avatar, Flex } from 'antd'
import dayjs from 'dayjs'
import { getInfoApi } from '@/api/info/info'
import type { Info } from '@/api/info/info'

const InfoTypeMap: Record<string, string> = {
  get: 'green',
  post: 'yellow',
  update: 'blue',
  delete: 'red',
  global: 'gray',
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
      className="pr-4 overflow-y-scroll"
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
                    <Avatar className="text-white bg-blue-500">
                      {info.user.name[0].toUpperCase()}
                    </Avatar>
                  )}
                </Flex>
              </a>
            }
            title={<pre>{info.content}</pre>}
            description={
              <Flex justify="space-between">
                <span
                  className={`px-2 text-white rounded-lg bg-${
                    InfoTypeMap[info.type]
                  }-500`}
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

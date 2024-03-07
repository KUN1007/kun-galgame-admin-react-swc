import { FC, useEffect, useState } from 'react'
import { Statistic, Slider, Row, Col, Flex, Divider } from 'antd'
import { getOverviewDataApi } from '@/api/overview/overview'
import { useDebouncedCallback } from 'use-debounce'
import { KunAdminSum } from './sum'
import type { OverviewData } from '@/api/overview/overview'

export const KunAdminStatistic: FC = () => {
  const [overview, setOverview] = useState<OverviewData>({
    newTopics: 0,
    newReplies: 0,
    newComments: 0,
    newUsers: 0,
  })
  const [days, setDays] = useState(1)

  const debouncedGetOverview = useDebouncedCallback(async (days: number) => {
    const res = await getOverviewDataApi(days)
    setOverview(res.data)
  }, 300)

  useEffect(() => {
    debouncedGetOverview(days)
  }, [days, debouncedGetOverview])

  return (
    <>
      <KunAdminSum />

      <Divider />

      <Row justify="space-evenly" align="middle">
        <Col span={4}>
          <h3>{`${days} 天内数据统计`}</h3>
        </Col>
        <Col span={12}>
          <Slider
            tooltip={{ open: true, placement: 'left', color: 'blue' }}
            min={1}
            max={20}
            onChange={(value) => setDays(value)}
            value={days}
          />
        </Col>
      </Row>

      <Flex justify="space-between" className="flex-wrap mt-8">
        <Statistic title="新发布话题" value={overview.newTopics} />
        <Statistic title="新发布回复" value={overview.newReplies} />
        <Statistic title="新发布评论" value={overview.newComments} />
        <Statistic title="新注册用户" value={overview.newUsers} />
      </Flex>
    </>
  )
}

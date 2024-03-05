import { FC, useEffect, useRef, useState } from 'react'
import { Statistic, Slider, Row, Col, Flex, Divider } from 'antd'
import {
  getSumDataApi,
  getOverviewDataApi,
  getLineChartDataApi,
} from '@/api/overview/overview'
import { MyResponsiveLine } from './line-chart'
import type { SumData, OverviewData } from '@/api/overview/overview'

const OverviewPage: FC = () => {
  const sum = useRef<SumData>({
    topicCount: 0,
    replyCount: 0,
    commentCount: 0,
    userCount: 0,
  })
  const [lineData, setLineData] = useState<Record<string, string | number>[]>(
    []
  )
  const [overview, setOverview] = useState<OverviewData>({
    newTopics: 0,
    newReplies: 0,
    newComments: 0,
    newUsers: 0,
  })
  const [days, setDays] = useState(2)

  const onChange = (newValue: number) => {
    setDays(newValue)
  }

  useEffect(() => {
    const getSum = async () => {
      const res = await getSumDataApi()
      sum.current = res.data
    }
    getSum()
  }, [])

  useEffect(() => {
    const getOverview = async () => {
      const res = await getOverviewDataApi(days)
      setOverview(res.data)
    }
    getOverview()
  }, [days])

  useEffect(() => {
    const getWeek = async () => {
      const res = await getLineChartDataApi(7, 'reply')

      const responseLineData = res.data.map((value, index) => {
        return Object.assign({}, { x: `前 ${index + 1} 天`, y: value })
      })

      setLineData(responseLineData)
    }
    getWeek()
  }, [])

  return (
    <div>
      <h2>数据统计</h2>

      <Flex justify="space-between" className="flex-wrap mt-8">
        <Statistic title="话题总数" value={sum.current.topicCount} />
        <Statistic title="回复总数" value={sum.current.replyCount} />
        <Statistic title="评论总数" value={sum.current.commentCount} />
        <Statistic title="用户总数" value={sum.current.userCount} />
      </Flex>

      <Divider />

      <Row justify="space-evenly" align="middle">
        <Col span={4}>
          <h3>{`${days} 天内数据统计`}</h3>
        </Col>
        <Col span={12}>
          <Slider
            tooltip={{ open: true, placement: 'left', color: 'blue' }}
            min={1}
            max={30}
            onChange={onChange}
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

      <Divider />

      <h2>折线统计图</h2>

      <div className="w-full" style={{ height: '400px' }}>
        {lineData.length && (
          <MyResponsiveLine
            data={[{ id: 'kun', color: 'blue', data: lineData }]}
          />
        )}
      </div>
    </div>
  )
}

export default OverviewPage

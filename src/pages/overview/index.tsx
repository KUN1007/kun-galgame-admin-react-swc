import { FC, useEffect, useRef, useState } from 'react'
import { Statistic, Slider, Row, Col, Flex, Divider, Radio } from 'antd'
import {
  getSumDataApi,
  getOverviewDataApi,
  getLineChartDataApi,
} from '@/api/overview/overview'
import { MyResponsiveLine } from './line-chart'
import { debounce } from '@/utils/debounce'
import type { SumData, OverviewData, ModelName } from '@/api/overview/overview'

const optionMap = {
  topic: '话题',
  reply: '回复',
  comment: '评论',
  user: '用户',
}

const OverviewPage: FC = () => {
  const sum = useRef<SumData>({
    topicCount: 0,
    replyCount: 0,
    commentCount: 0,
    userCount: 0,
  })
  const [modelName, setModelName] = useState<ModelName>('topic')
  const [countDays, setCountDays] = useState(7)
  const [overview, setOverview] = useState<OverviewData>({
    newTopics: 0,
    newReplies: 0,
    newComments: 0,
    newUsers: 0,
  })
  const [days, setDays] = useState(2)
  const [lineData, setLineData] = useState<Record<string, string | number>[]>(
    []
  )

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

    debounce(() => getOverview(), 300)()
  }, [days])

  useEffect(() => {
    const getWeek = async () => {
      const res = await getLineChartDataApi(countDays, modelName)

      const responseLineData = res.data.map((value, index) => {
        return Object.assign({}, { x: `前 ${index + 1} 天`, y: value })
      })

      setLineData(responseLineData)
    }

    debounce(() => getWeek(), 300)()
  }, [countDays, modelName])

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

      <Divider />

      <h2>{`${optionMap[modelName]}数据 ${countDays} 天统计图`}</h2>

      <div className="w-full" style={{ height: '400px' }}>
        {lineData.length && (
          <MyResponsiveLine
            data={[{ id: 'kun', color: 'blue', data: lineData }]}
          />
        )}
      </div>

      <Flex justify="space-between" className="flex-wrap px-8">
        <Col span={12}>
          <Slider
            tooltip={{
              open: true,
              placement: 'left',
              color: 'blue',
              formatter: (value) => `${value} 天`,
            }}
            min={7}
            max={30}
            onChange={(value) => setCountDays(value)}
            value={countDays}
          />
        </Col>

        <Radio.Group
          onChange={(event) => setModelName(event.target.value)}
          defaultValue="topic"
        >
          <Radio.Button value="topic">话题</Radio.Button>
          <Radio.Button value="reply">回复</Radio.Button>
          <Radio.Button value="comment">评论</Radio.Button>
          <Radio.Button value="user">用户</Radio.Button>
        </Radio.Group>
      </Flex>
    </div>
  )
}

export default OverviewPage

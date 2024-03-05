import { FC, useState } from 'react'
import { Statistic, InputNumber, Slider, Row, Col } from 'antd'
import { getOverviewDataApi } from '@/api/overview/overview'
import type { OverviewData } from '@/api/overview/overview'

const OverviewPage: FC = () => {
  const [overview, setOverview] = useState<OverviewData>({
    newTopics: 0,
    newReplies: 0,
    newComments: 0,
    newUsers: 0,
  })
  const [days, setDays] = useState(1)

  const onChange = (newValue: number) => {
    setDays(newValue)
  }

  const getOverview = async () => {
    const res = await getOverviewDataApi(days)
    setOverview(res.data)
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <Slider min={1} max={20} onChange={onChange} value={days} />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={20}
            value={days}
            onChange={(value) => onChange(value ?? 0)}
          />
        </Col>
      </Row>

      <Statistic title="新发布话题" value={overview.newTopics} />
      <Statistic title="新发布回复" value={overview.newReplies} />
      <Statistic title="新发布评论" value={overview.newComments} />
      <Statistic title="新注册用户" value={overview.newUsers} />
    </div>
  )
}

export default OverviewPage

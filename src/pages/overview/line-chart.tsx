import { FC, useEffect, useState } from 'react'
import { Slider, Col, Flex, Radio } from 'antd'
import dayjs from 'dayjs'
import { getLineChartDataApi } from '@/api/overview/overview'
import { useDebouncedCallback } from 'use-debounce'
import { ResponsiveLine } from '@nivo/line'
import type { ModelName } from '@/api/overview/overview'

const optionMap = {
  topic: '话题',
  reply: '回复',
  comment: '评论',
  user: '用户',
}

export const KunAdminLineChart: FC = () => {
  const [modelName, setModelName] = useState<ModelName>('topic')
  const [countDays, setCountDays] = useState(7)
  const [lineData, setLineData] = useState<Record<string, string | number>[]>(
    []
  )

  const getWeek = useDebouncedCallback(
    async (countDays: number, modelName: ModelName) => {
      const res = await getLineChartDataApi(countDays, modelName)

      const responseLineData = res.data.map((value, index) => {
        return Object.assign(
          {},
          {
            x: dayjs()
              .subtract(index + 1, 'day')
              .format('M-D'),
            y: value,
          }
        )
      })

      setLineData(responseLineData)
    },
    300
  )

  useEffect(() => {
    getWeek(countDays, modelName)
  }, [countDays, modelName, getWeek])

  return (
    <>
      <h2>{`${optionMap[modelName]}数据 ${countDays} 天统计图`}</h2>
      <p>
        提示: 举最新一天数据为例, 该数据为今日 00:00 至昨日 00:00 间隔的数据
      </p>

      <div className="w-full" style={{ height: '400px' }}>
        {lineData.length && (
          <ResponsiveLine
            data={[{ id: 'kun', color: 'blue', data: lineData }]}
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            lineWidth={3}
            pointSize={10}
            colors={{ scheme: 'category10' }}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
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
    </>
  )
}

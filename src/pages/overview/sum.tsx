import { FC, useEffect, useState } from 'react'
import { Statistic, Flex } from 'antd'
import { getSumDataApi } from '@/api/overview/overview'
import type { SumData } from '@/api/overview/overview'

export const KunAdminSum: FC = () => {
  const [sum, setSum] = useState<SumData>({
    topicCount: 0,
    replyCount: 0,
    commentCount: 0,
    userCount: 0,
  })

  const getSum = async () => {
    const res = await getSumDataApi()
    setSum(res.data)
  }

  useEffect(() => {
    getSum()
  }, [])

  return (
    <>
      <h2>数据统计</h2>

      <Flex justify="space-between" className="flex-wrap mt-8">
        <Statistic title="话题总数" value={sum.topicCount} />
        <Statistic title="回复总数" value={sum.replyCount} />
        <Statistic title="评论总数" value={sum.commentCount} />
        <Statistic title="用户总数" value={sum.userCount} />
      </Flex>
    </>
  )
}

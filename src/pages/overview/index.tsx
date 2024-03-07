import { FC } from 'react'
import { Divider } from 'antd'
import { KunAdminLineChart } from './line-chart'
import { KunAdminStatistic } from './statistic'

const OverviewPage: FC = () => {
  return (
    <>
      <KunAdminStatistic />

      <Divider />

      <KunAdminLineChart />
    </>
  )
}

export default OverviewPage

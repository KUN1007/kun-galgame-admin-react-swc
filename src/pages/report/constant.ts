import type { ReportType, Status } from '@/api/report/types'

export type FilterStatus = 'all' | Status

export type FilterReportType = 'all' | ReportType

export const operatorStatusMap: Record<
  Status,
  {
    label: string
    value: Status
  }
> = {
  0: {
    label: '未处理',
    value: 0
  },
  1: {
    label: '正在处理',
    value: 1
  },
  2: {
    label: '已处理',
    value: 2
  }
}

export const operatorOptions = Object.values(operatorStatusMap)

export const filterStatusOptions = [
  {
    label: '全部',
    value: 'all'
  },
  ...operatorOptions
]

export const filterReportTypeOptions: {
  label: string
  value: FilterReportType
}[] = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '话题',
    value: 'topic'
  },
  {
    label: '回复',
    value: 'reply'
  },
  {
    label: '评论',
    value: 'comment'
  },
  {
    label: '用户',
    value: 'user'
  },
  {
    label: '游戏',
    value: 'galgame'
  },
  {
    label: '游戏评论',
    value: 'galgameComment'
  }
]

import { fetchGet } from '@/utils/request'

export interface SumData {
  topicCount: number
  replyCount: number
  commentCount: number
  userCount: number
}

export interface OverviewData {
  newTopics: number
  newReplies: number
  newComments: number
  newUsers: number
}

export interface WeekData {}

export type ModelName = 'topic' | 'reply' | 'comment' | 'user'
type OverviewResponseData = KUNGalgameResponseData<OverviewData>
type SumResponseData = KUNGalgameResponseData<SumData>
type LineChartResponseData = KUNGalgameResponseData<number[]>

export const getSumDataApi = async (): Promise<SumResponseData> => {
  const url = `/overview/sum`
  const response = await fetchGet<SumResponseData>(url)
  return response
}

export const getOverviewDataApi = async (
  days: number
): Promise<OverviewResponseData> => {
  const url = `/overview?days=${days}`
  const response = await fetchGet<OverviewResponseData>(url)
  return response
}

export const getLineChartDataApi = async (
  days: number,
  model: ModelName
): Promise<LineChartResponseData> => {
  const url = `/overview/line?days=${days}&model=${model}`
  const response = await fetchGet<LineChartResponseData>(url)
  return response
}

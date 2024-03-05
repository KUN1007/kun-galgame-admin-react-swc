import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'

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

type OverviewResponseData = KUNGalgameResponseData<OverviewData>
type SumResponseData = KUNGalgameResponseData<SumData>

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

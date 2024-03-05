import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'

export interface OverviewData {
  newTopics: number
  newReplies: number
  newComments: number
  newUsers: number
}

export interface WeekData {}

type OverviewResponseData = KUNGalgameResponseData<OverviewData>

export const getOverviewDataApi = async (
  days: number
): Promise<OverviewResponseData> => {
  const url = `/overview?days=${days}`
  const response = await fetchPut<OverviewResponseData>(url)
  return response
}

import { fetchPost } from '@/utils/request'

export interface UpdateLogRequestData {
  description: string
  language: Language
  time: string
  version: string
}

export type Language = 'en-us' | 'zh-cn'
export type UpdateLogResponseData = KUNGalgameResponseData<null>

export const createUpdateLogApi = async (
  data: UpdateLogRequestData
): Promise<UpdateLogResponseData> => {
  const url = `/update/history`
  const response = await fetchPost<UpdateLogResponseData>(url, data)
  return response
}

import { fetchGet } from '@/utils/request'

export interface Info {
  ai_id: number
  user: {
    uid: number
    avatar: string
    name: string
  }
  content: string
  time: number
}

type GetInfoResponseData = KUNGalgameResponseData<Info[]>

export const getInfoApi = async (
  page: number,
  limit: number
): Promise<GetInfoResponseData> => {
  const url = `/admin/info?page=${page}&limit=${limit}`
  const response = await fetchGet<GetInfoResponseData>(url)
  return response
}

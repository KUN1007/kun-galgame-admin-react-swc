import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'

export interface User {
  uid: number
  avatar: string
  name: string
}

export interface Topic {
  tid: number
  user: User
  title: string
  category: string[]
  section: string[]
  tags: string[]
  content: string
  time: number
  views: number
  comments: number
  replies: number

  edited: number
  status: number

  [key: string]: number | User | string | string[]
}

export interface UpdateTopicRequestData {
  tid: number
  title: string
  content: string
  tags: string[]
  category: string[]
  section: string[]
}

export interface UpdateTopicStatusRequestData {
  tid: number
  status: number
}

type SearchTopicResponseData = KUNGalgameResponseData<Topic[]>
type UpdateTopicResponseData = KUNGalgameResponseData<null>

export const getTopicsByContentApi = async (
  keywords: string
): Promise<SearchTopicResponseData> => {
  const url = `/topic?keywords=${keywords}`
  const response = await fetchGet<SearchTopicResponseData>(url)
  return response
}

export const updateTopicByTidApi = async (
  topic: UpdateTopicRequestData
): Promise<UpdateTopicResponseData> => {
  const url = `/topic`
  const response = await fetchPut<UpdateTopicResponseData>(url, { ...topic })
  return response
}

export const deleteTopicByTidApi = async (
  tid: number
): Promise<UpdateTopicResponseData> => {
  const url = `/topic?tid=${tid}`
  const response = await fetchDelete<UpdateTopicResponseData>(url)
  return response
}

export const updateTopicStatusApi = async (
  data: UpdateTopicStatusRequestData
): Promise<UpdateTopicResponseData> => {
  const url = `/topic/status`
  const response = await fetchPut<UpdateTopicResponseData>(url, { ...data })
  return response
}

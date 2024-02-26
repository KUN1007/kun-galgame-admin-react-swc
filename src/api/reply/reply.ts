import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'

export interface Reply {
  rid: number
  tid: number
  floor: number
  to_floor: number
  r_user: {
    uid: number
    name: string
    avatar: string
  }
  to_user: {
    uid: number
    name: string
    avatar: string
  }
  edited: number
  content: string
  upvotes: number[]
  upvote_time: number
  likes: number
  dislikes: number
  tags: string[]
  time: number
  reply: number[]
}

export interface UpdateReplyRequestData {
  tid: number
  rid: number
  content: string
  tags: string[]
}

type SearchReplyResponseData = KUNGalgameResponseData<Reply[]>
type UpdateReplyResponseData = KUNGalgameResponseData<null>

export const getRepliesByContentApi = async (
  content: string
): Promise<SearchReplyResponseData> => {
  const url = `/reply?content=${content}`
  const response = await fetchGet<SearchReplyResponseData>(url)
  return response
}

export const updateReplyByRidApi = async (
  reply: UpdateReplyRequestData
): Promise<UpdateReplyResponseData> => {
  const url = `/reply`
  const response = await fetchPut<UpdateReplyResponseData>(url, { ...reply })
  return response
}

export const deleteReplyByRidApi = async (
  rid: number
): Promise<UpdateReplyResponseData> => {
  const url = `/reply?rid=${rid}`
  const response = await fetchDelete<UpdateReplyResponseData>(url)
  return response
}

import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'

export interface Comment {
  cid: number
  rid: number
  tid: number
  c_user: {
    uid: number
    avatar: string
    name: string
  }
  to_user: {
    uid: number
    avatar: string
    name: string
  }
  content: string
  likes: number
  dislikes: number
}

type SearchCommentResponseData = KUNGalgameResponseData<Comment[]>
type UpdateCommentResponseData = KUNGalgameResponseData<null>

export const getComments = async (
  content: string
): Promise<SearchCommentResponseData> => {
  const url = `/comment?content=${content}`
  const response = await fetchGet<SearchCommentResponseData>(url)
  return response
}

export const updateCommentByCidApi = async (
  cid: number,
  content: string
): Promise<UpdateCommentResponseData> => {
  const url = `/comment`
  const response = await fetchPut<UpdateCommentResponseData>(url, {
    cid,
    content
  })
  return response
}

export const deleteCommentByCidApi = async (
  cid: number
): Promise<UpdateCommentResponseData> => {
  const url = `/comment?cid=${cid}`
  const response = await fetchDelete<UpdateCommentResponseData>(url)
  return response
}

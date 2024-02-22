import { fetchGet } from '@/utils/request'

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

export const getCommentCidByContentApi = async (
  content: string
): Promise<SearchCommentResponseData> => {
  const url = `/comment?content=${content}`
  const response = await fetchGet<SearchCommentResponseData>(url)
  return response
}

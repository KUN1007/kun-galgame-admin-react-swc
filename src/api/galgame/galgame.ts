import { fetchDelete, fetchGet } from '@/utils/request'

export interface GalgameResource {
  grid: number
  link: string
  user: KunUser
}

export interface GalgameComment {
  gcid: number
  content: string
  user: KunUser
}

export interface Galgame {
  gid: number
  name: KunLanguage
  resources: GalgameResource[]
  comments: GalgameComment[]
}

type GetGalgameResponseData = KUNGalgameResponseData<Galgame>
type ResponseData = KUNGalgameResponseData<null>

export const getGalgameApi = async (
  gid: number
): Promise<GetGalgameResponseData> => {
  const url = `/galgame?gid=${gid}`
  const response = await fetchGet<GetGalgameResponseData>(url)
  return response
}

export const deleteGalgameResourceApi = async (
  grid: number
): Promise<ResponseData> => {
  const url = `/galgame/resource?grid=${grid}`
  const response = await fetchDelete<ResponseData>(url)
  return response
}

export const deleteGalgameCommentApi = async (
  gcid: number
): Promise<ResponseData> => {
  const url = `/galgame/comment?gcid=${gcid}`
  const response = await fetchDelete<ResponseData>(url)
  return response
}

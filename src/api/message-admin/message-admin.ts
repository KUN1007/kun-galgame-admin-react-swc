import { fetchDelete, fetchGet, fetchPost } from '@/utils/request'

export interface MessageAdmin {
  maid: number
  time: number
  status: 'read' | 'unread'
  content: KunLanguage
}

export type GetMessageAdminResponseData = KUNGalgameResponseData<MessageAdmin[]>
export type MessageAdminResponseData = KUNGalgameResponseData<null>

export const getMessageAdminsApi = async (
  page: number,
  limit: number
): Promise<GetMessageAdminResponseData> => {
  const url = `/message-admin?page=${page}&limit=${limit}`
  const response = await fetchGet<GetMessageAdminResponseData>(url)
  return response
}

export const createMessageAdminApi = async (
  content: KunLanguage
): Promise<MessageAdminResponseData> => {
  const url = `/message-admin`
  const response = await fetchPost<MessageAdminResponseData>(url, { content })
  return response
}

export const deleteMessageAdminApi = async (
  maid: number
): Promise<MessageAdminResponseData> => {
  const url = `/message-admin?maid=${maid}`
  const response = await fetchDelete<MessageAdminResponseData>(url)
  return response
}

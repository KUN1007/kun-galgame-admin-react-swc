import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'
import type { User } from '@/types/api/user'

export interface UserResponseData {
  uid: number
  name: string
  avatar: string
  bio: string
  time: number
  status: number
}

type FindUserResponseData = KUNGalgameResponseData<User | null>
type SearchUserResponseData = KUNGalgameResponseData<
  UserResponseData[] | UserResponseData | null
>
type EmptyUserResponseData = KUNGalgameResponseData<null>

export const getUserByUid = async (
  uid: number
): Promise<FindUserResponseData> => {
  const url = `/user/${uid}`
  const response = await fetchGet<FindUserResponseData>(url)
  return response
}

export const getUserByUsername = async (
  name: string,
  exactly?: boolean
): Promise<SearchUserResponseData> => {
  const url = `/user/search?name=${name}&exactly=${exactly ? 1 : 0}`
  const response = await fetchGet<SearchUserResponseData>(url)
  return response
}

export const updateUserRoles = async (
  uid: number,
  roles: number
): Promise<EmptyUserResponseData> => {
  const url = `/admin/set`
  const response = await fetchPut<EmptyUserResponseData>(url, { uid, roles })
  return response
}

export const banUserByUid = async (
  uid: number
): Promise<EmptyUserResponseData> => {
  const url = `/user/ban`
  const response = await fetchPut<EmptyUserResponseData>(url, { uid })
  return response
}

export const unbanUserByUid = async (
  uid: number
): Promise<EmptyUserResponseData> => {
  const url = `/user/unban`
  const response = await fetchPut<EmptyUserResponseData>(url, { uid })
  return response
}

export const deleteUserByUid = async (
  uid: number
): Promise<EmptyUserResponseData> => {
  const url = `/user/${uid}`
  const response = await fetchDelete<EmptyUserResponseData>(url)
  return response
}

import { fetchDelete, fetchGet, fetchPut } from '@/utils/request'
import type { User } from '@/types/api/user'
// import objectToQueryParams from '@/utils/objectToQueryParams'

export interface UserResponseData {
  uid: number
  name: string
  avatar: string
  bio: string
  time: number
  status: number
}

type FindUserResponseData = KUNGalgameResponseData<User>
type SearchUserResponseData = KUNGalgameResponseData<UserResponseData[]>
type BanUserResponseData = KUNGalgameResponseData<string>
type UnbanUserResponseData = KUNGalgameResponseData<string>
type DeleteUserResponseData = KUNGalgameResponseData<null>

export const getUserByUid = async (
  uid: number
): Promise<FindUserResponseData> => {
  const url = `/user/${uid}`
  const response = await fetchGet<FindUserResponseData>(url)
  return response
}

export const getUserByUsername = async (
  name: string
): Promise<SearchUserResponseData> => {
  const url = `/user/search?name=${name}`
  const response = await fetchGet<SearchUserResponseData>(url)
  return response
}

export const banUserByUid = async (
  uid: number
): Promise<BanUserResponseData> => {
  const url = `/user/ban`
  const response = await fetchPut<BanUserResponseData>(url, { uid })
  return response
}

export const unbanUserByUid = async (
  uid: number
): Promise<UnbanUserResponseData> => {
  const url = `/user/unban`
  const response = await fetchPut<UnbanUserResponseData>(url, { uid })
  return response
}

export const deleteUserByUid = async (
  uid: number
): Promise<DeleteUserResponseData> => {
  const url = `/user/${uid}`
  const response = await fetchDelete<DeleteUserResponseData>(url)
  return response
}

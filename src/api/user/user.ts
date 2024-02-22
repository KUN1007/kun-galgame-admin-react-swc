import { fetchGet, fetchPut } from '@/utils/request'
import type { User } from '@/types/api/user'
// import objectToQueryParams from '@/utils/objectToQueryParams'

type FindUserResponseData = KUNGalgameResponseData<User>
type BanUserResponseData = KUNGalgameResponseData<string>
type UnbanUserResponseData = KUNGalgameResponseData<string>

export const getUserByUid = async (
  uid: number
): Promise<FindUserResponseData> => {
  const url = `/user/${uid}`
  const response = await fetchGet<FindUserResponseData>(url)
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

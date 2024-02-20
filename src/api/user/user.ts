import { fetchGet } from '@/utils/request'
import type { User } from '@/types/api/user'
// import objectToQueryParams from '@/utils/objectToQueryParams'

type FindUserResponseData = KUNGalgameResponseData<User>

export const getUserByUid = async (
  uid: number
): Promise<FindUserResponseData> => {
  const url = `/user/${uid}`
  const response = await fetchGet<FindUserResponseData>(url)
  return response
}

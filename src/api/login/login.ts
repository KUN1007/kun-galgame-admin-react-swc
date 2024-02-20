import { fetchPost } from '@/utils/request'
import type { UserInfo } from '@/store/types'

interface LoginUserInfo {
  name: string
  password: string
}

type LoginResponseData = KUNGalgameResponseData<UserInfo>

export const loginApi = async (
  data: LoginUserInfo
): Promise<LoginResponseData> => {
  const url = `/user/login`
  const response = await fetchPost<LoginResponseData>(url, data)
  return response
}

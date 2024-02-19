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
  return await fetchPost('/user/login', data)
}

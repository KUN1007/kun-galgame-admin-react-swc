import { kunAxios } from '@/utils/service'
import type { UserInfo } from '@/store/types'

interface LoginUserInfo {
  name: string
  password: string
}

export const loginApi = (data: LoginUserInfo): Promise<UserInfo> => {
  return kunAxios({
    url: '/user/login',
    method: 'post',
    data,
  })
}

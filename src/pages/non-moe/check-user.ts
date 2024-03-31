import { getUserByUid, getUserByUsername } from '@/api/user/user'

export const checkUserByUid = async (uid: number): Promise<boolean> => {
  return (await getUserByUid(uid)).data !== null
}

export const checkUserByUsername = async (name: string): Promise<boolean> => {
  return (await getUserByUsername(name, true)).data !== null
}

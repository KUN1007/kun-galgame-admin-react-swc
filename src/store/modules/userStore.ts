import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/store/types'

const initialState: UserInfo = {
  uid: 0,
  name: '',
  avatar: '',
  token: '',
  roles: 0,
}

interface KunPersistUserStore {
  user: UserInfo
  setInfo: (info: UserInfo) => void
  getToken: () => string
}

export const useUserStore = create<KunPersistUserStore>()(
  persist(
    (set, get) => ({
      user: initialState,
      setInfo: (info: UserInfo) => set({ user: info }),
      getToken: () => get().user.token,
    }),
    {
      name: 'KunAdminUserStore',
    }
  )
)

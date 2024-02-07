import { createSlice } from '@reduxjs/toolkit'
import type { UserInfo } from '@/store/types'

const initialState: UserInfo = {
  uid: '',
  name: '',
  avatar: '',
  roles: '',
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = userSlice.actions

export default userSlice.reducer

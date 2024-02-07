import type { Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userStore from './modules/userStore'

const persistConfig = {
  key: 'redux-persist',
  storage,
}

const store: Store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userStore),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export { store, persistor }

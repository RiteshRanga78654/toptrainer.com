import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

// Build a fresh store per call instead of a module-level singleton. A
// singleton created at import time is a known source of stale/duplicated
// state across Next.js server renders and Fast Refresh reloads in dev,
// which can make auth state look like it's "flickering" between requests.
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

export default store
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../lib/api'

// Helper to get/set token in both cookie and localStorage (no backend needed)
function saveToken(token) {
  if (typeof window === 'undefined') return
  localStorage.setItem('tt_token', token)
  document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 3600}`
}
function clearToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('tt_token')
  document.cookie = 'token=; path=/; max-age=0'
}
function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('tt_token') || document.cookie.match(/token=([^;]+)/)?.[1] || null
}

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(credentials)
    const { token, user } = res.data.data
    saveToken(token)
    return { token, user }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await authAPI.me()
    return res.data.data || res.data
  } catch (err) {
    clearToken()
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch user')
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  try { await authAPI.logout() } catch (_) {}
  clearToken()
})

const initialState = {
  user: null,
  token: typeof window !== 'undefined' ? getToken() : null,
  loading: false,
  initialized: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.initialized = true
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchMe.pending, (state) => { state.loading = true })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload; state.initialized = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false; state.user = null; state.token = null; state.initialized = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null; state.token = null; state.initialized = true
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer

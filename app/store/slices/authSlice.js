import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, userAPI } from "../../lib/api";

const TOKEN_KEY = "tt_token";
const ROLE_KEY = "tt_role";
const USER_KEY = "tt_user";
const COOKIE_MAX_AGE = 7 * 24 * 3600;

function saveToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `token=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = "token=; path=/; max-age=0";
}

function getToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(TOKEN_KEY) ||
    document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1] ||
    null
  );
}

function normalizeRole(role) {
  if (!role) return "user";
  const r = role.toLowerCase();
  if (r === "administrator" || r === "admin") return "admin";
  if (r === "trainer" || r === "content_writer") return "trainer";
  return "user";
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(credentials);

      const payload = res.data?.data || res.data;
      const token = payload?.token;
      const user = payload?.user;
      const rawRole = payload?.role || payload?.user?.role;

      if (!token || !user) {
        return rejectWithValue("Invalid login response from server");
      }

      const normalizedRole = normalizeRole(rawRole);
      const normalizedUser = {
        ...user,
        role: normalizedRole,
      };

      saveToken(token);
      localStorage.setItem(ROLE_KEY, normalizedRole);
      localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));

      return { token, user: normalizedUser };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await userAPI.register(formData);

      const payload = res.data?.data || res.data;
      const token = payload?.token;
      const user = payload?.user;

      if (!token || !user) {
        return rejectWithValue(
          payload?.message || "Invalid registration response from server"
        );
      }

      const normalizedRole = normalizeRole(user.role || "user");
      const normalizedUser = {
        ...user,
        role: normalizedRole,
      };

      saveToken(token);
      localStorage.setItem(ROLE_KEY, normalizedRole);
      localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));

      return { token, user: normalizedUser };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.me();
      const payload = res.data?.data || res.data;

      if (payload?.user) {
        payload.user.role = normalizeRole(payload.user.role);
      }
      return payload;
    } catch (err) {
      clearToken();
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authAPI.logout();
  } catch (_) {}
  clearToken();
});

const initialState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(USER_KEY) || "null")
      : null,
  token: typeof window !== "undefined" ? getToken() : null,
  loading: false,
  initialized: typeof window !== "undefined",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.initialized = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.initialized = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
        state.error = null;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.initialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.initialized = true;
        state.error = null;
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
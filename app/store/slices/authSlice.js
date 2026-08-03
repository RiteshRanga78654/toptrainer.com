import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, userAPI } from "../../lib/api";

function saveToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("tt_token", token);
  document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 3600}`;
}

function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("tt_token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  document.cookie = "token=; path=/; max-age=0";
}

function getToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("tt_token") ||
    document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1] ||
    null
  );
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(credentials);

      const payload = res.data?.data || res.data;
      const token = payload?.token;
      const user = payload?.user;
      const role = payload?.role || payload?.user?.role;

      if (!token || !user) {
        return rejectWithValue("Invalid login response from server");
      }

      const normalizedUser = {
        ...user,
        role: user.role || role,
      };

      saveToken(token);
      localStorage.setItem("role", normalizedUser.role || "");
      localStorage.setItem("user", JSON.stringify(normalizedUser));

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

      const normalizedUser = {
        ...user,
        role: user.role || "user",
      };

      saveToken(token);
      localStorage.setItem("role", normalizedUser.role || "");
      localStorage.setItem("user", JSON.stringify(normalizedUser));

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
      ? JSON.parse(localStorage.getItem("user") || "null")
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
        localStorage.setItem("user", JSON.stringify(state.user));
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
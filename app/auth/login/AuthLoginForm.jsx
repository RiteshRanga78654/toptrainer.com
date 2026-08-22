"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../store/slices/authSlice";

export default function AuthLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { loading, error, user, token, initialized } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const callbackUrl = searchParams.get("callbackUrl") || "";

  useEffect(() => {
    if (!initialized) return;
    if (!token || !user?.role) return;
    if (callbackUrl) {
      router.replace(decodeURIComponent(callbackUrl));
      return;
    }
    const targetPath = user.role === "admin" ? "/admin/homepage" : user.role === "trainer" ? "/trainer/dashboard" : "/user/dashboard";
    router.replace(targetPath);
  }, [initialized, token, user, router, callbackUrl]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        login({
          email: form.email,
          password: form.password,
          rememberMe,
        })
      ).unwrap();

      if (callbackUrl) {
        router.replace(decodeURIComponent(callbackUrl));
        return;
      }
      const targetPath = result.user.role === "admin" ? "/admin/homepage" : result.user.role === "trainer" ? "/trainer/dashboard" : "/user/dashboard";
      router.replace(targetPath);
    } catch (_) {}
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="anim-3 p-3 bg-red-50 border border-red-100 text-red-600 text-[14px] rounded-lg font-medium">
          {error}
        </div>
      )}

      <div className="anim-4 space-y-2">
        <label className="block text-[13px] font-semibold text-gray-800">
          Email address
        </label>
        <div
          className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${
            focusedField === "email" ? "border-[#5A5FE0]" : "border-gray-200"
          } bg-white`}
        >
          <Mail size={18} className="text-gray-400" strokeWidth={1.5} />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-400 w-full bg-transparent font-medium"
            required
          />
        </div>
      </div>

      <div className="anim-5 relative space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-[13px] font-semibold text-gray-800">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-[13px] font-semibold text-[#5A5FE0] hover:text-[#4A4FC0] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
        <div
          className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${
            focusedField === "password" ? "border-[#5A5FE0]" : "border-gray-200"
          } bg-white`}
        >
          <Lock size={18} className="text-gray-400" strokeWidth={1.5} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-400 w-full bg-transparent font-medium"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div className="anim-5 flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          id="remember"
          className="custom-checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label
          htmlFor="remember"
          className="text-[14px] text-gray-600 font-medium cursor-pointer select-none"
        >
          Remember me
        </label>
      </div>

      <div className="anim-6 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="login-btn w-full py-3.5 rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 disabled:opacity-80"
        >
          {loading ? (
            <div className="flex gap-1.5 items-center h-6">
              <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
              <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
              <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </div>

      <div className="anim-6 flex items-center gap-3 my-6">
        <div className="flex-1 h-[1px] bg-gray-100" />
        <span className="text-[13px] text-gray-400 font-medium">
          or continue with
        </span>
        <div className="flex-1 h-[1px] bg-gray-100" />
      </div>

      <div className="anim-7 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="social-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 text-gray-700 text-[14px] font-semibold bg-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-[#EA4335]">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("linkedin")}
          className="social-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 text-gray-700 text-[14px] font-semibold bg-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-[#0A66C2]">
            <path
              fill="currentColor"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
          Continue with LinkedIn
        </button>
      </div>
    </form>
  );
}

function handleSocialLogin(provider) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://toptrainer-backend-production.up.railway.app/api";
  window.location.href = `${baseUrl}/auth/${provider}`;
}
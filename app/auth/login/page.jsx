"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  FileText,
  Calendar,
  Chrome,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../store/slices/authSlice";

export default function UserTrainerLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, user, token } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!token || !user?.role) return;

    if (user.role === "admin") {
      router.replace("/admin");
    } else if (user.role === "trainer") {
      router.replace("/trainer/dashboard");
    } else {
      router.replace("/user/dashboard");
    }
  }, [token, user, router]);

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

      if (result.user.role === "admin") {
        router.replace("/admin");
      } else if (result.user.role === "trainer") {
        router.replace("/trainer/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    } catch (_) {}
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSocialLogin = (provider) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    window.location.href = `${baseUrl}/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8F9FC]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { font-family: 'Inter', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .anim-1 { animation: fadeSlideUp 0.6s ease both 0.05s; }
        .anim-2 { animation: fadeSlideUp 0.6s ease both 0.15s; }
        .anim-3 { animation: fadeSlideUp 0.6s ease both 0.25s; }
        .anim-4 { animation: fadeSlideUp 0.6s ease both 0.35s; }
        .anim-5 { animation: fadeSlideUp 0.6s ease both 0.45s; }
        .anim-6 { animation: fadeSlideUp 0.6s ease both 0.55s; }
        .anim-7 { animation: fadeSlideUp 0.6s ease both 0.65s; }

        .left-anim-1 { animation: fadeSlideRight 0.7s ease both 0.1s; }
        .left-anim-2 { animation: fadeSlideRight 0.7s ease both 0.2s; }
        .left-anim-3 { animation: fadeSlideRight 0.7s ease both 0.3s; }
        .left-anim-4 { animation: fadeSlideRight 0.7s ease both 0.4s; }
        .left-anim-5 { animation: fadeSlideRight 0.7s ease both 0.5s; }

        .input-field {
          transition: all 0.2s ease;
        }
        .input-field:focus-within {
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
          border-color: #4f46e5 !important;
        }

        .login-btn {
          background: #5A5FE0;
          transition: all 0.2s ease;
        }
        .login-btn:hover {
          background: #4A4FC0;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(90, 95, 224, 0.25);
        }
        .login-btn:active {
          transform: translateY(0);
        }

        .social-btn {
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          background: #f9fafb;
        }

        .custom-checkbox {
          appearance: none;
          background-color: #fff;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 1.5px solid #d1d5db;
          border-radius: 0.25em;
          display: grid;
          place-content: center;
          cursor: pointer;
        }
        .custom-checkbox::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em white;
          transform-origin: center;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }
        .custom-checkbox:checked {
          background-color: #5A5FE0;
          border-color: #5A5FE0;
        }
        .custom-checkbox:checked::before {
          transform: scale(1);
        }

        .loading-dot {
          animation: dotPulse 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.16s; }
        .loading-dot:nth-child(3) { animation-delay: 0.32s; }
      `}</style>

      <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row relative">
        <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={`dot1-${i}`} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          ))}
        </div>

        <div className="absolute top-[60%] left-10 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={`dot3-${i}`} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          ))}
        </div>

        <div className="absolute top-20 left-[45%] grid grid-cols-4 gap-2 opacity-20 pointer-events-none hidden xl:grid">
          {[...Array(16)].map((_, i) => (
            <div key={`dot2-${i}`} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          ))}
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 flex-col pt-10 px-8 sm:px-14 lg:px-24 relative z-10">
          <div className="left-anim-1 flex items-center gap-2 mb-16">
            <Image src="/icon.png" alt="toptrainer Logo" width={28} height={28} className="object-contain" />
            <span className="font-bold text-[22px] tracking-tight text-gray-900">TopTrainer</span>
          </div>

          <div className="flex-1 flex flex-col max-w-[500px]">
            <div className="left-anim-2 inline-flex items-center self-start mb-6 border border-blue-200 bg-white/60 rounded-sm px-2.5 py-1">
              <span className="text-[#5A5FE0] text-[13px] font-semibold tracking-wide">
                Connect. Learn. Grow.
              </span>
            </div>

            <h1 className="left-anim-3 text-[40px] sm:text-[44px] font-bold text-gray-900 leading-[1.2] tracking-tight mb-5">
              Find the right trainer. <br />
              Learn. Grow. <span className="text-[#5A5FE0]">Succeed.</span>
            </h1>

            <p className="left-anim-4 text-gray-600 text-[16px] leading-[1.6] mb-10 max-w-[440px]">
              Explore expert trainers, articles, and workshops that help you and
              your organization grow better every day.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Users size={20} className="text-[#5A5FE0]" />,
                  title: "Discover Expert Trainers",
                  desc: "Find the best trainers based on your needs and preferences.",
                  delay: "left-anim-4",
                  bg: "bg-[#F0F2FF]",
                },
                {
                  icon: <FileText size={20} className="text-[#5A5FE0]" />,
                  title: "Insights & Resources",
                  desc: "Read expert articles and watch videos to stay ahead in your field.",
                  delay: "left-anim-5",
                  bg: "bg-[#F0F2FF]",
                },
                {
                  icon: <Calendar size={20} className="text-[#5A5FE0]" />,
                  title: "Workshops & Events",
                  desc: "Join upcoming workshops and enhance your skills.",
                  delay: "left-anim-5",
                  bg: "bg-[#F0F2FF]",
                },
              ].map((f, i) => (
                <div key={i} className={`${f.delay} flex items-start gap-5`}>
                  <div className={`w-12 h-12 rounded-full ${f.bg} flex items-center justify-center flex-shrink-0`}>
                    {f.icon}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed max-w-[320px]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 relative z-10 min-h-screen lg:min-h-0">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8 w-full anim-1">
            <Image src="/icon.png" alt="TopTrainer Logo" width={32} height={32} className="object-contain" />
            <span className="font-bold text-[24px] tracking-tight text-gray-900">TopTrainer</span>
          </div>

          <div className="anim-2 w-full max-w-[480px] bg-white rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.06)] p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">
                Welcome back!
              </h2>
               <div className="anim-7 text-center">
                  <p className="text-[14px] text-gray-500 font-medium">
                    New here?{" "}
                    <Link href="/auth/register" className="text-[#5A5FE0] font-semibold hover:underline">
                      Join us
                    </Link>
                  </p>
                </div>
            </div>

            <div className="anim-3 flex border-b border-gray-100 mb-8 justify-center">
              <div className="w-1/2 text-center pb-3 border-b-[2.5px] border-[#5A5FE0] text-[#5A5FE0] font-semibold text-[15px] cursor-pointer">
                Login
              </div>
            </div>

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
                  <Chrome size={20} className="text-[#EA4335]" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin("linkedin")}
                  className="social-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 text-gray-700 text-[14px] font-semibold bg-white"
                >
                  <Linkedin size={20} className="text-[#0A66C2]" />
                  Continue with LinkedIn
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 mt-6">

                <div className="flex items-center gap-3 w-3/4">
                  <div className="flex-1 h-[1px] bg-gray-100" />
                  <p className="text-[12px] text-gray-400 font-medium">or</p>
                  <div className="flex-1 h-[1px] bg-gray-100" />
                </div>

                <div className="anim-7 text-center">
                  <Link
                    href="/join-as-trainer"
                    className="font-semibold text-[14px] text-[#5A5FE0] hover:underline cursor-pointer"
                  >
                    Join as a Trainer
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="w-full bg-white border-t border-gray-100 py-6 px-8 sm:px-14 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
        <p className="text-[13px] text-gray-500 font-medium">
          © 2024 toptrainer. All rights reserved.
        </p>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/privacy" className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/terms" className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Terms of Use
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/contact" className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}
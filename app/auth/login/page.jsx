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
  Facebook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../store/slices/authSlice";

export default function UserTrainerLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(
        user.role === "admin"
          ? "/admin"
          : user.role === "trainer"
            ? "/trainer/dashboard"
            : "/user/dashboard",
      );
    }
  }, [user, router]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ ...form, role })).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          background-color: transform;
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

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row relative">
        {/* Background Decorative Patterns */}
        <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot1-${i}`}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          ))}
        </div>
        <div className="absolute top-[60%] left-10 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot3-${i}`}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          ))}
        </div>
        <div className="absolute top-20 left-[45%] grid grid-cols-4 gap-2 opacity-20 pointer-events-none hidden xl:grid">
          {[...Array(16)].map((_, i) => (
            <div
              key={`dot2-${i}`}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          ))}
        </div>

        {/* LEFT COLUMN: Hero Section */}
        <div className="w-full lg:w-1/2 flex flex-col pt-10 px-8 sm:px-14 lg:px-24 relative z-10">
          {/* Logo */}
          <div className="left-anim-1 flex items-center gap-2 mb-16">
            <Image
              src="/icon.png"
              alt="toptrainer Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="font-bold text-[22px] tracking-tight text-gray-900">
              TopTrainer
            </span>
          </div>
          <div className="flex-1 flex flex-col max-w-[500px]">
            {/* Badge */}
            <div className="left-anim-2 inline-flex items-center self-start mb-6 border border-blue-200 bg-white/60 rounded-sm px-2.5 py-1">
              <span className="text-[#5A5FE0] text-[13px] font-semibold tracking-wide">
                Connect. Learn. Grow.
              </span>
            </div>

            {/* Heading */}
            <h1 className="left-anim-3 text-[40px] sm:text-[44px] font-bold text-gray-900 leading-[1.2] tracking-tight mb-5">
              Find the right trainer. <br />
              Learn. Grow. <span className="text-[#5A5FE0]">Succeed.</span>
            </h1>

            {/* Subheading */}
            <p className="left-anim-4 text-gray-600 text-[16px] leading-[1.6] mb-10 max-w-[440px]">
              Explore expert trainers, articles, and workshops that help you and
              your organization grow better every day.
            </p>

            {/* Features List */}
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
                  <div
                    className={`w-12 h-12 rounded-full ${f.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    {f.icon}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-1">
                      {f.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed max-w-[320px]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Illustration recreating the exact reference design */}
            <div className="left-anim-5 mt-16 relative w-full h-[320px] hidden sm:flex justify-center items-end">
              
              {/* Background Shapes */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F2F4FF] rounded-full blur-3xl opacity-80 z-0"></div>
              <div className="absolute bottom-10 left-1/4 w-48 h-48 bg-[#E6E8FF] rounded-full blur-3xl opacity-80 z-0"></div>

              {/* Base Illustration: Woman on laptop */}
              <Image
                src="/Images/login_illustration_base.png"
                alt="Woman working on laptop"
                width={360}
                height={360}
                className="object-contain relative z-10 max-h-[300px] w-auto mix-blend-multiply drop-shadow-sm ml-[-40px]"
                priority
              />

              {/* Plant Decoration */}
              <div className="absolute bottom-4 left-4 z-10 hidden md:block">
                <div className="w-12 h-14 bg-blue-600 rounded-t-lg rounded-b-md relative">
                   <div className="w-14 h-3 bg-blue-700 absolute top-0 left-[-4px] rounded-sm"></div>
                   {/* Leaves */}
                   <div className="absolute -top-12 left-1 w-4 h-12 bg-[#67B59F] rounded-t-full rounded-br-full rotate-[-20deg]"></div>
                   <div className="absolute -top-14 left-4 w-5 h-14 bg-[#4A9D88] rounded-t-full rounded-b-sm"></div>
                   <div className="absolute -top-10 left-7 w-4 h-10 bg-[#74C5AF] rounded-t-full rounded-bl-full rotate-[30deg]"></div>
                </div>
              </div>

              {/* Floating Card 1: Leadership Coach */}
              <div className="absolute top-[5%] right-[-10px] md:right-4 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3 flex items-center gap-3 z-20 w-[180px] border border-gray-50 transform hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-blue-100">
                  <Image src="/Images/trainee1.png" alt="Coach" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-900 leading-tight">Leadership Coach</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">4.8 (120)</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Communication Expert */}
              <div className="absolute top-[45%] right-[-30px] md:right-[-10px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3 flex items-center gap-3 z-20 w-[190px] border border-gray-50 transform hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-pink-100">
                  <Image src="/Images/trainee3.png" alt="Expert" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-900 leading-tight">Communication Expert</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">4.7 (98)</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Watch Video */}
              <div className="absolute bottom-[10%] right-[10%] bg-white rounded-full shadow-[0_8px_20px_rgb(0,0,0,0.06)] pr-4 pl-1.5 py-1.5 flex items-center gap-2 z-20 border border-gray-50 transform hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-[#5A5FE0] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3l14 9-14 9V3z"/>
                  </svg>
                </div>
                <span className="text-[12px] font-bold text-gray-900">Watch Video</span>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Registration Form Card */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
          <div className="anim-2 w-full max-w-[480px] bg-white rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.06)] p-8 sm:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">
                Welcome back!
              </h2>
              <p className="text-gray-500 text-[15px]">
                Login to explore trainers and resources
              </p>
            </div>

            {/* Tabs */}
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

              {/* Email */}
              <div className="anim-4 space-y-2">
                <label className="block text-[13px] font-semibold text-gray-800">
                  Email address
                </label>
                <div
                  className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${focusedField === "email" ? "border-[#5A5FE0]" : "border-gray-200"} bg-white`}
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

              {/* Password */}
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
                  className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${focusedField === "password" ? "border-[#5A5FE0]" : "border-gray-200"} bg-white`}
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
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.5} />
                    ) : (
                      <Eye size={18} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
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

              {/* Submit Button */}
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

              {/* Divider */}
              <div className="anim-6 flex items-center gap-3 my-6">
                <div className="flex-1 h-[1px] bg-gray-100" />
                <span className="text-[13px] text-gray-400 font-medium">
                  or continue with
                </span>
                <div className="flex-1 h-[1px] bg-gray-100" />
              </div>

              {/* Socials */}
              <div className="anim-7 flex flex-col gap-3">
                <button
                  type="button"
                  className="social-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 text-gray-700 text-[14px] font-semibold bg-white"
                >
                  <Chrome size={20} className="text-[#EA4335]" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="social-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 text-gray-700 text-[14px] font-semibold bg-white"
                >
                  <Facebook
                    size={20}
                    className="text-[#1877F2]"
                    fill="#1877F2"
                    strokeWidth={0}
                  />
                  Continue with Facebook
                </button>
              </div>

              <div className="">
                <div className="anim-7 mt-4 text-center p-2">
                  <p className="text-[14px] text-gray-500 font-medium">
                    New here?{" "}
                    <Link
                      href="/auth/register"
                      className="text-[#5A5FE0] font-semibold hover:underline"
                    >
                      Join us
                    </Link>
                  </p>
                </div>

                <p className="text-[12px] translate-x-45"> or</p>

                <div className="anim-7 text-center p-2">
                  <Link
                    href="/join-as-trainer"
                    className=" font-semibold text-[14px] text-[#5A5FE0] cursor:pointer "
                  >
                    Join as a Trainer
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-100 py-6 px-8 sm:px-14 lg:px-24 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
        <p className="text-[13px] text-gray-500 font-medium">
          © 2024 toptrainer. All rights reserved.
        </p>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/privacy"
            className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/terms"
            className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            Terms of Use
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/contact"
            className="text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Rocket,
  ShieldCheck,
  Calendar,
  Chrome,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function UserRegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
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

        .loading-dot {
          animation: dotPulse 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.16s; }
        .loading-dot:nth-child(3) { animation-delay: 0.32s; }
      `}</style>

      {/* Header */}
      <header className="w-full flex justify-between items-center py-5 px-8 sm:px-14 lg:px-16 border-b border-gray-100 bg-white z-20">
        <div className="flex items-center gap-2">
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
        <div className="text-[14px] text-gray-500 font-medium hidden sm:block">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#5A5FE0] font-semibold hover:underline">
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row relative">
        
        {/* LEFT COLUMN: Hero Section */}
        <div className="hidden lg:flex w-full lg:w-[45%] flex-col pt-12 pb-16 px-8 sm:px-14 lg:px-16 bg-[#F8F9FC] relative z-10 lg:border-r border-gray-100">
          
          <div className="flex-1 flex flex-col max-w-[500px]">
            {/* Badge */}
            <div className="left-anim-2 inline-flex items-center self-start mb-8 border border-blue-200 bg-transparent rounded-full px-4 py-1.5">
              <span className="text-[#5A5FE0] text-[13px] font-semibold tracking-wide">
                Join thousands of learners
              </span>
            </div>

            {/* Heading */}
            <h1 className="left-anim-3 text-[42px] sm:text-[48px] font-bold text-[#111827] leading-[1.15] tracking-tight mb-6">
              Start your <br />
              learning journey <br />
              <span className="text-[#5A5FE0]">today.</span>
            </h1>

            {/* Subheading */}
            <p className="left-anim-4 text-gray-500 text-[16px] leading-[1.6] mb-12 max-w-[440px]">
              Create your free account and get matched with expert trainers tailored to your goals and schedule.
            </p>

            {/* Features List */}
            <div className="space-y-8">
              {[
                {
                  icon: <Rocket size={20} className="text-[#5A5FE0]" />,
                  title: "Get Started in Minutes",
                  desc: "Quick setup — pick your interests and start exploring right away.",
                  delay: "left-anim-4",
                  bg: "bg-[#F0F2FF]"
                },
                {
                  icon: <ShieldCheck size={20} className="text-[#5A5FE0]" />,
                  title: "Verified Trainers Only",
                  desc: "Every trainer is background-checked and skill-verified.",
                  delay: "left-anim-5",
                  bg: "bg-[#F0F2FF]"
                },
                {
                  icon: <Calendar size={20} className="text-[#5A5FE0]" />,
                  title: "Flexible Scheduling",
                  desc: "Book sessions that fit your lifestyle — anytime, anywhere.",
                  delay: "left-anim-5",
                  bg: "bg-[#F0F2FF]"
                },
              ].map((f, i) => (
                <div key={i} className={`${f.delay} flex items-start gap-5`}>
                  <div className={`w-12 h-12 rounded-full ${f.bg} flex items-center justify-center flex-shrink-0`}>
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
          </div>
        </div>

        {/* RIGHT COLUMN: Registration Form Card */}
        <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-6 lg:p-12 xl:p-16 relative z-10 bg-white min-h-[calc(100vh-100px)] lg:min-h-0">
          
          <div className="sm:hidden text-center mb-8 w-full anim-1">
            <span className="text-[14px] text-gray-500 font-medium">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#5A5FE0] font-semibold hover:underline">
                Login
              </Link>
            </span>
          </div>

          <div className="anim-2 w-full max-w-[560px] bg-white rounded-[1.5rem] p-8 sm:p-10 border border-gray-200">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">
                Create your account
              </h2>
              <p className="text-gray-500 text-[15px]">
                It only takes a minute.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 anim-3">
                <div className="space-y-2">
                  <label className="block text-[13px] font-semibold text-gray-800">
                    First name
                  </label>
                  <div
                    className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${focusedField === "firstName" ? "border-[#5A5FE0]" : "border-gray-200"} bg-white`}
                  >
                    <User size={18} className="text-gray-400" strokeWidth={1.5} />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                      className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-400 w-full bg-transparent font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[13px] font-semibold text-gray-800">
                    Last name
                  </label>
                  <div
                    className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${focusedField === "lastName" ? "border-[#5A5FE0]" : "border-gray-200"} bg-white`}
                  >
                    <User size={18} className="text-gray-400" strokeWidth={1.5} />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                      className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-400 w-full bg-transparent font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

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

              {/* Phone */}
              <div className="anim-4 space-y-2">
                <label className="block text-[13px] font-semibold text-gray-800">
                  Phone number
                </label>
                <div
                  className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${focusedField === "phone" ? "border-[#5A5FE0]" : "border-gray-200"} bg-white`}
                >
                  <Phone size={18} className="text-gray-400" strokeWidth={1.5} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 01 00000 00000"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-400 w-full bg-transparent font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="anim-5 space-y-2">
                <label className="block text-[13px] font-semibold text-gray-800">
                  Password
                </label>
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
                    {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="anim-5 mb-2 space-y-2">
                <label className="block text-[13px] font-semibold text-gray-800">
                  Confirm password
                </label>
                <div
                  className={`input-field flex items-center gap-3 px-4 py-3 rounded-xl border ${focusedField === "confirm" ? "border-[#5A5FE0]" : "border-gray-200"} bg-white`}
                >
                  <Lock size={18} className="text-gray-400" strokeWidth={1.5} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirm")}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 outline-none text-[15px] text-gray-900 placeholder-gray-400 w-full bg-transparent font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} strokeWidth={1.5} />
                    ) : (
                      <Eye size={18} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="anim-6 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="login-btn w-full py-3.5 rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 disabled:opacity-80"
                >
                  {isLoading ? (
                    <div className="flex gap-1.5 items-center h-6">
                      <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                      <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                      <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              <div className="anim-7 mt-4 text-center p-2">
                  <p className="text-[14px] text-gray-500 font-medium">
                    Wanna be a Trainer?{" "}
                    <Link
                      href="/join-as-trainer"
                      className="text-[#5A5FE0] font-semibold hover:underline"
                    >
                      Join as a Trainer
                    </Link>
                  </p>
                </div>

              {/* Divider */}
              <div className="anim-6 flex items-center gap-3 mb-6">
                <div className="flex-1 h-[1px] bg-gray-100" />
                <span className="text-[13px] text-gray-400 font-medium">
                  or sign up with
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
                  Sign up with Google
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
                  Sign up with Facebook
                </button>
              </div>

              <div className="anim-7 mt-6 text-center pt-2">
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-[#5A5FE0] hover:underline">
                    Terms of Use
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#5A5FE0] hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-100 py-6 px-8 sm:px-14 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
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

"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Phone, Rocket, ShieldCheck, Calendar, Chrome, Facebook } from "lucide-react";
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
    confirmPassword: ""
  });

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }

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

        .social-btn {
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .social-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .input-field {
          transition: all 0.25s ease;
        }
        .input-field:focus-within {
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          border-color: #2563eb !important;
        }

        .login-btn {
          background: #2563eb;
          transition: all 0.3s ease;
        }
        .login-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
        }
        .login-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .loading-dot {
          animation: dotPulse 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.16s; }
        .loading-dot:nth-child(3) { animation-delay: 0.32s; }
      `}</style>

      {/* LEFT COLUMN: Hero Section (Light Blue/Purple Theme) */}
      <div className="hidden lg:flex flex-col w-[40%] xl:w-[45%] relative px-10 py-10 xl:px-14 xl:py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        
        {/* Decorative Grid Overlay (optional) */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'linear-gradient(rgba(37,99,235,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        {/* Logo */}
        <div className="left-anim-1 flex items-center gap-3 mb-16 relative z-10">
          <Image src="/icon.png" alt="TopTrainer Logo" width={40} height={40} className="object-contain" />
          <span className="font-display font-bold text-xl tracking-tight leading-none">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Top</span>
            <span className="text-orange-400">Trainer</span>
          </span>
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md relative z-10">
          <div className="left-anim-2 inline-flex items-center self-start px-4 py-1.5 rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm shadow-sm mb-6">
            <span className="text-blue-600 text-sm font-medium">Join thousands of learners</span>
          </div>

          <h1 className="left-anim-3 font-display text-4xl xl:text-5xl font-bold text-gray-800 leading-[1.15] tracking-tight mb-5">
            Start your <br />
            learning journey <br />
            <span className="text-blue-600">today.</span>
          </h1>

          <p className="left-anim-4 text-gray-500 text-base leading-relaxed mb-12 max-w-sm">
            Create your free account and get matched with expert trainers tailored to your goals and schedule.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {[
              { icon: <Rocket size={18} className="text-blue-600" />, title: "Get Started in Minutes", desc: "Quick setup — pick your interests and start exploring right away.", delay: "left-anim-4" },
              { icon: <ShieldCheck size={18} className="text-blue-600" />, title: "Verified Trainers Only", desc: "Every trainer is background-checked and skill-verified.", delay: "left-anim-5" },
              { icon: <Calendar size={18} className="text-blue-600" />, title: "Flexible Scheduling", desc: "Book sessions that fit your lifestyle — anytime, anywhere.", delay: "left-anim-5" },
            ].map((f, i) => (
              <div key={i} className={`${f.delay} flex items-start gap-4`}>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-blue-100 flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Footer */}
        <div className="left-anim-5 mt-auto pt-8 relative z-10">
          <p className="text-xs text-gray-400 font-medium">© 2024 TopTrainer. All rights reserved.</p>
        </div>
      </div>

      {/* RIGHT COLUMN: Registration Form */}
      <div className="flex-1 flex flex-col bg-white relative px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        
        {/* Top Right Actions */}
        <div className="w-full flex justify-end mb-8 anim-1">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Login
            </Link>
          </p>
        </div>

        {/* Mobile Logo (visible only on small screens) */}
        <div className="lg:hidden flex items-center gap-2 mb-10 anim-1">
          <Image src="/icon.png" alt="TopTrainer Logo" width={36} height={36} className="object-contain" />
          <span className="font-display font-bold text-xl tracking-tight leading-none">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Top</span>
            <span className="text-orange-400">Trainer</span>
          </span>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-[520px] w-full mx-auto">
          
          <div className="anim-2 w-full p-8 sm:p-10 rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-500 text-sm mb-8">It only takes a minute.</p>

            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 anim-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">First name</label>
                  <div className={`input-field flex items-center gap-2.5 px-3.5 py-3 rounded-lg border ${focusedField === 'firstName' ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
                    <User size={16} color={focusedField === 'firstName' ? '#2563eb' : '#9ca3af'} />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last name</label>
                  <div className={`input-field flex items-center gap-2.5 px-3.5 py-3 rounded-lg border ${focusedField === 'lastName' ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
                    <User size={16} color={focusedField === 'lastName' ? '#2563eb' : '#9ca3af'} />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                      className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="anim-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
                <div className={`input-field flex items-center gap-2.5 px-3.5 py-3 rounded-lg border ${focusedField === 'email' ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
                  <Mail size={16} color={focusedField === 'email' ? '#2563eb' : '#9ca3af'} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="anim-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone number</label>
                <div className={`input-field flex items-center gap-2.5 px-3.5 py-3 rounded-lg border ${focusedField === 'phone' ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
                  <Phone size={16} color={focusedField === 'phone' ? '#2563eb' : '#9ca3af'} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 01 00000 00000"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="anim-5">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                <div className={`input-field flex items-center gap-2.5 px-3.5 py-3 rounded-lg border ${focusedField === 'password' ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
                  <Lock size={16} color={focusedField === 'password' ? '#2563eb' : '#9ca3af'} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="anim-5 mb-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm password</label>
                <div className={`input-field flex items-center gap-2.5 px-3.5 py-3 rounded-lg border ${focusedField === 'confirm' ? 'border-blue-500' : 'border-gray-200'} bg-white`}>
                  <Lock size={16} color={focusedField === 'confirm' ? '#2563eb' : '#9ca3af'} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="anim-6 pt-2">
                <button type="submit" disabled={isLoading}
                  className="login-btn w-full py-3.5 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-80">
                  {isLoading ? (
                    <div className="flex gap-1.5 items-center">
                      <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                      <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                      <div className="loading-dot w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="anim-6 flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium">or sign up with</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Socials */}
              <div className="anim-7 flex flex-col gap-3">
                <button type="button" className="social-btn w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:border-gray-300 bg-white">
                  <Chrome size={18} className="text-[#EA4335]" />
                  Sign up with Google
                </button>
                <button type="button" className="social-btn w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:border-gray-300 bg-white">
                  <Facebook size={18} className="text-[#1877F2]" fill="#1877F2" />
                  Sign up with Facebook
                </button>
              </div>

              <div className="anim-7 mt-6 text-center">
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          {/* Right Footer */}
          <div className="anim-7 hidden lg:flex items-center justify-end gap-6 mt-8">
            <a href="#" className="text-xs font-semibold text-gray-400 hover:text-gray-800 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-semibold text-gray-400 hover:text-gray-800 transition-colors">Terms of Use</a>
            <a href="#" className="text-xs font-semibold text-gray-400 hover:text-gray-800 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
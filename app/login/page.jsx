"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Apple, Chrome, ArrowRight, Dumbbell, Users, Zap, Calendar } from "lucide-react";

export default function TrainerHubLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
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
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(2deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
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

        .right-anim-1 { animation: fadeSlideRight 0.7s ease both 0.2s; }
        .right-anim-2 { animation: fadeSlideRight 0.7s ease both 0.35s; }
        .right-anim-3 { animation: fadeSlideRight 0.7s ease both 0.5s; }
        .right-anim-4 { animation: fadeSlideRight 0.7s ease both 0.65s; }
        .right-anim-5 { animation: fadeSlideRight 0.7s ease both 0.8s; }

        .float-1 { animation: floatBubble 6s ease-in-out infinite; }
        .float-2 { animation: floatBubble 8s ease-in-out infinite 1s; }
        .float-3 { animation: floatBubble 7s ease-in-out infinite 2.5s; }

        .social-btn {
          transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
        }
        .social-btn:active {
          transform: translateY(0) scale(0.97);
        }

        .input-field {
          transition: all 0.25s ease;
        }
        .input-field:focus-within {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          border-color: #6366f1 !important;
        }

        .login-btn {
          background: linear-gradient(135deg, #4f46e5, #6366f1, #818cf8);
          background-size: 200% auto;
          transition: all 0.3s ease;
        }
        .login-btn:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.45);
        }
        .login-btn:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateX(6px);
          background: rgba(255,255,255,0.15) !important;
        }

        .spinner {
          animation: spin 0.8s linear infinite;
        }

        .loading-dot {
          animation: dotPulse 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.16s; }
        .loading-dot:nth-child(3) { animation-delay: 0.32s; }

        .checkbox-custom {
          transition: all 0.2s ease;
        }
        .checkbox-custom:hover { transform: scale(1.1); }
      `}</style>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)" }}>

        {/* LEFT: Login Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg-white">

          {/* Logo */}
          <div className="anim-1 flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4f46e5, #818cf8)" }}>
              <Dumbbell size={20} color="white" />
            </div>
            <div>
              <span className="font-display font-800 text-gray-900 text-lg leading-none">Trainer</span>
              <span className="font-display font-800 text-lg leading-none" style={{ color: "#6366f1" }}>Hub</span>
              <p className="text-xs text-gray-400 font-light tracking-wide">Coach. Track. Transform.</p>
            </div>
          </div>

          {/* Heading */}
          <div className="anim-2 mb-8">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-1">Hello!</h1>
            <p className="text-gray-500 text-sm font-light">Sign in to your trainer account</p>
          </div>

          {/* Social Buttons */}
        <div className="anim-3 flex gap-3 mb-6">
  {[
    { icon: <Chrome size={20} />, label: "Google", color: "#EA4335" },
    { icon: <Apple size={20} />, label: "Apple", color: "#000000" },
  ].map((s) => (
    <button
      key={s.label}
      className="social-btn flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-300 bg-white"
    >
      <span
        style={{
          color: s.color,
          fill: s.color,
          stroke: s.color,
        }}
      >
        {s.icon}
      </span>
      <span>{s.label}</span>
    </button>
  ))}
</div>

          {/* Divider */}
          <div className="anim-4 flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 tracking-widest font-medium">OR CONTINUE WITH EMAIL</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Email Field */}
          <div className="anim-5 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <div className={`input-field flex items-center gap-3 px-4 py-3.5 rounded-xl border ${focusedField === 'email' ? 'border-indigo-400' : 'border-gray-200'} bg-white`}>
              <Mail size={16} color={focusedField === 'email' ? '#6366f1' : '#9ca3af'} style={{ transition: 'color 0.2s' }} />
              <input
                type="email"
                placeholder="coach@trainerhub.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="anim-6 mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className={`input-field flex items-center gap-3 px-4 py-3.5 rounded-xl border ${focusedField === 'password' ? 'border-indigo-400' : 'border-gray-200'} bg-white`}>
              <Lock size={16} color={focusedField === 'password' ? '#6366f1' : '#9ca3af'} style={{ transition: 'color 0.2s' }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-indigo-500 transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="anim-7 flex items-center justify-between mb-7">
            <label className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>
              <div className={`checkbox-custom w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${rememberMe ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 bg-white'}`}>
                {rememberMe && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button className="text-sm font-medium transition-colors" style={{ color: '#6366f1' }}
              onMouseEnter={e => e.target.style.color = '#4f46e5'}
              onMouseLeave={e => e.target.style.color = '#6366f1'}>
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button onClick={handleLogin} disabled={isLoading}
            className="login-btn w-full py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-80">
            {isLoading ? (
              <div className="flex gap-1.5 items-center">
                <div className="loading-dot w-2 h-2 rounded-full bg-white" />
                <div className="loading-dot w-2 h-2 rounded-full bg-white" />
                <div className="loading-dot w-2 h-2 rounded-full bg-white" />
              </div>
            ) : (
              <>
                Login
                <ArrowRight size={18} style={{ transition: 'transform 0.2s' }} />
              </>
            )}
          </button>

          {/* Sign up */}
          <p className="anim-7 text-center text-sm text-gray-500 mt-5">
            Don&apos;t have an account?{" "}
            <button className="font-semibold" style={{ color: '#6366f1' }}
              onMouseEnter={e => e.target.style.color = '#4338ca'}
              onMouseLeave={e => e.target.style.color = '#6366f1'}>
              Create
            </button>
          </p>
        </div>

        {/* RIGHT: Hero Panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center px-12 py-10"
          style={{ background: "linear-gradient(145deg, #4338ca 0%, #5b5fcf 40%, #6366f1 70%, #818cf8 100%)" }}>

          {/* Floating decorative circles */}
          <div className="float-1 absolute top-10 right-8 w-32 h-32 rounded-full opacity-10"
            style={{ background: "white" }} />
          <div className="float-2 absolute bottom-16 right-16 w-20 h-20 rounded-full opacity-10"
            style={{ background: "white" }} />
          <div className="float-3 absolute top-1/2 right-4 w-12 h-12 rounded-full opacity-15"
            style={{ background: "white" }} />

          {/* Decorative mesh lines */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />

          {/* Online badge */}
          <div className="right-anim-1 inline-flex items-center gap-2 self-start px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulseGlow 2s ease infinite" }} />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">1,200+ Coaches Online</span>
          </div>

          {/* Heading */}
          <div className="right-anim-2 mb-4">
            <h2 className="font-display text-5xl font-bold text-white leading-tight mb-4">
              Welcome<br />Back!
            </h2>
            <p className="text-indigo-200 text-base leading-relaxed font-light">
              Step back into your training studio. Your athletes, programs, and progress are right where you left them.
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-3">
            {[
              { icon: <Users size={16} />, label: "Manage clients & training plans", delay: "right-anim-3" },
              { icon: <Zap size={16} />, label: "Track real-time performance", delay: "right-anim-4" },
              { icon: <Calendar size={16} />, label: "Schedule sessions in seconds", delay: "right-anim-5" },
            ].map((f) => (
              <div key={f.label} className={`${f.delay} feature-card flex items-center gap-3 px-4 py-3 rounded-xl`}
                style={{ background: "rgba(255,255,255,0.10)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)" }}>
                  <span className="text-white">{f.icon}</span>
                </div>
                <span className="text-white text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
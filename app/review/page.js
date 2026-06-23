"use client";
import { useState, useEffect } from "react";
import {
  User, MapPin, Calendar, BookOpen,
  Star, MessageSquare, ChevronRight, ChevronLeft,
  CheckCircle, Send, Edit2, Headphones, BarChart2,
  Users, Shield, Clock, TrendingUp, Phone,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Session details", shortLabel: "Session" },
  { id: 2, label: "Ratings",         shortLabel: "Ratings" },
  { id: 3, label: "Review & submit", shortLabel: "Review" },
];

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="focus:outline-none transition-all duration-200 hover:scale-125 active:scale-110"
            style={{
              transform: display >= star ? "scale(1.18)" : "scale(1)",
              animation: value === star ? "starPop 0.3s ease" : "none",
            }}
          >
            <Star
              size={28}
              fill={display >= star ? "#1d4ed8" : "none"}
              stroke={display >= star ? "#1d4ed8" : "#93c5fd"}
              className="transition-all duration-200"
            />
          </button>
        ))}
      </div>
      <div
        className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
        style={{
          opacity: display > 0 ? 1 : 0,
          transform: display > 0 ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.9)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          minHeight: "24px",
          pointerEvents: "none",
          background: "rgba(219,234,254,0.9)",
          border: "1px solid #93c5fd",
          color: "#1e40af",
        }}
      />
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const progress = ((current - 1) / 2) * 100;
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#1d4ed8" }}>
          Step {current} of 3
        </span>
        <span className="text-xs sm:text-sm font-medium" style={{ color: "#64748b" }}>{STEPS[current - 1].label}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "#dbeafe" }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg,#60a5fa,#2563eb,#1d4ed8)" }}
        />
      </div>
      <div className="flex justify-between">
        {STEPS.map((step) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500"
                style={{
                  background: done ? "#2563eb" : active ? "#dbeafe" : "#eff6ff",
                  color: done ? "#fff" : active ? "#1d4ed8" : "#93c5fd",
                  boxShadow: active ? "0 0 0 2px #60a5fa" : "none",
                  transform: active ? "scale(1.1)" : "scale(1)",
                  animation: active ? "stepPulse 2s infinite" : "none",
                }}
              >
                {done ? <CheckCircle size={14} /> : step.id}
              </div>
              <span
                className="text-[9px] sm:text-[10px] font-medium hidden sm:block transition-colors duration-300"
                style={{ color: active ? "#1d4ed8" : done ? "#64748b" : "#93c5fd" }}
              >
                {step.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Compact Rating Row ───────────────────────────────────────────────────────
function CompactRatingRow({ icon: Icon, title, description, rating, comment, onRating, onComment, delay }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden animate-slideUp"
      style={{ border: "1px solid #bfdbfe", animationDelay: `${delay}ms` }}
    >
      <div
        className="flex items-center justify-between p-3 sm:p-4 cursor-pointer"
        style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-lg shadow-sm shrink-0" style={{ boxShadow: "0 2px 8px rgba(37,99,235,0.12)" }}>
            <Icon size={16} style={{ color: "#2563eb" }} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{title}</p>
            <p className="text-gray-500 text-xs">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {rating !== null ? (
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={12} fill={s <= rating ? "#1d4ed8" : "none"} stroke={s <= rating ? "#1d4ed8" : "#bfdbfe"} />
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-400 italic">Rate</span>
          )}
          <ChevronRight
            size={14}
            style={{ color: "#93c5fd", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          />
        </div>
      </div>
      {expanded && (
        <div className="p-3 sm:p-4 space-y-3" style={{ background: "#fff" }}>
          <div className="flex justify-center">
            <StarRating value={rating} onChange={onRating} />
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-1.5 mb-1">
              <MessageSquare size={10} /> Comment
              <span className="font-normal normal-case">(optional)</span>
            </label>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => onComment(e.target.value)}
                maxLength={500}
                rows={2}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 rounded-xl text-gray-700 text-sm resize-none transition-all duration-200 placeholder-gray-300"
                style={{ border: "1px solid #bfdbfe", background: "#eff6ff", outline: "none" }}
                onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.25)"; e.target.style.borderColor = "#60a5fa"; e.target.style.background = "#fff"; }}
                onBlur={(e) => { e.target.style.boxShadow = "none"; e.target.style.borderColor = "#bfdbfe"; e.target.style.background = "#eff6ff"; }}
              />
              <span className="absolute bottom-2 right-3 text-xs text-gray-300">{comment.length}/500</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Review Row ───────────────────────────────────────────────────────────────
function ReviewRow({ num, label, rating, delay }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b last:border-0 transition-colors duration-200 px-2 rounded-lg animate-slideUp"
      style={{ borderColor: "#dbeafe", animationDelay: `${delay}ms` }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span
          className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
          style={{ background: "#dbeafe", color: "#1d4ed8" }}
        >
          {num}
        </span>
        <span className="text-gray-700 text-xs sm:text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {rating !== null ? (
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} fill={s <= rating ? "#1d4ed8" : "none"} stroke={s <= rating ? "#1d4ed8" : "#bfdbfe"} className="sm:w-3.5 sm:h-3.5" />
            ))}
          </div>
        ) : (
          <span className="text-xs text-gray-300 italic">Not rated</span>
        )}
        <ChevronRight size={13} className="text-gray-300" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeedbackForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [animDir, setAnimDir] = useState("forward");

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpShake, setOtpShake] = useState(false);

  const [data, setData] = useState({
    reviewer: "",
    trainer: "",
    sessionDate: "",
    city: "",
    whatsapp: "",
    topic: "",
    overall:    { rating: null, comment: "" },
    delivery:   { rating: null, comment: "" },
    content:    { rating: null, comment: "" },
    engagement: { rating: null, comment: "" },
    extra: "",
  });

  const ratings = [data.overall.rating, data.delivery.rating, data.content.rating, data.engagement.rating].filter((r) => r !== null);
  const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

  const next = () => { setAnimDir("forward"); setStep((s) => Math.min(s + 1, 3)); };
  const back = () => { setAnimDir("back"); setStep((s) => Math.max(s - 1, 1)); };

  const setSection = (section, field, value) =>
    setData((d) => ({ ...d, [section]: { ...d[section], [field]: value } }));

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((r) => r - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  // ── OTP Handlers ────────────────────────────────────────────────────────────
  const handleSendOtp = () => {
    setOtpLoading(true);
    setOtpError("");
    // TODO: Replace with your real backend API call
    // e.g. fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ phone: data.whatsapp }) })
    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      setResendTimer(30);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (otpInput.length < 4) {
      setOtpError("Please enter the OTP sent to your WhatsApp.");
      setOtpShake(true);
      setTimeout(() => setOtpShake(false), 500);
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    // TODO: Replace with your real backend API call
    // e.g. fetch('/api/verify-otp', { method: 'POST', body: JSON.stringify({ phone: data.whatsapp, code: otpInput }) })
    setTimeout(() => {
      if (otpInput === "123456") { // Replace this condition with real backend response
        setOtpVerified(true);
        setOtpError("");
      } else {
        setOtpError("Invalid OTP. Please try again.");
        setOtpShake(true);
        setTimeout(() => setOtpShake(false), 500);
      }
      setOtpLoading(false);
    }, 1000);
  };

  const handleResend = () => {
    setOtpInput("");
    setOtpError("");
    handleSendOtp();
  };

  // ── Submitted Screen with OTP ────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 sm:px-8 relative"
        style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 50%, #93c5fd 100%)" }}
      >
        <style>{`
          @keyframes confettiPop {
            0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
            60%  { transform: scale(1.15) rotate(4deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes starFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-5px); }
          }
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%     { transform: translateX(-7px); }
            40%     { transform: translateX(7px); }
            60%     { transform: translateX(-4px); }
            80%     { transform: translateX(4px); }
          }
          @keyframes otpPulse {
            0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
            50%     { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .anim-confetti   { animation: confettiPop 0.6s cubic-bezier(.34,1.56,.64,1) both; }
          .anim-fade-up    { animation: fadeSlideUp 0.5s ease both; }
          .anim-star-float { animation: starFloat 2s ease-in-out infinite; }
          .anim-shake      { animation: shake 0.45s ease; }
          .anim-spin       { animation: spin 0.8s linear infinite; }
          .otp-box {
            width: 100%;
            padding: 14px 16px;
            border-radius: 14px;
            border: 2px solid #bfdbfe;
            background: #eff6ff;
            color: #1e3a8a;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: 12px;
            text-align: center;
            outline: none;
            transition: all 0.2s;
          }
          .otp-box:focus {
            border-color: #3b82f6;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(96,165,250,0.25), 0 0 0 0 rgba(37,99,235,0.3);
            animation: otpPulse 1.5s ease infinite;
          }
          .otp-box.error {
            border-color: #f87171;
            background: #fff1f2;
          }
          .otp-box.success {
            border-color: #34d399;
            background: #f0fdf4;
          }
        `}</style>

        <div
          className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl p-7 sm:p-10 max-w-md w-full text-center space-y-5 relative"
          style={{ border: "1px solid rgba(147,197,253,0.6)", zIndex: 1 }}
        >
          {/* Icon */}
          <div className="relative mx-auto w-fit">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", transform: "scale(1.8)" }}
            />
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto anim-confetti relative"
              style={{ background: "linear-gradient(135deg,#dbeafe,#93c5fd)" }}
            >
              {otpVerified
                ? <CheckCircle style={{ color: "#1d4ed8" }} size={36} />
                : <Phone style={{ color: "#1d4ed8" }} size={32} />
              }
            </div>
          </div>

          {/* Title */}
          <div className="anim-fade-up" style={{ animationDelay: "100ms" }}>
            {otpVerified ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Thank you!</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Your feedback has been submitted. It helps trainers improve every session.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Submit your Feedback</h2>
                <p className="text-gray-500 text-sm mt-1">
                  We need to verify your number before finalising your submission.
                </p>
              </>
            )}
          </div>

          {/* ── Stars (shown after verified) ── */}
          {otpVerified && avg !== null && (
            <div className="anim-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="flex justify-center gap-1 pt-1 anim-star-float">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={22} fill={s <= Math.round(avg) ? "#1d4ed8" : "none"} stroke="#1d4ed8" />
                ))}
              </div>
              <p className="font-bold text-xl mt-2" style={{ color: "#1d4ed8" }}>{avg.toFixed(1)} / 5</p>
            </div>
          )}

          {/* ── OTP Section (shown before verified) ── */}
          {!otpVerified && (
            <div className="space-y-4 anim-fade-up" style={{ animationDelay: "200ms" }}>

              {/* Number display */}
              <div
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl mx-auto w-fit"
                style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1px solid #bfdbfe" }}
              >
                <Phone size={14} style={{ color: "#2563eb" }} />
                <span className="text-sm font-bold" style={{ color: "#1e3a8a" }}>
                  {data.whatsapp || "+91 XXXXXXXXXX"}
                </span>
              </div>

              {!otpSent ? (
                /* Send OTP button */
                <button
                  onClick={handleSendOtp}
                  disabled={otpLoading}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 14px rgba(29,78,216,0.35)" }}
                >
                  {otpLoading ? (
                    
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent anim-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Feedback
                    </>
                  )}
                </button>
              ) : (
                /* OTP Input area */
                <div className="space-y-3">
                  <p className="text-xs text-gray-500">
                    OTP sent to your WhatsApp. Enter it below to verify.
                  </p>

                  <div className={otpShake ? "anim-shake" : ""}>
                    <input
                      type="tel"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value.replace(/\D/g, ""));
                        setOtpError("");
                      }}
                      placeholder="· · · · · ·"
                      className={`otp-box ${otpError ? "error" : ""}`}
                    />
                  </div>

                  {otpError && (
                    <p className="text-xs font-medium text-red-500 flex items-center justify-center gap-1">
                      <span>⚠</span> {otpError}
                    </p>
                  )}

                  <button
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || otpInput.length < 4}
                    className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", boxShadow: "0 4px 14px rgba(29,78,216,0.35)" }}
                  >
                    {otpLoading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent anim-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={15} /> Verify OTP
                      </>
                    )}
                  </button>

                  {/* Resend */}
                  <div className="text-xs text-gray-400">
                    {resendTimer > 0 ? (
                      <span>Resend OTP in <span className="font-bold" style={{ color: "#2563eb" }}>{resendTimer}s</span></span>
                    ) : (
                      <button
                        onClick={handleResend}
                        className="font-semibold underline transition-colors duration-200"
                        style={{ color: "#2563eb" }}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Submit Another (shown after verified) ── */}
          {otpVerified && (
            <div className="space-y-3 anim-fade-up" style={{ animationDelay: "350ms" }}>
              <div
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl mx-auto w-fit"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
              >
                <CheckCircle size={14} style={{ color: "#22c55e" }} />
                <span className="text-xs font-semibold" style={{ color: "#15803d" }}>WhatsApp number verified</span>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtpInput("");
                  setOtpError("");
                  setResendTimer(0);
                  setData((d) => ({
                    ...d,
                    overall:    { rating: null, comment: "" },
                    delivery:   { rating: null, comment: "" },
                    content:    { rating: null, comment: "" },
                    engagement: { rating: null, comment: "" },
                    extra: "",
                  }));
                }}
                className="w-full px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
              >
                Submit another
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-8 sm:py-10 relative"
      style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #bfdbfe 100%)" }}
    >
      <style>{`
        @keyframes fadeIn     { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideInFwd { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInBck { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes stepPulse  { 0%,100% { box-shadow:0 0 0 0 rgba(37,99,235,.4); } 50% { box-shadow:0 0 0 6px rgba(37,99,235,0); } }
        @keyframes starPop    { 0% { transform:scale(1); } 40% { transform:scale(1.4); } 100% { transform:scale(1.18); } }
        @keyframes bounceSoft { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }

        .animate-fade-in     { animation: fadeIn 0.4s ease both; }
        .animate-slideIn     { animation: ${animDir === "forward" ? "slideInFwd" : "slideInBck"} 0.35s cubic-bezier(.25,.8,.25,1) both; }
        .animate-slideUp     { animation: slideUp 0.4s ease both; }
        .animate-bounce-soft { animation: bounceSoft 1.8s ease-in-out infinite; }

        input, textarea, select { font-family: inherit; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }

        .field-input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid #bfdbfe;
          background: #eff6ff;
          color: #374151;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        .field-input:focus {
          box-shadow: 0 0 0 3px rgba(96,165,250,0.25);
          border-color: #60a5fa;
          background: #fff;
        }

        .glass-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(147,197,253,0.55);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }
        .btn-primary:hover::after { background: rgba(255,255,255,0.1); }
        .btn-primary:active { transform: scale(0.97); }

        .btn-ghost {
          background: rgba(255,255,255,0.6);
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
        }
        .btn-ghost:hover { background: #dbeafe; }
        .btn-ghost:active { transform: scale(0.97); }

        @media (max-width: 640px) {
          .mobile-compact { padding: 1.25rem !important; }
        }
      `}</style>

      <div className="w-full max-w-6xl flex items-stretch min-h-screen gap-6 lg:gap-8 animate-fade-in relative" style={{ zIndex: 1 }}>

        {/* ── Left Panel ──────────────────────────────────────────────────── */}
        <div className="hidden lg:flex flex-col gap-7 w-64 xl:w-72 shrink-0 sticky top-6 h-full pt-2">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-xs font-semibold mb-5 shadow-sm"
              style={{ border: "1px solid #bfdbfe", color: "#1d4ed8" }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Live feedback collection
            </div>
            <h2 className="text-2xl xl:text-3xl font-black text-gray-800 leading-tight mb-3">
              Your feedback<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#1e3a8a)" }}>
                builds better
              </span><br />
              training.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Feedback helps trainers improve and ensures every session is better than the last.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { Icon: Shield,     label: "Secure Feedback", sub: "Handled responsibly, used for improvement", from: "#eff6ff", to: "#dbeafe", text: "#1d4ed8" },
              { Icon: Clock,      label: "Takes 2 Minutes", sub: "Fast and focused questions only",           from: "#dbeafe", to: "#bfdbfe", text: "#2563eb" },
              { Icon: TrendingUp, label: "Drives Change",   sub: "Your input improves trainer performance",  from: "#eff6ff", to: "#dbeafe", text: "#1e40af" },
            ].map(({ Icon, label, sub, from, to, text }, i) => (
              <div
                key={label}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slideUp"
                style={{ border: "1px solid #dbeafe", animationDelay: `${i * 80}ms` }}
              >
                <div className="p-2 rounded-lg shrink-0" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                  <Icon className="w-4 h-4" style={{ color: text }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl mt-2 bg-white/80 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ border: "1px solid #bfdbfe" }}>
            <p className="text-xs font-bold tracking-wider mb-2 uppercase" style={{ color: "#60a5fa" }}>Recent feedback</p>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "Clear explanations, practical examples, and very engaging throughout."
            </p>
          </div>
        </div>

        {/* ── Center Form ─────────────────────────────────────────────────── */}
        <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">

          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 px-1">
            <div
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md shrink-0"
              style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", boxShadow: "0 4px 14px rgba(29,78,216,0.35)" }}
            >
              <MessageSquare size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                Training Feedback
              </h1>
            </div>
          </div>

          {/* Card */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 mobile-compact shadow-xl">
            <StepIndicator current={step} />

            <div className="animate-slideIn" key={step}>

              {/* ── Step 1 ───────────────────────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-5 mt-2">
                  <div className="p-3 sm:p-4 rounded-2xl" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg flex items-center gap-2">
                      <BookOpen size={18} style={{ color: "#2563eb" }} />
                      Session Details
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Confirm the details of your training session.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {[
                      { icon: User,           label: "Reviewer Name",        key: "reviewer",    type: "text", placeholder: "Your name" },
                      { icon: User,           label: "Training By",          key: "trainer",     type: "text", placeholder: "Trainer name" },
                      { icon: Calendar,       label: "Session Date",         key: "sessionDate", type: "date", placeholder: "" },
                      { icon: MapPin,         label: "Your City",            key: "city",        type: "text", placeholder: "Your City" },
                      { icon: MessageSquare,  label: "Your WhatsApp Number", key: "whatsapp",    type: "text", placeholder: "e.g. +91 9876543210" },
                      { icon: BookOpen,       label: "Topic / Module",       key: "topic",       type: "text", placeholder: "e.g. Leadership basics" },
                    ].map(({ icon: Icon, label, key, type, placeholder }, i) => (
                      <div key={key} className="animate-slideUp" style={{ animationDelay: `${i * 60}ms` }}>
                        <label className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1.5" style={{ color: "#64748b" }}>
                          <Icon size={12} style={{ color: "#3b82f6" }} />
                          {label}
                        </label>
                        <input
                          type={type}
                          value={data[key]}
                          onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="field-input"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 2 ───────────────────────────────────────────────── */}
              {step === 2 && (
                <div className="space-y-4 mt-2 animate-slideUp">
                  <div className="p-3 sm:p-4 rounded-2xl" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg flex items-center gap-2">
                      <BarChart2 size={18} style={{ color: "#2563eb" }} />
                      Rate your session
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Tap each category to expand and rate. All are optional.</p>
                  </div>
                  <div className="space-y-3">
                    <CompactRatingRow icon={BarChart2}  title="Overall impression" description="How was the session overall?"                    rating={data.overall.rating}    comment={data.overall.comment}    onRating={(v) => setSection("overall",    "rating", v)} onComment={(v) => setSection("overall",    "comment", v)} delay={0}   />
                    <CompactRatingRow icon={Headphones} title="Delivery"           description="How clearly did the trainer communicate?"       rating={data.delivery.rating}   comment={data.delivery.comment}   onRating={(v) => setSection("delivery",   "rating", v)} onComment={(v) => setSection("delivery",   "comment", v)} delay={60}  />
                    <CompactRatingRow icon={BookOpen}   title="Content quality"    description="Was the material relevant and well structured?" rating={data.content.rating}    comment={data.content.comment}    onRating={(v) => setSection("content",    "rating", v)} onComment={(v) => setSection("content",    "comment", v)} delay={120} />
                    <CompactRatingRow icon={Users}      title="Engagement"         description="How engaging and interactive was the session?"  rating={data.engagement.rating} comment={data.engagement.comment} onRating={(v) => setSection("engagement", "rating", v)} onComment={(v) => setSection("engagement", "comment", v)} delay={180} />
                  </div>
                </div>
              )}

              {/* ── Step 3 ───────────────────────────────────────────────── */}
              {step === 3 && (
                <div className="space-y-5 sm:space-y-6 mt-2 animate-slideUp">
                  <div className="p-3 sm:p-4 rounded-2xl flex items-start gap-3" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
                    <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                      <CheckCircle size={18} style={{ color: "#2563eb" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">Review Before Final Submission</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Check everything looks good before submitting.</p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #bfdbfe" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2" style={{ background: "#dbeafe", color: "#1d4ed8" }}>Session info</p>
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {[
                        { label: "Reviewer",     value: data.reviewer },
                        { label: "Training By",  value: data.trainer },
                        { label: "Session Date", value: data.sessionDate },
                        { label: "Your City",    value: data.city },
                        { label: "WhatsApp No.", value: data.whatsapp },
                        { label: "Topic",        value: data.topic },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-xs">
                          <span className="text-gray-400 font-semibold">{label}: </span>
                          <span className="text-gray-700">{value || <span className="italic text-gray-300">—</span>}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #bfdbfe" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2" style={{ background: "#dbeafe", color: "#1d4ed8" }}>Your ratings</p>
                    <div className="p-2">
                      {[
                        { label: "Overall",    rating: data.overall.rating },
                        { label: "Delivery",   rating: data.delivery.rating },
                        { label: "Content",    rating: data.content.rating },
                        { label: "Engagement", rating: data.engagement.rating },
                      ].map((row, i) => (
                        <ReviewRow key={row.label} num={i + 1} label={row.label} rating={row.rating} delay={i * 60} />
                      ))}
                    </div>
                  </div>

                  {avg !== null && (
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl animate-slideUp" style={{ background: "linear-gradient(135deg,#dbeafe,#bfdbfe)", border: "1px solid #93c5fd" }}>
                      <span className="font-bold text-sm" style={{ color: "#1d4ed8" }}>Average score</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={14} fill={s <= Math.round(avg) ? "#1d4ed8" : "none"} stroke="#1d4ed8" />
                          ))}
                        </div>
                        <span className="font-black text-lg" style={{ color: "#1d4ed8" }}>{avg.toFixed(1)}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-1.5 mb-2">
                      <Edit2 size={12} /> Any other comments?
                      <span className="font-normal normal-case">(optional)</span>
                    </label>
                    <textarea
                      value={data.extra}
                      onChange={(e) => setData((d) => ({ ...d, extra: e.target.value }))}
                      maxLength={800}
                      rows={3}
                      placeholder="Anything else you'd like to share..."
                      className="w-full px-4 py-3 rounded-xl text-gray-700 text-sm resize-none transition-all duration-200 placeholder-gray-300"
                      style={{ border: "1px solid #bfdbfe", background: "#eff6ff", outline: "none" }}
                      onFocus={(e) => { e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.25)"; e.target.style.borderColor = "#60a5fa"; e.target.style.background = "#fff"; }}
                      onBlur={(e) => { e.target.style.boxShadow = "none"; e.target.style.borderColor = "#bfdbfe"; e.target.style.background = "#eff6ff"; }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 sm:mt-8 gap-3">
              <button
                onClick={back}
                disabled={step === 1}
                className="btn-ghost flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} /> Back
              </button>

              {step < 3 ? (
                <button
                  onClick={next}
                  className="btn-primary flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md"
                  style={{ boxShadow: "0 4px 14px rgba(29,78,216,0.35)" }}
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSubmitted(true);
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtpInput("");
                    setOtpError("");
                    setResendTimer(0);
                  }}
                  className="btn-primary flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md"
                  style={{ boxShadow: "0 4px 14px rgba(29,78,216,0.35)" }}
                >
                  <Send size={15} /> Submit feedback
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
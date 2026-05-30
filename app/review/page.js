"use client";
import { useState } from "react";
import {
  User, Building2, MapPin, Calendar, BookOpen,
  Star, MessageSquare, ChevronRight, ChevronLeft,
  CheckCircle, Send, Edit2, Headphones, BarChart2,
  Users, Shield, Clock, TrendingUp,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Session details", shortLabel: "Session" },
  { id: 2, label: "Ratings",         shortLabel: "Ratings" },
  { id: 3, label: "Review & submit", shortLabel: "Review" },
];

// ─── Star Rating (inline) ─────────────────────────────────────────────────────
function InlineStars({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;
  return (
    <div className="flex gap-0.5 shrink-0">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform duration-150 hover:scale-125 active:scale-110"
        >
          <Star
            size={20}
            fill={display >= star ? "#1d4ed8" : "none"}
            stroke={display >= star ? "#1d4ed8" : "#93c5fd"}
            className="transition-all duration-150"
          />
        </button>
      ))}
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

// ─── Rating Row (always-visible stars + comment) ───────────────────────────────
function RatingRow({ icon: Icon, title, description, rating, comment, onRating, onComment, delay }) {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-slideUp"
      style={{ border: "1px solid #bfdbfe", animationDelay: `${delay}ms` }}
    >
      {/* Header: icon + title left | stars right */}
      <div
        className="flex items-center justify-between px-3 pt-3 pb-2"
        style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="p-1.5 bg-white rounded-lg shrink-0"
            style={{ boxShadow: "0 2px 8px rgba(37,99,235,0.12)" }}
          >
            <Icon size={14} style={{ color: "#2563eb" }} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm leading-tight">{title}</p>
            <p className="text-gray-500 text-xs">{description}</p>
          </div>
        </div>
        <InlineStars value={rating} onChange={onRating} />
      </div>

      {/* Comment always visible below */}
      <div className="px-3 pb-3 pt-2 bg-white">
        <div className="relative">
          <textarea
            value={comment}
            onChange={(e) => onComment(e.target.value)}
            maxLength={500}
            rows={1}
            placeholder="Add a comment (optional)..."
            className="w-full px-3 py-1.5 rounded-xl text-gray-700 text-xs resize-none transition-all duration-200 placeholder-gray-300"
            style={{
              border: "1px solid #bfdbfe",
              background: "#eff6ff",
              outline: "none",
              lineHeight: "1.5",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.25)";
              e.target.style.borderColor = "#60a5fa";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.borderColor = "#bfdbfe";
              e.target.style.background = "#eff6ff";
            }}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-gray-300">{comment.length}/500</span>
        </div>
      </div>
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
              <Star key={s} size={12} fill={s <= rating ? "#1d4ed8" : "none"} stroke={s <= rating ? "#1d4ed8" : "#bfdbfe"} />
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
  const [data, setData] = useState({
    reviewer: "",
    trainer: "",
    company: "",
    city: "",
    date: "",
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

  // ── Submitted Screen ────────────────────────────────────────────────────────
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
            50%       { transform: translateY(-5px); }
          }
          .anim-confetti    { animation: confettiPop 0.6s cubic-bezier(.34,1.56,.64,1) both; }
          .anim-fade-up     { animation: fadeSlideUp 0.5s ease both; }
          .anim-star-float  { animation: starFloat 2s ease-in-out infinite; }
        `}</style>
        <div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center space-y-4 relative"
          style={{ border: "1px solid rgba(147,197,253,0.6)", zIndex: 1 }}
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto anim-confetti"
            style={{ background: "linear-gradient(135deg,#dbeafe,#93c5fd)" }}
          >
            <CheckCircle style={{ color: "#1d4ed8" }} size={36} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 anim-fade-up" style={{ animationDelay: "100ms" }}>
            Thank you!
          </h2>
          <p className="text-gray-500 text-sm anim-fade-up" style={{ animationDelay: "200ms" }}>
            Your feedback has been submitted. It helps trainers improve every session.
          </p>
          {avg !== null && (
            <div className="anim-fade-up" style={{ animationDelay: "350ms" }}>
              <div className="flex justify-center gap-1 pt-2 anim-star-float">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={22} fill={s <= Math.round(avg) ? "#1d4ed8" : "none"} stroke="#1d4ed8" />
                ))}
              </div>
              <p className="font-bold text-xl mt-2" style={{ color: "#1d4ed8" }}>{avg.toFixed(1)} / 5</p>
            </div>
          )}
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setData((d) => ({
                ...d,
                overall:    { rating: null, comment: "" },
                delivery:   { rating: null, comment: "" },
                content:    { rating: null, comment: "" },
                engagement: { rating: null, comment: "" },
                extra: "",
              }));
            }}
            className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 anim-fade-up"
            style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", animationDelay: "500ms" }}
          >
            Submit another
          </button>
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
        @keyframes bounceSoft { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }

        .animate-fade-in  { animation: fadeIn 0.4s ease both; }
        .animate-slideIn  { animation: ${animDir === "forward" ? "slideInFwd" : "slideInBck"} 0.35s cubic-bezier(.25,.8,.25,1) both; }
        .animate-slideUp  { animation: slideUp 0.4s ease both; }

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
        .btn-primary:hover { opacity: 0.92; }
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
              { Icon: Shield,     label: "Secure Feedback", sub: "Handled responsibly, used for improvement" },
              { Icon: Clock,      label: "Takes 2 Minutes", sub: "Fast and focused questions only" },
              { Icon: TrendingUp, label: "Drives Change",   sub: "Your input improves trainer performance" },
            ].map(({ Icon, label, sub }, i) => (
              <div
                key={label}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slideUp"
                style={{ border: "1px solid #dbeafe", animationDelay: `${i * 80}ms` }}
              >
                <div className="p-2 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
                  <Icon className="w-4 h-4" style={{ color: "#2563eb" }} />
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
            <div className="space-y-1.5">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                Training Feedback
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: "#3b82f6" }}>
                Help us improve every session
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 mobile-compact shadow-xl">
            <StepIndicator current={step} />

            <div className="animate-slideIn" key={step}>

              {/* ── Step 1: Session Details ──────────────────────────────── */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-5 mt-2">
                  <div className="p-3 sm:p-4 rounded-2xl" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg flex items-center gap-2">
                      <BookOpen size={18} style={{ color: "#2563eb" }} />
                      Session Details
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                      Confirm the details of your training session.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {[
                      { icon: User,      label: "Reviewer name",  key: "reviewer", type: "text", placeholder: "Your name" },
                      { icon: User,      label: "Trainer name",   key: "trainer",  type: "text", placeholder: "Trainer name" },
                      { icon: Building2, label: "Company",        key: "company",  type: "text", placeholder: "Your company" },
                      { icon: MapPin,    label: "City",           key: "city",     type: "text", placeholder: "City" },
                      { icon: Calendar,  label: "Session date",   key: "date",     type: "date", placeholder: "" },
                      { icon: BookOpen,  label: "Topic / module", key: "topic",    type: "text", placeholder: "e.g. Leadership basics" },
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

              {/* ── Step 2: Ratings (inline stars + comment always visible) ─ */}
              {step === 2 && (
                <div className="space-y-3 mt-2">
                  <RatingRow
                    icon={BarChart2}
                    title="Overall Feedback"
                    // description="How was the session overall?"
                    rating={data.overall.rating}
                    comment={data.overall.comment}
                    onRating={(v) => setSection("overall", "rating", v)}
                    onComment={(v) => setSection("overall", "comment", v)}
                    delay={0}
                  />
                  <RatingRow
                    icon={Headphones}
                    title="Communication & Delivery"
                    // description="How clearly did the trainer communicate?"
                    rating={data.delivery.rating}
                    comment={data.delivery.comment}
                    onRating={(v) => setSection("delivery", "rating", v)}
                    onComment={(v) => setSection("delivery", "comment", v)}
                    delay={60}
                  />
                  <RatingRow
                    icon={BookOpen}
                    title="Training Content"
                    // description="Was the material relevant and well structured?"
                    rating={data.content.rating}
                    comment={data.content.comment}
                    onRating={(v) => setSection("content", "rating", v)}
                    onComment={(v) => setSection("content", "comment", v)}
                    delay={120}
                  />
                  <RatingRow
                    icon={Users}
                    title="Session Engagement Level"
                    // description="How engaging and interactive was the session?"
                    rating={data.engagement.rating}
                    comment={data.engagement.comment}
                    onRating={(v) => setSection("engagement", "rating", v)}
                    onComment={(v) => setSection("engagement", "comment", v)}
                    delay={180}
                  />
                </div>
              )}

              {/* ── Step 3: Review & Submit ──────────────────────────────── */}
              {step === 3 && (
                <div className="space-y-5 sm:space-y-6 mt-2 animate-slideUp">
                  <div className="p-3 sm:p-4 rounded-2xl flex items-start gap-3" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
                    <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                      <CheckCircle size={18} style={{ color: "#2563eb" }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">Review your feedback</h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Check everything looks good before submitting.</p>
                    </div>
                  </div>

                  {/* Session info summary */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #bfdbfe" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                      Session info
                    </p>
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {[
                        { label: "Reviewer", value: data.reviewer },
                        { label: "Trainer",  value: data.trainer },
                        { label: "Company",  value: data.company },
                        { label: "City",     value: data.city },
                        { label: "Date",     value: data.date },
                        { label: "Topic",    value: data.topic },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-xs">
                          <span className="text-gray-400 font-semibold">{label}: </span>
                          <span className="text-gray-700">{value || <span className="italic text-gray-300">—</span>}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ratings summary */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #bfdbfe" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2" style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                      Your ratings
                    </p>
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

                  {/* Average */}
                  {avg !== null && (
                    <div
                      className="flex items-center justify-between p-3 sm:p-4 rounded-2xl animate-slideUp"
                      style={{ background: "linear-gradient(135deg,#dbeafe,#bfdbfe)", border: "1px solid #93c5fd" }}
                    >
                      <span className="font-bold text-sm" style={{ color: "#1d4ed8" }}>Average score</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} fill={s <= Math.round(avg) ? "#1d4ed8" : "none"} stroke="#1d4ed8" />
                          ))}
                        </div>
                        <span className="font-black text-lg" style={{ color: "#1d4ed8" }}>{avg.toFixed(1)}</span>
                      </div>
                    </div>
                  )}

                  {/* Extra comments */}
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
                  onClick={() => setSubmitted(true)}
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
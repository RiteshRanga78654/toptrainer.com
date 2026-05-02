"use client";
import { useState } from "react";
import {
  User, Building2, MapPin, Calendar, BookOpen,
  Star, MessageSquare, ChevronRight, ChevronLeft,
  CheckCircle, Send, Edit2, Headphones, BarChart2,
  Users, Sparkles, Shield, Clock, TrendingUp,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Session details", shortLabel: "Session" },
  { id: 2, label: "Overall",         shortLabel: "Overall" },
  { id: 3, label: "Delivery",        shortLabel: "Delivery" },
  { id: 4, label: "Content",         shortLabel: "Content" },
  { id: 5, label: "Engagement",      shortLabel: "Engagement" },
  { id: 6, label: "Review & submit", shortLabel: "Review" },
];

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
const RATING_EMOJIS = ["", "😔", "😐", "😊", "😄", "🤩"];

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;

  return (
    <div className="flex flex-col items-center gap-3">
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
              size={34}
              fill={display >= star ? "#F59E0B" : "none"}
              stroke={display >= star ? "#F59E0B" : "#D1D5DB"}
              className="transition-all duration-200 sm:w-9 sm:h-9"
            />
          </button>
        ))}
      </div>

      <div
        style={{
          opacity: display > 0 ? 1 : 0,
          transform: display > 0 ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.9)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          minHeight: "32px",
          pointerEvents: "none",
        }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium"
      >
        <span>{RATING_EMOJIS[display]}</span>
        <span>{RATING_LABELS[display]}</span>
      </div>
    </div>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const progress = ((current - 1) / 5) * 100;
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
          Step {current} of 6
        </span>
        <span className="text-xs sm:text-sm font-medium text-gray-500">{STEPS[current - 1].label}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg,#F59E0B,#EF4444)" }}
        />
      </div>
      <div className="flex justify-between">
        {STEPS.map((step) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  done   ? "bg-amber-500 text-white scale-100"
                  : active ? "bg-amber-100 text-amber-600 ring-2 ring-amber-400 scale-110"
                  : "bg-gray-100 text-gray-400 scale-100"
                }`}
                style={{
                  animation: active ? "stepPulse 2s infinite" : "none",
                }}
              >
                {done ? <CheckCircle size={14} /> : step.id}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-medium hidden sm:block transition-colors duration-300 ${
                active ? "text-amber-600" : done ? "text-gray-600" : "text-gray-400"
              }`}>
                {step.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Rating Section ───────────────────────────────────────────────────────────
function RatingSection({ icon: Icon, title, description, bgColor, rating, comment, onRating, onComment }) {
  return (
    <div className="space-y-5 sm:space-y-6 animate-slideUp">
      <div className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl ${bgColor} transition-all duration-300`}>
        <div className="p-2 bg-white rounded-xl shadow-sm flex-shrink-0">
          <Icon size={20} className="text-amber-500" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base sm:text-lg">{title}</h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{description}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 py-2">
        <StarRating value={rating} onChange={onRating} />
        {rating === null && (
          <p className="text-xs text-gray-400 mt-1 animate-bounce-soft">Tap a star to rate</p>
        )}
      </div>

      <div>
        <label className="text-xs font-bold tracking-widest text-gray-400 uppercase flex items-center gap-1.5 mb-2">
          <MessageSquare size={12} /> Add a comment
          <span className="font-normal normal-case">(optional)</span>
        </label>
        <div className="relative">
          <textarea
            value={comment}
            onChange={(e) => onComment(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 placeholder-gray-300 focus:bg-white"
          />
          <span className="absolute bottom-2.5 right-3 text-xs text-gray-300">{comment.length}/500</span>
        </div>
      </div>
    </div>
  );
}

// ─── Review Row ───────────────────────────────────────────────────────────────
function ReviewRow({ num, label, rating, delay }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-amber-50/40 transition-colors duration-200 px-2 rounded-lg animate-slideUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="text-gray-700 text-xs sm:text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {rating !== null ? (
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={12} fill={s <= rating ? "#F59E0B" : "none"} stroke={s <= rating ? "#F59E0B" : "#D1D5DB"} className="sm:w-3.5 sm:h-3.5" />
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
    trainer: "Priya Sharma",
    company: "Northwind Labs",
    city: "Bengaluru",
    date: "2026-04-22",
    topic: "Negotiation skills for product managers",
    overall:    { rating: null, comment: "" },
    delivery:   { rating: null, comment: "" },
    content:    { rating: null, comment: "" },
    engagement: { rating: null, comment: "" },
    extra: "",
  });

  const ratings = [data.overall.rating, data.delivery.rating, data.content.rating, data.engagement.rating].filter((r) => r !== null);
  const avg = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;

  const next = () => { setAnimDir("forward"); setStep((s) => Math.min(s + 1, 6)); };
  const back = () => { setAnimDir("back"); setStep((s) => Math.max(s - 1, 1)); };

  const BG = "linear-gradient(135deg,#ede9f6 0%,#f0eefa 30%,#eeeaf8 60%,#e8e4f5 100%)";

  // ── Submitted screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-8" style={{ background: BG }}>
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
          .anim-confetti { animation: confettiPop 0.6s cubic-bezier(.34,1.56,.64,1) both; }
          .anim-fade-up  { animation: fadeSlideUp 0.5s ease both; }
          .anim-star-float { animation: starFloat 2s ease-in-out infinite; }
        `}</style>
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto anim-confetti">
            <CheckCircle className="text-amber-500" size={36} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 anim-fade-up" style={{ animationDelay: "100ms" }}>Thank you!</h2>
          <p className="text-gray-500 text-sm anim-fade-up" style={{ animationDelay: "200ms" }}>Your feedback has been submitted anonymously. It helps trainers improve.</p>
          {avg !== null && (
            <div className="anim-fade-up" style={{ animationDelay: "350ms" }}>
              <div className="flex justify-center gap-1 pt-2 anim-star-float">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={22} fill={s <= Math.round(avg) ? "#F59E0B" : "none"} stroke="#F59E0B" />
                ))}
              </div>
              <p className="text-amber-600 font-bold text-xl mt-2">{avg.toFixed(1)} / 5</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-8 sm:py-10" style={{ background: BG }}>
      <style>{`
        @keyframes fadeIn     { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideInFwd { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInBck { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes stepPulse  { 0%,100% { box-shadow:0 0 0 0 rgba(245,158,11,.4); } 50% { box-shadow:0 0 0 6px rgba(245,158,11,0); } }
        @keyframes starPop    { 0% { transform:scale(1); } 40% { transform:scale(1.4); } 100% { transform:scale(1.18); } }
        @keyframes bounceSoft { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }

        .animate-fade-in    { animation: fadeIn 0.4s ease both; }
        .animate-slideIn    { animation: ${animDir === "forward" ? "slideInFwd" : "slideInBck"} 0.35s cubic-bezier(.25,.8,.25,1) both; }
        .animate-slideUp    { animation: slideUp 0.4s ease both; }
        .animate-bounce-soft{ animation: bounceSoft 1.8s ease-in-out infinite; }

        input, textarea, select { font-family: inherit; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
        
        @media (max-width: 640px) {
          .mobile-compact { padding: 1.25rem !important; }
        }
      `}</style>

      <div className="w-full max-w-6xl flex items-start gap-6 lg:gap-8 animate-fade-in">

        {/* ── Left Panel ─────────────────────────────────────────────────── */}
        <div className="hidden lg:flex flex-col gap-7 w-64 xl:w-72 flex-shrink-0 pt-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-purple-100 text-xs font-semibold text-purple-600 mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live feedback collection
            </div>
            <h2 className="text-2xl xl:text-3xl font-black text-gray-800 leading-tight mb-3">
              Your feedback<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#6366f1)" }}>
                builds better
              </span><br />
              training.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Feedback helps trainers improve and ensures every session is better than the last.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { Icon: Shield,     label: "Secure Feedback", sub: "Handled responsibly, used for improvement", grad: "from-purple-100 to-purple-200", text: "text-purple-700" },
              { Icon: Clock,      label: "Takes 2 Minutes",  sub: "Fast and focused questions only",           grad: "from-blue-100 to-blue-200",   text: "text-blue-700"   },
              { Icon: TrendingUp, label: "Drives Change",    sub: "Your input improves trainer performance",   grad: "from-indigo-100 to-indigo-200",text: "text-indigo-700" },
            ].map(({ Icon, label, sub, grad, text }, i) => (
              <div
                key={label}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${grad} ${text} flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Recent feedback</p>
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "Clear explanations, practical examples, and very engaging throughout."
            </p>
          </div>
        </div>

        {/* ── Center Form ─────────────────────────────────────────────────── */}
        <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">

          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 px-1">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
              <MessageSquare size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-gray-800">Share your feedback</h1>
              <p className="text-xs text-gray-400 hidden sm:block">A few quick steps. Takes under two minutes.</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
            <StepIndicator current={step} />
          </div>

          {/* Step Content */}
          <div key={step} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 lg:p-9 mobile-compact animate-slideIn">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Tell us about the session</h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">A few details so your review reaches the right place.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    {
                      label: "Trainer Name", icon: User, required: true,
                      content: (
                        <div className="relative">
                          <select
                            value={data.trainer}
                            onChange={(e) => setData({ ...data, trainer: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 appearance-none pr-8 transition-all duration-200 focus:bg-white"
                          >
                            <option>Priya Sharma</option>
                            <option>Rahul Mehta</option>
                            <option>Anjali Singh</option>
                          </select>
                          <ChevronRight size={14} className="absolute right-3 top-3.5 text-gray-400 rotate-90 pointer-events-none" />
                        </div>
                      )
                    },
                    {
                      label: "Company", icon: Building2, required: true,
                      content: (
                        <input value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200 focus:bg-white" />
                      )
                    },
                    {
                      label: "City", icon: MapPin, required: true,
                      content: (
                        <input value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200 focus:bg-white" />
                      )
                    },
                    {
                      label: "Session Date", icon: Calendar, required: true,
                      content: (
                        <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200 focus:bg-white" />
                      )
                    },
                  ].map(({ label, icon: Icon, required, content }, i) => (
                    <div key={label} className="animate-slideUp" style={{ animationDelay: `${i * 60}ms` }}>
                      <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                        <Icon size={11} /> {label} {required && <span className="text-red-400">*</span>}
                      </label>
                      {content}
                    </div>
                  ))}
                </div>
                <div className="animate-slideUp" style={{ animationDelay: "240ms" }}>
                  <label className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-gray-400 uppercase mb-1.5">
                    <BookOpen size={11} /> Session Topic <span className="text-red-400">*</span>
                  </label>
                  <input value={data.topic} onChange={(e) => setData({ ...data, topic: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200 focus:bg-white" />
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <RatingSection
                icon={Sparkles} title="Overall Feedback"
                description="How would you rate your overall experience of this session?"
                bgColor="bg-amber-50"
                rating={data.overall.rating} comment={data.overall.comment}
                onRating={(r) => setData({ ...data, overall: { ...data.overall, rating: r } })}
                onComment={(c) => setData({ ...data, overall: { ...data.overall, comment: c } })}
              />
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <RatingSection
                icon={Headphones} title="Communication & Delivery"
                description="How effective was the trainer's communication and delivery?"
                bgColor="bg-red-50"
                rating={data.delivery.rating} comment={data.delivery.comment}
                onRating={(r) => setData({ ...data, delivery: { ...data.delivery, rating: r } })}
                onComment={(c) => setData({ ...data, delivery: { ...data.delivery, comment: c } })}
              />
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <RatingSection
                icon={BarChart2} title="Training Content"
                description="How relevant and valuable was the content shared?"
                bgColor="bg-amber-50"
                rating={data.content.rating} comment={data.content.comment}
                onRating={(r) => setData({ ...data, content: { ...data.content, rating: r } })}
                onComment={(c) => setData({ ...data, content: { ...data.content, comment: c } })}
              />
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <RatingSection
                icon={Users} title="Session Engagement"
                description="How engaging and interactive was the session?"
                bgColor="bg-blue-50"
                rating={data.engagement.rating} comment={data.engagement.comment}
                onRating={(r) => setData({ ...data, engagement: { ...data.engagement, rating: r } })}
                onComment={(c) => setData({ ...data, engagement: { ...data.engagement, comment: c } })}
              />
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="space-y-4 sm:space-y-5">
                <div className="animate-slideUp">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Almost done — review your feedback</h2>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Take a quick look. You can jump back to edit anything.</p>
                </div>

                <div className="bg-amber-50 rounded-2xl p-3 sm:p-4 animate-slideUp" style={{ animationDelay: "60ms" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Session</span>
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs text-amber-600 font-semibold hover:underline active:opacity-70 transition-opacity">
                      <Edit2 size={11} /> Edit
                    </button>
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{data.topic}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{data.trainer} · {data.company} · {data.city}</p>
                  {avg !== null && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={15} fill={s <= Math.round(avg) ? "#F59E0B" : "none"} stroke="#F59E0B" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{avg.toFixed(1)} average</span>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-gray-100 overflow-hidden animate-slideUp" style={{ animationDelay: "120ms" }}>
                  <ReviewRow num={1} label="Overall"                  rating={data.overall.rating}    delay={0}   />
                  <ReviewRow num={2} label="Communication & Delivery" rating={data.delivery.rating}   delay={60}  />
                  <ReviewRow num={3} label="Training Content"         rating={data.content.rating}    delay={120} />
                  <ReviewRow num={4} label="Session Engagement"       rating={data.engagement.rating} delay={180} />
                </div>

                <div className="animate-slideUp" style={{ animationDelay: "300ms" }}>
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">
                    Anything else? <span className="font-normal normal-case">(optional)</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={data.extra}
                      onChange={(e) => setData({ ...data, extra: e.target.value })}
                      maxLength={500} rows={3}
                      placeholder="Any other thoughts..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-gray-300 transition-all duration-200 focus:bg-white"
                    />
                    <span className="absolute bottom-2.5 right-3 text-xs text-gray-300">{data.extra.length}/500</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Nav */}
          <div className="flex items-center justify-between px-1 gap-2">
            <button
              onClick={back} disabled={step === 1}
              className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-30 active:scale-95 transition-all duration-200"
            >
              <ChevronLeft size={15} /> Back
            </button>

            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-400">
              <Shield size={12} className="text-green-400 flex-shrink-0" />
              <span className="hidden xs:inline">Your responses stay anonymous</span>
              <span className="xs:hidden">Anonymous</span>
            </div>

            {step < 6 ? (
              <button
                onClick={next}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg active:scale-95 hover:brightness-110 transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)" }}
              >
                Continue <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg active:scale-95 hover:brightness-110 transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)" }}
              >
                <Send size={14} /> Submit review
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
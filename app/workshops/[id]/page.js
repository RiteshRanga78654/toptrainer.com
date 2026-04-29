"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Star, Clock, Users, Tag, CheckCircle2,
  BadgeCheck, Zap, ArrowRight, ChevronRight, Award,
  Camera, IndianRupee, Wifi, MapPin, Play, Calendar,
  GraduationCap, Brain, BarChart3, Mic, Leaf, Sparkles,
  BookOpen, Target, TrendingUp, Shield, CheckCircle
} from "lucide-react";
import { WORKSHOPS, CATEGORIES, CAT_COLORS, fmt, calcPct } from "../../lib/workshops-data";

const ICON_MAP = {
  Wifi, MapPin, Play, Calendar, GraduationCap,
  Award, Brain, BarChart3, Mic, Leaf,
};

/* ── Keyframe animations injected once ── */
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

  :root {
    --font-display: 'Clash Display', sans-serif;
    --font-body: 'Satoshi', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: var(--font-body); }

  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes blobMorph {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50%     { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
    75%     { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { box-shadow: 0 0 0 16px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0) scale(1);   opacity: 0.6; }
    33%  { transform: translateY(-28px) translateX(14px) scale(1.2); opacity: 0.9; }
    66%  { transform: translateY(-12px) translateX(-9px) scale(0.8); opacity: 0.4; }
    100% { transform: translateY(0) translateX(0) scale(1);   opacity: 0.6; }
  }
  @keyframes liveDot {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.3; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes underlineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }

  .anim-up    { animation: fadeUp   0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-right { animation: fadeRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-scale { animation: scaleIn  0.6s  cubic-bezier(0.22,1,0.36,1) both; }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.15s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.42s; }
  .d5 { animation-delay: 0.58s; }

  .hero-bg-anim {
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #e0f2fe 100%);
    background-size: 300% 300%;
    animation: gradientShift 14s ease infinite;
  }
  .blob-blue-anim {
    animation: blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
  }
  .blob-purple-anim {
    animation: blobMorph 16s ease-in-out infinite reverse, floatY 11s ease-in-out infinite 2s;
  }
  .float-anim  { animation: floatY 6s ease-in-out infinite; }
  .float-anim2 { animation: floatY 4s ease-in-out infinite 0.5s; }
  .pulse-ring  { animation: pulseRing 4s ease-out infinite; }
  .live-dot    { animation: liveDot 1.5s ease-in-out infinite; }
  .particle-1  { animation: particleDrift 6s ease-in-out infinite; }
  .particle-2  { animation: particleDrift 8s ease-in-out infinite 1s; }
  .particle-3  { animation: particleDrift 7s ease-in-out infinite 2s; }
  .particle-4  { animation: particleDrift 9s ease-in-out infinite 0.5s; }
  .particle-5  { animation: particleDrift 5s ease-in-out infinite 1.5s; }
  .particle-6  { animation: particleDrift 10s ease-in-out infinite 3s; }
  .particle-7  { animation: particleDrift 7s ease-in-out infinite 0.8s; }

  .text-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .cta-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .cta-btn:hover::before { opacity: 1; }
  .cta-btn:hover {
    box-shadow: 0 10px 32px rgba(37,99,235,0.4);
    transform: translateY(-2px) scale(1.02);
  }
  .cta-btn:active { transform: scale(0.97); }
  .cta-btn > * { position: relative; z-index: 1; }

  .stat-badge-hover {
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .stat-badge-hover:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 12px 32px rgba(37,99,235,0.14);
    border-color: rgba(37,99,235,0.2);
  }

  .photo-frame img { transition: transform 0.5s ease; }
  .photo-frame:hover img { transform: scale(1.07); }

  .related-card {
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
  }
  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(37,99,235,0.12);
  }

  .content-card-hover {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .content-card-hover:hover {
    border-color: #bfdbfe;
    box-shadow: 0 6px 24px rgba(37,99,235,0.08);
  }

  .sec-btn {
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .sec-btn:hover {
    border-color: #93c5fd;
    color: #2563eb;
    background: #eff6ff;
    transform: translateY(-1px);
  }
`;

function findBySlug(idOrSlug) {
  const byId = WORKSHOPS.find((w) => String(w.id) === String(idOrSlug));
  if (byId) return byId;
  const match = String(idOrSlug).match(/^(\d+)-/);
  if (match) return WORKSHOPS.find((w) => w.id === Number(match[1]));
  return null;
}

export default function WorkshopDetailPage() {
  const { id: slugParam } = useParams();
  const w = findBySlug(slugParam);

  if (!w) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="text-5xl">🔍</div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
          Workshop not found
        </h2>
        <Link
          href="/workshops"
          className="cta-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white no-underline"
          style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
        >
          <ArrowLeft size={14} /> <span>Back to Workshops</span>
        </Link>
      </div>
    );
  }

  const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
  const disc = calcPct(w.price.original, w.price.discounted);
  const CatLabel = CATEGORIES.find((c) => c.id === w.category)?.label || w.category;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-slate-50">

        {/* ══════════════ HERO ══════════════ */}
  
<div className="hero-bg-anim relative" style={{ overflow: 'visible' }}>

  {/* Grid overlay */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)',
      backgroundSize: '44px 44px',
      maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 100%)',
    }}
  />

  {/* Blobs */}
  <div
    className="blob-blue-anim absolute pointer-events-none"
    style={{
      width: 480, height: 480, top: -100, left: -80,
      background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
      filter: 'blur(36px)',
    }}
  />
  <div
    className="blob-purple-anim absolute pointer-events-none"
    style={{
      width: 360, height: 360, bottom: -80, right: 80,
      background: 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%)',
      filter: 'blur(44px)',
    }}
  />

  {/* Particles */}
  {[
    { cls: 'particle-1', size: 6, bg: '#2563eb', top: '15%', left: '6%' },
    { cls: 'particle-2', size: 4, bg: '#8b5cf6', top: '30%', left: '16%' },
    { cls: 'particle-3', size: 7, bg: '#06b6d4', top: '65%', left: '4%' },
    { cls: 'particle-4', size: 5, bg: '#10b981', top: '75%', left: '20%' },
    { cls: 'particle-5', size: 5, bg: '#f59e0b', top: '20%', right: '10%' },
    { cls: 'particle-6', size: 4, bg: '#ef4444', top: '50%', right: '6%' },
    { cls: 'particle-7', size: 6, bg: '#2563eb', top: '70%', right: '15%' },
  ].map((p, i) => (
    <div
      key={i}
      className={`${p.cls} absolute rounded-full pointer-events-none`}
      style={{ width: p.size, height: p.size, background: p.bg, top: p.top, left: p.left, right: p.right }}
    />
  ))}

  {/* Hero inner grid */}
  <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-[1fr_480px] lg:grid-cols-[1fr_580px] items-center"
    style={{ minHeight: '650px' }}
  >

    {/* ── LEFT CONTENT ── starts right at navbar bottom with pt */}
    <div className="flex mb-25   md:-ml-6 lg:-ml-12 flex-col items-center md:items-start text-center md:text-left pt-8 pb-10 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14">

      {/* Live / category badge row */}
      <div className="anim-up d1 flex items-center gap-3 flex-wrap justify-center md:justify-start mb-5">
        <div
          className="stat-badge-hover inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.95)',
            boxShadow: '0 4px 16px rgba(37,99,235,0.08)',
          }}
        >
          <span className="live-dot w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span className="font-semibold text-xs tracking-widest text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
            {CatLabel.toUpperCase()} WORKSHOP
          </span>
        </div>

        {w.isLive && (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500 text-white font-bold text-xs" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-white" />
            LIVE NOW
          </div>
        )}
      </div>

      {/* Title */}
      <h1
        className="anim-up d2 font-bold leading-tight text-slate-900 mb-4"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 56px)' }}
      >
        {(() => {
          const words = w.title.split(" ");
          const head = words.slice(0, Math.ceil(words.length * 0.6)).join(" ");
          const tail = words.slice(Math.ceil(words.length * 0.6)).join(" ");
          return <>{head} <span className="text-shimmer">{tail}</span></>;
        })()}
      </h1>

      {/* Short desc */}
      <p className="anim-up d3 text-slate-500 text-[15px] leading-relaxed mb-6 max-w-lg" style={{ fontFamily: 'var(--font-body)' }}>
        {w.shortDesc}
      </p>

      {/* Info row */}
      <div className="anim-up d3 flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
        <span className="flex items-center gap-1.5 font-bold text-sm text-amber-500" style={{ fontFamily: 'var(--font-body)' }}>
          <Star size={14} fill="currentColor" /> {w.rating}
          <span className="font-normal text-slate-400 ml-0.5">({w.reviews})</span>
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>
          <Clock size={13} className="text-blue-600" /> {w.duration}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>
          <Users size={13} className="text-blue-600" /> {w.trainer.students} students
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-[13px] text-red-500" style={{ fontFamily: 'var(--font-body)' }}>
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          Only {w.seats} seats left
        </span>
      </div>

      {/* Trust badges */}
      <div className="anim-up d5 flex flex-wrap justify-center md:justify-start gap-2.5">
        {[
          { icon: Shield, color: '#10b981', label: '7-Day Guarantee' },
          { icon: Award, color: '#6366f1', label: 'Certificate Included' },
          { icon: CheckCircle, color: '#2563eb', label: 'Expert-Led' },
        ].map(({ icon: Icon, color, label }, i) => (
          <div
            key={i}
            className="stat-badge-hover flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.92)',
              boxShadow: '0 4px 20px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            <Icon size={13} style={{ color }} />
            <span className="font-semibold text-xs text-slate-700" style={{ fontFamily: 'var(--font-body)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── RIGHT IMAGE — bleeds up behind navbar via negative margin-top ── */}
    
<div
  className="anim-scale d3 relative hidden md:block self-stretch md:pl-10 lg:pl-16 mt-15"
>      {/* Glow */}
      <div
        className="pulse-ring absolute rounded-full pointer-events-none"
        style={{
          width: '80%', height: '70%', left: '10%', top: '10%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
          filter: 'blur(52px)',
        }}
      />

      {/* Image frame — full height of parent, rounded only on left side */}
      <div
className="float-anim relative w-full h-80 overflow-hidden md:translate-x-4 lg:translate-x-15"        style={{
          borderRadius: '24px 24px 24px 24px',  // rounded left, flush right edge
          minHeight: '480px',
          boxShadow: '-24px 0 80px rgba(37,99,235,0.18), 0 40px 80px rgba(37,99,235,0.16)',
        }}
      >
        <img
          src={w.coverImg}
          alt={w.title}
          className="w-full h-full object-cover   "
          style={{ objectPosition: 'center top' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(37,99,235,0.06) 0%, transparent 50%, rgba(0,0,0,0.32) 100%)' }} />

        {/* Category pill */}
        <div
          className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-white font-semibold text-[11px]"
          style={{ fontFamily: 'var(--font-display)', background: col.pill }}
        >
          {CatLabel}
        </div>

        {/* Discount bubble */}
        <div
          className="float-anim2 absolute bottom-4 right-4 w-[64px] h-[64px] rounded-full flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2563eb, #6366f1)',
            boxShadow: '0 8px 24px rgba(37,99,235,0.45)',
          }}
        >
          <span className="font-bold text-[16px] text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>{disc}%</span>
          <span className="text-[9px] text-white/80" style={{ fontFamily: 'var(--font-body)' }}>OFF</span>
        </div>

        {/* Seats remaining */}
        <div
          className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-bold text-[10px]"
          style={{ fontFamily: 'var(--font-display)', background: 'rgba(239,68,68,0.92)' }}
        >
          <span className="live-dot w-1 h-1 rounded-full bg-white" />
          {w.seats} seats left
        </div>
      </div>
    </div>

  </div>
</div>

        {/* ══════════════ MAIN CONTENT ══════════════ */}
        <div className="max-w-7xl mx-auto gap-5 px-5 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px]">

          {/* ─── LEFT COLUMN ─── */}
          <div className="anim-up d2 flex flex-col gap-6">

            {/* About */}
            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #2563eb, #6366f1)' }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>About This Workshop</h2>
              </div>
              <p className="text-slate-500 leading-relaxed text-[15px]" style={{ fontFamily: 'var(--font-body)' }}>{w.fullDesc}</p>
            </section>

            {/* What you'll learn */}
            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #2563eb, #6366f1)' }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>What You'll Learn</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {w.price.includes.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #f5f7ff, #eef2ff)', border: '1px solid #e0e7ff' }}
                  >
                    <div className="w-6 h-6 rounded-lg flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #6366f1)' }}>
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <span className="font-medium text-[13px] text-slate-700" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Topics Covered */}
            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #2563eb, #6366f1)' }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Topics Covered</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {w.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full font-semibold text-[13px]"
                    style={{ fontFamily: 'var(--font-body)', background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Session Snapshots */}
            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <Camera size={18} className="text-slate-400" />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Session Snapshots</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {w.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="photo-frame relative overflow-hidden rounded-2xl"
                    style={{ height: idx === 0 ? 200 : 160 }}
                  >
                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                    {idx === 0 && w.isLive && (
                      <div
                        className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white font-bold text-[9px]"
                        style={{ fontFamily: 'var(--font-display)', background: 'rgba(239,68,68,0.9)' }}
                      >
                        <span className="live-dot w-1 h-1 rounded-full bg-white" /> LIVE
                      </div>
                    )}
                    <span
                      className="absolute bottom-2.5 left-2.5 font-semibold text-[11px] text-white px-2.5 py-0.5 rounded-lg"
                      style={{ fontFamily: 'var(--font-body)', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
                    >
                      {photo.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* How It's Conducted */}
            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #2563eb, #6366f1)' }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>How It's Conducted</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {w.trainer.classTypes.map((cls, i) => {
                  const Icon = ICON_MAP[cls.iconName] || Play;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center border"
                      style={{ borderColor: cls.borderColor || '#e2e8f0', background: cls.bg || '#f8fafc' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border-[1.5px]"
                        style={{ background: cls.bg || '#f1f5f9', borderColor: cls.borderColor || '#e2e8f0' }}
                      >
                        <Icon size={18} className={cls.colorClass} />
                      </div>
                      <div className="font-semibold text-[12px] text-slate-700" style={{ fontFamily: 'var(--font-display)' }}>{cls.type}</div>
                      <div className="text-[10px] text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>{cls.count}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Shield,     label: 'Money Back',     sub: '7-day guarantee', color: '#10b981', bg: '#ecfdf5' },
                { icon: Award,      label: 'Certificate',    sub: 'On completion',   color: '#6366f1', bg: '#f5f3ff' },
                { icon: Users,      label: 'Community',      sub: 'Peer network',    color: '#2563eb', bg: '#eff6ff' },
                { icon: TrendingUp, label: 'Career Support', sub: 'Post-workshop',   color: '#f59e0b', bg: '#fffbeb' },
              ].map(({ icon: Icon, label, sub, color, bg }, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center gap-2"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="font-bold text-[12px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>{label}</div>
                  <div className="text-[10px] text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <div className="flex flex-col gap-5">

            {/* Trainer card */}
            <div className="anim-right d2 content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p
                className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Your Trainer
              </p>

              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md">
                    <img src={w.trainer.avatar} alt={w.trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <div
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #6366f1)' }}
                  >
                    <BadgeCheck size={11} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[16px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>{w.trainer.name}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{w.trainer.role}</div>
                  <div className="flex items-center gap-1.5 mt-1 font-semibold text-[12px] text-indigo-500" style={{ fontFamily: 'var(--font-body)' }}>
                    <Award size={11} /> {w.trainer.exp}
                  </div>
                </div>
              </div>

              {/* Students stat */}
              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-5"
                style={{ background: 'linear-gradient(135deg, #f0f4ff, #eef2ff)', border: '1px solid #e0e7ff' }}
              >
                <Users size={13} className="text-indigo-500" />
                <span className="font-bold text-[14px] text-indigo-800" style={{ fontFamily: 'var(--font-display)' }}>{w.trainer.students}</span>
                <span className="text-[12px] text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>students trained</span>
              </div>

              {/* Certifications */}
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2.5" style={{ fontFamily: 'var(--font-display)' }}>
                Certifications
              </p>
              <div className="flex flex-col gap-2">
                {w.trainer.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-[12px] text-indigo-700"
                    style={{ fontFamily: 'var(--font-body)', background: '#f0f4ff', border: '1px solid #e0e7ff' }}
                  >
                    <BadgeCheck size={12} className="text-indigo-500 flex-shrink-0" /> {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Enroll card */}
            <div
              className="anim-right d3 bg-white border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-20"
              style={{ boxShadow: '0 12px 48px rgba(37,99,235,0.16)' }}
            >
              {/* Discount row */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-bold text-[10px]"
                  style={{ fontFamily: 'var(--font-display)', background: '#10b981' }}
                >
                  <Tag size={8} /> {disc}% OFF
                </span>
                <span className="text-[13px] text-slate-300 line-through" style={{ fontFamily: 'var(--font-body)' }}>
                  ₹{fmt(w.price.original)}
                </span>
                <span className="ml-auto font-semibold text-[12px] text-emerald-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Save ₹{fmt(w.price.original - w.price.discounted)}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-1">
                <IndianRupee size={18} className="text-slate-900" strokeWidth={2.5} />
                <span className="font-bold text-[34px] text-slate-900 leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {fmt(w.price.discounted)}
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                <Zap size={10} className="text-indigo-500" /> ₹{w.price.emi}/mo × 12 at 0% interest
              </p>

              {/* Buttons */}
              <button
                className="cta-btn w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[14px] font-semibold text-white mb-2.5"
                style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
              >
                <span>Enroll Now</span> <ArrowRight size={14} />
              </button>
              <button
                className="sec-btn w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl text-[13px] font-semibold text-slate-500 border border-slate-200 bg-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                View Schedule <ChevronRight size={13} />
              </button>

              {/* Includes */}
              <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-2.5">
                {w.price.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>
                    <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>

              {/* Scarcity */}
              <div
                className="mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-[12px] text-red-500"
                style={{ fontFamily: 'var(--font-body)', background: '#fef2f2', border: '1px solid #fecaca' }}
              >
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                Only {w.seats} seats remaining — filling fast!
              </div>
            </div>

          </div>
        </div>

        {/* ── RELATED ── */}
        <RelatedWorkshops current={w} />
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   RELATED WORKSHOPS
══════════════════════════════════════════════ */
function RelatedWorkshops({ current }) {
  const related = WORKSHOPS.filter(
    (w) => w.id !== current.id && w.category === current.category
  ).slice(0, 3);

  if (related.length === 0) return null;

  const catLabel = CATEGORIES.find((c) => c.id === current.category)?.label;

  return (
    <div className="max-w-6xl mx-auto px-5 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg, #2563eb, #6366f1)' }} />
        <h2 className="font-bold text-[20px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
          More in <span className="text-shimmer">{catLabel}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((w) => {
          const slug = `${w.id}-${w.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 50)}`;
          const discPct = Math.round(((w.price.original - w.price.discounted) / w.price.original) * 100);

          return (
            <Link
              key={w.id}
              href={`/workshops/${slug}`}
              className="related-card flex gap-3.5 p-4 bg-white rounded-2xl border border-slate-200 no-underline"
              onMouseEnter={e => e.currentTarget.style.borderColor = '#bfdbfe'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={w.coverImg} alt={w.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="overflow-hidden flex-1">
                <h3
                  className="font-semibold text-[13px] text-slate-900 leading-snug mb-2 line-clamp-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {w.title}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[12px] text-slate-500" style={{ fontFamily: 'var(--font-body)' }}>{w.rating}</span>
                  <span className="text-slate-200">·</span>
                  <span className="font-bold text-[13px] text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>₹{fmt(w.price.discounted)}</span>
                  {discPct > 0 && (
                    <span className="font-semibold text-[11px] text-emerald-500" style={{ fontFamily: 'var(--font-body)' }}>{discPct}% off</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
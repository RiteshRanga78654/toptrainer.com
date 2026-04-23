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

/* ══════════════════════════════════════════════
   GLOBAL STYLES — Unified theme: Clash Display + Satoshi
══════════════════════════════════════════════ */
const DETAIL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

  :root {
    --blue-primary: #2563eb;
    --blue-deep: #1d4ed8;
    --blue-light: #eff6ff;
    --blue-glow: rgba(37,99,235,0.15);
    --purple-mid: #6366f1;
    --text-dark: #0f172a;
    --text-mid: #475569;
    --text-soft: #94a3b8;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: 'Satoshi', sans-serif; margin: 0; background: #f8fafc; }

  /* ── Keyframes ── */
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
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 16px rgba(37,99,235,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
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
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes underlineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* ── Animation utilities ── */
  .anim-up    { animation: fadeUp   0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-right { animation: fadeRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-scale { animation: scaleIn  0.6s  cubic-bezier(0.22,1,0.36,1) both; }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.15s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.42s; }
  .d5 { animation-delay: 0.58s; }

  /* ── Hero background ── */
  .hero-bg {
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #e0f2fe 100%);
    background-size: 300% 300%;
    animation: gradientShift 14s ease infinite;
    position: relative;
    overflow: hidden;
  }

  /* ── Mesh grid overlay ── */
  .hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 100%);
    pointer-events: none;
  }

  /* ── Blobs ── */
  .blob-blue {
    position: absolute;
    background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
    animation: blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
    filter: blur(36px);
    pointer-events: none;
  }
  .blob-purple {
    position: absolute;
    background: radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%);
    animation: blobMorph 16s ease-in-out infinite reverse, floatY 11s ease-in-out infinite 2s;
    filter: blur(44px);
    pointer-events: none;
  }

  /* ── Particles ── */
  .particle { position: absolute; border-radius: 50%; pointer-events: none; }
  .p1 { width:6px; height:6px; background:#2563eb; top:15%; left:6%;  animation: particleDrift 6s ease-in-out infinite; }
  .p2 { width:4px; height:4px; background:#8b5cf6; top:30%; left:16%; animation: particleDrift 8s ease-in-out infinite 1s; }
  .p3 { width:7px; height:7px; background:#06b6d4; top:65%; left:4%;  animation: particleDrift 7s ease-in-out infinite 2s; }
  .p4 { width:5px; height:5px; background:#10b981; top:75%; left:20%; animation: particleDrift 9s ease-in-out infinite 0.5s; }
  .p5 { width:5px; height:5px; background:#f59e0b; top:20%; right:10%;animation: particleDrift 5s ease-in-out infinite 1.5s; }
  .p6 { width:4px; height:4px; background:#ef4444; top:50%; right:6%; animation: particleDrift 10s ease-in-out infinite 3s; }
  .p7 { width:6px; height:6px; background:#2563eb; top:70%; right:15%;animation: particleDrift 7s ease-in-out infinite 0.8s; }

  /* ── Shimmer text ── */
  .text-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* ── Stat badge ── */
  .stat-badge {
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.92);
    border-radius: 14px;
    box-shadow: 0 4px 20px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .stat-badge:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 12px 32px rgba(37,99,235,0.14);
    border-color: rgba(37,99,235,0.2);
  }

  /* ── Hero image ── */
  .hero-img-frame {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(37,99,235,0.18), 0 8px 24px rgba(0,0,0,0.08);
    animation: floatY 6s ease-in-out infinite;
  }
  .hero-img-glow {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
    filter: blur(48px);
    animation: pulseRing 4s ease-out infinite;
  }

  /* ── Orbit badges ── */
  .orbit-badge {
    position: absolute;
    background: white;
    border-radius: 14px;
    padding: 10px 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    border: 1px solid rgba(255,255,255,0.9);
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 20;
    font-family: 'Satoshi', sans-serif;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }
  .badge-tl { top: 8%;  left: -8%;  animation: floatY 4s ease-in-out infinite 0.3s; }
  .badge-br { bottom: 10%; right: -6%; animation: floatY 4.5s ease-in-out infinite 1.2s; }
  .badge-tr { top: 40%; right: -10%; animation: floatY 5s ease-in-out infinite 0.8s; }

  /* ── Spinning ring ── */
  .spin-ring { animation: spinSlow 20s linear infinite; }

  /* ── Online dot ── */
  .live-dot { animation: liveDot 1.5s ease-in-out infinite; }

  /* ── CTA button ── */
  .cta-btn {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    border: none;
    cursor: pointer;
    color: white;
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

  /* ── Secondary button ── */
  .sec-btn {
    background: white;
    border: 1.5px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    color: #475569;
    font-family: 'Satoshi', sans-serif;
    font-weight: 600;
  }
  .sec-btn:hover {
    border-color: #93c5fd;
    color: #2563eb;
    background: #eff6ff;
    transform: translateY(-1px);
  }

  /* ── Section bar ── */
  .section-bar {
    width: 4px; height: 22px; border-radius: 3px; flex-shrink: 0;
    background: linear-gradient(180deg, #2563eb, #6366f1);
  }

  /* ── Enroll card shadow ── */
  .enroll-shadow { box-shadow: 0 12px 48px rgba(37,99,235,0.16); }

  /* ── Photo frame ── */
  .photo-frame { overflow: hidden; border-radius: 16px; }
  .photo-frame img { transition: transform 0.5s ease; }
  .photo-frame:hover img { transform: scale(1.07); }

  /* ── Related card ── */
  .related-card {
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
  }
  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(37,99,235,0.12);
  }

  /* ── Content cards ── */
  .content-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .content-card:hover {
    border-color: #bfdbfe;
    box-shadow: 0 6px 24px rgba(37,99,235,0.08);
  }

  /* ── Heading underline ── */
  .heading-underline {
    position: relative;
    display: inline-block;
  }
  .heading-underline::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed);
    border-radius: 2px;
    animation: underlineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.6s both;
  }

  /* ── Scrollbar ── */
  .no-scrollbar { scrollbar-width: none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
`;

/* ── Slug helper ── */
function findBySlug(idOrSlug) {
  const byId = WORKSHOPS.find((w) => String(w.id) === String(idOrSlug));
  if (byId) return byId;
  const match = String(idOrSlug).match(/^(\d+)-/);
  if (match) return WORKSHOPS.find((w) => w.id === Number(match[1]));
  return null;
}

/* ══════════════════════════════════════════════
   DETAIL PAGE
══════════════════════════════════════════════ */
export default function WorkshopDetailPage() {
  const { id: slugParam } = useParams();
  const w = findBySlug(slugParam);

  if (!w) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: '#f8fafc' }}>
        <div style={{ fontSize: 52 }}>🔍</div>
        <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 20, color: '#0f172a' }}>Workshop not found</h2>
        <Link href="/workshops" className="cta-btn"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, textDecoration: 'none', fontSize: 14 }}>
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
      <style>{DETAIL_CSS}</style>
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

        {/* ── STICKY NAV ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Link href="/workshops" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 13, color: '#64748b',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <ArrowLeft size={15} /> Back to Workshops
          </Link>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 10,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '4px 12px', borderRadius: 100,
              background: col.bg, color: col.text, border: `1px solid ${col.border}`,
            }}>{CatLabel}</span>
            {w.isLive && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 10px', borderRadius: 100,
                background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca',
                fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 10,
              }}>
                <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            HERO — Attractive split layout
        ══════════════════════════════════════════════ */}
        <div className="hero-bg">

          {/* Particles */}
          {[1,2,3,4,5,6,7].map(n => <div key={n} className={`particle p${n}`} />)}

          {/* Blobs */}
          <div className="blob-blue" style={{ width: 480, height: 480, top: -100, left: -80, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
          <div className="blob-purple" style={{ width: 360, height: 360, bottom: -80, right: 80, borderRadius: '40% 60% 70% 30% / 40% 60% 30% 70%' }} />

          {/* Spinning ring */}
          <div className="spin-ring hidden md:block" style={{
            position: 'absolute', top: 32, right: '38%',
            width: 72, height: 72,
            border: '2px dashed rgba(37,99,235,0.25)',
            borderRadius: '50%',
            display: 'none',
          }} />

          <div style={{
            maxWidth: 1280, margin: '0 auto',
            padding: 'clamp(48px,7vw,96px) clamp(20px,5vw,60px)',
            display: 'grid', gridTemplateColumns: '1fr',
            gap: 48,
            position: 'relative', zIndex: 10,
          }} className="md-hero-grid">

            <style>{`
              @media (min-width: 768px) {
                .md-hero-grid { grid-template-columns: 1fr 1fr !important; align-items: center; }
                .hero-right { display: flex !important; }
                .spin-deco { display: block !important; }
              }
              @media (min-width: 1024px) {
                .md-hero-grid { grid-template-columns: 55% 45% !important; }
              }
            `}</style>

            {/* ── LEFT ── */}
            <div>

              {/* Live / category badge */}
              <div className="anim-up d1" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '7px 16px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.95)',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.08)',
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'liveDot 1.5s ease-in-out infinite' }} />
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 11, color: '#0f172a', letterSpacing: '0.06em' }}>
                    {CatLabel.toUpperCase()} WORKSHOP
                  </span>
                </div>
                {w.isLive && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 100,
                    background: '#ef4444', color: 'white',
                    fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 11,
                  }}>
                    <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />
                    LIVE NOW
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="anim-up d2" style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 52px)',
                lineHeight: 1.1,
                color: '#0f172a',
                marginBottom: 20,
              }}>
                {(() => {
                  const words = w.title.split(" ");
                  const head = words.slice(0, Math.ceil(words.length * 0.6)).join(" ");
                  const tail = words.slice(Math.ceil(words.length * 0.6)).join(" ");
                  return (<>{head} <span className="text-shimmer">{tail}</span></>);
                })()}
              </h1>

              {/* Description */}
              <p className="anim-up d3" style={{
                fontFamily: "'Satoshi', sans-serif",
                color: '#475569', fontSize: 15, lineHeight: 1.75,
                maxWidth: 520, marginBottom: 28,
              }}>{w.shortDesc}</p>

              {/* Info row */}
              <div className="anim-up d3 stat-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 28, alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: 14, color: '#f59e0b' }}>
                  <Star size={14} fill="currentColor" /> {w.rating}
                  <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 2 }}>({w.reviews})</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#475569' }}>
                  <Clock size={13} style={{ color: '#2563eb' }} /> {w.duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#475569' }}>
                  <Users size={13} style={{ color: '#2563eb' }} /> {w.trainer.students} students
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 13, color: '#ef4444' }}>
                  <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  Only {w.seats} seats left
                </span>
              </div>

            

            
              {/* Quick stats badges */}
              <div className="anim-up d5" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                {[
                  { icon: Shield,     color: '#10b981', label: '7-Day Guarantee' },
                  { icon: Award,      color: '#6366f1', label: 'Certificate Included' },
                  { icon: CheckCircle, color: '#2563eb', label: 'Expert-Led' },
                ].map(({ icon: Icon, color, label }, i) => (
                  <div key={i} className="stat-badge" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px' }}>
                    <Icon size={13} style={{ color }} />
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#334155' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — Image with floating badges ── */}
            <div className="hero-right" style={{ position: 'relative', display: 'none', justifyContent: 'center', alignItems: 'center' }}>

              {/* Glow */}
              <div className="hero-img-glow" style={{ width: '80%', height: '80%', left: '10%', top: '10%' }} />

              {/* Image */}
              <div className="hero-img-frame" style={{ position: 'relative', width: '100%', maxWidth: 480, aspectRatio: '4/3' }}>
                <img src={w.coverImg} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(160deg, rgba(37,99,235,0.06) 0%, transparent 55%, rgba(0,0,0,0.28) 100%)',
                }} />
                {/* Category overlay pill */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  padding: '6px 14px', borderRadius: 100,
                  background: col.pill, color: 'white',
                  fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 11,
                }}>{CatLabel}</div>
                {/* Discount bubble */}
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                  animation: 'floatY 4s ease-in-out infinite 0.5s',
                }}>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 16, color: 'white', lineHeight: 1 }}>{disc}%</span>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.8)' }}>OFF</span>
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="orbit-badge badge-tl">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#2563eb,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={13} style={{ color: 'white', fill: 'white' }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{w.rating} Rating</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, color: '#64748b' }}>{w.reviews} reviews</div>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div className="orbit-badge badge-br">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={13} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{w.enrolled}+ Enrolled</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, color: '#64748b' }}>Active learners</div>
                </div>
              </div>

              {/* Floating badge — middle right */}
              <div className="orbit-badge badge-tr">
                <span className="live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                <div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 12, color: '#0f172a' }}>Live Session</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, color: '#64748b' }}>Starts soon</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════════ */}
        <div style={{ maxWidth: 1152, margin: '0 auto', padding: '40px 20px' }}
          className="detail-grid">
          <style>{`
            .detail-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
            @media (min-width: 1024px) { .detail-grid { grid-template-columns: 1fr 360px; } }
          `}</style>

          {/* ─── LEFT ─── */}
          <div className="anim-up d2" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* About */}
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div className="section-bar" />
                <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
                  About This Workshop
                </h2>
              </div>
              <p style={{ fontFamily: "'Satoshi', sans-serif", color: '#475569', lineHeight: 1.75, fontSize: 15 }}>{w.fullDesc}</p>
            </div>

            {/* What you'll learn */}
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div className="section-bar" />
                <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
                  What You'll Learn
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {w.price.includes.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '14px 16px', borderRadius: 14,
                    background: 'linear-gradient(135deg, #f5f7ff, #eef2ff)',
                    border: '1px solid #e0e7ff',
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 8, flexShrink: 0, marginTop: 1,
                      background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <CheckCircle2 size={12} style={{ color: 'white' }} />
                    </div>
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, fontSize: 13, color: '#334155' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div className="section-bar" />
                <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
                  Topics Covered
                </h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {w.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '7px 16px', borderRadius: 100,
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 13,
                    background: col.bg, color: col.text, border: `1px solid ${col.border}`,
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Session snapshots */}
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Camera size={18} style={{ color: '#94a3b8' }} />
                <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
                  Session Snapshots
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {w.photos.map((photo, idx) => (
                  <div key={idx} className="photo-frame" style={{ position: 'relative', height: idx === 0 ? 220 : 180 }}>
                    <img src={photo.src} alt={photo.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                    {idx === 0 && w.isLive && (
                      <div style={{
                        position: 'absolute', top: 10, left: 10,
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '4px 10px', borderRadius: 100,
                        background: 'rgba(239,68,68,0.9)', color: 'white',
                        fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 9,
                      }}>
                        <span className="live-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'white' }} />
                        LIVE
                      </div>
                    )}
                    <span style={{
                      position: 'absolute', bottom: 10, left: 10,
                      fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 11,
                      color: 'white', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                      padding: '3px 10px', borderRadius: 8,
                    }}>{photo.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How conducted */}
            <div className="content-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div className="section-bar" />
                <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
                  How It's Conducted
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
                {w.trainer.classTypes.map((cls, i) => {
                  const Icon = ICON_MAP[cls.iconName] || Play;
                  return (
                    <div key={i} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                      padding: '16px 12px', borderRadius: 16, textAlign: 'center',
                      border: '1px solid', borderColor: cls.borderColor || '#e2e8f0',
                      background: cls.bg || '#f8fafc',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: cls.bg || '#f1f5f9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1.5px solid ${cls.borderColor || '#e2e8f0'}`,
                      }}>
                        <Icon size={18} className={cls.colorClass} />
                      </div>
                      <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 12, color: '#334155' }}>{cls.type}</div>
                      <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, color: '#94a3b8' }}>{cls.count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
              {[
                { icon: Shield,     label: "Money Back",     sub: "7-day guarantee", color: "#10b981", bg: "#ecfdf5" },
                { icon: Award,      label: "Certificate",    sub: "On completion",   color: "#6366f1", bg: "#f5f3ff" },
                { icon: Users,      label: "Community",      sub: "Peer network",    color: "#2563eb", bg: "#eff6ff" },
                { icon: TrendingUp, label: "Career Support", sub: "Post-workshop",   color: "#f59e0b", bg: "#fffbeb" },
              ].map(({ icon: Icon, label, sub, color, bg }, i) => (
                <div key={i} style={{
                  background: 'white', borderRadius: 16, padding: '16px 12px',
                  border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8,
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{label}</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, color: '#94a3b8' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Trainer card */}
            <div className="content-card anim-right d2">
              <p style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 16 }}>
                Your Trainer
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', border: '2px solid #e0e7ff', boxShadow: '0 4px 16px rgba(37,99,235,0.12)' }}>
                    <img src={w.trainer.avatar} alt={w.trainer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{
                    position: 'absolute', bottom: -6, right: -6,
                    width: 24, height: 24, borderRadius: '50%', border: '2px solid white',
                    background: 'linear-gradient(135deg, #2563eb, #6366f1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <BadgeCheck size={11} style={{ color: 'white' }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{w.trainer.name}</div>
                  <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#64748b', marginTop: 2 }}>{w.trainer.role}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4, fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#6366f1' }}>
                    <Award size={11} /> {w.trainer.exp}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 12,
                background: 'linear-gradient(135deg, #f0f4ff, #eef2ff)',
                border: '1px solid #e0e7ff', marginBottom: 20,
              }}>
                <Users size={13} style={{ color: '#6366f1' }} />
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 14, color: '#4338ca' }}>{w.trainer.students}</span>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#94a3b8' }}>students trained</span>
              </div>

              <p style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 10 }}>
                Certifications
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {w.trainer.certifications.map((cert, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px', borderRadius: 10,
                    background: '#f0f4ff', border: '1px solid #e0e7ff',
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#4338ca',
                  }}>
                    <BadgeCheck size={12} style={{ color: '#6366f1', flexShrink: 0 }} /> {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Enroll card */}
            <div className="anim-right d3" style={{
              background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: '24px',
              position: 'sticky', top: 76,
            }} className="enroll-shadow">
              <style>{`.enroll-shadow { box-shadow: 0 12px 48px rgba(37,99,235,0.16); }`}</style>

              {/* Discount row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 100,
                  background: '#10b981', color: 'white',
                  fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 10,
                }}>
                  <Tag size={8} /> {disc}% OFF
                </span>
                <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#cbd5e1', textDecoration: 'line-through' }}>
                  ₹{fmt(w.price.original)}
                </span>
                <span style={{ marginLeft: 'auto', fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#10b981' }}>
                  Save ₹{fmt(w.price.original - w.price.discounted)}
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <IndianRupee size={18} style={{ color: '#0f172a' }} strokeWidth={2.5} />
                <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 34, color: '#0f172a' }}>
                  {fmt(w.price.discounted)}
                </span>
              </div>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 24 }}>
                <Zap size={10} style={{ color: '#6366f1' }} /> ₹{w.price.emi}/mo × 12 at 0% interest
              </p>

              {/* Buttons */}
              <button className="cta-btn" style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', borderRadius: 14, fontSize: 14, marginBottom: 10,
                fontFamily: "'Clash Display', sans-serif", fontWeight: 600,
              }}>
                <span>Enroll Now</span> <ArrowRight size={14} />
              </button>
              <button className="sec-btn" style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 14, fontSize: 13,
                fontFamily: "'Clash Display', sans-serif", fontWeight: 600,
              }}>
                View Schedule <ChevronRight size={13} />
              </button>

              {/* Includes */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {w.price.includes.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#475569' }}>
                    <CheckCircle2 size={13} style={{ color: '#10b981', flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>

              {/* Scarcity */}
              <div style={{
                marginTop: 16,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 14px', borderRadius: 12,
                background: '#fef2f2', border: '1px solid #fecaca',
                fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#ef4444',
              }}>
                <span className="live-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
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
    <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 20px 64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 4, height: 22, borderRadius: 3, flexShrink: 0,
          background: 'linear-gradient(180deg, #2563eb, #6366f1)',
        }} />
        <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 20, color: '#0f172a' }}>
          More in <span className="text-shimmer">{catLabel}</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {related.map((w) => {
          const slug = `${w.id}-${w.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 50)}`;
          const discPct = Math.round(((w.price.original - w.price.discounted) / w.price.original) * 100);

          return (
            <Link key={w.id} href={`/workshops/${slug}`} className="related-card"
              style={{
                display: 'flex', gap: 14, padding: 16,
                background: 'white', borderRadius: 16,
                border: '1px solid #e2e8f0', textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#bfdbfe'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <div style={{ width: 80, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                <img src={w.coverImg} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
              </div>
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: '#0f172a',
                  lineHeight: 1.4, marginBottom: 8,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{w.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={10} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#64748b' }}>{w.rating}</span>
                  <span style={{ color: '#e2e8f0' }}>·</span>
                  <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 13, color: '#0f172a' }}>₹{fmt(w.price.discounted)}</span>
                  {discPct > 0 && (
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 11, color: '#10b981' }}>{discPct}% off</span>
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
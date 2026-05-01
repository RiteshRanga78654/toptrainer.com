// "use client";
// import Link from "next/link";
// import { useState, useRef } from "react";
// import {
//   Brain, BarChart3, Monitor, Mic, Leaf, Users,
//   TrendingUp, Globe, Star, ArrowRight, X,
//   Zap, Calendar, Clock, ChevronDown, ChevronUp,
//   Bookmark, CheckCircle2, BadgeCheck, ChevronLeft, ChevronRight,
//   Search, CheckCircle
// } from "lucide-react";
// import { WORKSHOPS, CATEGORIES, CAT_COLORS, fmt } from "../lib/workshops-data";

// const ICON_MAP = { Globe, BarChart3, Monitor, Users, Mic, Leaf, Brain };

// /* ─────────────────────────────────────────────
//    GLOBAL STYLES — Single unified theme
// ───────────────────────────────────────────── */
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

//     :root {
//       --blue-primary: #2563eb;
//       --blue-light: #eff6ff;
//       --blue-glow: rgba(37, 99, 235, 0.15);
//       --purple-soft: #f5f3ff;
//       --text-dark: #0f172a;
//       --text-mid: #475569;
//     }

//     * { box-sizing: border-box; }

//     body {
//       font-family: 'Satoshi', sans-serif;
//       background: #f8fafc;
//       margin: 0;
//     }

//     /* ── Keyframes ── */
//     @keyframes fadeUp {
//       from { opacity: 0; transform: translateY(28px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }
//     @keyframes fadeIn {
//       from { opacity: 0; }
//       to   { opacity: 1; }
//     }
//     @keyframes floatY {
//       0%, 100% { transform: translateY(0px); }
//       50%       { transform: translateY(-14px); }
//     }
//     @keyframes pulseRing {
//       0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
//       70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(37,99,235,0); }
//       100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
//     }
//     @keyframes shimmer {
//       0%   { background-position: -200% center; }
//       100% { background-position:  200% center; }
//     }
//     @keyframes blobMorph {
//       0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
//       25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
//       50%       { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
//       75%       { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
//     }
//     @keyframes gradientShift {
//       0%   { background-position: 0% 50%;   }
//       50%  { background-position: 100% 50%; }
//       100% { background-position: 0% 50%;   }
//     }
//     @keyframes particleDrift {
//       0%   { transform: translateY(0)   translateX(0)   scale(1);   opacity: 0.6; }
//       33%  { transform: translateY(-30px) translateX(15px)  scale(1.2); opacity: 0.9; }
//       66%  { transform: translateY(-15px) translateX(-10px) scale(0.8); opacity: 0.4; }
//       100% { transform: translateY(0)   translateX(0)   scale(1);   opacity: 0.6; }
//     }
//     @keyframes slideInLeft {
//       from { opacity: 0; transform: translateX(-40px); }
//       to   { opacity: 1; transform: translateX(0); }
//     }
//     @keyframes slideInRight {
//       from { opacity: 0; transform: translateX(40px); }
//       to   { opacity: 1; transform: translateX(0); }
//     }
//     @keyframes scaleIn {
//       from { opacity: 0; transform: scale(0.85); }
//       to   { opacity: 1; transform: scale(1); }
//     }
//     @keyframes underlineGrow {
//       from { width: 0; }
//       to   { width: 100%; }
//     }
//     @keyframes dotPulse {
//       0%, 100% { opacity: 0.4; transform: scale(1); }
//       50%       { opacity: 1;   transform: scale(1.4); }
//     }
//     @keyframes spinSlow {
//       from { transform: rotate(0deg); }
//       to   { transform: rotate(360deg); }
//     }
//     @keyframes livePulse {
//       0%,100% { opacity: 1; }
//       50%     { opacity: 0.4; }
//     }
//     @keyframes cardFadeUp {
//       from { opacity: 0; transform: translateY(20px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }

//     /* ── Utility animation classes ── */
//     .anim-fade-up   { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
//     .anim-fade-in   { animation: fadeIn 0.8s ease both; }
//     .anim-slide-l   { animation: slideInLeft  0.7s cubic-bezier(0.22,1,0.36,1) both; }
//     .anim-slide-r   { animation: slideInRight 0.7s cubic-bezier(0.22,1,0.36,1) both; }
//     .anim-scale-in  { animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
//     .anim-float     { animation: floatY 5s ease-in-out infinite; }
//     .anim-blob      { animation: blobMorph 10s ease-in-out infinite; }
//     .card-anim      { animation: cardFadeUp 0.5s ease both; }

//     .delay-100 { animation-delay: 0.1s; }
//     .delay-200 { animation-delay: 0.2s; }
//     .delay-300 { animation-delay: 0.3s; }
//     .delay-400 { animation-delay: 0.4s; }
//     .delay-500 { animation-delay: 0.5s; }
//     .delay-600 { animation-delay: 0.6s; }
//     .delay-700 { animation-delay: 0.7s; }
//     .delay-800 { animation-delay: 0.8s; }

//     /* ── Hero gradient background ── */
//     .hero-bg {
//       background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%);
//       background-size: 300% 300%;
//       animation: gradientShift 12s ease infinite;
//       position: relative;
//       overflow: hidden;
//     }

//     /* ── Animated mesh grid overlay ── */
//     .hero-bg::before {
//       content: '';
//       position: absolute;
//       inset: 0;
//       background-image:
//         linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
//         linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
//       background-size: 48px 48px;
//       mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
//       pointer-events: none;
//     }

//     /* ── Glow blob decorators ── */
//     .blob-blue {
//       position: absolute;
//       border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
//       background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
//       animation: blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
//       filter: blur(32px);
//       pointer-events: none;
//     }
//     .blob-purple {
//       position: absolute;
//       border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
//       background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%);
//       animation: blobMorph 15s ease-in-out infinite reverse, floatY 10s ease-in-out infinite 2s;
//       filter: blur(40px);
//       pointer-events: none;
//     }

//     /* ── Floating particles ── */
//     .particle {
//       position: absolute;
//       border-radius: 50%;
//       pointer-events: none;
//     }
//     .particle-1  { width:6px; height:6px; background:#2563eb; top:12%; left:8%;  animation: particleDrift 6s ease-in-out infinite; }
//     .particle-2  { width:4px; height:4px; background:#8b5cf6; top:28%; left:18%; animation: particleDrift 8s ease-in-out infinite 1s; }
//     .particle-3  { width:8px; height:8px; background:#06b6d4; top:60%; left:5%;  animation: particleDrift 7s ease-in-out infinite 2s; }
//     .particle-4  { width:5px; height:5px; background:#10b981; top:80%; left:22%; animation: particleDrift 9s ease-in-out infinite 0.5s; }
//     .particle-5  { width:6px; height:6px; background:#f59e0b; top:18%; right:12%;animation: particleDrift 5s ease-in-out infinite 1.5s; }
//     .particle-6  { width:4px; height:4px; background:#ef4444; top:45%; right:8%; animation: particleDrift 10s ease-in-out infinite 3s; }
//     .particle-7  { width:7px; height:7px; background:#2563eb; top:72%; right:18%;animation: particleDrift 7s ease-in-out infinite 0.8s; }
//     .particle-8  { width:3px; height:3px; background:#8b5cf6; top:88%; right:5%; animation: particleDrift 8s ease-in-out infinite 2.2s; }

//     /* ── Shimmer text ── */
//     .text-shimmer {
//       background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
//       background-size: 200% auto;
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       animation: shimmer 4s linear infinite;
//     }

//     /* ── Search input glow ── */
//     .search-input {
//       transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//     }
//     .search-input:focus-within {
//       border-color: #2563eb;
//       box-shadow: 0 0 0 4px rgba(37,99,235,0.1), 0 4px 20px rgba(37,99,235,0.12);
//       transform: translateY(-1px);
//     }
//     .search-input:hover {
//       border-color: #93c5fd;
//       box-shadow: 0 2px 12px rgba(37,99,235,0.08);
//     }

//     /* ── CTA button ── */
//     .cta-btn {
//       position: relative;
//       overflow: hidden;
//       background: linear-gradient(135deg, #2563eb, #1d4ed8);
//       transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//     }
//     .cta-btn::before {
//       content: '';
//       position: absolute;
//       inset: 0;
//       background: linear-gradient(135deg, #1d4ed8, #7c3aed);
//       opacity: 0;
//       transition: opacity 0.4s ease;
//     }
//     .cta-btn:hover::before { opacity: 1; }
//     .cta-btn:hover {
//       box-shadow: 0 8px 30px rgba(37,99,235,0.4);
//       transform: translateY(-2px) scale(1.02);
//     }
//     .cta-btn:active { transform: scale(0.97); }
//     .cta-btn span { position: relative; z-index: 1; }

//     /* ── Stat badges ── */
//     .stat-badge {
//       background: rgba(255,255,255,0.7);
//       backdrop-filter: blur(12px);
//       border: 1px solid rgba(255,255,255,0.9);
//       border-radius: 14px;
//       padding: 10px 16px;
//       box-shadow: 0 4px 20px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.8);
//       transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//     }
//     .stat-badge:hover {
//       transform: translateY(-3px) scale(1.03);
//       box-shadow: 0 12px 32px rgba(37,99,235,0.14);
//       border-color: rgba(37,99,235,0.2);
//     }

//     /* ── Hero image wrapper ── */
//     .hero-image-wrapper {
//       position: relative;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }
//     .hero-image-wrapper::before {
//       content: '';
//       position: absolute;
//       width: 80%;
//       height: 80%;
//       border-radius: 50%;
//       background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%);
//       animation: pulseRing 3s ease-out infinite;
//     }
//     .hero-image-inner {
//       position: relative;
//       z-index: 10;
//       animation: floatY 5s ease-in-out infinite;
//       filter: drop-shadow(0 20px 40px rgba(37,99,235,0.2));
//     }

//     /* ── Orbiting badge ── */
//     .orbit-badge {
//       position: absolute;
//       background: white;
//       border-radius: 12px;
//       padding: 8px 12px;
//       box-shadow: 0 8px 32px rgba(0,0,0,0.12);
//       border: 1px solid rgba(255,255,255,0.9);
//       font-size: 11px;
//       font-weight: 600;
//       white-space: nowrap;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//       z-index: 20;
//     }
//     .orbit-badge-top    { top: 10%; right: 0;    animation: floatY 4s ease-in-out infinite 0.5s; }
//     .orbit-badge-bottom { bottom: 15%; left: -5%; animation: floatY 4s ease-in-out infinite 1.5s; }

//     /* ── Category pills ── */
//     .pill-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
//     .pill-scroll::-webkit-scrollbar { display: none; }

//     /* ── Workshop card ── */
//     .workshop-card {
//       background: white;
//       border: 1px solid #e2e8f0;
//       border-radius: 16px;
//       overflow: hidden;
//       transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//       box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//       display: flex;
//       flex-direction: column;
//       cursor: pointer;
//     }
//     .workshop-card:hover {
//       border-color: #93c5fd;
//       box-shadow: 0 12px 32px rgba(37,99,235,0.12);
//       transform: translateY(-4px);
//     }
//     .workshop-card:hover .card-image img {
//       transform: scale(1.06);
//     }
//     .card-image img {
//       transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
//     }

//     /* ── Heading underline ── */
//     .heading-underline {
//       position: relative;
//       display: inline-block;
//     }
//     .heading-underline::after {
//       content: '';
//       position: absolute;
//       bottom: -4px;
//       left: 0;
//       height: 3px;
//       background: linear-gradient(90deg, #2563eb, #7c3aed);
//       border-radius: 2px;
//       animation: underlineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both;
//     }

//     /* ── Scroll nav buttons ── */
//     .scroll-btn {
//       flex-shrink: 0;
//       background: white;
//       border: 1px solid #e2e8f0;
//       border-radius: 50%;
//       width: 38px;
//       height: 38px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       box-shadow: 0 4px 16px rgba(0,0,0,0.08);
//       cursor: pointer;
//       transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
//     }
//     .scroll-btn:hover {
//       background: #2563eb;
//       color: white;
//       border-color: #2563eb;
//       box-shadow: 0 8px 24px rgba(37,99,235,0.3);
//       transform: scale(1.1);
//     }
//     .scroll-btn:active { transform: scale(0.95); }

//     /* ── No scrollbar ── */
//     .no-scrollbar { scrollbar-width: none; }
//     .no-scrollbar::-webkit-scrollbar { display: none; }

//     /* ── Online dot ── */
//     .online-dot { animation: livePulse 1.4s ease-in-out infinite; }

//     /* ── Spinning ring ── */
//     .spinning-ring { animation: spinSlow 18s linear infinite; }

//     /* ── View all btn ── */
//     .view-all-btn {
//       display: inline-flex;
//       align-items: center;
//       gap: 4px;
//       font-size: 14px;
//       font-weight: 700;
//       color: #2563eb;
//       transition: gap 0.2s ease;
//     }
//     .view-all-btn:hover { gap: 8px; }
//   `}</style>
// );

// /* ─────────────────────────────────────────────
//    HERO SECTION
// ───────────────────────────────────────────── */
// function HeroSection() {
//   return (
//     <div className="hero-bg border-b border-indigo-100/60">

//       {/* Particles */}
//       {[1,2,3,4,5,6,7,8].map(n => (
//         <div key={n} className={`particle particle-${n}`} />
//       ))}

//       {/* Blobs */}
//       <div className="blob-blue"
//         style={{ width: 420, height: 420, top: -80, left: -80, opacity: 0.6 }} />
//       <div className="blob-purple"
//         style={{ width: 340, height: 340, bottom: -60, right: -60, opacity: 0.5 }} />

//       {/* Spinning ring decoration */}
//       <div className="absolute top-8 right-[42%] w-20 h-20 hidden md:block pointer-events-none">
//         <div className="spinning-ring w-full h-full rounded-full border-2 border-dashed border-blue-300/40" />
//       </div>

//       <div className="max-w-7xl mx-auto px-5 sm:px-10 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">

//         {/* ── LEFT ── */}
//         <div>
//           {/* Online badge */}
//           <div className="anim-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-indigo-100 shadow-sm mb-6 w-fit">
//             <span className="online-dot w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
//             <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 11, fontWeight: 600, color: '#0f172a', letterSpacing: '0.06em' }}>
//               1,200+ EXPERTS ONLINE NOW
//             </span>
//           </div>

//           {/* Headline */}
//           <h1 className="anim-fade-up delay-100 text-gray-900 mb-5"
//             style={{
//               fontFamily: "'Clash Display', sans-serif",
//               fontWeight: 700,
//               fontSize: "clamp(28px, 4.2vw, 52px)",
//               lineHeight: 1.12,
//             }}>
//           Master Skills Faster with{" "}
// <span className="text-shimmer">Top Mentors</span>
// <br />and Live Workshops
//           </h1>

//           {/* Subtext */}
//           <p className="anim-fade-up delay-200 mb-7 max-w-md"
//             style={{ fontFamily: "'Satoshi', sans-serif", color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
// Experience personalized mentorship, interactive sessions, and expert-led training designed for real-world success.          </p>

     
//         </div>

//         {/* ── RIGHT — Image ── */}
//         <div className="hero-image-wrapper anim-slide-r delay-200 hidden md:flex">

//           {/* Glow behind */}
//           <div className="absolute inset-0 m-auto rounded-full blur-3xl opacity-25"
//             style={{ width: '70%', height: '70%', background: 'radial-gradient(circle, #6366f1, #2563eb)' }} />

//           {/* Image */}
//           <div className="hero-image-inner" style={{ borderRadius: 24, overflow: 'hidden', width: '100%', maxWidth: 460, aspectRatio: '4/3', boxShadow: '0 32px 80px rgba(37,99,235,.18)' }}>
//             <img
//               src="/images/trainner-workshop.jpg"
//               alt="Expert Trainer Workshop"
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />
//           </div>

//           {/* Orbiting badges */}
//           <div className="orbit-badge orbit-badge-top">
//             <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
//             <span style={{ fontFamily: "'Satoshi', sans-serif", color: '#0f172a' }}>Live Session Active</span>
//           </div>
//           <div className="orbit-badge orbit-badge-bottom">
//             <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
//             <span style={{ fontFamily: "'Satoshi', sans-serif", color: '#0f172a' }}>Top Rated Trainer</span>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    WORKSHOP CARD
// ───────────────────────────────────────────── */
// function WorkshopCard({ w }) {
//   const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
//   const CatLabel = CATEGORIES.find((c) => c.id === w.category)?.label || w.category;

//   return (
//     <Link href={`/workshops/${w.id}`} className="workshop-card">

//       {/* Cover image */}
//       <div className="card-image relative" style={{ height: 200, overflow: 'hidden' }}>
//         <img src={w.coverImg} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

//         {/* Category pill */}
//         <div style={{
//           position: 'absolute', top: 12, left: 12,
//           padding: '4px 12px', borderRadius: 100,
//           background: col.pill, color: 'white',
//           fontFamily: "'Clash Display', sans-serif", fontSize: 11, fontWeight: 600,
//         }}>{CatLabel}</div>

//         {/* Bookmark */}
//         <button onClick={(e) => e.preventDefault()}
//           style={{
//             position: 'absolute', top: 12, right: 12,
//             width: 32, height: 32, borderRadius: 8,
//             background: 'white', border: 'none', cursor: 'pointer',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//           }}>
//           <Bookmark size={14} style={{ color: '#94a3b8' }} />
//         </button>

//         {/* Live badge */}
//         {w.isLive && (
//           <div style={{
//             position: 'absolute', bottom: 12, left: 12,
//             display: 'flex', alignItems: 'center', gap: 5,
//             padding: '4px 10px', borderRadius: 100,
//             background: '#ef4444', color: 'white',
//             fontFamily: "'Clash Display', sans-serif", fontSize: 10, fontWeight: 700,
//           }}>
//             <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', animation: 'livePulse 1.4s ease-in-out infinite' }} />
//             LIVE NOW
//           </div>
//         )}
//       </div>

//       {/* Card body */}
//       <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>

//         {/* Trainer row */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
//           <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', flexShrink: 0 }}>
//             <img src={w.trainer.avatar} alt={w.trainer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           </div>
//           <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#334155' }}>{w.trainer.name}</span>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
//             <Star size={11} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
//             <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{w.rating}</span>
//             <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 2 }}>({w.reviews})</span>
//           </div>
//         </div>

//         {/* Title */}
//         <h3 style={{
//           fontFamily: "'Clash Display', sans-serif", fontWeight: 600,
//           fontSize: 14, color: '#0f172a', lineHeight: 1.4,
//           marginBottom: 6, display: '-webkit-box',
//           WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{w.title}</h3>

//         {/* Desc */}
//         <p style={{
//           fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#64748b',
//           lineHeight: 1.6, marginBottom: 16,
//           display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{w.shortDesc}</p>

//         {/* Meta */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
//           {[
//             { icon: Calendar, text: w.dateRange },
//             { icon: Clock,    text: w.timeSlot },
//             { icon: Users,    text: `+${w.enrolled} Enrolled` },
//           ].map(({ icon: Icon, text }, i) => (
//             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <Icon size={12} style={{ color: '#2563eb', flexShrink: 0 }} />
//               <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#475569' }}>{text}</span>
//             </div>
//           ))}
//         </div>

//         {/* Price row */}
//         <div style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #f1f5f9',
//         }}>
//           <div>
//             <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
//               ₹{fmt(w.price.discounted)}
//             </span>
//             <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#94a3b8', textDecoration: 'line-through', marginLeft: 6 }}>
//               ₹{fmt(w.price.original)}
//             </span>
//           </div>
//           <span style={{
//             display: 'flex', alignItems: 'center', gap: 6,
//             padding: '8px 16px', borderRadius: 12,
//             border: '2px solid #2563eb', color: '#2563eb',
//             fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 12,
//             transition: 'all 0.2s ease', cursor: 'pointer',
//           }}
//             onMouseEnter={e => {
//               e.currentTarget.style.background = '#2563eb';
//               e.currentTarget.style.color = 'white';
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.background = 'transparent';
//               e.currentTarget.style.color = '#2563eb';
//             }}
//           >
//             View Details <ArrowRight size={12} />
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* ─────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────── */
// export default function WorkshopsPage() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(6);
//   const sliderRef = useRef(null);

//   const filtered = WORKSHOPS.filter((w) => {
//     const matchCat = activeCategory === "all" || w.category === activeCategory;
//     const matchQ =
//       w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       w.trainer.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchCat && matchQ;
//   });

//   const visible = filtered.slice(0, visibleCount);
//   const hasMore = visibleCount < filtered.length;

//   const scrollSlider = (dir) => {
//     if (!sliderRef.current) return;
//     const width = sliderRef.current.offsetWidth;
//     sliderRef.current.scrollBy({ left: dir === "left" ? -width : width, behavior: "smooth" });
//   };

//   return (
//     <>
//       <GlobalStyles />

//       <div className="min-h-screen" style={{ background: "#f8fafc" }}>

//         <HeroSection />

//         {/* ── WORKSHOPS GRID ── */}
//         <div id="workshops-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">

//           {/* Section header */}
//           <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
//             <div>
//               <h2 className="heading-underline anim-fade-up mb-1"
//                 style={{
//                   fontFamily: "'Clash Display', sans-serif",
//                   fontWeight: 700,
//                   fontSize: "clamp(20px, 3vw, 28px)",
//                   color: '#0f172a',
//                 }}>
//                 Popular Training Workshops
//               </h2>
//               <p className="anim-fade-up delay-100" style={{ fontFamily: "'Satoshi', sans-serif", color: '#64748b', fontSize: 14, marginTop: 8 }}>
//                 Handpicked workshops by top trainers to help you grow faster.
//               </p>
//             </div>
//             <button className="view-all-btn anim-fade-up delay-200">
//               View All Workshops <ArrowRight size={14} />
//             </button>
//           </div>

//           {/* Category pills */}
//           <div className="pill-scroll anim-fade-up delay-200 mt-5 flex gap-2 pb-2 mb-8 -mx-1 px-1">
//             {CATEGORIES.map((cat) => {
//               const Icon = ICON_MAP[cat.icon] || Globe;
//               const active = activeCategory === cat.id;
//               return (
//                 <button
//                   key={cat.id}
//                   onClick={() => { setActiveCategory(cat.id); setVisibleCount(6); }}
//                   style={{
//                     flexShrink: 0,
//                     display: 'flex', alignItems: 'center', gap: 6,
//                     padding: '8px 16px', borderRadius: 100,
//                     fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12,
//                     border: '1px solid',
//                     borderColor: active ? '#2563eb' : '#e2e8f0',
//                     background: active ? '#2563eb' : 'white',
//                     color: active ? 'white' : '#64748b',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
//                     boxShadow: active ? '0 4px 16px rgba(37,99,235,0.25)' : 'none',
//                   }}>
//                   <Icon size={11} />{cat.label}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Grid */}
//           {visible.length > 0 ? (
//             <>
//               {/* MOBILE SLIDER */}
//               <div className="block sm:hidden">
//                 <div ref={sliderRef}
//                   className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-1">
//                   {visible.map((w, i) => (
//                     <div key={w.id} className="min-w-full snap-center px-1">
//                       <div className="card-anim" style={{ animationDelay: `${i * 60}ms` }}>
//                         <WorkshopCard w={w} />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16 }}>
//                   <button className="scroll-btn" onClick={() => scrollSlider("left")}>
//                     <ChevronLeft size={18} style={{ color: '#2563eb' }} />
//                   </button>
//                   <div style={{ display: 'flex', gap: 6 }}>
//                     {visible.map((_, i) => (
//                       <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#93c5fd' }} />
//                     ))}
//                   </div>
//                   <button className="scroll-btn" onClick={() => scrollSlider("right")}>
//                     <ChevronRight size={18} style={{ color: '#2563eb' }} />
//                   </button>
//                 </div>
//               </div>

//               {/* DESKTOP GRID */}
//               <div className="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-6">
//                 {visible.map((w, i) => (
//                   <div key={w.id} className="card-anim" style={{ animationDelay: `${i * 60}ms` }}>
//                     <WorkshopCard w={w} />
//                   </div>
//                 ))}
//               </div>

//               {/* Load more */}
//               {hasMore && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
//                   <button
//                     onClick={() => setVisibleCount(v => v + 6)}
//                     className="cta-btn"
//                     style={{
//                       padding: '14px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
//                       fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 14, color: 'white',
//                     }}>
//                     <span>Load More Workshops</span>
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
//               <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
//               <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 8 }}>
//                 No workshops found
//               </h3>
//               <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 14, color: '#64748b', marginBottom: 20 }}>
//                 Try a different category or clear your search.
//               </p>
//               <button
//                 onClick={() => { setActiveCategory("all"); setSearchQuery(""); setVisibleCount(6); }}
//                 className="cta-btn"
//                 style={{
//                   padding: '10px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
//                   fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: 'white',
//                   display: 'inline-flex', alignItems: 'center', gap: 8,
//                 }}>
//                 <span>Clear Filters</span>
//                 <X size={13} style={{ position: 'relative', zIndex: 1 }} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* ── BOTTOM CTA ── */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
//           <div style={{
//             borderRadius: 20, overflow: 'hidden',
//             border: '1px solid #bfdbfe',
//             display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//             background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
//           }}>

//             {/* Join a workshop */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px', borderBottom: '1px solid #bfdbfe' }}
//               className="md:border-b-0 md:border-r">
//               <div style={{
//                 width: 56, height: 56, borderRadius: 16, flexShrink: 0,
//                 background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
//               }}>
//                 <Users size={24} style={{ color: 'white' }} />
//               </div>
//               <div style={{ flex: 1 }}>
//                 <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 4 }}>
//                   Join a Workshop
//                 </h3>
//                 <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
//                   Choose a workshop that fits your goals and start learning from the best.
//                 </p>
//                 <a href="#workshops-grid" className="cta-btn"
//                   style={{
//                     display: 'inline-flex', alignItems: 'center', gap: 8,
//                     padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
//                     fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: 'white',
//                     textDecoration: 'none',
//                   }}>
//                   <span>Browse Workshops</span>
//                   <ArrowRight size={14} style={{ position: 'relative', zIndex: 1 }} />
//                 </a>
//               </div>
//             </div>

//             {/* Become a trainer */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px' }}>
//               <div style={{
//                 width: 56, height: 56, borderRadius: 16, flexShrink: 0,
//                 border: '2px solid #f97316', background: '#fff7ed',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <Star size={22} style={{ color: '#f97316' }} />
//               </div>
//               <div style={{ flex: 1 }}>
//                 <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 4 }}>
//                   Start Your Own Workshop
//                 </h3>
//                 <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
//                   Share your expertise, inspire others and become a Top Trainer.
//                 </p>
//                 <button style={{
//                   display: 'flex', alignItems: 'center', gap: 8,
//                   padding: '10px 20px', borderRadius: 12,
//                   border: '2px solid #f97316', background: 'transparent',
//                   fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: '#f97316',
//                   cursor: 'pointer', transition: 'all 0.2s ease',
//                 }}
//                   onMouseEnter={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.color = 'white'; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f97316'; }}
//                 >
//                   Become a Trainer <ArrowRight size={14} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </>
//   );
// }

















"use client";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Brain, BarChart3, Monitor, Mic, Leaf, Users,
  TrendingUp, Globe, Star, ArrowRight, X,
  Zap, Calendar, Clock, ChevronDown, ChevronUp,
  Bookmark, CheckCircle2, BadgeCheck, ChevronLeft, ChevronRight,
  Search, CheckCircle
} from "lucide-react";
import { WORKSHOPS, CATEGORIES, CAT_COLORS, fmt } from "../lib/workshops-data";

const ICON_MAP = { Globe, BarChart3, Monitor, Users, Mic, Leaf, Brain };

/* ─────────────────────────────────────────────
   GLOBAL STYLES — Single unified theme
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

    :root {
      --blue-primary: #2563eb;
      --blue-light: #eff6ff;
      --blue-glow: rgba(37, 99, 235, 0.15);
      --purple-soft: #f5f3ff;
      --text-dark: #0f172a;
      --text-mid: #475569;
    }

    * { box-sizing: border-box; }

    body {
      font-family: 'Satoshi', sans-serif;
      background: #f8fafc;
      margin: 0;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    @keyframes pulseRing {
      0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
      70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(37,99,235,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%;   }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%;   }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes underlineGrow {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes livePulse {
      0%,100% { opacity: 1; }
      50%     { opacity: 0.4; }
    }
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes cardFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Slide animation: right-to-left enter */
    @keyframes slideEnterFromRight {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    /* Slide animation: exit to left */
    @keyframes slideExitToLeft {
      from { transform: translateX(0);    opacity: 1; }
      to   { transform: translateX(-100%); opacity: 0; }
    }

    .anim-fade-up   { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-fade-in   { animation: fadeIn 0.8s ease both; }
    .anim-slide-l   { animation: slideInLeft  0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-slide-r   { animation: slideInRight 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-scale-in  { animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-float     { animation: floatY 5s ease-in-out infinite; }
    .card-anim      { animation: cardFadeUp 0.5s ease both; }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-700 { animation-delay: 0.7s; }
    .delay-800 { animation-delay: 0.8s; }

    /* Search input */
    .search-input {
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .search-input:focus-within {
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37,99,235,0.1), 0 4px 20px rgba(37,99,235,0.12);
      transform: translateY(-1px);
    }
    .search-input:hover {
      border-color: #93c5fd;
      box-shadow: 0 2px 12px rgba(37,99,235,0.08);
    }

    /* CTA button */
    .cta-btn {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
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
      box-shadow: 0 8px 30px rgba(37,99,235,0.4);
      transform: translateY(-2px) scale(1.02);
    }
    .cta-btn:active { transform: scale(0.97); }
    .cta-btn span { position: relative; z-index: 1; }

    /* Workshop card */
    .workshop-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
    .workshop-card:hover {
      border-color: #93c5fd;
      box-shadow: 0 12px 32px rgba(37,99,235,0.12);
      transform: translateY(-4px);
    }
    .workshop-card:hover .card-image img {
      transform: scale(1.06);
    }
    .card-image img {
      transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
    }

    /* Heading underline */
    .heading-underline {
      position: relative;
      display: inline-block;
    }
    .heading-underline::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #2563eb, #7c3aed);
      border-radius: 2px;
      animation: underlineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.8s both;
    }

    /* Scroll nav buttons */
    .scroll-btn {
      flex-shrink: 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .scroll-btn:hover {
      background: #2563eb;
      color: white;
      border-color: #2563eb;
      box-shadow: 0 8px 24px rgba(37,99,235,0.3);
      transform: scale(1.1);
    }
    .scroll-btn:active { transform: scale(0.95); }

    .no-scrollbar { scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .pill-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .pill-scroll::-webkit-scrollbar { display: none; }

    .online-dot { animation: livePulse 1.4s ease-in-out infinite; }
    .spinning-ring { animation: spinSlow 18s linear infinite; }

    .view-all-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 700;
      color: #2563eb;
      transition: gap 0.2s ease;
    }
    .view-all-btn:hover { gap: 8px; }

    /* Hero slide */
    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      will-change: transform, opacity;
    }
    .hero-slide.active {
      animation: slideEnterFromRight 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
      z-index: 2;
    }
    .hero-slide.exiting {
      animation: slideExitToLeft 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
      z-index: 1;
    }
    .hero-slide.hidden {
      opacity: 0;
      z-index: 0;
    }

    /* Text shimmer for hero */
    .hero-text-shimmer {
      background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
      font-style: italic;
    }

    /* Hero progress bar */
    @keyframes progressBar {
      from { width: 0%; }
      to   { width: 100%; }
    }
    .hero-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #2563eb, #7c3aed);
      border-radius: 0 2px 2px 0;
      animation: progressBar 5s linear forwards;
    }

    @media (max-width: 768px) {
      .hero-stats { gap: 16px !important; }
      .hero-stats > div span:first-child { font-size: 18px !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────── */
const SLIDES = [
  {
    fallback: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=85",
    label: "Expert Mentorship",
  },
  {
    fallback: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1600&q=85",
    label: "Live Workshops",
  },
  {
    fallback: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
    label: "Team Training",
  },
  {
    fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85",
    label: "Career Growth",
  },
];

const SLIDE_DURATION = 5000;

/* ─────────────────────────────────────────────
   HERO SECTION — Light themed, full-BG slideshow,
   right-to-left animation, no right mosaic
───────────────────────────────────────────── */
function HeroSection() {
  const [current, setCurrent]       = useState(0);
  const [exiting, setExiting]       = useState(null);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((nextIdx) => {
    const next = ((nextIdx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setExiting(current);
    setCurrent(next);
    setProgressKey(k => k + 1);
  }, [current]);

  /* autoplay */
  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, goTo]);

  /* clear exiting after animation */
  useEffect(() => {
    if (exiting === null) return;
    const t = setTimeout(() => setExiting(null), 500);
    return () => clearTimeout(t);
  }, [exiting]);

  const imgSrc = (slide) => slide.src || slide.fallback;

  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      borderBottom: "1px solid #e2e8f0",
      minHeight: 650,
    }}>

      {/* ── BACKGROUND SLIDES (right-to-left) ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {SLIDES.map((slide, i) => {
          let cls = "hero-slide hidden";
          if (i === current) cls = "hero-slide active";
          else if (i === exiting) cls = "hero-slide exiting";
          return (
            <div
              key={i}
              className={cls}
              style={{ backgroundImage: `url(${imgSrc(slide)})` }}
            />
          );
        })}
      </div>

      {/* ── LIGHT OVERLAY — keeps text readable, maintains light feel ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
background: "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.2) 70%, transparent 100%)",
      }} />
      {/* Subtle mesh grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)",
      }} />

      {/* Blue blob top-left */}
      <div style={{
        position: "absolute", top: -80, left: -80, width: 380, height: 380,
        borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
        background: "radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 70%)",
        filter: "blur(40px)", zIndex: 3, pointerEvents: "none",
        animation: "floatY 8s ease-in-out infinite",
      }} />
      {/* Purple blob bottom-right */}
      <div style={{
        position: "absolute", bottom: -40, right: -40, width: 300, height: 300,
        borderRadius: "40% 60% 70% 30%/40% 60% 30% 70%",
        background: "radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 70%)",
        filter: "blur(40px)", zIndex: 3, pointerEvents: "none",
        animation: "floatY 10s ease-in-out infinite 2s",
      }} />

      {/* ── SLIDE LABEL TAG (top right) ── */}
      <div style={{
        position: "absolute", top: 20, right: 48, zIndex: 15,
        display: "flex", alignItems: "center", gap: 6,
        padding: "5px 12px", borderRadius: 8,
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)",
        border: "1px solid #bfdbfe",
        fontFamily: "'Clash Display',sans-serif", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.06em", color: "#1d4ed8",
        boxShadow: "0 2px 8px rgba(37,99,235,0.1)",
        transition: "opacity 0.4s ease",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "livePulse 1.4s ease-in-out infinite" }} />
        {SLIDES[current].label}
      </div>

      {/* ── SLIDE COUNTER (bottom right) ── */}
      <div style={{
        position: "absolute", bottom: 36, right: 48, zIndex: 15,
        fontFamily: "'Clash Display',sans-serif", fontSize: 12, fontWeight: 600,
        letterSpacing: "0.06em", color: "#94a3b8",
      }}>
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* ── MAIN CONTENT — single column, centred left ── */}
<div style={{
  position: "relative",
  zIndex: 10,
  maxWidth: 1200,

  margin: "10px",

  // ✅ Responsive padding (auto adjusts for mobile)
  padding: "80px clamp(16px, 5vw, 80px) 100px",
marginLeft: "40px",
  minHeight: 520,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
}}>

        {/* Live badge */}
        <div className="anim-fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 16px", borderRadius: 100,
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
          border: "1px solid #bfdbfe",
          marginBottom: 24, width: "fit-content",
          boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
        }}>
          <span className="online-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", color: "#0f172a" }}>
            1,200+ EXPERTS ONLINE NOW
          </span>
        </div>

        {/* Headline */}
        <h1 className="anim-fade-up delay-100" style={{
          fontFamily: "'Clash Display',sans-serif", fontWeight: 700,
          fontSize: "clamp(30px,4vw,54px)", lineHeight: 1.1,
          color: "#0f172a", marginBottom: 18,
        }}>
          Master Skills Faster<br />
          with{" "}
          <span className="hero-text-shimmer">Top Mentors</span>
          <br />
          and Live Workshops
        </h1>

        {/* Subtext */}
        <p className="anim-fade-up delay-200" style={{
          fontFamily: "'Satoshi',sans-serif", fontSize: 15, fontWeight: 400,
          color: "#475569", lineHeight: 1.75,
          maxWidth: 480, marginBottom: 32,
        }}>
          Experience personalized mentorship, interactive sessions, and expert-led training designed for real-world success.
        </p>

        {/* Stats */}
        <div className="anim-fade-up delay-400 hero-stats" style={{
          display: "flex", gap: 28, flexWrap: "wrap",
          paddingTop: 28, borderTop: "1px solid #e2e8f0",
        }}>
          {[
            { num: "50K+",  lbl: "Students Enrolled" },
            { num: "320+",  lbl: "Live Workshops"    },
            { num: "4.9★",  lbl: "Avg. Rating"       },
            { num: "98%",   lbl: "Satisfaction"      },
          ].map(({ num, lbl }) => (
            <div key={lbl} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: "#1e3a8a" }}>{num}</span>
              <span style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 11, color: "#64748b", letterSpacing: "0.05em" }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOT CONTROLS ── */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        zIndex: 15, display: "flex", alignItems: "center", gap: 8,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearTimeout(timerRef.current); goTo(i); }}
            style={{
              width: i === current ? 24 : 7,
              height: 7,
              borderRadius: 4,
              background: i === current ? "#2563eb" : "#bfdbfe",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

  

    </section>
  );
}

/* ─────────────────────────────────────────────
   WORKSHOP CARD
───────────────────────────────────────────── */
function WorkshopCard({ w }) {
  const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
  const CatLabel = CATEGORIES.find((c) => c.id === w.category)?.label || w.category;

  return (
    <Link href={`/workshops/${w.id}`} className="workshop-card">
      <div className="card-image relative" style={{ height: 200, overflow: 'hidden' }}>
        <img src={w.coverImg} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '4px 12px', borderRadius: 100,
          background: col.pill, color: 'white',
          fontFamily: "'Clash Display', sans-serif", fontSize: 11, fontWeight: 600,
        }}>{CatLabel}</div>
        <button onClick={(e) => e.preventDefault()}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: 8,
            background: 'white', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
          <Bookmark size={14} style={{ color: '#94a3b8' }} />
        </button>
        {w.isLive && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 10px', borderRadius: 100,
            background: '#ef4444', color: 'white',
            fontFamily: "'Clash Display', sans-serif", fontSize: 10, fontWeight: 700,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', animation: 'livePulse 1.4s ease-in-out infinite' }} />
            LIVE NOW
          </div>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', flexShrink: 0 }}>
            <img src={w.trainer.avatar} alt={w.trainer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12, color: '#334155' }}>{w.trainer.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
            <Star size={11} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{w.rating}</span>
            <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 2 }}>({w.reviews})</span>
          </div>
        </div>

        <h3 style={{
          fontFamily: "'Clash Display', sans-serif", fontWeight: 600,
          fontSize: 14, color: '#0f172a', lineHeight: 1.4,
          marginBottom: 6, display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{w.title}</h3>

        <p style={{
          fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#64748b',
          lineHeight: 1.6, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{w.shortDesc}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {[
            { icon: Calendar, text: w.dateRange },
            { icon: Clock,    text: w.timeSlot },
            { icon: Users,    text: `+${w.enrolled} Enrolled` },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon size={12} style={{ color: '#2563eb', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#475569' }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #f1f5f9',
        }}>
          <div>
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a' }}>
              ₹{fmt(w.price.discounted)}
            </span>
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: '#94a3b8', textDecoration: 'line-through', marginLeft: 6 }}>
              ₹{fmt(w.price.original)}
            </span>
          </div>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 12,
            border: '2px solid #2563eb', color: '#2563eb',
            fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 12,
            transition: 'all 0.2s ease', cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2563eb'; }}
          >
            View Details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function WorkshopsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const sliderRef = useRef(null);

  const filtered = WORKSHOPS.filter((w) => {
    const matchCat = activeCategory === "all" || w.category === activeCategory;
    const matchQ =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.trainer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const scrollSlider = (dir) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({ left: dir === "left" ? -width : width, behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen" style={{ background: "#f8fafc" }}>

        <HeroSection />

        {/* ── WORKSHOPS GRID ── */}
        <div id="workshops-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
            <div>
              <h2 className="heading-underline anim-fade-up mb-1"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  color: '#0f172a',
                }}>
                Popular Training Workshops
              </h2>
              <p className="anim-fade-up delay-100" style={{ fontFamily: "'Satoshi', sans-serif", color: '#64748b', fontSize: 14, marginTop: 8 }}>
                Handpicked workshops by top trainers to help you grow faster.
              </p>
            </div>
            <button className="view-all-btn anim-fade-up delay-200">
              View All Workshops <ArrowRight size={14} />
            </button>
          </div>

          <div className="pill-scroll anim-fade-up delay-200 mt-5 flex gap-2 pb-2 mb-8 -mx-1 px-1">
            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || Globe;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setVisibleCount(6); }}
                  style={{
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 100,
                    fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: 12,
                    border: '1px solid',
                    borderColor: active ? '#2563eb' : '#e2e8f0',
                    background: active ? '#2563eb' : 'white',
                    color: active ? 'white' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: active ? '0 4px 16px rgba(37,99,235,0.25)' : 'none',
                  }}>
                  <Icon size={11} />{cat.label}
                </button>
              );
            })}
          </div>

          {visible.length > 0 ? (
            <>
              <div className="block sm:hidden">
                <div ref={sliderRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-1">
                  {visible.map((w, i) => (
                    <div key={w.id} className="min-w-full snap-center px-1">
                      <div className="card-anim" style={{ animationDelay: `${i * 60}ms` }}>
                        <WorkshopCard w={w} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                  <button className="scroll-btn" onClick={() => scrollSlider("left")}>
                    <ChevronLeft size={18} style={{ color: '#2563eb' }} />
                  </button>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {visible.map((_, i) => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#93c5fd' }} />
                    ))}
                  </div>
                  <button className="scroll-btn" onClick={() => scrollSlider("right")}>
                    <ChevronRight size={18} style={{ color: '#2563eb' }} />
                  </button>
                </div>
              </div>

              <div className="hidden sm:grid grid-cols-2 xl:grid-cols-3 gap-6">
                {visible.map((w, i) => (
                  <div key={w.id} className="card-anim" style={{ animationDelay: `${i * 60}ms` }}>
                    <WorkshopCard w={w} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                  <button
                    onClick={() => setVisibleCount(v => v + 6)}
                    className="cta-btn"
                    style={{
                      padding: '14px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
                      fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 14, color: 'white',
                    }}>
                    <span>Load More Workshops</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 8 }}>
                No workshops found
              </h3>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 14, color: '#64748b', marginBottom: 20 }}>
                Try a different category or clear your search.
              </p>
              <button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); setVisibleCount(6); }}
                className="cta-btn"
                style={{
                  padding: '10px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: 'white',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                <span>Clear Filters</span>
                <X size={13} style={{ position: 'relative', zIndex: 1 }} />
              </button>
            </div>
          )}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
          <div style={{
            borderRadius: 20, overflow: 'hidden',
            border: '1px solid #bfdbfe',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px', borderBottom: '1px solid #bfdbfe' }}
              className="md:border-b-0 md:border-r">
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
              }}>
                <Users size={24} style={{ color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 4 }}>
                  Join a Workshop
                </h3>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
                  Choose a workshop that fits your goals and start learning from the best.
                </p>
                <a href="#workshops-grid" className="cta-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
                    fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: 'white',
                    textDecoration: 'none',
                  }}>
                  <span>Browse Workshops</span>
                  <ArrowRight size={14} style={{ position: 'relative', zIndex: 1 }} />
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                border: '2px solid #f97316', background: '#fff7ed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Star size={22} style={{ color: '#f97316' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 18, color: '#0f172a', marginBottom: 4 }}>
                  Start Your Own Workshop
                </h3>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
                  Share your expertise, inspire others and become a Top Trainer.
                </p>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 12,
                  border: '2px solid #f97316', background: 'transparent',
                  fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 13, color: '#f97316',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f97316'; }}
                >
                  Become a Trainer <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}










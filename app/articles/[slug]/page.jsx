"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Clock, Eye, Calendar, Share2, Bookmark,
  Heart, Shield, Award, CheckCircle, Users, TrendingUp,
  BookOpen, ArrowRight,
} from "lucide-react";
import { CAT_COLORS, FILTERS, makeSlug, findArticle, getRelated } from "../data";

// ─────────────────────────────────────────────
// GLOBAL STYLES — merged from GlobalStyles.js
// ─────────────────────────────────────────────
const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

  :root {
    --blue-primary: #2563eb;
    --font-display: 'Clash Display', sans-serif;
    --font-body:    'Satoshi', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: var(--font-body); }

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes blobMorph {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50%     { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
    75%     { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0) scale(1);          opacity: .6; }
    33%  { transform: translateY(-28px) translateX(14px) scale(1.2); opacity: .9; }
    66%  { transform: translateY(-12px) translateX(-9px) scale(.8);  opacity: .4; }
    100% { transform: translateY(0) translateX(0) scale(1);          opacity: .6; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes dotPulse {
    0%,100% { opacity:.4; transform:scale(1); }
    50%     { opacity:1;  transform:scale(1.4); }
  }
  @keyframes underlineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { box-shadow: 0 0 0 18px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes liveDot {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.25; }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  /* ── Animation utility classes (from GlobalStyles) ── */
  .anim-fade-up  { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-slide-l  { animation: slideInLeft .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-scale-in { animation: scaleIn .6s cubic-bezier(.22,1,.36,1) both; }
  .anim-float    { animation: floatY 5s ease-in-out infinite; }
  .delay-100 { animation-delay: .1s; }
  .delay-200 { animation-delay: .2s; }
  .delay-300 { animation-delay: .3s; }
  .delay-400 { animation-delay: .4s; }
  .delay-500 { animation-delay: .5s; }
  .delay-600 { animation-delay: .6s; }
  .delay-700 { animation-delay: .7s; }

  /* ── Hero background (from GlobalStyles) ── */
  .hero-bg {
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%);
    background-size: 300% 300%;
    animation: gradientShift 12s ease infinite;
    position: relative;
    overflow: hidden;
  }
  .hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    pointer-events: none;
  }

  .blob-blue {
    position: absolute;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%);
    animation: blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
    filter: blur(32px); pointer-events: none;
  }
  .blob-purple {
    position: absolute;
    border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
    background: radial-gradient(circle, rgba(139,92,246,.14) 0%, transparent 70%);
    animation: blobMorph 15s ease-in-out infinite reverse, floatY 10s ease-in-out infinite 2s;
    filter: blur(40px); pointer-events: none;
  }

  .particle { position: absolute; border-radius: 50%; pointer-events: none; }
  .p1{width:6px;height:6px;background:#2563eb;top:15%;left:6%;  animation:particleDrift 6s ease-in-out infinite;}
  .p2{width:4px;height:4px;background:#8b5cf6;top:30%;left:16%; animation:particleDrift 8s ease-in-out infinite 1s;}
  .p3{width:7px;height:7px;background:#06b6d4;top:65%;left:4%;  animation:particleDrift 7s ease-in-out infinite 2s;}
  .p4{width:5px;height:5px;background:#10b981;top:75%;left:20%; animation:particleDrift 9s ease-in-out infinite .5s;}
  .p5{width:5px;height:5px;background:#f59e0b;top:20%;right:10%;animation:particleDrift 5s ease-in-out infinite 1.5s;}
  .p6{width:4px;height:4px;background:#ef4444;top:50%;right:6%; animation:particleDrift 10s ease-in-out infinite 3s;}
  .p7{width:6px;height:6px;background:#2563eb;top:70%;right:15%;animation:particleDrift 7s ease-in-out infinite .8s;}

  /* ── Shimmer text (from GlobalStyles) ── */
  .text-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* ── Stat badges (from GlobalStyles) ── */
  .stat-badge {
    background: rgba(255,255,255,.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.9);
    border-radius: 14px; padding: 8px 14px;
    box-shadow: 0 4px 20px rgba(37,99,235,.08), inset 0 1px 0 rgba(255,255,255,.8);
    transition: all .3s cubic-bezier(.22,1,.36,1);
    display: flex; align-items: center; gap: 8px;
  }
  .stat-badge:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 32px rgba(37,99,235,.14); }

  /* ── CTA button (from GlobalStyles) ── */
  .cta-btn {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    transition: all .3s cubic-bezier(.22,1,.36,1);
    border: none; cursor: pointer;
  }
  .cta-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
    opacity: 0; transition: opacity .4s ease;
  }
  .cta-btn:hover::before { opacity: 1; }
  .cta-btn:hover { box-shadow: 0 8px 30px rgba(37,99,235,.4); transform: translateY(-2px) scale(1.02); }
  .cta-btn:active { transform: scale(.97); }
  .cta-btn > * { position: relative; z-index: 1; }

  /* ── Heading underline (from GlobalStyles) ── */
  .heading-underline { position: relative; display: inline-block; }
  .heading-underline::after {
    content: ''; position: absolute; bottom: -4px; left: 0; height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed); border-radius: 2px;
    animation: underlineGrow 1s cubic-bezier(.22,1,.36,1) .8s both;
  }

  /* ── Hero two-col ── */
  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 4.5rem 1.5rem 4rem;
    position: relative;
    z-index: 10;
  }
  @media (max-width: 1024px) {
    .hero-inner { grid-template-columns: 1fr; padding: 3rem 1.25rem; }
    .hero-img-col { display: none !important; }
    .main-grid { grid-template-columns: 1fr !important; }
    .sidebar { display: none !important; }
  }

  /* ── Hero image (from GlobalStyles floatY + card style) ── */
  .hero-img-wrap {
    position: relative; border-radius: 24px; overflow: hidden;
    box-shadow: 0 40px 80px rgba(37,99,235,0.2), 0 16px 40px rgba(139,92,246,0.12);
    animation: floatY 6s ease-in-out infinite;
    transform: translateX(12px);
  }
  .hero-img-wrap img { width: 100%; height: 480px; object-fit: cover; display: block; }

  /* ── Progress bar ── */
  .prog-bar {
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
    z-index: 300; border-radius: 0 2px 2px 0;
    transition: width 0.12s linear;
  }

  /* ── Live dot ── */
  .live-dot { animation: liveDot 1.5s ease-in-out infinite; display: inline-block; }
  .pulse-ring { animation: pulseRing 4s ease-out infinite; }

  /* ── Toast ── */
  .toast { animation: toastIn 0.3s ease; }

  /* ── Content layout ── */
  .main-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2rem;
    align-items: start;
  }
  .rel-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
  @media (max-width: 900px) { .rel-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .rel-grid { grid-template-columns: 1fr; } }

  /* ── Card hover effects ── */
  .content-card-hover { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  .content-card-hover:hover { border-color: #bfdbfe; box-shadow: 0 6px 24px rgba(37,99,235,0.08); }

  .related-card {
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.2s ease;
    text-decoration: none; color: inherit;
  }
  .related-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(37,99,235,0.12); border-color: #bfdbfe !important; }
  .related-card:hover .related-img { transform: scale(1.05); }
  .related-img { transition: transform 0.5s ease; }

  /* ── Action buttons ── */
  .act-btn { transition: all 0.2s ease; cursor: pointer; }
  .act-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(37,99,235,0.15); }

  /* ── TOC ── */
  .toc-item {
    display: block; font-size: 13px; color: #64748b;
    text-decoration: none; padding: 0.5rem 0.75rem;
    border-radius: 10px; font-weight: 600;
    font-family: var(--font-body);
    border-bottom: 1px solid rgba(37,99,235,0.08);
    transition: all 0.15s ease; line-height: 1.45;
  }
  .toc-item:last-child { border-bottom: none; }
  .toc-item:hover { color: #2563eb; padding-left: 1rem; background: rgba(37,99,235,0.06); }

  /* ── Tag & misc ── */
  .tag-pill {
    padding: 5px 14px; border-radius: 99px;
    border: 1px solid rgba(37,99,235,0.2);
    font-family: var(--font-body); font-size: 12px; font-weight: 600;
    color: #475569; cursor: pointer;
    transition: all 0.15s; background: rgba(255,255,255,0.8);
    display: inline-block;
  }
  .tag-pill:hover { border-color: #2563eb; color: #2563eb; background: rgba(37,99,235,0.06); }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: rgba(37,99,235,0.2); border-radius: 99px; }
`;

const HERO_PARTICLES = [
  { cls: "p1", size: 6, bg: "#2563eb", top: "15%", left: "6%"  },
  { cls: "p2", size: 4, bg: "#8b5cf6", top: "30%", left: "16%" },
  { cls: "p3", size: 7, bg: "#06b6d4", top: "65%", left: "4%"  },
  { cls: "p4", size: 5, bg: "#10b981", top: "75%", left: "20%" },
  { cls: "p5", size: 5, bg: "#f59e0b", top: "20%", right: "10%" },
  { cls: "p6", size: 4, bg: "#ef4444", top: "50%", right: "6%"  },
  { cls: "p7", size: 6, bg: "#2563eb", top: "70%", right: "15%" },
];

// ─────────────────────────────────────────────
// ARTICLE DETAIL PAGE
// ─────────────────────────────────────────────
export default function ArticleDetailPage() {
  const { slug }   = useParams();
  const article    = findArticle(slug);

  const [scrollPct, setScrollPct] = useState(0);
  const [liked,     setLiked]     = useState(false);
  const [saved,     setSaved]     = useState(false);
  const [showToast, setShowToast] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = pageRef.current;
      if (!el) return;
      const scrolled = Math.max(0, -el.getBoundingClientRect().top);
      const total    = el.offsetHeight - window.innerHeight;
      setScrollPct(Math.min(100, total > 0 ? (scrolled / total) * 100 : 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleShare() {
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  // ── 404 ──
  if (!article) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "#f8faff" }}>
        <style>{KEYFRAMES}</style>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Article not found</h2>
        <Link href="/articles" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 24px", borderRadius: 16, fontWeight: 700, fontSize: 14,
          color: "#fff", textDecoration: "none",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          fontFamily: "var(--font-display)",
        }}>
          <ArrowLeft size={14} /> Back to Articles
        </Link>
      </div>
    );
  }

  const col      = CAT_COLORS[article.catKey] || CAT_COLORS.gym;
  const catLabel = FILTERS.find(f => f.id === article.catKey)?.label || article.cat;
  const related  = getRelated(article);
  const h2s      = article.content.filter(b => b.type === "h2");

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Progress bar */}
      <div className="prog-bar" style={{ width: `${scrollPct}%` }} />

      {/* Toast */}
      {showToast && (
        <div className="toast" style={{
          position: "fixed", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          background: "#fff", color: "#2563eb",
          border: "1px solid rgba(37,99,235,0.2)",
          padding: "0.65rem 1.5rem", borderRadius: "99px",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px",
          zIndex: 400, backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.16)", whiteSpace: "nowrap",
        }}>✅ Link copied!</div>
      )}

      <div ref={pageRef} style={{ minHeight: "100vh", background: "#f8faff" }}>

        {/* ══════════════ HERO — LEFT text, RIGHT image ══════════════ */}
        <div className="hero-bg">

          {/* Blobs */}
          <div className="blob-blue"   style={{ width: 480, height: 480, top: "-10%", right: "-5%",  opacity: .6 }} />
          <div className="blob-purple" style={{ width: 340, height: 340, bottom: "-8%", left: "-8%", opacity: .5 }} />

          {/* Particles */}
          {HERO_PARTICLES.map((p, i) => (
            <div key={i} className={`particle ${p.cls}`} style={{ width: p.size, height: p.size, background: p.bg, top: p.top, left: p.left, right: p.right }} />
          ))}

          {/* Two-col grid */}
          <div className="hero-inner">

            {/* ── LEFT: text content ── */}
            <div>

              {/* Top nav row */}
              <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                <Link href="/articles" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12,
                  color: "#64748b", textDecoration: "none", padding: "6px 14px",
                  borderRadius: 10, background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(37,99,235,0.15)",
                  transition: "all 0.2s ease",
                }}>
                  <ArrowLeft size={12} /> All Articles
                </Link>

                {/* Category chip */}
                <div className="stat-badge">
                  <span className="live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: col.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", color: "#0f172a", textTransform: "uppercase" }}>
                    {catLabel}
                  </span>
                </div>

                {article.trending && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 99, background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 11, fontFamily: "var(--font-display)" }}>
                    🔥 TRENDING
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="anim-slide-l delay-100" style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px,4vw,52px)",
                fontWeight: 700, lineHeight: 1.15,
                color: "#0f172a", marginBottom: 16,
                letterSpacing: "-0.02em",
              }}>
                {(() => {
                  const words = article.title.split(" ");
                  const cut   = Math.ceil(words.length * 0.6);
                  return (
                    <>
                      {words.slice(0, cut).join(" ")}{" "}
                      <span className="text-shimmer heading-underline">{words.slice(cut).join(" ")}</span>
                    </>
                  );
                })()}
              </h1>

              {/* Short desc */}
              <p className="anim-fade-up delay-200" style={{ fontFamily: "var(--font-body)", color: "#475569", fontSize: 15, lineHeight: 1.75, marginBottom: 20, maxWidth: 520 }}>
                {article.shortDesc}
              </p>

              {/* Meta row */}
              <div className="anim-fade-up delay-300" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 24 }}>
                {[
                  { icon: Clock,    text: `${article.readTime} read` },
                  { icon: Eye,      text: `${article.views} views`   },
                  { icon: Calendar, text: article.date               },
                ].map(({ icon: Icon, text }, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b" }}>
                    <Icon size={13} style={{ color: "#2563eb" }} /> {text}
                  </span>
                ))}
              </div>

              {/* Author chip */}
              <div className="anim-fade-up delay-400" style={{
                display: "inline-flex", alignItems: "center", gap: 14,
                padding: "12px 18px", borderRadius: 16,
                background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(37,99,235,0.15)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.08)",
                marginBottom: 24,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                  background: col.avatarBg, border: `1px solid ${col.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: col.avatarColor,
                }}>{article.initials}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{article.author}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: col.color, fontWeight: 600 }}>{article.authorRole}</div>
                </div>
              </div>

              {/* Trust badges (from GlobalStyles stat-badge) */}
              <div className="anim-fade-up delay-500" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { icon: Shield,      color: "#10b981", label: "Expert Verified"  },
                  { icon: Award,       color: "#6366f1", label: "In-Depth Guide"   },
                  { icon: CheckCircle, color: "#2563eb", label: "Actionable Steps" },
                ].map(({ icon: Icon, color, label }, i) => (
                  <div key={i} className="stat-badge">
                    <Icon size={13} style={{ color }} />
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, color: "#475569" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: cover image (from GlobalStyles carousel card style) ── */}
            <div className="hero-img-col anim-scale-in delay-300" style={{ position: "relative" }}>
              {/* Glow behind image */}
              <div className="pulse-ring" style={{
                position: "absolute", borderRadius: "50%", pointerEvents: "none",
                width: "80%", height: "70%", left: "10%", top: "10%",
                background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
                filter: "blur(52px)",
              }} />

              <div className="hero-img-wrap">
                <img src={article.coverImg} alt={article.title} />

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(37,99,235,0.06) 0%, transparent 50%, rgba(0,0,0,0.28) 100%)" }} />

                {/* Category pill */}
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  padding: "7px 14px", borderRadius: 99,
                  background: col.pill, color: "#fff",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                }}>{catLabel}</div>

                {/* Read time badge */}
                <div style={{
                  position: "absolute", bottom: 16, right: 16,
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 99,
                  background: "rgba(37,99,235,0.92)", color: "#fff",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                  boxShadow: "0 8px 24px rgba(37,99,235,0.45)",
                }}>
                  <BookOpen size={11} /> {article.readTime}
                </div>

                {/* Trending badge */}
                {article.trending && (
                  <div style={{
                    position: "absolute", bottom: 16, left: 16,
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", borderRadius: 99,
                    background: "rgba(239,68,68,0.92)", color: "#fff",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                  }}>
                    <span className="live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                    Trending
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════ MAIN CONTENT ══════════════ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.25rem 5rem" }}>
          <div className="main-grid">

            {/* ─── LEFT: Article body ─── */}
            <div className="anim-fade-up delay-200" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Action bar */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                padding: "14px 20px", borderRadius: 16,
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(37,99,235,0.1)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.06)",
              }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", flex: 1 }}>
                  {article.readTime} · {article.date}
                </span>
                {[
                  { icon: Heart,    label: liked ? "Liked" : "Like",  active: liked, color: "#ef4444", onClick: () => setLiked(!liked) },
                  { icon: Bookmark, label: saved ? "Saved" : "Save",  active: saved, color: "#10b981", onClick: () => setSaved(!saved) },
                  { icon: Share2,   label: "Share",                   active: false, color: "#2563eb", onClick: handleShare },
                ].map((b, i) => (
                  <button key={i} onClick={b.onClick} className="act-btn" style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 10,
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12,
                    border: `1px solid ${b.active ? b.color + "40" : "rgba(37,99,235,0.15)"}`,
                    background: b.active ? b.color + "12" : "rgba(255,255,255,0.8)",
                    color: b.active ? b.color : "#64748b",
                  }}>
                    <b.icon size={13} /> {b.label}
                  </button>
                ))}
              </div>

              {/* Article card */}
              <section className="content-card-hover" style={{
                background: "#fff", border: "1px solid #e2e8f0",
                borderRadius: 20, padding: "clamp(1.5rem,4vw,2.5rem)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.05)",
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                  {article.content.map((block, i) => {
                    if (block.type === "lead") return (
                      <p key={i} style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem,2.5vw,1.1rem)",
                        color: "#475569", lineHeight: 1.8, fontStyle: "italic",
                        borderLeft: `4px solid ${col.color}`,
                        padding: "1rem 1.25rem",
                        background: col.bg,
                        borderRadius: "0 12px 12px 0",
                        margin: 0,
                      }}>{block.text}</p>
                    );

                    if (block.type === "h2") return (
                      <h2 key={i} style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem,2.5vw,1.35rem)",
                        fontWeight: 700, color: "#0f172a",
                        marginTop: "0.5rem", marginBottom: 0,
                        letterSpacing: "-0.01em",
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                        <span style={{ display: "inline-block", width: 4, height: 22, borderRadius: 4, flexShrink: 0, background: `linear-gradient(180deg,${col.color},#6366f1)` }} />
                        {block.text}
                      </h2>
                    );

                    if (block.type === "p") return (
                      <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "#475569", lineHeight: 1.85, margin: 0 }}>
                        {block.text}
                      </p>
                    );

                    if (block.type === "callout") return (
                      <div key={i} style={{
                        background: col.bg, border: `1px solid ${col.border}`,
                        borderRadius: 14, padding: "1rem 1.35rem",
                        fontFamily: "var(--font-body)", fontSize: 14.5,
                        color: col.text, fontWeight: 500, lineHeight: 1.65,
                      }}>{block.text}</div>
                    );

                    if (block.type === "quote") return (
                      <blockquote key={i} style={{
                        margin: 0, borderLeft: "4px solid #7c3aed",
                        padding: "1.1rem 1.5rem",
                        background: "#f5f3ff",
                        border: "1px solid #e9d5ff",
                        borderLeft: "4px solid #7c3aed",
                        borderRadius: "0 14px 14px 0",
                      }}>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.95rem,2vw,1.05rem)", color: "#6d28d9", lineHeight: 1.75, marginBottom: "0.5rem", fontStyle: "italic", margin: "0 0 0.5rem" }}>
                          "{block.text}"
                        </p>
                        <cite style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#7c3aed", fontWeight: 700, fontStyle: "normal" }}>
                          — {block.author}
                        </cite>
                      </blockquote>
                    );

                    return null;
                  })}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9" }}>
                  {article.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                </div>
              </section>

              {/* Author bio */}
              <div style={{
                display: "flex", gap: 16, flexWrap: "wrap", padding: "1.5rem",
                background: col.bg, border: `1px solid ${col.border}`, borderRadius: 20,
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, background: col.avatarBg, border: `2px solid ${col.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: col.avatarColor }}>
                  {article.initials}
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#0f172a" }}>{article.author}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: col.color, fontWeight: 700, marginBottom: 8 }}>{article.authorRole}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#64748b", lineHeight: 1.7, margin: 0 }}>{article.authorBio}</p>
                </div>
              </div>

              {/* Trust grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {[
                  { icon: Shield,     label: "Expert Verified",  sub: "By certified professionals", color: "#10b981", bg: "#ecfdf5" },
                  { icon: Award,      label: "In-Depth Guide",   sub: "Evidence-backed content",   color: "#6366f1", bg: "#f5f3ff" },
                  { icon: Users,      label: "Community",        sub: "Join the discussion",        color: "#2563eb", bg: "#eff6ff" },
                  { icon: TrendingUp, label: "Actionable Steps", sub: "Apply it today",             color: "#f59e0b", bg: "#fffbeb" },
                ].map(({ icon: Icon, label, sub, color, bg }, i) => (
                  <div key={i} className="content-card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 10px rgba(37,99,235,0.04)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: bg }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{label}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#94a3b8" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: Sidebar ─── */}
            <div className="sidebar anim-fade-up delay-300" style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 20 }}>

              {/* Table of Contents */}
              <div className="content-card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "1.35rem", boxShadow: "0 4px 20px rgba(37,99,235,0.05)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 1rem" }}>
                  📋 In This Article
                </p>
                {h2s.map((b, i) => (
                  <a key={i} href="#" className="toc-item">{b.text}</a>
                ))}
              </div>

              {/* Author sidebar */}
              <div className="content-card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "1.35rem", boxShadow: "0 4px 20px rgba(37,99,235,0.05)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 1rem" }}>
                  About the Author
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: col.avatarBg, border: `1px solid ${col.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: col.avatarColor }}>
                    {article.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{article.author}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: col.color, fontWeight: 600 }}>{article.authorRole}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: col.bg, border: `1px solid ${col.border}`, marginBottom: 12 }}>
                  <Eye size={13} style={{ color: col.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{article.views}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#94a3b8" }}>total views</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{article.authorBio}</p>
              </div>

              {/* Newsletter CTA */}
              <div style={{
                borderRadius: 20, padding: "1.5rem",
                background: "linear-gradient(135deg,#f0f9ff,#eff6ff,#f5f3ff)",
                border: "1px solid rgba(37,99,235,0.15)",
                boxShadow: "0 8px 32px rgba(37,99,235,0.1)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>📬</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 8 }}>Get Weekly Insights</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 14 }}>
                  Expert articles from top trainers every Tuesday.
                </p>
                <input
                  type="email" placeholder="Your email address"
                  style={{
                    width: "100%", marginBottom: 10, padding: "10px 14px",
                    borderRadius: 12, border: "1px solid rgba(37,99,235,0.2)",
                    background: "rgba(255,255,255,0.9)", color: "#0f172a",
                    fontFamily: "var(--font-body)", fontSize: 13, outline: "none",
                    boxSizing: "border-box", display: "block",
                  }}
                />
                <button className="cta-btn" style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "12px 0", borderRadius: 14,
                  color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14,
                }}>
                  <span>Subscribe Free</span> <ArrowRight size={14} />
                </button>
              </div>

              {/* Trust grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "🛡️", label: "Verified Expert" },
                  { icon: "🏆", label: "Award-Winning"   },
                  { icon: "👥", label: "50k+ Readers"    },
                  { icon: "📊", label: "Data-Backed"     },
                ].map(({ icon, label }, i) => (
                  <div key={i} style={{
                    background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0",
                    padding: "12px 10px", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 6, textAlign: "center",
                  }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "#64748b" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════ RELATED ARTICLES ══════ */}
          {related.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                <span style={{ display: "inline-block", width: 4, height: 24, borderRadius: 4, background: "linear-gradient(180deg,#2563eb,#6366f1)", flexShrink: 0 }} />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,3vw,1.5rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  More <span className="text-shimmer">Articles</span>
                </h2>
              </div>

              <div className="rel-grid">
                {related.map(r => {
                  const rSlug = makeSlug(r);
                  const rCol  = CAT_COLORS[r.catKey] || CAT_COLORS.gym;
                  return (
                    <Link key={r.id} href={`/articles/${rSlug}`} className="related-card" style={{
                      background: "#fff", border: "1px solid #e2e8f0",
                      borderRadius: 20, overflow: "hidden", display: "block",
                    }}>
                      <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                        <img src={r.coverImg} alt={r.title} className="related-img"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", top: 10, left: 10, padding: "5px 12px", borderRadius: 99, background: rCol.pill, color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10 }}>
                          {r.cat}
                        </div>
                      </div>
                      <div style={{ padding: "16px 18px 18px" }}>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#94a3b8", marginBottom: 8, marginTop: 0 }}>
                          {r.date} · {r.readTime} read
                        </p>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, color: "#0f172a", lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {r.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
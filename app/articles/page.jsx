"use client";

import { useState } from "react";
import Link from "next/link";
import { CAT_COLORS, FILTERS, ARTICLES, makeSlug } from "./data";

// ─────────────────────────────────────────────
// GLOBAL STYLES — merged from GlobalStyles.js
// ─────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

  :root {
    --blue-primary: #2563eb;
    --font-display: 'Clash Display', sans-serif;
    --font-body:    'Satoshi', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: var(--font-body); background: #fff; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes blobMorph {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50%      { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
    75%      { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0) scale(1);          opacity:.6; }
    33%  { transform: translateY(-30px) translateX(15px) scale(1.2); opacity:.9; }
    66%  { transform: translateY(-15px) translateX(-10px) scale(.8); opacity:.4; }
    100% { transform: translateY(0) translateX(0) scale(1);          opacity:.6; }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(.85); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes dotPulse {
    0%,100% { opacity:.4; transform:scale(1); }
    50%      { opacity:1;  transform:scale(1.4); }
  }
  @keyframes underlineGrow {
    from { width:0; }
    to   { width:100%; }
  }
  @keyframes liveDot {
    0%,100% { opacity:1; }
    50%     { opacity:0.25; }
  }

  /* ── Animation utility classes (from GlobalStyles) ── */
  .anim-fade-up  { animation:fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-slide-l  { animation:slideInLeft .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-scale-in { animation:scaleIn .6s cubic-bezier(.22,1,.36,1) both; }
  .anim-float    { animation:floatY 5s ease-in-out infinite; }
  .delay-100 { animation-delay:.1s; }
  .delay-200 { animation-delay:.2s; }
  .delay-300 { animation-delay:.3s; }
  .delay-400 { animation-delay:.4s; }
  .delay-500 { animation-delay:.5s; }
  .delay-600 { animation-delay:.6s; }
  .delay-700 { animation-delay:.7s; }

  /* ── Hero background (from GlobalStyles) ── */
  .hero-bg {
    background:linear-gradient(135deg,#eff6ff 0%,#f5f3ff 40%,#eef2ff 70%,#f0fdf4 100%);
    background-size:300% 300%;
    animation:gradientShift 12s ease infinite;
    position:relative;
    overflow:hidden;
  }
  .hero-bg::before {
    content:'';
    position:absolute;
    inset:0;
    background-image:
      linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),
      linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);
    background-size:48px 48px;
    mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%);
    pointer-events:none;
  }

  .blob-blue {
    position:absolute;
    border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;
    background:radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%);
    animation:blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
    filter:blur(32px); pointer-events:none;
  }
  .blob-purple {
    position:absolute;
    border-radius:40% 60% 70% 30% / 40% 60% 30% 70%;
    background:radial-gradient(circle,rgba(139,92,246,.14) 0%,transparent 70%);
    animation:blobMorph 15s ease-in-out infinite reverse, floatY 10s ease-in-out infinite 2s;
    filter:blur(40px); pointer-events:none;
  }

  .particle { position:absolute; border-radius:50%; pointer-events:none; }
  .p1{width:6px;height:6px;background:#2563eb;top:14%;left:4%;  animation:particleDrift 6s ease-in-out infinite;}
  .p2{width:4px;height:4px;background:#8b5cf6;top:30%;left:12%; animation:particleDrift 8s ease-in-out infinite 1s;}
  .p3{width:7px;height:7px;background:#06b6d4;top:62%;left:3%;  animation:particleDrift 7s ease-in-out infinite 2s;}
  .p4{width:5px;height:5px;background:#10b981;top:78%;left:16%; animation:particleDrift 9s ease-in-out infinite .5s;}
  .p5{width:5px;height:5px;background:#6366f1;top:18%;right:6%; animation:particleDrift 5s ease-in-out infinite 1.5s;}
  .p6{width:4px;height:4px;background:#f59e0b;top:55%;right:4%; animation:particleDrift 10s ease-in-out infinite 3s;}
  .p7{width:6px;height:6px;background:#2563eb;top:70%;right:13%;animation:particleDrift 7s ease-in-out infinite .8s;}

  /* ── Shimmer text (from GlobalStyles) ── */
  .text-shimmer {
    background:linear-gradient(90deg,#1d4ed8 0%,#7c3aed 30%,#1d4ed8 60%,#0891b2 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 4s linear infinite;
  }

  /* ── Stat badges (from GlobalStyles) ── */
  .stat-badge {
    background:rgba(255,255,255,.7);
    backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,.9);
    border-radius:14px; padding:8px 14px;
    box-shadow:0 4px 20px rgba(37,99,235,.08),inset 0 1px 0 rgba(255,255,255,.8);
    transition:all .3s cubic-bezier(.22,1,.36,1);
  }
  .stat-badge:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 12px 32px rgba(37,99,235,.14);}

  /* ── CTA button (from GlobalStyles) ── */
  .cta-btn {
    position:relative; overflow:hidden;
    background:linear-gradient(135deg,#2563eb,#1d4ed8);
    transition:all .3s cubic-bezier(.22,1,.36,1);
    border:none; cursor:pointer;
  }
  .cta-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,#1d4ed8,#7c3aed);
    opacity:0; transition:opacity .4s ease;
  }
  .cta-btn:hover::before{opacity:1;}
  .cta-btn:hover{box-shadow:0 8px 30px rgba(37,99,235,.4);transform:translateY(-2px) scale(1.02);}
  .cta-btn:active{transform:scale(.97);}
  .cta-btn span{position:relative;z-index:1;}

  /* ── Search input (from GlobalStyles) ── */
  .search-input{transition:all .3s cubic-bezier(.22,1,.36,1);}
  .search-input:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 4px rgba(37,99,235,.1),0 4px 20px rgba(37,99,235,.12);transform:translateY(-1px);}
  .search-input:hover{border-color:#93c5fd;box-shadow:0 2px 12px rgba(37,99,235,.08);}

  /* ── Heading underline (from GlobalStyles) ── */
  .heading-underline{position:relative;display:inline-block;}
  .heading-underline::after{content:'';position:absolute;bottom:-4px;left:0;height:3px;background:linear-gradient(90deg,#2563eb,#7c3aed);border-radius:2px;animation:underlineGrow 1s cubic-bezier(.22,1,.36,1) .8s both;}

  /* ── Live dot ── */
  .live-dot{animation:liveDot 1.5s ease-in-out infinite;}

  /* ── Hero two-col layout ── */
  .hero-inner {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:3rem;
    align-items:center;
    max-width:1280px;
    margin:0 auto;
    padding:5rem 1.5rem 4.5rem;
    position:relative;
    z-index:10;
  }
  @media(max-width:900px){
    .hero-inner{grid-template-columns:1fr;padding:3rem 1.25rem;text-align:center;}
    .hero-right{display:none;}
    .hero-stats{justify-content:center!important;}
  }

  /* ── Hero right image ── */
  .hero-img-wrap {
    position:relative; border-radius:24px; overflow:hidden;
    box-shadow:0 40px 80px rgba(37,99,235,0.2),0 16px 40px rgba(139,92,246,0.12);
    animation:floatY 6s ease-in-out infinite;
  }
  .hero-img-wrap img{width:100%;height:480px;object-fit:cover;display:block;}

  /* ── Filter bar ── */
  .filter-bar{
    background:rgba(255,255,255,0.85);
    border-bottom:1px solid rgba(37,99,235,0.1);
    backdrop-filter:blur(10px);
    padding:0 1rem;
    position:sticky;top:0;z-index:50;
  }
  .filter-scroll{display:flex;gap:8px;overflow-x:auto;padding:12px 0;scrollbar-width:none;max-width:1280px;margin:0 auto;}
  .filter-scroll::-webkit-scrollbar{display:none;}
  .f-tab{
    display:inline-flex;align-items:center;gap:6px;
    padding:8px 18px;border-radius:99px;
    font-family:var(--font-display);font-size:12px;font-weight:700;
    letter-spacing:0.04em;cursor:pointer;white-space:nowrap;
    flex-shrink:0;transition:all 0.18s cubic-bezier(0.22,1,0.36,1);border:none;
  }
  .f-tab:hover{transform:translateY(-2px);}

  /* ── Search pill ── */
  .srch-wrap{
    display:flex;align-items:center;
    background:rgba(255,255,255,0.85);
    border:1px solid rgba(37,99,235,0.2);
    border-radius:99px;padding:6px 6px 6px 20px;
    box-shadow:0 4px 20px rgba(37,99,235,0.08);
    transition:border-color 0.2s,box-shadow 0.2s;
  }
  .srch-wrap:focus-within{border-color:rgba(37,99,235,0.45);box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
  .srch-input{background:none;border:none;outline:none;color:#1e293b;font-size:14px;flex:1;font-family:var(--font-body);min-width:0;}
  .srch-input::placeholder{color:#94a3b8;}
  .srch-btn{
    background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;border-radius:99px;
    padding:9px 22px;font-size:13px;font-family:var(--font-display);font-weight:700;cursor:pointer;
    transition:opacity 0.15s,transform 0.15s;white-space:nowrap;
  }
  .srch-btn:hover{opacity:.88;transform:scale(1.03);}

  /* ── Article grid ── */
  .art-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  @media(max-width:1024px){.art-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:600px) {.art-grid{grid-template-columns:1fr;}}

  /* ── Article card ── */
  .art-card{
    background:rgba(255,255,255,0.9);border:1px solid rgba(37,99,235,0.12);border-radius:20px;overflow:hidden;
    display:flex;flex-direction:column;height:100%;backdrop-filter:blur(10px);
    box-shadow:0 4px 20px rgba(37,99,235,0.06);
    transition:transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s ease,border-color 0.2s;
    cursor:pointer;text-decoration:none;color:inherit;
  }
  .art-card:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(37,99,235,0.16);border-color:rgba(37,99,235,0.28);}
  .art-card:hover .art-img{transform:scale(1.07);}
  .art-img{transition:transform 0.5s ease;width:100%;height:100%;object-fit:cover;display:block;}

  /* ── Featured card ── */
  .feat-card{
    background:rgba(255,255,255,0.92);border:1px solid rgba(37,99,235,0.15);border-radius:22px;overflow:hidden;
    display:flex;flex-direction:row;backdrop-filter:blur(12px);
    box-shadow:0 8px 40px rgba(37,99,235,0.10);
    transition:transform 0.25s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s ease;
    cursor:pointer;text-decoration:none;color:inherit;
  }
  .feat-card:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(37,99,235,0.2);}
  .feat-card:hover .feat-img{transform:scale(1.05);}
  .feat-img{transition:transform 0.5s ease;width:100%;height:100%;object-fit:cover;display:block;}
  @media(max-width:768px){
    .feat-card{flex-direction:column;}
    .feat-img-wrap{width:100%!important;min-height:200px!important;}
    .feat-body{padding:20px!important;}
  }

  /* ── Misc ── */
  .like-btn{
    position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;
    background:rgba(255,255,255,0.95);border:none;display:flex;align-items:center;justify-content:center;
    font-size:16px;cursor:pointer;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,0.12);transition:transform 0.15s;
  }
  .like-btn:hover{transform:scale(1.18);}
  .tag-pill{background:rgba(37,99,235,0.08);color:#2563eb;border:1px solid rgba(37,99,235,0.2);font-size:11px;padding:4px 11px;border-radius:99px;font-family:var(--font-body);font-weight:600;display:inline-block;}
  .load-btn{
    background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;
    padding:13px 38px;border-radius:99px;font-family:var(--font-display);font-size:14px;font-weight:700;
    cursor:pointer;letter-spacing:0.03em;transition:opacity 0.15s,transform 0.15s,box-shadow 0.15s;
    box-shadow:0 8px 24px rgba(37,99,235,0.3);
  }
  .load-btn:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 12px 32px rgba(37,99,235,0.4);}

  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#f1f5f9;}
  ::-webkit-scrollbar-thumb{background:rgba(37,99,235,0.2);border-radius:99px;}
`;

// ─────────────────────────────────────────────
// ARTICLE CARD
// ─────────────────────────────────────────────
function ArticleCard({ article }) {
  const [liked, setLiked] = useState(false);
  const slug = makeSlug(article);
  const col  = CAT_COLORS[article.catKey] || CAT_COLORS.gym;

  return (
    <Link href={`/articles/${slug}`} className="art-card">
      <div style={{ position: "relative", height: 190, flexShrink: 0, overflow: "hidden" }}>
        <img src={article.image} alt={article.title} className="art-img" style={{ height: "100%" }} />
        {article.trending && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: "rgba(37,99,235,0.9)", color: "#fff",
            fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700,
            padding: "5px 12px", borderRadius: 999, zIndex: 2, letterSpacing: "0.04em",
          }}>🔥 Trending</span>
        )}
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          className="like-btn"
          style={{ color: liked ? "#ef4444" : "#64748b" }}
        >{liked ? "♥" : "♡"}</button>
      </div>

      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: col.color, marginBottom: 8, letterSpacing: "0.08em" }}>
          {article.cat}
        </p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#0f172a", lineHeight: 1.45, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {article.title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#64748b", lineHeight: 1.65, marginBottom: 14, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {article.shortDesc}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {article.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid rgba(37,99,235,0.08)", paddingTop: 13, marginTop: "auto" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: col.avatarBg, color: col.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-display)" }}>
            {article.initials}
          </div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "#64748b", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {article.author} · {article.readTime} · {article.date}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// FEATURED CARD
// ─────────────────────────────────────────────
function FeaturedCard() {
  const featured = ARTICLES.find(a => a.trending) || ARTICLES[0];
  const slug = makeSlug(featured);
  const col  = CAT_COLORS[featured.catKey] || CAT_COLORS.gym;

  return (
    <div className="anim-fade-up delay-200" style={{ marginBottom: "2.5rem" }}>
      <Link href={`/articles/${slug}`} className="feat-card">
        <div className="feat-img-wrap" style={{ position: "relative", width: "44%", minHeight: 280, overflow: "hidden", flexShrink: 0 }}>
          <img src={featured.coverImg} alt={featured.title} className="feat-img"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 60%,rgba(255,255,255,0.4))" }} />
        </div>
        <div className="feat-body" style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(37,99,235,0.1)", color: "#1d4ed8", fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 999, letterSpacing: "0.06em", border: "1px solid rgba(37,99,235,0.2)" }}>🔥 TRENDING</span>
            <span style={{ background: col.avatarBg, color: col.color, fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 999, letterSpacing: "0.06em", border: `1px solid ${col.border}` }}>
              {featured.cat.toUpperCase()}
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.35, marginBottom: 14 }}>
            {featured.title.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="text-shimmer">{featured.title.split(" ").slice(-3).join(" ")}</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 22 }}>
            {featured.shortDesc}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: col.avatarBg, border: `1px solid ${col.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: col.avatarColor }}>
              {featured.initials}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{featured.author}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "#64748b" }}>{featured.authorRole}</div>
            </div>
            <div style={{ marginLeft: "auto", width: 36, height: 36, borderRadius: "50%", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#2563eb", flexShrink: 0 }}>→</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO — left text, right image
// ─────────────────────────────────────────────
function ArticlesHero({ onSearch, inputVal, setInputVal }) {
  const featured = ARTICLES.find(a => a.trending) || ARTICLES[0];
  const col = CAT_COLORS[featured.catKey] || CAT_COLORS.gym;

  return (
    <div className="hero-bg">
      {[1,2,3,4,5,6,7].map(i => <div key={i} className={`particle p${i}`} />)}
      <div className="blob-blue"   style={{ width:360, height:360, top:"-10%", right:"-5%",  opacity:.6 }} />
      <div className="blob-purple" style={{ width:280, height:280, bottom:"-5%", left:"-8%", opacity:.5 }} />

      <div className="hero-inner">

        {/* ── LEFT ── */}
        <div>
          {/* Live badge */}
          <div className="anim-fade-up" style={{ marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(37,99,235,0.15)", borderRadius: 99,
              padding: "7px 16px", fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: 11, letterSpacing: "0.08em", color: "#0f172a", textTransform: "uppercase",
              boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
            }}>
              <span className="live-dot" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#2563eb" }} />
              World's Best Expert Insights
            </span>
          </div>

          {/* Headline */}
          <h1 className="anim-slide-l delay-100" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem,5vw,3.8rem)",
            fontWeight: 700, lineHeight: 1.1,
            color: "#0f172a", marginBottom: 16, letterSpacing: "-0.02em",
          }}>
            Explore powerful{" "}
            <span className="text-shimmer heading-underline">insights,</span>
            {" "}stories &amp;<br />ideas.
          </h1>

          {/* Sub */}
          <p className="anim-fade-up delay-300" style={{
            fontFamily: "var(--font-body)", color: "#475569",
            fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.75,
            marginBottom: 28, maxWidth: 480,
          }}>
            Expert trainers, real results. Discover actionable insights from the people who know best.
          </p>

          {/* Search */}
          <div className="anim-fade-up delay-400" style={{ marginBottom: 32 }}>
            <div className="srch-wrap">
              <input
                type="text"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onSearch(inputVal)}
                placeholder="Search nutrition, habits, sleep…"
                className="srch-input"
              />
              <button className="srch-btn" onClick={() => onSearch(inputVal)}>Search</button>
            </div>
          </div>

          {/* Stats row */}
     <div className="hero-stats anim-fade-up delay-500" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
  {[["500+","Verified Trainers"],["12k+","Articles"],["6","Expert Categories"]].map(([num,lbl])=>(
    <div key={lbl} style={{ textAlign: "left" }}>
      <div 
        style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "2rem", 
          fontWeight: 700, 
          color: "#334155", // lighter than black
          letterSpacing: "-0.01em" 
        }}
      >
        {num}
      </div>

      <div 
        style={{ 
          fontFamily: "var(--font-body)", 
          fontSize: 10, 
          color: "#94a3b8", 
          letterSpacing: "1.5px", 
          textTransform: "uppercase", 
          marginTop: 2 
        }}
      >
        {lbl}
      </div>
    </div>
  ))}
</div>
        </div>

        {/* ── RIGHT: cover image of featured article ── */}
        <div className="hero-right anim-scale-in delay-300" style={{ position: "relative" }}>
          {/* Glow */}
          <div style={{
            position: "absolute", borderRadius: "50%", pointerEvents: "none",
            width: "80%", height: "70%", left: "10%", top: "10%",
            background: "radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%)",
            filter: "blur(52px)",
          }} />

          <div className="hero-img-wrap">
            <img src={featured.coverImg} alt={featured.title} />
            {/* Overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(37,99,235,0.06) 0%,transparent 50%,rgba(0,0,0,0.25) 100%)" }} />
            {/* Category pill */}
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: col.pill, color: "#fff",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
              padding: "7px 14px", borderRadius: 99,
            }}>{featured.cat}</div>
            {/* Trending */}
            {featured.trending && (
              <div style={{
                position: "absolute", top: 16, right: 16,
                background: "rgba(239,68,68,0.9)", color: "#fff",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                padding: "7px 14px", borderRadius: 99,
              }}>🔥 Trending</div>
            )}
            {/* Read time */}
            <div style={{
              position: "absolute", bottom: 16, left: 16,
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(37,99,235,0.92)", color: "#fff",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
              padding: "8px 14px", borderRadius: 99,
              boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
            }}>📖 {featured.readTime} read</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function ArticlesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [inputVal,     setInputVal]     = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded,     setExpanded]     = useState(false);

  const filtered = ARTICLES.filter(a => {
    const matchF = activeFilter === "all" || a.catKey === activeFilter;
    const q      = searchQuery.toLowerCase();
    const matchS = !q
      || a.title.toLowerCase().includes(q)
      || a.cat.toLowerCase().includes(q)
      || a.tags.some(t => t.toLowerCase().includes(q));
    return matchF && matchS;
  });

  const visible = filtered.slice(0, visibleCount);

  function handleSearch(q)  { setSearchQuery(q); setActiveFilter("all"); setVisibleCount(6); setExpanded(false); }
  function handleFilter(id) { setActiveFilter(id); setVisibleCount(6); setExpanded(false); }
  function handleToggle()   {
    if (expanded) { setVisibleCount(6); setExpanded(false); }
    else          { setVisibleCount(filtered.length); setExpanded(true); }
  }

  return (
    <>
      <style>{STYLES}</style>
      <main style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "var(--font-body)" }}>

        {/* ══ HERO ══ */}
        <ArticlesHero onSearch={handleSearch} inputVal={inputVal} setInputVal={setInputVal} />

        {/* ══ FILTER BAR ══ */}
        <div className="filter-bar">
          <div className="filter-scroll">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => handleFilter(f.id)} className="f-tab" style={{
                background: activeFilter === f.id ? "linear-gradient(135deg,#1e40af,#2563eb)" : "rgba(37,99,235,0.05)",
                color: activeFilter === f.id ? "#fff" : "#64748b",
                border: activeFilter === f.id ? "1px solid transparent" : "1px solid rgba(37,99,235,0.12)",
                boxShadow: activeFilter === f.id ? "0 4px 16px rgba(37,99,235,0.25)" : "none",
              }}>
                <span style={{ fontSize: 14 }}>{f.icon}</span> {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ CONTENT ══ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1rem 5rem" }}>

          {activeFilter === "all" && !searchQuery && <FeaturedCard />}

          {searchQuery && (
            <div className="anim-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: 8 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#64748b" }}>
                <strong style={{ color: "#0f172a" }}>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""} for{" "}
                <strong style={{ color: "#2563eb" }}>"{searchQuery}"</strong>
              </p>
              <button onClick={() => { setSearchQuery(""); setInputVal(""); setVisibleCount(6); setExpanded(false); }}
                style={{ background: "none", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 99, padding: "4px 14px", fontSize: 12, cursor: "pointer", color: "#2563eb", fontFamily: "var(--font-display)" }}>
                Clear ✕
              </button>
            </div>
          )}

          <p className="anim-fade-up" style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#2563eb", marginBottom: "1.25rem", fontWeight: 700 }}>
            {searchQuery ? "Search Results" : "Latest Articles"}
          </p>

          {visible.length > 0 ? (
            <div className="art-grid">
              {visible.map((a, i) => (
                <div key={a.id} className={`anim-fade-up delay-${Math.min(7, i + 1) * 100}`} style={{ height: "100%" }}>
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: 16 }}>
              No articles found. Try a different search or filter.
            </div>
          )}

          {filtered.length > 6 && (
            <div style={{ textAlign: "center", marginTop: "2.75rem" }}>
              <button className="load-btn" onClick={handleToggle}>
                {expanded ? "Show Less ↑" : "Load More Articles →"}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
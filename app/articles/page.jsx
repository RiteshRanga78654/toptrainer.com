"use client";

import { useState } from "react";
import Link from "next/link";
import { CAT_COLORS, FILTERS, ARTICLES, makeSlug } from "./data";

// ─────────────────────────────────────────────
// DATA & SUB-COMPONENTS FOR REDESIGNED TRAINER SECTION
// ─────────────────────────────────────────────
const Loader2 = ({ size, className }) => (
  <span className={className} style={{ fontSize: size, display: 'inline-block' }}>⏳</span>
);
const ChevronRight = ({ size }) => <span style={{ fontSize: size }}>→</span>;

const allTrainers = [
  { 
    id: 1, 
    name: "Priya Sharma", 
    role: "Leadership &...", 
    location: "Delhi, India",
    badge: { text: "TOP RATED", bg: "#eff6ff", color: "#2563eb", border: "#dbeafe" },
    desc: "Helping senior professionals unlock their leadership potential with proven frameworks.",
    rating: "4.9", 
    reviews: "312", 
    sessions: "1.2K+",
    exp: "8 yrs",
    status: "Available",
    tags: ["Leadership", "Soft Skills", "Management"],
    tagColors: { bg: ["#fef9c3", "#fee2e2", "#e0e7ff"], text: ["#854d0e", "#991b1b", "#3730a3"] }
  },
  { 
    id: 2, 
    name: "Rahul Mehta", 
    role: "Full Stack &...", 
    location: "Bangalore, India",
    badge: { text: "RISING STAR", bg: "#fdf4ff", color: "#d946ef", border: "#f5d0fe" },
    desc: "From React to LLMs — practical, project-based learning that gets you hired.",
    rating: "4.8", 
    reviews: "278", 
    sessions: "980+",
    exp: "6 yrs",
    status: "Available",
    tags: ["Technical", "AI", "Web Dev"],
    tagColors: { bg: ["#eff6ff", "#f5f3ff", "#ecfdf5"], text: ["#1e40af", "#5b21b6", "#065f46"] }
  },
  { 
    id: 3, 
    name: "Ananya Verma", 
    role: "Data Science &...", 
    location: "Mumbai, India",
    badge: { text: "EXPERT", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
    desc: "Making data science approachable — from Excel to neural networks step by step.",
    rating: "5", 
    reviews: "195", 
    sessions: "740+",
    exp: "5 yrs",
    status: "Busy",
    tags: ["Data Science", "Python", "MI"],
    tagColors: { bg: ["#f0fdf4", "#f0fdfa", "#eff6ff"], text: ["#166534", "#115e59", "#1e40af"] }
  },
  { 
    id: 4, 
    name: "Vikram Nair", 
    role: "Communi...", 
    location: "Hyderabad, India",
    badge: { text: "MOST BOOKED", bg: "#fff7ed", color: "#ea580c", border: "#ffedd5" },
    desc: "Transforming introverts into compelling speakers through structured daily practice.",
    rating: "4.9", 
    reviews: "421", 
    sessions: "1.5K+",
    exp: "10 yrs",
    status: "Available",
    tags: ["Communication", "Soft Skills", "Confidence"],
    tagColors: { bg: ["#fce7f3", "#fee2e2", "#fdf2f8"], text: ["#9d174d", "#991b1b", "#9d174d"] }
  }
];

function TrainerCard({ trainer, delay }) {
  return (
    <div 
      className="tr-card" 
      style={{ 
        animationDelay: `${delay}s`,
        background: "#ffffff",
        borderRadius: "24px",
        padding: "24px 20px 20px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 24px rgba(148, 163, 184, 0.05)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%"
      }}
    >
      {/* Top Profile Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", width: "54px", height: "54px", borderRadius: "50%", border: "1.5px solid #2563eb", padding: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#f1f5f9" }} />
            <span style={{ position: "absolute", bottom: "1px", right: "1px", width: "10px", height: "10px", borderRadius: "50%", background: trainer.status === "Available" ? "#22c55e" : "#cbd5e1", border: "2px solid #fff" }} />
          </div>
          
          <div>
            <h4 style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: "0 0 2px 0", display: "flex", alignItems: "center", gap: "4px" }}>
              {trainer.name}
              <span style={{ color: "#3b82f6", fontSize: "11px" }}>✓</span>
            </h4>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#64748b", margin: 0 }}>{trainer.role}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#94a3b8", margin: "2px 0 0 0", display: "flex", alignItems: "center", gap: "3px" }}>
              📍 {trainer.location}
            </p>
          </div>
        </div>

        <span style={{ 
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.02em",
          padding: "4px 8px", borderRadius: "6px", 
          background: trainer.badge.bg, color: trainer.badge.color,
          border: `1px solid ${trainer.badge.border}`
        }}>
          {trainer.badge.text}
        </span>
      </div>

      {/* Description Context snippet */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: "12.5px", color: "#475569", lineHeight: "1.5", margin: "0 0 14px 0", minHeight: "38px" }}>
        {trainer.desc}
      </p>

      {/* Star Reviews & Availability pills row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ color: "#f59e0b", fontSize: "12px", display: "flex", gap: "1px" }}>★★★★★</div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 700, color: "#1e293b", marginLeft: "2px" }}>{trainer.rating}</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#94a3b8" }}>({trainer.reviews} reviews)</span>
        </div>

        <span style={{ 
          fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "20px",
          background: trainer.status === "Available" ? "#ecfdf5" : "#f1f5f9",
          color: trainer.status === "Available" ? "#10b981" : "#64748b",
          display: "inline-flex", alignItems: "center", gap: "4px"
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: trainer.status === "Available" ? "#10b981" : "#94a3b8" }} />
          {trainer.status}
        </span>
      </div>

      {/* Three-column micro metrics matrix section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
        {[
          { label: "Sessions", val: trainer.sessions },
          { label: "Exp.", val: trainer.exp },
          { label: "Rating", val: `${trainer.rating} ★` }
        ].map((item) => (
          <div key={item.label} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "12px", padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{item.val}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "#94a3b8", margin: "2px 0 0 0" }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Topic Tag Category Row */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px", marginTop: "auto" }}>
        {trainer.tags.map((tag, idx) => (
          <span 
            key={tag} 
            style={{ 
              fontSize: "11px", fontWeight: 500, padding: "4px 10px", borderRadius: "8px",
              background: trainer.tagColors.bg[idx] || "#f1f5f9",
              color: trainer.tagColors.text[idx] || "#475569"
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Book Call Action button trigger */}
      <button 
        style={{ 
          width: "100%", background: "#1d4ed8", color: "#ffffff", border: "none", 
          borderRadius: "12px", padding: "11px", fontSize: "13px", fontWeight: 600,
          fontFamily: "var(--font-body)", cursor: "pointer", display: "flex", 
          alignItems: "center", justifyContent: "center", gap: "6px", transition: "background 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#1e40af"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#1d4ed8"}
      >
        Book a Session <span style={{ fontSize: "11px" }}>➔</span>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// GLOBAL STYLES — unified
// ─────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

  :root {
    --blue-primary: #2563eb;
    --font-display: 'Clash Display', sans-serif;
    --font-body:    'Satoshi', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: var(--font-body); background: #fff; margin: 0; }

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
  @keyframes underlineGrow {
    from { width:0; }
    to   { width:100%; }
  }
  @keyframes liveDot {
    0%,100% { opacity:1; }
    50%     { opacity:0.25; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .anim-fade-up  { animation:fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-slide-l  { animation:slideInLeft .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-scale-in { animation:scaleIn .6s cubic-bezier(.22,1,.36,1) both; }
  .delay-100 { animation-delay:.1s; }
  .delay-200 { animation-delay:.2s; }
  .delay-300 { animation-delay:.3s; }
  .delay-400 { animation-delay:.4s; }
  .delay-500 { animation-delay:.5s; }

  .hero-bg {
    background:linear-gradient(135deg,#eff6ff 0%,#f5f3ff 40%,#eef2ff 70%,#f0fdf4 100%);
    background-size:300% 300%;
    animation:gradientShift 12s ease infinite;
    position:relative;
    overflow:hidden;
  }
  .hero-bg::before {
    content:''; position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),
      linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);
    background-size:48px 48px;
    mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%);
    pointer-events:none;
  }

  .blob-blue {
    position:absolute; border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;
    background:radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%);
    animation:blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
    filter:blur(32px); pointer-events:none;
  }
  .blob-purple {
    position:absolute; border-radius:40% 60% 70% 30% / 40% 60% 30% 70%;
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

  .text-shimmer {
    background:linear-gradient(90deg,#1d4ed8 0%,#7c3aed 30%,#1d4ed8 60%,#0891b2 100%);
    background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:shimmer 4s linear infinite;
  }

  .heading-underline{position:relative;display:inline-block;}
  .heading-underline::after{content:'';position:absolute;bottom:-4px;left:0;height:3px;background:linear-gradient(90deg,#2563eb,#7c3aed);border-radius:2px;animation:underlineGrow 1s cubic-bezier(.22,1,.36,1) .8s both;}

  .live-dot{animation:liveDot 1.5s ease-in-out infinite;}

  .hero-inner {
    display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center;
    max-width:1280px; margin:0 auto; padding:5rem 1.5rem 4.5rem; position:relative; z-index:10;
  }
  @media(max-width:900px){
    .hero-inner{grid-template-columns:1fr;padding:3rem 1.25rem;text-align:center;}
    .hero-right{display:none;}
    .hero-stats{justify-content:center!important;}
  }

  .hero-img-wrap {
    position:relative; border-radius:24px; overflow:hidden;
    box-shadow:0 40px 80px rgba(37,99,235,0.2),0 16px 40px rgba(139,92,246,0.12);
    animation:floatY 6s ease-in-out infinite;
  }
  .hero-img-wrap img{width:100%;height:480px;object-fit:cover;display:block;}

  .filter-bar{
    background:rgba(255,255,255,0.85); border-bottom:1px solid rgba(37,99,235,0.1);
    backdrop-filter:blur(10px); padding:0 1rem; position:sticky; top:0; z-index:50;
  }
  .filter-scroll{display:flex;gap:8px;overflow-x:auto;padding:12px 0;scrollbar-width:none;max-width:1280px;margin:0 auto;}
  .filter-scroll::-webkit-scrollbar{display:none;}
  .f-tab{
    display:inline-flex;align-items:center;gap:6px; padding:8px 18px;border-radius:99px;
    font-family:var(--font-display);font-size:12px;font-weight:700;
    letter-spacing:0.04em;cursor:pointer;white-space:nowrap;
    flex-shrink:0;transition:all 0.18s cubic-bezier(0.22,1,0.36,1);border:none;
  }
  .f-tab:hover{transform:translateY(-2px);}

  .srch-wrap{
    display:flex;align-items:center; background:rgba(255,255,255,0.85);
    border:1px solid rgba(37,99,235,0.2); border-radius:99px;padding:6px 6px 6px 20px;
    box-shadow:0 4px 20px rgba(37,99,235,0.08); transition:border-color 0.2s,box-shadow 0.2s;
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

  .art-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  @media(max-width:1024px){.art-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:600px) {.art-grid{grid-template-columns:1fr;}}

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

  .feat-card{
    background:rgba(255,255,255,0.92);border:1px solid rgba(37,99,235,0.15);border-radius:22px;overflow:hidden;
    display:flex;flex-direction:row;backdrop-filter:blur(12px); box-shadow:0 8px 40px rgba(37,99,235,0.10);
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

  /* ── Redesigned Trainer Layout Styles ── */
  .tr-section { background: #f8fafc; position: relative; overflow: hidden; }
  .tr-blob-1 {
    position: absolute; width: 350px; height: 350px; top: -5%; left: -5%;
    background: radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%); filter: blur(50px); pointer-events: none;
  }
  .tr-blob-2 {
    position: absolute; width: 350px; height: 350px; bottom: -5%; right: -5%;
    background: radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%); filter: blur(50px); pointer-events: none;
  }
  .tr-fade-up { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .tr-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: #ffffff; border: 1px solid #e2e8f0;
    font-family: var(--font-body); font-weight: 600; font-size: 12px; color: #475569;
    padding: 6px 14px; border-radius: 99px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  .tr-dot-pulse { animation: liveDot 1.5s ease-in-out infinite; }
  .tr-shimmer {
    background: linear-gradient(90deg, #2563eb 0%, #06b6d4 50%, #2563eb 100%);
    background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; animation: shimmer 4s linear infinite; display: inline-block;
  }
  .tr-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 32px;
  }
  @media(max-width: 1150px) { .tr-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
  @media(max-width: 600px) { .tr-grid { grid-template-columns: 1fr; } }
  
  .tr-card { transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease; animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
  .tr-card:hover { transform: translateY(-4px); box-shadow: 0 20px 30px rgba(148, 163, 184, 0.12)!important; border-color: #cbd5e1!important; }
  
  .tr-load-btn {
    background: #ffffff; color: #334155; border: 1px solid #cbd5e1;
    padding: 12px 28px; border-radius: 99px; font-family: var(--font-body); font-size: 13px; font-weight: 600;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  .tr-load-btn:hover:not(:disabled) { background: #f8fafc; border-color: #94a3b8; transform: translateY(-1px); }
  .tr-load-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .tr-spin { animation: spin 1s linear infinite; }
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
// RESTORED: ARTICLES HERO COMPONENT
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
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#334155", letterSpacing: "-0.01em" }}>{num}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#94a3b8", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right anim-scale-in delay-300" style={{ position: "relative" }}>
          <div style={{
            position: "absolute", borderRadius: "50%", pointerEvents: "none",
            width: "80%", height: "70%", left: "10%", top: "10%",
            background: "radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%)",
            filter: "blur(52px)",
          }} />
          <div className="hero-img-wrap">
            <img src={featured.coverImg} alt={featured.title} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(37,99,235,0.06) 0%,transparent 50%,rgba(0,0,0,0.25) 100%)" }} />
            <div style={{ position: "absolute", top: 16, left: 16, background: col.pill, color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, padding: "7px 14px", borderRadius: 99 }}>{featured.cat}</div>
            {featured.trending && (
              <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(239,68,68,0.9)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, padding: "7px 14px", borderRadius: 99 }}>🔥 Trending</div>
            )}
            <div style={{ position: "absolute", bottom: 16, left: 16, display: "flex", alignItems: "center", gap: 6, background: "rgba(37,99,235,0.92)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, padding: "8px 14px", borderRadius: 99, boxShadow: "0 8px 24px rgba(37,99,235,0.4)" }}>📖 {featured.readTime} read</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function ArticlesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [inputVal,     setInputVal]     = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded,     setExpanded]     = useState(false);

  // Trainer Section State logic
  const [trVisibleCount, setTrVisibleCount] = useState(4);
  const [trLoading, setTrLoading] = useState(false);

  const handleLoadMoreTrainers = () => {
    setTrLoading(true);
    setTimeout(() => {
      setTrVisibleCount((prev) => Math.min(prev + 4, allTrainers.length));
      setTrLoading(false);
    }, 800);
  };

  const visibleTrainers = allTrainers.slice(0, trVisibleCount);
  const hasMoreTrainers = trVisibleCount < allTrainers.length;

  // Article filtration engine
  const filtered = ARTICLES.filter(a => {
    const matchF = activeFilter === "all" || a.catKey === activeFilter;
    const q      = searchQuery.toLowerCase();
    const matchS = !q
      || a.title.toLowerCase().includes(q)
      || a.cat.toLowerCase().includes(q)
      || a.tags.some(t => t.toLowerCase().includes(q));
    return matchF && matchS;
  });

  const visibleArticles = filtered.slice(0, visibleCount);

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

        {/* ══ ARTICLES FEED CONTENT ══ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1rem 3rem" }}>

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

          {visibleArticles.length > 0 ? (
            <div className="art-grid">
              {visibleArticles.map((a, i) => (
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

        {/* ══ EXACT REDESIGNED POPULAR TRAINERS SECTION ══ */}
        <section className="tr-section w-full px-4 sm:px-6 md:px-8 py-16" style={{ borderTop: "1px solid #f1f5f9", background: "#fcfdfe" }}>
          <div className="tr-blob-1" />
          <div className="tr-blob-2" />

          <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 10 }}>

            {/* Layout Header Matching Image Structure */}
            <div className="tr-fade-up" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#1e293b", margin: 0, letterSpacing: "-0.01em" }}>
                  Learn from <span className="tr-shimmer" style={{ fontWeight: 700 }}>Top Experts</span>
                </h2>
                <p style={{ fontFamily: "var(--font-body)", color: "#64748b", fontSize: "14px", marginTop: "6px", maxWidth: "460px", lineHeight: 1.5 }}>
                  Hand-picked trainers with verified credentials, real results, and thousands of happy learners.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { val: "1,200+", label: "Verified Trainers" },
                  { val: "4.9★",   label: "Avg Rating" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{ minWidth: "115px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "10px 14px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
                  >
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{s.val}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "#64748b", margin: "2px 0 0" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Redesigned Card Frame Container Grid */}
            <div className="tr-grid">
              {visibleTrainers.map((trainer, i) => (
                <TrainerCard
                  key={trainer.id}
                  trainer={trainer}
                  delay={i < 4 ? 0.05 + (i % 4) * 0.05 : 0}
                />
              ))}
            </div>

            {/* Action panel triggers */}
            {hasMoreTrainers && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "36px" }}>
                <button className="tr-load-btn" onClick={handleLoadMoreTrainers} disabled={trLoading}>
                  {trLoading ? (
                    <><Loader2 size={14} className="tr-spin" /> Loading...</>
                  ) : (
                    <><span>Load More Trainers</span> <ChevronRight size={14} /></>
                  )}
                </button>
              </div>
            )}

            {!hasMoreTrainers && trVisibleCount > 4 && (
              <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: "13px", color: "#94a3b8", marginTop: "32px" }}>
                You've seen all {allTrainers.length} trainers ✓
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
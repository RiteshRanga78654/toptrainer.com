"use client";
// PLACE AT: app/trainer/workshops/page.js

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Globe, EyeOff, Loader2, BookOpen,
  Users, LayoutGrid, FileText, AlertTriangle, Pencil, Trash2,
  ChevronLeft, Star, Clock, MapPin, Wifi, Play, Calendar,
  CheckCircle2, Shield, Award, TrendingUp, Camera,
} from "lucide-react";
import { workshopsAPI } from "../../lib/api";
import WorkshopFormModal from "./WorkshopFormModal";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');
:root{
  --ink:#0f1117;--ink2:#374151;--muted:#6b7280;--light:#9ca3af;
  --border:#e5e7eb;--surf:#f9fafb;--white:#fff;
  --blue:#2563eb;--violet:#7c3aed;--red:#dc2626;--green:#16a34a;
  --teal:#0891b2;--amber:#d97706;--pink:#db2777;--orange:#ea580c;
  --ffd:'DM Serif Display',serif;--ffb:'DM Sans',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:var(--ffb);background:#eef0f4;color:var(--ink);}

@keyframes fadeUp  {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn  {from{opacity:0}to{opacity:1}}
@keyframes slideL  {from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn {from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
@keyframes gradS   {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes shimmer {0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pulse   {0%,100%{opacity:1}50%{opacity:.5}}
@keyframes toastUp {from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes spin    {to{transform:rotate(360deg)}}
@keyframes floatY  {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

.page{min-height:100vh;padding-bottom:80px;background:#eef0f4;}
.inner{max-width:1200px;margin:0 auto;padding:0 28px;}
@media(max-width:640px){.inner{padding:0 14px;}}

/* ── TOPBAR ─────────────────────────────────────────── */
.topbar{
  background:rgba(255,255,255,.95);backdrop-filter:blur(12px);
  border-bottom:1px solid var(--border);padding:0 28px;height:62px;
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:100;box-shadow:0 1px 6px rgba(0,0,0,.06);
}
.brand{font-family:var(--ffd);font-size:1.15rem;color:var(--ink);display:flex;align-items:center;gap:9px;}
.brand-dot{width:9px;height:9px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--violet));}
.bc{font-size:.78rem;color:var(--light);}

/* ── HERO BANNER ─────────────────────────────────────── */
.hero-banner{
  background:linear-gradient(135deg,#eff6ff 0%,#f5f3ff 35%,#fdf4ff 55%,#fff1f2 75%,#f0fdf4 100%);
  background-size:300% 300%;animation:gradS 14s ease infinite;
  position:relative;overflow:hidden;
}
.hero-banner::before{
  content:'';position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 20% 30%,rgba(124,58,237,.08) 0%,transparent 50%),
    radial-gradient(circle at 80% 70%,rgba(37,99,235,.07) 0%,transparent 50%);
  pointer-events:none;
}
.hero-inner{
  max-width:1200px;margin:0 auto;padding:3rem 28px 2.6rem;
  display:flex;align-items:flex-end;justify-content:space-between;
  flex-wrap:wrap;gap:20px;position:relative;z-index:2;
}
.hero-left{animation:slideL .5s cubic-bezier(.22,1,.36,1) both;}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:7px;
  background:rgba(255,255,255,.85);backdrop-filter:blur(8px);
  border:1px solid rgba(37,99,235,.15);border-radius:99px;
  padding:5px 14px;font-size:.76rem;font-weight:700;color:var(--blue);
  letter-spacing:.05em;text-transform:uppercase;margin-bottom:14px;
}
.hero-dot{width:6px;height:6px;border-radius:50%;background:var(--blue);animation:pulse 2s ease-in-out infinite;}
.hero-h1{font-family:var(--ffd);font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.12;margin-bottom:10px;}
.hero-h1 em{
  font-style:italic;
  background:linear-gradient(90deg,var(--blue),var(--violet),var(--pink));
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 4s linear infinite;
}
.hero-sub{font-size:.9rem;color:var(--muted);max-width:440px;line-height:1.65;}
.btn-create{
  display:inline-flex;align-items:center;gap:8px;
  padding:11px 24px;border-radius:13px;
  background:linear-gradient(135deg,var(--blue),#1d4ed8);color:#fff;
  font-family:var(--ffb);font-size:.9rem;font-weight:700;
  border:none;cursor:pointer;
  box-shadow:0 6px 22px rgba(37,99,235,.35);
  transition:all .2s cubic-bezier(.22,1,.36,1);
}
.btn-create:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(37,99,235,.4);}

/* ── STATS ───────────────────────────────────────────── */
.stats-wrap{
  max-width:1200px;margin:0 auto;padding:0 28px;
  display:grid;grid-template-columns:repeat(4,1fr);gap:14px;
  margin-top:-28px;margin-bottom:28px;position:relative;z-index:3;
}
@media(max-width:768px){.stats-wrap{grid-template-columns:repeat(2,1fr);}}
.stat-card{
  background:rgba(255,255,255,.96);border-radius:18px;padding:16px 18px;
  display:flex;align-items:center;gap:13px;
  border:1px solid rgba(0,0,0,.06);box-shadow:0 4px 20px rgba(0,0,0,.06);
  animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;
}
.stat-ico{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.stat-val{font-family:var(--ffd);font-size:1.6rem;line-height:1;color:var(--ink);}
.stat-lbl{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-top:2px;}

/* ── CONTENT / FILTERS ───────────────────────────────── */
.content{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;flex-direction:column;gap:20px;}
.filter-bar{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.filter-group{
  display:flex;gap:4px;background:rgba(255,255,255,.9);
  border-radius:13px;border:1px solid rgba(0,0,0,.07);
  padding:4px;box-shadow:0 2px 8px rgba(0,0,0,.05);
}
.ftab{
  padding:7px 18px;border-radius:9px;font-family:var(--ffb);
  font-size:.82rem;font-weight:600;cursor:pointer;border:none;
  transition:all .18s;background:none;color:var(--muted);
}
.ftab.active{background:linear-gradient(135deg,var(--blue),#1d4ed8);color:#fff;box-shadow:0 3px 10px rgba(37,99,235,.3);}
.ftab:not(.active):hover{color:var(--ink);background:rgba(0,0,0,.04);}
.filter-count{margin-left:8px;font-size:.78rem;color:var(--muted);font-weight:600;background:rgba(255,255,255,.9);border:1px solid var(--border);border-radius:99px;padding:4px 12px;}

/* ── WORKSHOP GRID ───────────────────────────────────── */
.w-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:20px;}

/* ── WORKSHOP CARD ───────────────────────────────────── */
.w-card{
  background:rgba(255,255,255,.97);border-radius:22px;overflow:hidden;
  display:flex;flex-direction:column;
  border:1px solid rgba(37,99,235,.1);
  box-shadow:0 4px 22px rgba(37,99,235,.07);
  transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s ease,border-color .2s;
  animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;
  cursor:pointer;
}
.w-card:hover{transform:translateY(-6px);box-shadow:0 22px 54px rgba(37,99,235,.16);border-color:rgba(37,99,235,.28);}
.w-cover{position:relative;height:170px;overflow:hidden;flex-shrink:0;}
.w-cover-img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;display:block;}
.w-card:hover .w-cover-img{transform:scale(1.07);}
.w-cover-ph{width:100%;height:100%;background:linear-gradient(135deg,#eff6ff 0%,#f5f3ff 50%,#fdf4ff 100%);display:flex;align-items:center;justify-content:center;}
.w-badges{position:absolute;top:12px;left:12px;display:flex;gap:6px;flex-wrap:wrap;}
.badge{font-size:10px;font-weight:700;letter-spacing:.04em;padding:4px 11px;border-radius:99px;border:1px solid;backdrop-filter:blur(6px);}
.badge-pub{background:rgba(22,163,74,.15);color:#15803d;border-color:rgba(22,163,74,.3);}
.badge-draft{background:rgba(245,158,11,.15);color:#b45309;border-color:rgba(245,158,11,.3);}
.badge-feat{background:rgba(124,58,237,.15);color:#7c3aed;border-color:rgba(124,58,237,.3);}
.badge-live{background:rgba(239,68,68,.15);color:#dc2626;border-color:rgba(239,68,68,.3);}
.badge-live::before{content:'';display:inline-block;width:5px;height:5px;border-radius:50%;background:#dc2626;margin-right:4px;animation:pulse 1.2s ease-in-out infinite;}
.w-disc{position:absolute;top:12px;right:12px;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;font-size:10px;font-weight:800;padding:4px 9px;border-radius:8px;}
.w-body{padding:16px 18px 14px;flex:1;display:flex;flex-direction:column;gap:8px;}
.w-cat{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--blue);}
.w-title{font-family:var(--ffd);font-size:1rem;line-height:1.42;color:var(--ink);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.w-desc{font-size:.8rem;color:var(--muted);line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.w-meta{display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:.75rem;color:var(--light);}
.w-meta-item{display:flex;align-items:center;gap:4px;}
.w-price{margin-top:auto;padding-top:10px;display:flex;align-items:baseline;gap:8px;}
.w-price-main{font-family:var(--ffd);font-size:1.15rem;font-weight:700;color:var(--ink);}
.w-price-orig{font-size:.78rem;color:var(--light);text-decoration:line-through;}
.w-price-free{font-size:.82rem;font-weight:700;padding:3px 10px;border-radius:7px;background:rgba(22,163,74,.1);color:#15803d;border:1px solid rgba(22,163,74,.2);}
.w-foot{border-top:1px solid rgba(37,99,235,.07);padding:12px 18px;background:rgba(249,250,251,.8);display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0;}
.btn-toggle{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:9px;font-family:var(--ffb);font-size:.75rem;font-weight:700;cursor:pointer;border:none;transition:all .18s;}
.btn-toggle-pub{background:rgba(245,158,11,.12);color:#b45309;}
.btn-toggle-pub:hover{background:rgba(245,158,11,.22);}
.btn-toggle-draft{background:rgba(22,163,74,.12);color:#15803d;}
.btn-toggle-draft:hover{background:rgba(22,163,74,.22);}
.btn-toggle:disabled{opacity:.55;cursor:not-allowed;}
.w-acts{display:flex;gap:6px;}
.btn-act{width:34px;height:34px;border-radius:9px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .18s;}
.btn-edit{background:rgba(37,99,235,.1);color:var(--blue);}
.btn-edit:hover{background:rgba(37,99,235,.2);}
.btn-del{background:rgba(220,38,38,.08);color:var(--red);}
.btn-del:hover{background:rgba(220,38,38,.18);}

/* ── EMPTY / LOAD / ERROR ────────────────────────────── */
.empty{grid-column:1/-1;text-align:center;padding:80px 20px;animation:fadeUp .5s ease both;}
.empty-ico{width:72px;height:72px;border-radius:22px;margin:0 auto 18px;background:linear-gradient(135deg,#eff6ff,#f5f3ff);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(37,99,235,.1);}
.empty h3{font-family:var(--ffd);font-size:1.3rem;margin-bottom:8px;}
.empty p{font-size:.85rem;color:var(--muted);max-width:300px;margin:0 auto 22px;line-height:1.7;}
.btn-empty{display:inline-flex;align-items:center;gap:7px;padding:11px 24px;border-radius:12px;background:linear-gradient(135deg,var(--blue),#1d4ed8);color:#fff;font-family:var(--ffb);font-size:.88rem;font-weight:700;border:none;cursor:pointer;box-shadow:0 5px 18px rgba(37,99,235,.3);transition:all .18s;}
.btn-empty:hover{transform:translateY(-2px);}
.load-wrap{display:flex;align-items:center;justify-content:center;padding:80px 20px;}
.spin{animation:spin .8s linear infinite;color:var(--blue);}
.err-box{background:rgba(254,242,242,.9);border:1px solid rgba(220,38,38,.2);border-radius:14px;padding:14px 18px;font-size:.84rem;color:var(--red);display:flex;align-items:center;gap:10px;}
.btn-retry{margin-left:auto;font-size:.75rem;text-decoration:underline;cursor:pointer;background:none;border:none;color:var(--red);}

/* ── DIALOG / TOAST ──────────────────────────────────── */
.overlay{position:fixed;inset:0;z-index:300;background:rgba(15,17,23,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;}
.dialog{background:white;border-radius:22px;padding:28px 26px;max-width:360px;width:100%;text-align:center;box-shadow:0 28px 80px rgba(0,0,0,.2);animation:scaleIn .25s cubic-bezier(.22,1,.36,1) both;}
.dialog-ico{width:52px;height:52px;border-radius:16px;background:#fee2e2;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.dialog h3{font-family:var(--ffd);font-size:1.05rem;color:var(--ink);margin-bottom:8px;}
.dialog p{font-size:.84rem;color:var(--muted);line-height:1.65;margin-bottom:22px;}
.dialog p strong{color:var(--ink2);}
.dialog-btns{display:flex;gap:10px;}
.dialog-btns button{flex:1;padding:11px;border-radius:12px;font-family:var(--ffb);font-size:.84rem;font-weight:700;cursor:pointer;}
.btn-keep{background:white;color:var(--muted);border:1px solid var(--border);}
.btn-kill{background:var(--red);color:white;border:none;box-shadow:0 4px 14px rgba(220,38,38,.3);}
.btn-kill:disabled{opacity:.6;cursor:not-allowed;}
.toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:white;border:1px solid #bbf7d0;border-radius:99px;padding:10px 24px;font-size:.82rem;font-weight:600;color:var(--ink);box-shadow:0 8px 32px rgba(0,0,0,.1);z-index:400;animation:toastUp .3s ease both;white-space:nowrap;}

/* ════════════════════════════════════════════════════════
   DETAIL VIEW
   ════════════════════════════════════════════════════════ */
.dw{animation:scaleIn .4s cubic-bezier(.22,1,.36,1) both;}
.dhero{
  background:linear-gradient(135deg,#eef2ff 0%,#f5f3ff 40%,#eff6ff 70%,#ecfeff 100%);
  background-size:300% 300%;animation:gradS 12s ease infinite;
  position:relative;overflow:hidden;
}
.dhero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
.dhero-inner{
  max-width:1200px;margin:0 auto;padding:2.8rem 28px 2.4rem;
  display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;
  position:relative;z-index:2;
}
@media(max-width:960px){.dhero-inner{grid-template-columns:1fr;}.dhero-right{display:none!important;}}
.dnav{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:18px;}
.chip-back{
  display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border-radius:99px;
  background:rgba(255,255,255,.85);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.9);
  font-size:.78rem;font-weight:700;color:var(--ink2);cursor:pointer;transition:all .18s;
}
.chip-back:hover{background:white;color:var(--ink);}
.chip-cat{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:99px;background:rgba(37,99,235,.1);color:var(--blue);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;}
.chip-live{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:99px;background:#dc2626;color:#fff;font-size:11px;font-weight:700;}
.chip-live-dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:pulse 1.2s ease-in-out infinite;}
.dtitle{font-family:var(--ffd);font-size:clamp(1.8rem,4vw,3rem);line-height:1.1;color:var(--ink);margin-bottom:12px;letter-spacing:-.02em;}
.dtitle-grad{
  background:linear-gradient(90deg,var(--blue),var(--violet));
  background-size:200% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 4s linear infinite;
}
.ddesc{font-size:.96rem;color:#475569;line-height:1.75;margin-bottom:14px;max-width:520px;}
.d-rating-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-size:.82rem;color:var(--muted);margin-bottom:16px;}
.d-stars{display:flex;align-items:center;gap:4px;color:#f59e0b;font-weight:700;font-size:.92rem;}
.d-rating-item{display:flex;align-items:center;gap:5px;}
.d-seats-alert{color:#dc2626;font-weight:700;}
.d-hero-stats{display:flex;gap:18px;flex-wrap:wrap;margin-bottom:18px;}
.d-hstat{display:flex;flex-direction:column;}
.d-hstat-val{font-family:var(--ffd);font-size:1.6rem;font-weight:700;color:var(--ink);line-height:1;}
.d-hstat-sep{width:5px;height:5px;border-radius:50%;background:var(--blue);align-self:flex-end;margin-bottom:6px;}
.d-hstat-lbl{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--light);}
.dhero-img-wrap{position:relative;border-radius:24px;overflow:hidden;box-shadow:0 32px 72px rgba(37,99,235,.18),0 12px 32px rgba(124,58,237,.1);animation:floatY 6s ease-in-out infinite;}
.dhero-img{width:100%;height:420px;object-fit:cover;display:block;}
.dhero-img-ph{width:100%;height:420px;background:linear-gradient(135deg,#eff6ff,#f5f3ff);display:flex;align-items:center;justify-content:center;color:#c4b5fd;}
.img-badge{position:absolute;display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:99px;font-size:11px;font-weight:700;}
.img-badge-cat{top:14px;left:14px;background:#f59e0b;color:#fff;}
.img-badge-disc{top:14px;right:14px;background:var(--blue);color:#fff;}
.img-badge-dur{bottom:14px;left:14px;background:var(--blue);color:#fff;}
.img-badge-seats{bottom:14px;right:14px;background:#dc2626;color:#fff;}
.dbody{max-width:1200px;margin:0 auto;padding:24px 28px 60px;}
@media(max-width:640px){.dbody{padding:16px 14px 60px;}}
.dgrid{display:grid;grid-template-columns:1fr 300px;gap:22px;align-items:start;}
@media(max-width:960px){.dgrid{grid-template-columns:1fr;}.dsidebar{display:none!important;}}
.action-bar{
  display:flex;align-items:center;gap:8px;flex-wrap:wrap;
  padding:12px 18px;border-radius:14px;margin-bottom:20px;
  background:rgba(255,255,255,.9);border:1px solid rgba(37,99,235,.09);
  box-shadow:0 3px 16px rgba(37,99,235,.05);
}
.ab-meta{font-size:.78rem;color:var(--light);flex:1;font-weight:500;}
.ab-sep{width:1px;height:22px;background:var(--border);flex-shrink:0;}
.ab-edit{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:.76rem;font-weight:700;font-family:var(--ffb);background:rgba(37,99,235,.08);color:var(--blue);border:1px solid rgba(37,99,235,.2);transition:all .15s;}
.ab-edit:hover{background:rgba(37,99,235,.14);}
.ab-del{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:.76rem;font-weight:700;font-family:var(--ffb);background:rgba(220,38,38,.07);color:var(--red);border:1px solid rgba(220,38,38,.18);transition:all .15s;}
.ab-del:hover{background:rgba(220,38,38,.13);}
.sec{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:clamp(18px,3vw,28px);box-shadow:0 4px 20px rgba(37,99,235,.05);margin-bottom:16px;}
.sec-title{font-family:var(--ffd);font-size:1.05rem;color:var(--ink);margin-bottom:16px;display:flex;align-items:center;gap:9px;}
.sec-title-bar{display:inline-block;width:4px;height:20px;border-radius:3px;background:linear-gradient(180deg,var(--blue),var(--violet));flex-shrink:0;}
.sec-text{font-size:.92rem;color:#475569;line-height:1.85;}
.learn-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
@media(max-width:500px){.learn-grid{grid-template-columns:1fr;}}
.learn-item{
  display:flex;align-items:center;gap:12px;
  padding:13px 16px;border-radius:14px;
  background:#f8fafc;border:1px solid #e2e8f0;
  font-size:.86rem;font-weight:600;color:var(--ink2);
}
.learn-ico{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--blue),var(--violet));display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.topics{display:flex;flex-wrap:wrap;gap:8px;}
.topic-tag{padding:6px 14px;border-radius:9px;font-size:.82rem;font-weight:700;color:var(--ink2);background:#f1f5f9;border:1px solid #e2e8f0;}
.snap-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.snap-item{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:16/9;}
.snap-img{width:100%;height:100%;object-fit:cover;display:block;}
.snap-label{position:absolute;bottom:8px;left:8px;background:rgba(15,17,23,.7);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px;backdrop-filter:blur(4px);}
.snap-live{position:absolute;top:8px;left:8px;background:#dc2626;color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;display:flex;align-items:center;gap:4px;}
.snap-live-dot{width:5px;height:5px;border-radius:50%;background:#fff;animation:pulse 1.2s infinite;}
.conduct-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
@media(max-width:640px){.conduct-grid{grid-template-columns:repeat(2,1fr);}}
.conduct-item{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;gap:7px;text-align:center;}
.conduct-ico-wrap{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;justify-content:center;}
.conduct-lbl{font-weight:700;font-size:.82rem;color:var(--ink2);}
.conduct-sub{font-size:.72rem;color:var(--light);}
.guarantee-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px;}
@media(max-width:640px){.guarantee-grid{grid-template-columns:repeat(2,1fr);}}
.sidebar-sticky{position:sticky;top:82px;display:flex;flex-direction:column;gap:14px;}
.trainer-card{background:white;border:1px solid #e2e8f0;border-radius:18px;padding:18px;box-shadow:0 4px 18px rgba(37,99,235,.06);}
.trainer-head{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--light);margin-bottom:12px;}
.trainer-info{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.trainer-av{width:54px;height:54px;border-radius:14px;object-fit:cover;flex-shrink:0;}
.trainer-av-ph{width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#eff6ff,#f5f3ff);display:flex;align-items:center;justify-content:center;color:#818cf8;font-family:var(--ffd);font-weight:700;font-size:18px;flex-shrink:0;}
.trainer-name{font-family:var(--ffd);font-weight:700;font-size:1rem;color:var(--ink);}
.trainer-role{font-size:.78rem;color:var(--muted);}
.trainer-exp{font-size:.76rem;color:var(--blue);font-weight:700;display:flex;align-items:center;gap:4px;margin-top:3px;}
.trainer-students{display:flex;align-items:center;gap:8px;background:#f8fafc;border-radius:11px;padding:9px 13px;border:1px solid #e2e8f0;margin-bottom:10px;font-size:.82rem;color:var(--muted);}
.trainer-students strong{color:var(--ink);font-family:var(--ffd);font-size:.96rem;}
.cert-lbl{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--light);margin-bottom:8px;}
.cert-item{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:8px 12px;font-size:.8rem;font-weight:600;color:var(--ink2);margin-bottom:6px;}
.pricing-card{background:white;border:1px solid #e2e8f0;border-radius:18px;padding:18px;box-shadow:0 4px 18px rgba(37,99,235,.06);}
.price-tag{display:inline-flex;align-items:center;gap:8px;margin-bottom:4px;}
.price-disc-badge{background:#16a34a;color:#fff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:8px;display:flex;align-items:center;gap:4px;}
.price-orig{font-size:.82rem;color:var(--light);text-decoration:line-through;}
.price-save{font-size:.82rem;color:#16a34a;font-weight:700;}
.price-main{font-family:var(--ffd);font-size:2rem;color:var(--ink);line-height:1;margin-bottom:4px;}
.price-emi{font-size:.75rem;color:var(--muted);margin-bottom:14px;display:flex;align-items:center;gap:5px;}
.btn-enroll{width:100%;padding:14px;border-radius:13px;background:linear-gradient(135deg,var(--blue),#1d4ed8);color:#fff;font-family:var(--ffb);font-size:.96rem;font-weight:700;border:none;cursor:pointer;box-shadow:0 5px 18px rgba(37,99,235,.3);transition:all .18s;display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:8px;}
.btn-enroll:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,99,235,.4);}
.btn-schedule{width:100%;padding:11px;border-radius:13px;background:white;color:var(--ink2);font-family:var(--ffb);font-size:.88rem;font-weight:700;border:1.5px solid var(--border);cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:14px;}
.btn-schedule:hover{background:var(--surf);}
.incl-list{display:flex;flex-direction:column;gap:7px;margin-bottom:12px;}
.incl-item{display:flex;align-items:center;gap:8px;font-size:.82rem;color:var(--ink2);font-weight:500;}
.seats-alert{background:#fef2f2;border:1px solid rgba(220,38,38,.2);border-radius:11px;padding:10px 13px;font-size:.8rem;color:#dc2626;font-weight:700;display:flex;align-items:center;gap:6px;}
.seats-dot{width:7px;height:7px;border-radius:50%;background:#dc2626;flex-shrink:0;animation:pulse 1.2s infinite;}
`;

// ─── Formatters ───────────────────────────────────────────────────────────────
function fmt(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n || 0);
}

function discountPct(w) {
  if (w.price?.discounted && w.price?.original && w.price.original > 0)
    return Math.round(((w.price.original - w.price.discounted) / w.price.original) * 100);
  return null;
}

/** Read duration from schema's { value, unit } object */
function durStr(w) {
  if (!w.duration) return "";
  if (typeof w.duration === "object") return `${w.duration.value || ""} ${w.duration.unit || ""}`.trim();
  return String(w.duration);
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const STATS_CONFIG = [
  { label: "Total",     key: "total",     color: "#2563eb", bg: "rgba(37,99,235,.1)",  icon: LayoutGrid },
  { label: "Published", key: "published", color: "#16a34a", bg: "rgba(22,163,74,.1)",  icon: Globe       },
  { label: "Drafts",    key: "drafts",    color: "#d97706", bg: "rgba(245,158,11,.1)", icon: FileText    },
  { label: "Seats",     key: "seats",     color: "#7c3aed", bg: "rgba(124,58,237,.1)", icon: Users       },
];
function StatsBar({ workshops }) {
  const values = {
    total:     workshops.length,
    published: workshops.filter(w => w.status === "published").length,
    drafts:    workshops.filter(w => w.status === "draft").length,
    seats:     workshops.reduce((s, w) => s + (Number(w.seats) || 0), 0),
  };
  return (
    <div className="stats-wrap">
      {STATS_CONFIG.map(({ label, key, color, bg, icon: Icon }, i) => (
        <div key={key} className="stat-card" style={{ animationDelay: `${i * 70}ms` }}>
          <div className="stat-ico" style={{ background: bg }}><Icon size={20} color={color} /></div>
          <div>
            <div className="stat-val">{values[key].toLocaleString()}</div>
            <div className="stat-lbl">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Workshop Card ────────────────────────────────────────────────────────────
function WorkshopCard({ workshop: w, onView, onEdit, onDelete, onToggleStatus, toggling, delay }) {
  const disc       = discountPct(w);
  const isPublished = w.status === "published";
  const dur         = durStr(w);

  return (
    <div className="w-card" style={{ animationDelay: `${delay}ms` }} onClick={() => onView(w)}>
      <div className="w-cover">
        {w.coverImg
          ? <img src={w.coverImg} alt={w.title} className="w-cover-img" />
          : <div className="w-cover-ph"><BookOpen size={38} style={{ color: "#c4b5fd" }} /></div>
        }
        <div className="w-badges">
          <span className={`badge ${isPublished ? "badge-pub" : "badge-draft"}`}>{w.status}</span>
          {w.isFeatured && <span className="badge badge-feat">Featured</span>}
          {w.isLive     && <span className="badge badge-live">Live</span>}
        </div>
        {disc && <div className="w-disc">{disc}% off</div>}
      </div>
      <div className="w-body">
        <p className="w-cat">{w.category || "Uncategorized"}</p>
        <h3 className="w-title">{w.title}</h3>
        {w.shortDesc && <p className="w-desc">{w.shortDesc}</p>}
        <div className="w-meta">
          {dur && <span className="w-meta-item"><Clock size={11} /> {dur}</span>}
          {w.seats && <span className="w-meta-item"><Users size={11} /> {w.seats} seats</span>}
          {w.mode   && <span className="w-meta-item" style={{ textTransform:"capitalize" }}>{w.mode}</span>}
        </div>
        <div className="w-price">
          {w.price?.discounted
            ? <><span className="w-price-main">{fmt(w.price.discounted)}</span><span className="w-price-orig">{fmt(w.price.original)}</span></>
            : w.price?.original
              ? <span className="w-price-main">{fmt(w.price.original)}</span>
              : <span className="w-price-free">Free</span>
          }
        </div>
      </div>
      <div className="w-foot" onClick={e => e.stopPropagation()}>
        <button
          className={`btn-toggle ${isPublished ? "btn-toggle-pub" : "btn-toggle-draft"}`}
          onClick={() => onToggleStatus(w)}
          disabled={toggling === w._id}
        >
          {toggling === w._id
            ? <Loader2 size={13} className="spin" />
            : isPublished ? <><EyeOff size={13} /> Unpublish</> : <><Globe size={13} /> Publish</>
          }
        </button>
        <div className="w-acts">
          <button className="btn-act btn-edit" title="Edit"   onClick={() => onEdit(w)}><Pencil size={14} /></button>
          <button className="btn-act btn-del"  title="Delete" onClick={() => onDelete(w)}><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Detail View ──────────────────────────────────────────────────────────────
function WorkshopDetail({ w, onBack, onEdit, onDelete }) {
  const disc    = discountPct(w);
  const savings = w.price?.original && w.price?.discounted ? w.price.original - w.price.discounted : null;
  const dur     = durStr(w);

  // ── What You'll Learn  →  price.includes (array)
  const includes = Array.isArray(w.price?.includes) && w.price.includes.length > 0
    ? w.price.includes
    : [];

  // ── Learning Outcomes  →  learningOutcomes (array)
  const outcomes = Array.isArray(w.learningOutcomes) && w.learningOutcomes.length > 0
    ? w.learningOutcomes
    : [];

  // Show whichever is populated; prefer outcomes over includes for the "learn" list
  const learnItems = outcomes.length > 0 ? outcomes : includes;

  // ── Topics / Tags  →  tags (array)
  const topics = Array.isArray(w.tags) && w.tags.length > 0 ? w.tags : [];

  // ── Certifications  →  certifications (array)
  const certs = Array.isArray(w.certifications) ? w.certifications : [];

  // ── Session Snapshots  →  photos [{ src, label }]
  const gallery = Array.isArray(w.photos) ? w.photos : [];

  // ── About text: fullDesc first, then shortDesc
  const aboutText = w.fullDesc || w.shortDesc || "";

  // ── Conduct modes derived from classTypes + mode
  const conductModes = [];
  if (Array.isArray(w.classTypes) && w.classTypes.length > 0) {
    const iconMap = {
      live:     { icon: <Wifi size={20} />,     label: "Live Online",  color:"#2563eb", bg:"#eff6ff" },
      offline:  { icon: <MapPin size={20} />,   label: "Offline",      color:"#7c3aed", bg:"#f5f3ff" },
      recorded: { icon: <Play size={20} />,     label: "Recorded",     color:"#db2777", bg:"#fdf4ff" },
      workshop: { icon: <Calendar size={20} />, label: "Workshop",     color:"#ea580c", bg:"#fff7ed" },
    };
    w.classTypes.forEach(ct => {
      const cfg = iconMap[ct.type] || { icon: <Calendar size={20} />, label: ct.type, color:"#6b7280", bg:"#f9fafb" };
      conductModes.push({ ...cfg, sub: ct.count ? `${ct.count} sessions` : "See schedule" });
    });
  } else {
    // Fallback from `mode` field
    if (w.mode === "online"  || w.mode === "hybrid")  conductModes.push({ icon: <Wifi size={20} />,    label:"Live Online", sub:"Online sessions", color:"#2563eb", bg:"#eff6ff" });
    if (w.mode === "offline" || w.mode === "hybrid")  conductModes.push({ icon: <MapPin size={20} />,  label:"Offline",     sub:"In-person",       color:"#7c3aed", bg:"#f5f3ff" });
    conductModes.push({ icon: <Calendar size={20} />, label:"Workshop", sub:"Multiple batches", color:"#ea580c", bg:"#fff7ed" });
  }

  const guarantees = [
    { icon: <Shield size={20} />,    label:"Money Back",     sub:"7-day guarantee", color:"#16a34a", bg:"#f0fdf4" },
    { icon: <Award size={20} />,     label:"Certificate",    sub:"On completion",   color:"#7c3aed", bg:"#f5f3ff" },
    { icon: <Users size={20} />,     label:"Community",      sub:"Peer network",    color:"#2563eb", bg:"#eff6ff" },
    { icon: <TrendingUp size={20} />,label:"Career Support", sub:"Post-workshop",   color:"#d97706", bg:"#fffbeb" },
  ];

  // ── Trainer info (populated by backend)
  const trainer = w.trainer || {};
  const trainerName = trainer.name || "Trainer";
  const trainerAvatar = trainer.profileImage || trainer.avatar || "";
  const trainerRole = trainer.designation || trainer.role || "";

  const titleWords = (w.title || "").split(" ");
  const cut = Math.ceil(titleWords.length * 0.55);

  return (
    <div className="dw">
      {/* HERO */}
      <div className="dhero">
        <div className="dhero-inner">
          <div>
            <div className="dnav">
              <button className="chip-back" onClick={onBack}><ChevronLeft size={14} /> All Workshops</button>
              {w.category && <span className="chip-cat">{w.category}</span>}
              {w.isLive   && <span className="chip-live"><span className="chip-live-dot" /> LIVE NOW</span>}
            </div>

            <h1 className="dtitle">
              {titleWords.slice(0, cut).join(" ")}{" "}
              <span className="dtitle-grad">{titleWords.slice(cut).join(" ")}</span>
            </h1>

            <p className="ddesc">{w.shortDesc}</p>

            {/* Rating row */}
            <div className="d-rating-row">
              {w.rating > 0 && (
                <span className="d-rating-item d-stars">
                  <Star size={14} fill="#f59e0b" stroke="none" /> {w.rating}
                  <span style={{ color:"var(--light)", fontWeight:400 }}>({w.reviews || 0})</span>
                </span>
              )}
              {dur && <span className="d-rating-item"><Clock size={12} /> {dur}</span>}
              {w.seats > 0 && <span className="d-rating-item"><Users size={12} /> {w.seats} seats</span>}
            </div>

            {/* Stats */}
            <div className="d-hero-stats">
              {w.rating > 0 && (
                <div className="d-hstat">
                  <span className="d-hstat-val">{w.rating}</span>
                  <span className="d-hstat-lbl">Expert Rating</span>
                </div>
              )}
              {w.seats > 0 && (
                <>
                  <span className="d-hstat-sep" />
                  <div className="d-hstat">
                    <span className="d-hstat-val">{w.seats}</span>
                    <span className="d-hstat-lbl">Total Seats</span>
                  </div>
                </>
              )}
              {disc && (
                <>
                  <span className="d-hstat-sep" />
                  <div className="d-hstat">
                    <span className="d-hstat-val">{disc}% OFF</span>
                    <span className="d-hstat-lbl">Limited Discount</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Floating image */}
          <div className="dhero-right">
            <div className="dhero-img-wrap">
              {w.coverImg
                ? <img src={w.coverImg} alt={w.title} className="dhero-img" />
                : <div className="dhero-img-ph"><BookOpen size={48} /></div>
              }
              {w.category  && <span className="img-badge img-badge-cat">{w.category}</span>}
              {disc        && <span className="img-badge img-badge-disc">⚡ {disc}% OFF</span>}
              {dur         && <span className="img-badge img-badge-dur"><Clock size={11} /> {dur}</span>}
              {w.seats > 0 && <span className="img-badge img-badge-seats"><Users size={11} /> {w.seats} seats</span>}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="dbody">
        <div className="action-bar">
          <span className="ab-meta">
            {w.status}
            {dur && ` · ${dur}`}
            {w.location && ` · ${w.location}`}
          </span>
          <span className="ab-sep" />
          <button className="ab-edit" onClick={() => onEdit(w)}><Pencil size={13} /> Edit</button>
          <button className="ab-del"  onClick={() => onDelete(w)}><Trash2 size={13} /> Delete</button>
        </div>

        <div className="dgrid">
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* About This Workshop */}
            {aboutText && (
              <div className="sec">
                <h2 className="sec-title"><span className="sec-title-bar" />About This Workshop</h2>
                <p className="sec-text">{aboutText}</p>
              </div>
            )}

            {/* What You'll Learn */}
            {learnItems.length > 0 && (
              <div className="sec">
                <h2 className="sec-title"><span className="sec-title-bar" />What You&apos;ll Learn</h2>
                <div className="learn-grid">
                  {learnItems.map((item, i) => (
                    <div key={i} className="learn-item">
                      <div className="learn-ico"><CheckCircle2 size={16} color="#fff" /></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included (if different from outcomes) */}
            {includes.length > 0 && outcomes.length > 0 && (
              <div className="sec">
                <h2 className="sec-title"><span className="sec-title-bar" />What&apos;s Included</h2>
                <div className="learn-grid">
                  {includes.map((item, i) => (
                    <div key={i} className="learn-item">
                      <div className="learn-ico"><CheckCircle2 size={16} color="#fff" /></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topics Covered */}
            {topics.length > 0 && (
              <div className="sec">
                <h2 className="sec-title"><span className="sec-title-bar" />Topics Covered</h2>
                <div className="topics">
                  {topics.map((t, i) => <span key={i} className="topic-tag">{t}</span>)}
                </div>
              </div>
            )}

            {/* Session Snapshots */}
            {gallery.length > 0 && (
              <div className="sec">
                <h2 className="sec-title"><span className="sec-title-bar" /><Camera size={16} style={{ marginRight:4 }} /> Session Snapshots</h2>
                <div className="snap-grid">
                  {gallery.slice(0, 4).map((img, i) => (
                    <div key={i} className="snap-item">
                      <img src={img.src || img.url} alt={img.label || `Session ${i+1}`} className="snap-img" />
                      {img.label && <div className="snap-label">{img.label}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How It's Conducted */}
            <div className="sec">
              <h2 className="sec-title"><span className="sec-title-bar" />How It&apos;s Conducted</h2>
              <div className="conduct-grid">
                {conductModes.map(({ icon, label, sub, color, bg }, i) => (
                  <div key={i} className="conduct-item">
                    <div className="conduct-ico-wrap" style={{ background:bg }}>
                      <span style={{ color }}>{icon}</span>
                    </div>
                    <span className="conduct-lbl">{label}</span>
                    <span className="conduct-sub">{sub}</span>
                  </div>
                ))}
              </div>
              <div className="guarantee-grid" style={{ marginTop:14 }}>
                {guarantees.map(({ icon, label, sub, color, bg }, i) => (
                  <div key={i} className="conduct-item">
                    <div className="conduct-ico-wrap" style={{ background:bg }}>
                      <span style={{ color }}>{icon}</span>
                    </div>
                    <span className="conduct-lbl">{label}</span>
                    <span className="conduct-sub">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule info */}
            {(w.dateRange || w.timeSlot || w.location) && (
              <div className="sec">
                <h2 className="sec-title"><span className="sec-title-bar" />Schedule &amp; Venue</h2>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {w.dateRange && (
                    <div className="learn-item">
                      <div className="learn-ico"><Calendar size={16} color="#fff" /></div>
                      {w.dateRange}
                    </div>
                  )}
                  {w.timeSlot && (
                    <div className="learn-item">
                      <div className="learn-ico" style={{ background:"linear-gradient(135deg,#d97706,#b45309)" }}><Clock size={16} color="#fff" /></div>
                      {w.timeSlot}
                    </div>
                  )}
                  {w.location && (
                    <div className="learn-item">
                      <div className="learn-ico" style={{ background:"linear-gradient(135deg,#7c3aed,#5b21b6)" }}><MapPin size={16} color="#fff" /></div>
                      {w.location}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="dsidebar sidebar-sticky">
            {/* Trainer card */}
            <div className="trainer-card">
              <p className="trainer-head">Your Trainer</p>
              <div className="trainer-info">
                {trainerAvatar
                  ? <img src={trainerAvatar} alt={trainerName} className="trainer-av" />
                  : <div className="trainer-av-ph">{trainerName[0]}</div>
                }
                <div>
                  <div className="trainer-name">{trainerName}</div>
                  {trainerRole && <div className="trainer-role">{trainerRole}</div>}
                </div>
              </div>
              {certs.length > 0 && (
                <>
                  <p className="cert-lbl">Certifications</p>
                  {certs.map((c, i) => (
                    <div key={i} className="cert-item">
                      <CheckCircle2 size={13} style={{ color:"var(--blue)", flexShrink:0 }} />
                      {c}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Pricing card */}
            <div className="pricing-card">
              {disc && (
                <div className="price-tag">
                  <span className="price-disc-badge">⚡ {disc}% OFF</span>
                  {w.price?.original && <span className="price-orig">{fmt(w.price.original)}</span>}
                  {savings > 0 && <span className="price-save">Save {fmt(savings)}</span>}
                </div>
              )}
              <div className="price-main">
                {w.price?.discounted
                  ? fmt(w.price.discounted)
                  : w.price?.original
                    ? fmt(w.price.original)
                    : "Free"
                }
              </div>
              {w.price?.emi > 0 && (
                <p className="price-emi">
                  <TrendingUp size={11} style={{ color:"var(--blue)" }} />
                  EMI from {fmt(w.price.emi)}/month
                </p>
              )}
              <button className="btn-enroll">Enroll Now →</button>
              <button className="btn-schedule"><Calendar size={14} /> View Schedule</button>
              {includes.length > 0 && (
                <div className="incl-list">
                  {includes.map((item, i) => (
                    <div key={i} className="incl-item">
                      <CheckCircle2 size={14} style={{ color:"#16a34a", flexShrink:0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TrainerWorkshopsPage() {
  const [view,       setView]       = useState("list");
  const [workshops,  setWorkshops]  = useState([]);
  const [sel,        setSel]        = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [showModal,  setShowModal]  = useState(false);
  const [editing,    setEditing]    = useState(null);
  const [deleting,   setDeleting]   = useState(null);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [toggling,   setToggling]   = useState(null);
  const [filter,     setFilter]     = useState("all");
  const [toast,      setToast]      = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const fetchWorkshops = useCallback(async () => {
    setLoading(true); setFetchError("");
    try {
      const res  = await workshopsAPI.getAll({ mine: true });
      const list = res.data?.data || res.data || [];
      setWorkshops(Array.isArray(list) ? list : []);
    } catch (err) {
      setFetchError(err.response?.data?.message || err.message || "Failed to load workshops.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchWorkshops(); }, [fetchWorkshops]);

  function goList()     { setView("list"); setSel(null); }
  function goDetail(w)  { setSel(w);       setView("detail"); }
  function openCreate() { setEditing(null); setShowModal(true); }
  function openEdit(w)  { setEditing(w);    setShowModal(true); }
  function closeModal() { setEditing(null); setShowModal(false); }

  async function handleSave(payload, id) {
    if (id) {
      const res     = await workshopsAPI.update(id, payload);
      const updated = res.data?.data || res.data;
      setWorkshops(prev => prev.map(w => w._id === id ? updated : w));
      if (sel?._id === id) setSel(updated);
      showToast("✅ Workshop updated!");
    } else {
      const res     = await workshopsAPI.create(payload);
      const created = res.data?.data || res.data;
      setWorkshops(prev => [created, ...prev]);
      showToast("🎉 Workshop created!");
    }
    closeModal();
  }

  async function handleDeleteConfirm() {
    if (!deleting) return;
    setDeleteLoad(true);
    try {
      await workshopsAPI.delete(deleting._id);
      setWorkshops(prev => prev.filter(w => w._id !== deleting._id));
      if (sel?._id === deleting._id) goList();
      setDeleting(null);
      showToast("🗑️ Workshop deleted.");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    } finally { setDeleteLoad(false); }
  }

  async function handleToggleStatus(w) {
    const next = w.status === "published" ? "draft" : "published";
    setToggling(w._id);
    try {
      const res     = await workshopsAPI.updateStatus(w._id, next);
      const updated = res.data?.data || { ...w, status: next };
      setWorkshops(prev => prev.map(x => x._id === w._id ? updated : x));
      if (sel?._id === w._id) setSel(updated);
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed.");
    } finally { setToggling(null); }
  }

  const visible = workshops.filter(w => filter === "all" || w.status === filter);

  return (
    <>
      <style>{CSS}</style>
      <div className="page">

       {toast && <div className="toast">{toast}</div>}

        {/* ═════ LIST VIEW ═════ */}
        {view === "list" && (
          <>
            <div className="hero-banner">
              <div className="hero-inner">
                <div className="hero-left">
                  <div className="hero-eyebrow"><span className="hero-dot" />TopTrainer Platform</div>
                  <h1 className="hero-h1">My <em>Workshops</em></h1>
                  <p className="hero-sub">Manage, publish, and grow your workshops — all in one place.</p>
                </div>
                <div>
                  <button className="btn-create" onClick={openCreate}><Plus size={17} /> New Workshop</button>
                </div>
              </div>
            </div>

            {!loading && workshops.length > 0 && <StatsBar workshops={workshops} />}

            <div className="content" style={{ paddingTop: workshops.length === 0 ? 32 : 0 }}>
              {workshops.length > 0 && (
                <div className="filter-bar">
                  <div className="filter-group">
                    {["all","published","draft"].map(f => (
                      <button key={f} className={`ftab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                    ))}
                  </div>
                  <span className="filter-count">{visible.length} workshop{visible.length !== 1 ? "s" : ""}</span>
                </div>
              )}

              {loading && <div className="load-wrap"><Loader2 size={30} className="spin" /></div>}

              {fetchError && !loading && (
                <div className="err-box">
                  <AlertTriangle size={16} />{fetchError}
                  <button className="btn-retry" onClick={fetchWorkshops}>Retry</button>
                </div>
              )}

              {!loading && !fetchError && (
                <div className="w-grid">
                  {visible.length === 0 && workshops.length === 0 && (
                    <div className="empty">
                      <div className="empty-ico"><BookOpen size={30} color="#818cf8" /></div>
                      <h3>No workshops yet</h3>
                      <p>Create your first workshop and start reaching learners.</p>
                      <button className="btn-empty" onClick={openCreate}><Plus size={16} /> Create Workshop</button>
                    </div>
                  )}
                  {visible.length === 0 && workshops.length > 0 && (
                    <div className="empty"><p style={{ color:"var(--muted)", fontSize:".9rem" }}>No {filter} workshops.</p></div>
                  )}
                  {visible.map((w, i) => (
                    <WorkshopCard
                      key={w._id} workshop={w} delay={i * 60}
                      onView={goDetail} onEdit={openEdit} onDelete={setDeleting}
                      onToggleStatus={handleToggleStatus} toggling={toggling}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═════ DETAIL VIEW ═════ */}
        {view === "detail" && sel && (
          <WorkshopDetail w={sel} onBack={goList} onEdit={openEdit} onDelete={setDeleting} />
        )}

        {/* Modal */}
        {showModal && (
          <WorkshopFormModal workshop={editing} onSave={handleSave} onClose={closeModal} />
        )}

        {/* Delete confirm */}
        {deleting && (
          <div className="overlay">
            <div className="dialog">
              <div className="dialog-ico"><AlertTriangle size={24} color="#dc2626" /></div>
              <h3>Delete Workshop?</h3>
              <p><strong>"{deleting.title}"</strong> will be permanently removed.</p>
              <div className="dialog-btns">
                <button className="btn-keep" onClick={() => setDeleting(null)}>Keep It</button>
                <button className="btn-kill" onClick={handleDeleteConfirm} disabled={deleteLoad}>
                  {deleteLoad ? <Loader2 size={15} className="spin" style={{ display:"inline" }} /> : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
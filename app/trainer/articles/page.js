'use client'

import { useState } from 'react'
import ArticleFormModal from './ArticleFormModal'

// ─────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────
const SEED_ARTICLES = [
  {
    id: 1,
    title: 'How Prompt Engineering Is Becoming the Most Valuable Skill of the Decade',
    brief: "The people who know how to talk to AI systems effectively will have an outsized advantage in every profession. Here's how to build that skill.",
    content: [
      { type: 'p', text: "The people who understand how to communicate with AI systems effectively will have a compounding advantage over those who don't. Prompt engineering is not a passing trend — it is the new literacy." },
      { type: 'h2', text: 'Why Prompting Is Harder Than It Looks' },
      { type: 'p', text: "Large language models are trained on vast corpora of human text and are exquisitely sensitive to phrasing, context, and framing. The same question asked in two different ways can produce radically different outputs. Understanding this sensitivity — and using it deliberately — is the core of prompt engineering." },
      { type: 'callout', text: "🤖 Key Insight: Studies show that adding the phrase 'think step by step' to a prompt improves accuracy on complex reasoning tasks by up to 40%. The model doesn't change — only the instruction does." },
      { type: 'h2', text: 'The Five Principles of Effective Prompting' },
      { type: 'p', text: "1. Be specific about format — tell the model exactly what structure you want.\n2. Provide context and role — 'You are a senior data analyst reviewing...' dramatically changes output quality.\n3. Use examples — show the model what good output looks like.\n4. Break complex tasks into steps.\n5. Iterate — treat the first output as a draft, not a deliverable." },
      { type: 'h2', text: 'Advanced Techniques: Chain-of-Thought and Self-Critique' },
      { type: 'p', text: "Chain-of-thought prompting asks the model to reason through a problem before answering. Self-critique prompting asks it to evaluate and improve its own output. Combined, these techniques produce outputs that rival expert human work on many structured tasks." },
      { type: 'quote', text: "The best prompt engineers I've worked with don't think of themselves as coders. They think of themselves as communicators who happen to be talking to a very unusual kind of mind.", author: 'Arjun Mehta, DeepMind India' },
      { type: 'h2', text: 'Where to Start' },
      { type: 'p', text: "Pick one task you do repeatedly — summarising reports, writing emails, analysing data. Spend one hour this week writing and refining a prompt for that task. Document what works. Within two weeks, you will have a personal prompt library that saves hours monthly and produces better output than generic queries ever could." },
    ],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    date: 'May 4', fullDate: 'May 4, 2026', readTime: '6 min', views: '21.4k',
    author: 'Arjun Mehta', authorRole: 'AI Research Lead, DeepMind India',
    authorBio: "Arjun leads applied AI research at DeepMind's India operations. He has published 14 papers on language model alignment and teaches prompt design workshops to enterprise teams across Asia.",
    initials: 'AM', category: 'AI', tags: ['Prompt Engineering', 'AI Skills', 'Future of Work'], trending: true, status: 'published',
  },
  {
    id: 2,
    title: 'The Science of Progressive Overload: Why Most People Train Wrong',
    brief: "Progressive overload is the single most important principle in strength training. Without it, your gains flatline. Here's how to apply it correctly.",
    content: [
      { type: 'p', text: "Progressive overload is the gradual increase of stress placed on the body during exercise. Without it, muscles adapt and growth plateaus. Most gym-goers unknowingly violate this principle by doing the same weights and reps every session." },
      { type: 'h2', text: 'The Three Dimensions of Overload' },
      { type: 'p', text: "You can progressively overload by increasing weight, increasing volume (sets × reps), or increasing frequency. Most beginners should focus on weight; intermediate lifters benefit from cycling all three." },
      { type: 'callout', text: '💪 Rule of Thumb: Aim to add 2.5–5 kg to compound lifts every 1–2 weeks as a beginner. When that stalls, switch to adding reps before increasing weight again.' },
      { type: 'h2', text: 'Tracking Is Non-Negotiable' },
      { type: 'p', text: "You cannot manage what you don't measure. Keep a training log — even a simple spreadsheet — recording every set, rep, and weight. This data reveals patterns invisible to memory and makes progressive overload systematic rather than accidental." },
      { type: 'quote', text: "The training journal is the most underused tool in the gym. Athletes who track make 47% more strength gains in the first year than those who don't.", author: 'Dr. Mike Israetel, Renaissance Periodization' },
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    date: 'May 20', fullDate: 'May 20, 2026', readTime: '5 min', views: '18.2k',
    author: 'Priya Sharma', authorRole: 'Strength & Conditioning Coach',
    authorBio: 'Priya has coached over 300 athletes from recreational to national level. She specialises in evidence-based strength programming and periodisation.',
    initials: 'PS', category: 'Fitness', tags: ['Strength Training', 'Progressive Overload', 'Gym'], trending: false, status: 'published',
  },
  {
    id: 3,
    title: 'Nutrition Timing: The Exact Windows That Matter for Performance',
    brief: 'Meal timing around workouts can meaningfully affect performance and recovery. This guide breaks down the pre, intra, and post-workout windows backed by current research.',
    content: [
      { type: 'p', text: "Nutrient timing is a strategy of consuming foods and supplements at specific times around exercise to improve performance, recovery, and body composition. While total daily intake matters most, timing provides the edge at higher levels of performance." },
      { type: 'h2', text: 'The Pre-Workout Window (60–90 min before)' },
      { type: 'p', text: "A meal rich in complex carbohydrates and moderate protein 60–90 minutes before training tops up muscle glycogen and primes protein synthesis. Avoid high fat or high fibre immediately pre-workout — both slow gastric emptying and can cause discomfort during training." },
      { type: 'callout', text: '🍌 Quick Tip: A banana + 20g whey protein is one of the most practical and evidence-backed pre-workout meals for strength and endurance athletes alike.' },
      { type: 'h2', text: 'Post-Workout: The Anabolic Window' },
      { type: 'p', text: "The 'anabolic window' is real but wider than gym folklore suggests. You have approximately 2 hours post-training to consume protein and carbohydrates for optimal recovery — not 30 minutes. Prioritise 25–40g of high-quality protein within this window." },
      { type: 'quote', text: 'Obsessing over the exact minute you eat post-workout is far less important than consistently eating enough total protein across the day.', author: 'Dr. Alan Aragon, Nutrition Researcher' },
    ],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    date: 'May 15', fullDate: 'May 15, 2026', readTime: '7 min', views: '14.8k',
    author: 'Rahul Verma', authorRole: 'Sports Nutritionist',
    authorBio: 'Rahul is a registered sports dietitian working with professional cricket and football teams. He translates complex nutritional science into practical game-day strategies.',
    initials: 'RV', category: 'Nutrition', tags: ['Nutrition', 'Recovery', 'Performance'], trending: false, status: 'published',
  },
]

// ─────────────────────────────────────────────────────────
// CATEGORY COLOURS
// ─────────────────────────────────────────────────────────
const CAT_MAP = {
  AI:        { color:'#7c3aed', bg:'rgba(124,58,237,0.1)',  border:'rgba(124,58,237,0.2)',  pill:'rgba(124,58,237,0.88)', av:'#f5f3ff' },
  Fitness:   { color:'#2563eb', bg:'rgba(37,99,235,0.08)', border:'rgba(37,99,235,0.18)',  pill:'rgba(37,99,235,0.88)',  av:'#eff6ff' },
  Nutrition: { color:'#16a34a', bg:'rgba(22,163,74,0.08)', border:'rgba(22,163,74,0.18)',  pill:'rgba(22,163,74,0.88)',  av:'#f0fdf4' },
  Sleep:     { color:'#0891b2', bg:'rgba(8,145,178,0.08)', border:'rgba(8,145,178,0.18)',  pill:'rgba(8,145,178,0.88)',  av:'#ecfeff' },
  Mindset:   { color:'#d97706', bg:'rgba(217,119,6,0.08)', border:'rgba(217,119,6,0.18)',  pill:'rgba(217,119,6,0.88)',  av:'#fffbeb' },
  Strength:  { color:'#dc2626', bg:'rgba(220,38,38,0.08)', border:'rgba(220,38,38,0.18)',  pill:'rgba(220,38,38,0.88)',  av:'#fef2f2' },
  Cardio:    { color:'#db2777', bg:'rgba(219,39,119,0.08)',border:'rgba(219,39,119,0.18)', pill:'rgba(219,39,119,0.88)', av:'#fdf2f8' },
}
const gc = c => CAT_MAP[c] || CAT_MAP.Fitness

// ─────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────
const Ic = {
  Plus:     ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Back:     ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Edit:     ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash:    ()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Heart:    ({f})=><svg width="14" height="14" viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Bookmark: ({f})=><svg width="14" height="14" viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  Share:    ()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Eye:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Clock:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Cal:      ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Img:      ()=><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Shield:   ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Award:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Check:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Users:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Trend:    ()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
}

// ─────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');
:root{
  --ink:#0f1117;--ink2:#374151;--muted:#6b7280;--light:#9ca3af;
  --border:#e5e7eb;--surf:#f9fafb;--white:#fff;
  --blue:#2563eb;--violet:#7c3aed;--red:#dc2626;--green:#16a34a;
  --ffd:'DM Serif Display',serif;--ffb:'DM Sans',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:var(--ffb);background:#eef0f4;color:var(--ink);}

@keyframes fadeUp  {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn  {from{opacity:0}to{opacity:1}}
@keyframes slideL  {from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn {from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
@keyframes shimmer {0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes floatY  {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes gradS   {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes toastUp {from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

.page{min-height:100vh;padding-bottom:80px;}
.inner{max-width:1200px;margin:0 auto;padding:0 28px;}
@media(max-width:640px){.inner{padding:0 14px;}}

/* topbar */
.topbar{background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 28px;height:62px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 1px 6px rgba(0,0,0,.06);}
.brand{font-family:var(--ffd);font-size:1.15rem;color:var(--ink);display:flex;align-items:center;gap:9px;}
.brand-dot{width:9px;height:9px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--violet));}
.bc{font-size:.78rem;color:var(--light);}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;font-family:var(--ffb);font-size:.84rem;font-weight:600;cursor:pointer;border:none;transition:all .18s cubic-bezier(.22,1,.36,1);white-space:nowrap;}
.btn-blue{background:linear-gradient(135deg,var(--blue),#1d4ed8);color:#fff;box-shadow:0 4px 14px rgba(37,99,235,.3);}
.btn-blue:hover{opacity:.9;transform:translateY(-1px);}
.btn-ghost{background:var(--surf);color:var(--ink2);border:1px solid var(--border);}
.btn-ghost:hover{background:var(--border);}
.btn-back{background:rgba(255,255,255,.85);color:var(--muted);border:1px solid var(--border);padding:7px 14px;font-size:.8rem;backdrop-filter:blur(6px);}
.btn-back:hover{color:var(--ink);background:white;}

/* LIST VIEW */
.list-hdr{display:flex;align-items:flex-end;justify-content:space-between;padding:34px 0 26px;flex-wrap:wrap;gap:14px;animation:slideL .5s cubic-bezier(.22,1,.36,1) both;}
.list-hdr h1{font-family:var(--ffd);font-size:clamp(1.7rem,4vw,2.4rem);line-height:1.15;}
.list-hdr h1 em{font-style:italic;background:linear-gradient(90deg,var(--blue),var(--violet));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.list-sub{font-size:.84rem;color:var(--muted);margin-top:4px;}
.art-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}

/* CARD */
.card{background:rgba(255,255,255,.96);border:1px solid rgba(37,99,235,.1);border-radius:20px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 4px 20px rgba(37,99,235,.06);transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s ease,border-color .2s;animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;}
.card:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(37,99,235,.15);border-color:rgba(37,99,235,.28);}
.card:hover .card-img-inner{transform:scale(1.06);}
.card-img{position:relative;height:190px;overflow:hidden;flex-shrink:0;}
.card-img-inner{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
.card-img-ph{width:100%;height:100%;background:linear-gradient(135deg,#eff6ff,#f5f3ff);display:flex;align-items:center;justify-content:center;color:#c7d2fe;}
.card-trend{position:absolute;top:12px;left:12px;background:rgba(37,99,235,.9);color:#fff;font-size:10px;font-weight:700;letter-spacing:.05em;padding:5px 11px;border-radius:99px;display:flex;align-items:center;gap:5px;}
.card-like{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.95);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12);transition:transform .15s;z-index:2;}
.card-like:hover{transform:scale(1.15);}
.card-body{padding:15px 17px 17px;display:flex;flex-direction:column;flex:1;}
.card-cat{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;margin-bottom:7px;}
.card-title{font-family:var(--ffd);font-size:1rem;line-height:1.4;color:var(--ink);margin-bottom:7px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer;}
.card-brief{font-size:.82rem;color:var(--muted);line-height:1.65;flex:1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:10px;}
.card-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.ctag{background:rgba(255,255,255,.9);border:1px solid rgba(37,99,235,.18);color:#475569;font-size:11px;font-weight:600;padding:4px 10px;border-radius:99px;}
.card-foot{display:flex;align-items:center;gap:8px;border-top:1px solid rgba(37,99,235,.07);padding-top:11px;}
.av-sm{width:30px;height:30px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:var(--ffd);font-size:11px;font-weight:700;}
.card-author{font-size:.73rem;color:var(--muted);flex:1;cursor:pointer;}
.card-author b{color:var(--ink2);font-weight:600;}
.card-acts{display:flex;gap:4px;margin-left:auto;flex-shrink:0;}
.ca-btn{display:flex;align-items:center;gap:3px;padding:5px 9px;border-radius:7px;border:1px solid var(--border);background:white;font-size:.7rem;font-weight:600;cursor:pointer;font-family:var(--ffb);transition:all .15s;color:var(--muted);}
.ca-btn.ed:hover{border-color:rgba(37,99,235,.3);color:var(--blue);background:rgba(37,99,235,.06);}
.ca-btn.dl:hover{border-color:rgba(220,38,38,.3);color:var(--red);background:rgba(220,38,38,.06);}

.empty{grid-column:1/-1;text-align:center;padding:72px 20px;animation:fadeUp .5s ease both;}
.empty-icon{font-size:44px;margin-bottom:12px;}
.empty h3{font-family:var(--ffd);font-size:1.2rem;margin-bottom:6px;}
.empty p{font-size:.84rem;color:var(--muted);}

/* MODAL (delete confirm) */
.overlay{position:fixed;inset:0;z-index:200;background:rgba(15,17,23,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;}
.modal{background:white;border-radius:18px;padding:26px 28px;max-width:380px;width:100%;box-shadow:0 24px 80px rgba(0,0,0,.2);animation:scaleIn .25s cubic-bezier(.22,1,.36,1) both;}
.modal-ico{width:46px;height:46px;border-radius:14px;background:#fee2e2;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
.modal h3{font-family:var(--ffd);font-size:1.05rem;margin-bottom:7px;}
.modal p{font-size:.84rem;color:var(--muted);line-height:1.6;margin-bottom:22px;}
.modal-btns{display:flex;gap:10px;}
.modal-btns button{flex:1;padding:10px;border-radius:10px;font-weight:700;cursor:pointer;font-size:.84rem;font-family:var(--ffb);}
.m-cancel{background:white;color:var(--muted);border:1px solid var(--border);}
.m-del{background:#dc2626;color:white;border:none;}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:white;border:1px solid #bbf7d0;border-radius:99px;padding:10px 22px;font-size:.82rem;font-weight:600;color:var(--ink);box-shadow:0 8px 32px rgba(0,0,0,.1);z-index:300;animation:toastUp .3s ease both;white-space:nowrap;}

/* DETAIL */
.dw{padding:24px 0 60px;animation:scaleIn .4s cubic-bezier(.22,1,.36,1) both;}
.dhero-bg{background:linear-gradient(135deg,#eff6ff 0%,#f5f3ff 40%,#eef2ff 70%,#f0fdf4 100%);background-size:300% 300%;animation:gradS 12s ease infinite;position:relative;overflow:hidden;margin-bottom:24px;}
.dhero-bg::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%);pointer-events:none;}
.dhero-inner{max-width:1200px;margin:0 auto;padding:3.2rem 28px 2.8rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;position:relative;z-index:2;}
@media(max-width:960px){.dhero-inner{grid-template-columns:1fr;}.dhero-right{display:none!important;}}
.dnav{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:20px;}
.chip-back{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:99px;background:rgba(255,255,255,.85);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.9);font-size:.78rem;font-weight:700;color:var(--ink2);cursor:pointer;transition:all .18s;}
.chip-back:hover{background:white;color:var(--ink);}
.chip-cat{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:99px;background:rgba(255,255,255,.75);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.9);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;}
.chip-dot{width:8px;height:8px;border-radius:50%;}
.chip-trend{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:99px;background:var(--blue);color:#fff;font-size:11px;font-weight:700;letter-spacing:.05em;}
.dtitle{font-family:var(--ffd);font-size:clamp(1.8rem,4.5vw,3.2rem);line-height:1.12;color:var(--ink);margin-bottom:13px;letter-spacing:-.02em;}
.dtitle-sh{background:linear-gradient(90deg,#1d4ed8 0%,var(--violet) 40%,#1d4ed8 70%,#0891b2 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
.ddesc{font-size:.96rem;color:#475569;line-height:1.75;margin-bottom:16px;max-width:520px;}
.dmeta{display:flex;flex-wrap:wrap;gap:14px;font-size:.8rem;color:var(--muted);margin-bottom:18px;}
.dmeta-i{display:flex;align-items:center;gap:5px;}
.dmeta-i svg{color:var(--blue);}
.dauthor-chip{display:inline-flex;align-items:center;gap:12px;padding:11px 16px;border-radius:15px;background:rgba(255,255,255,.8);backdrop-filter:blur(10px);border:1px solid rgba(37,99,235,.12);box-shadow:0 4px 16px rgba(37,99,235,.07);margin-bottom:18px;}
.dauthor-av{width:42px;height:42px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:var(--ffd);font-weight:700;font-size:14px;}
.trust-row{display:flex;flex-wrap:wrap;gap:8px;}
.trust-b{background:rgba(255,255,255,.7);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.9);border-radius:12px;padding:7px 12px;font-size:12px;font-weight:600;color:#475569;display:flex;align-items:center;gap:6px;box-shadow:0 2px 10px rgba(37,99,235,.07);}
.dhero-img-wrap{position:relative;border-radius:22px;overflow:hidden;box-shadow:0 32px 72px rgba(37,99,235,.18),0 12px 32px rgba(124,58,237,.1);animation:floatY 6s ease-in-out infinite;}
.dhero-img{width:100%;height:420px;object-fit:cover;display:block;}
.dhero-img-ph{width:100%;height:420px;background:linear-gradient(135deg,#eff6ff,#f5f3ff);display:flex;align-items:center;justify-content:center;color:#c7d2fe;}
.ibadge{position:absolute;padding:7px 13px;border-radius:99px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:5px;}
.action-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:12px 18px;border-radius:14px;background:rgba(255,255,255,.9);border:1px solid rgba(37,99,235,.09);box-shadow:0 3px 16px rgba(37,99,235,.05);margin-bottom:22px;}
.ab-meta{font-size:.78rem;color:var(--light);flex:1;font-weight:500;}
.ab-btn{display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:9px;cursor:pointer;font-size:.78rem;font-weight:700;font-family:var(--ffb);border:1px solid var(--border);background:white;color:var(--muted);transition:all .18s;}
.ab-btn:hover{transform:translateY(-1px);}
.ab-btn.liked{border-color:rgba(239,68,68,.3);background:rgba(239,68,68,.07);color:#ef4444;}
.ab-btn.saved{border-color:rgba(22,163,74,.3);background:rgba(22,163,74,.07);color:var(--green);}
.ab-sep{width:1px;height:22px;background:var(--border);flex-shrink:0;}
.ab-edit{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:.76rem;font-weight:700;font-family:var(--ffb);background:rgba(37,99,235,.08);color:var(--blue);border:1px solid rgba(37,99,235,.2);transition:all .15s;}
.ab-edit:hover{background:rgba(37,99,235,.14);}
.ab-del{display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:.76rem;font-weight:700;font-family:var(--ffb);background:rgba(220,38,38,.07);color:var(--red);border:1px solid rgba(220,38,38,.18);transition:all .15s;}
.ab-del:hover{background:rgba(220,38,38,.13);}
.dbody{max-width:1200px;margin:0 auto;padding:0 28px;}
@media(max-width:640px){.dbody{padding:0 14px;}}
.dgrid{display:grid;grid-template-columns:1fr 300px;gap:22px;align-items:start;}
@media(max-width:960px){.dgrid{grid-template-columns:1fr;}.dsidebar{display:none!important;}}
.art-body{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:clamp(20px,4vw,36px);box-shadow:0 4px 20px rgba(37,99,235,.05);margin-bottom:16px;}
.art-blocks{display:flex;flex-direction:column;gap:16px;}
.b-h2{font-family:var(--ffd);font-size:clamp(1.05rem,2.5vw,1.28rem);font-weight:700;color:var(--ink);display:flex;align-items:center;gap:9px;margin:4px 0;}
.b-h2-bar{display:inline-block;width:4px;height:20px;border-radius:3px;flex-shrink:0;}
.b-p{font-size:.97rem;line-height:1.9;color:#475569;white-space:pre-wrap;word-break:break-word;}
.b-callout{border-radius:13px;padding:13px 17px;font-size:.9rem;line-height:1.7;font-weight:500;}
.b-quote{margin:0;border-left:4px solid var(--violet);border-radius:0 13px 13px 0;padding:15px 19px;background:#f5f3ff;border:1px solid #e9d5ff;border-left:4px solid var(--violet);}
.b-quote p{font-family:var(--ffd);font-size:1.01rem;color:#6d28d9;line-height:1.7;font-style:italic;margin-bottom:5px;}
.b-quote cite{font-size:12px;color:var(--violet);font-weight:700;font-style:normal;}
.art-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:24px;padding-top:18px;border-top:1px solid #f1f5f9;}
.art-tag{background:rgba(255,255,255,.9);border:1px solid rgba(37,99,235,.18);color:#475569;font-size:12px;font-weight:600;padding:5px 13px;border-radius:99px;}
.auth-bio{display:flex;gap:13px;flex-wrap:wrap;padding:17px;border-radius:18px;margin-bottom:16px;}
.auth-bio-av{width:50px;height:50px;border-radius:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:var(--ffd);font-weight:700;font-size:15px;}
.auth-bio-name{font-family:var(--ffd);font-weight:700;font-size:15px;color:var(--ink);}
.auth-bio-role{font-size:12px;font-weight:700;margin-bottom:6px;}
.auth-bio-text{font-size:13px;color:var(--muted);line-height:1.7;}
.trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.trust-card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:13px;display:flex;align-items:center;gap:10px;}
.trust-ico{width:36px;height:36px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.trust-lbl{font-family:var(--ffd);font-weight:700;font-size:12.5px;color:var(--ink);}
.trust-sub{font-size:11px;color:var(--light);}
.sc{background:white;border:1px solid #e2e8f0;border-radius:18px;padding:17px;box-shadow:0 3px 16px rgba(37,99,235,.04);margin-bottom:13px;}
.sc-lbl{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--light);margin-bottom:11px;}
.toc-item{display:block;font-size:12.5px;color:var(--muted);font-weight:600;padding:7px 10px;border-radius:9px;border-bottom:1px solid rgba(37,99,235,.07);cursor:pointer;transition:all .15s;line-height:1.45;}
.toc-item:last-child{border-bottom:none;}
.toc-item:hover{color:var(--blue);background:rgba(37,99,235,.06);padding-left:14px;}
.nl-card{background:linear-gradient(135deg,#f0f9ff,#eff6ff,#f5f3ff);border:1px solid rgba(37,99,235,.14);border-radius:18px;padding:17px;box-shadow:0 6px 28px rgba(37,99,235,.08);margin-bottom:13px;}
.nl-inp{width:100%;padding:10px 13px;border-radius:11px;border:1px solid rgba(37,99,235,.18);background:rgba(255,255,255,.9);font-family:var(--ffb);font-size:12.5px;outline:none;margin-bottom:9px;box-sizing:border-box;display:block;color:var(--ink);}
.nl-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:6px;padding:11px;border-radius:12px;background:linear-gradient(135deg,var(--blue),#1d4ed8);color:#fff;border:none;font-family:var(--ffd);font-weight:700;font-size:13px;cursor:pointer;transition:opacity .15s;}
.nl-btn:hover{opacity:.88;}
.mini-tg{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.mini-ti{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:11px 8px;display:flex;flex-direction:column;align-items:center;gap:5px;text-align:center;}
.mini-tico{font-size:18px;}
.mini-tlbl{font-family:var(--ffd);font-weight:700;font-size:10.5px;color:var(--muted);}
`

// ─────────────────────────────────────────────────────────
// ARTICLE CARD
// ─────────────────────────────────────────────────────────
function ArticleCard({ a, delay, onView, onEdit, onDel }) {
  const [liked, setLiked] = useState(false)
  const c = gc(a.category)
  return (
    <div className="card" style={{ animationDelay:`${delay}ms` }}>
      <div className="card-img">
        {a.image
          ? <img src={a.image} alt={a.title} className="card-img-inner" loading="lazy" />
          : <div className="card-img-ph"><Ic.Img /></div>
        }
        {a.trending && <span className="card-trend">🔥 Trending</span>}
        <button
          className="card-like"
          style={{ color: liked ? '#ef4444' : '#9ca3af' }}
          onClick={e => { e.stopPropagation(); setLiked(!liked) }}
        >
          <Ic.Heart f={liked} />
        </button>
      </div>
      <div className="card-body">
        <p className="card-cat" style={{ color: c.color }}>{a.category}</p>
        <h3 className="card-title" onClick={() => onView(a)}>{a.title}</h3>
        <p className="card-brief">{a.brief}</p>
        {a.tags?.length > 0 && (
          <div className="card-tags">
            {a.tags.map(t => <span key={t} className="ctag">{t}</span>)}
          </div>
        )}
        <div className="card-foot">
          <div className="av-sm" style={{ background: c.av, color: c.color }}>
            {a.initials || (a.author || '').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}
          </div>
          <span className="card-author" onClick={() => onView(a)}>
            <b>{a.author}</b>{' · '}{a.readTime}{' · '}{a.date}
          </span>
          <div className="card-acts" onClick={e => e.stopPropagation()}>
            <button className="ca-btn ed" onClick={() => onEdit(a)}><Ic.Edit /> Edit</button>
            <button className="ca-btn dl" onClick={() => onDel(a)}><Ic.Trash /> Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────
export default function ArticlesPage() {
  const [view,     setView]     = useState('list') // 'list' | 'detail'
  const [articles, setArticles] = useState(SEED_ARTICLES)
  const [sel,      setSel]      = useState(null)
  const [delTgt,   setDelTgt]   = useState(null)
  const [toast,    setToast]    = useState(null)
  const [liked,    setLiked]    = useState(false)
  const [saved,    setSaved]    = useState(false)

  // modal state
  const [showModal, setShowModal] = useState(false)
  const [editing,   setEditing]   = useState(null)

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2800) }

  function goList()    { setView('list'); setSel(null) }
  function goDetail(a) { setSel(a); setLiked(false); setSaved(false); setView('detail') }

  function openCreate() { setEditing(null); setShowModal(true) }
  function openEdit(a)  { setEditing(a);    setShowModal(true) }
  function closeModal() { setEditing(null); setShowModal(false) }

  function handleSave(art, id) {
    if (id) {
      setArticles(p => p.map(a => a.id === id ? art : a))
      if (sel?.id === id) setSel(art)
      showToast('✅ Article updated!')
    } else {
      setArticles(p => [art, ...p])
      showToast('🎉 Article published!')
    }
    closeModal()
  }

  function confirmDel() {
    if (!delTgt) return
    setArticles(p => p.filter(a => a.id !== delTgt.id))
    if (sel?.id === delTgt.id) goList()
    setDelTgt(null)
    showToast('🗑️ Article deleted.')
  }

  const dc  = gc(sel?.category)
  const h2s = (sel?.content || []).filter(b => b.type === 'h2')

  return (
    <>
      <style>{CSS}</style>
      <div className="page">

       
        {delTgt && (
          <div className="overlay">
            <div className="modal">
              <div className="modal-ico"><Ic.Trash /></div>
              <h3>Delete Article?</h3>
              <p>"<strong>{delTgt.title?.slice(0,60)}{delTgt.title?.length>60?'…':''}</strong>" will be permanently deleted. This cannot be undone.</p>
              <div className="modal-btns">
                <button className="m-cancel" onClick={() => setDelTgt(null)}>Cancel</button>
                <button className="m-del"    onClick={confirmDel}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}

        {/* ═══ VIEW 1: LIST ═══ */}
        {view === 'list' && (
          <div className="inner">
            <div className="list-hdr">
              <div>
                <h1>Your <em>Articles</em></h1>
                <p className="list-sub">{articles.length} article{articles.length!==1?'s':''} · Click any card to read</p>
              </div>
              <button className="btn btn-blue" onClick={openCreate}><Ic.Plus /> New Article</button>
            </div>
            <div className="art-grid">
              {articles.length === 0 ? (
                <div className="empty">
                  <div className="empty-icon">✍️</div>
                  <h3>No articles yet</h3>
                  <p>Create your first article and share your expertise.</p>
                </div>
              ) : articles.map((a, i) => (
                <ArticleCard
                  key={a.id} a={a} delay={i*55}
                  onView={goDetail}
                  onEdit={openEdit}
                  onDel={a => setDelTgt(a)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══ VIEW 2: DETAIL ═══ */}
        {view === 'detail' && sel && (
          <div className="dw">
            <div className="dhero-bg">
              <div className="dhero-inner">
                {/* LEFT */}
                <div>
                  <div className="dnav">
                    <button className="chip-back" onClick={goList}><Ic.Back /> All Articles</button>
                    <span className="chip-cat" style={{ color: dc.color }}>
                      <span className="chip-dot" style={{ background: dc.color }} />
                      {sel.category}
                    </span>
                    {sel.trending && <span className="chip-trend">🔥 TRENDING</span>}
                  </div>

                  {(() => {
                    const ws = sel.title.split(' ')
                    const cut = Math.ceil(ws.length * 0.6)
                    return (
                      <h1 className="dtitle">
                        {ws.slice(0, cut).join(' ')}{' '}
                        <span className="dtitle-sh">{ws.slice(cut).join(' ')}</span>
                      </h1>
                    )
                  })()}

                  <p className="ddesc">{sel.brief}</p>

                  <div className="dmeta">
                    <span className="dmeta-i"><Ic.Clock /> {sel.readTime} read</span>
                    <span className="dmeta-i"><Ic.Eye />   {sel.views} views</span>
                    <span className="dmeta-i"><Ic.Cal />   {sel.fullDate || sel.date}</span>
                  </div>

                  <div className="dauthor-chip">
                    <div className="dauthor-av" style={{ background: dc.av, color: dc.color }}>
                      {sel.initials}
                    </div>
                    <div>
                      <div style={{ fontFamily:'var(--ffd)', fontWeight:700, fontSize:14, color:'var(--ink)' }}>{sel.author}</div>
                      <div style={{ fontSize:12, color:dc.color, fontWeight:600 }}>{sel.authorRole}</div>
                    </div>
                  </div>

                  <div className="trust-row">
                    {[
                      { ico:<Ic.Shield/>, color:'#10b981', label:'Expert Verified' },
                      { ico:<Ic.Award/>,  color:'#6366f1', label:'In-Depth Guide' },
                      { ico:<Ic.Check/>,  color:'#2563eb', label:'Actionable Steps' },
                    ].map(({ ico, color, label }) => (
                      <div key={label} className="trust-b">
                        <span style={{ color }}>{ico}</span>{label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: floating image */}
                <div className="dhero-right" style={{ position:'relative' }}>
                  <div style={{ position:'absolute', borderRadius:'50%', width:'80%', height:'70%', left:'10%', top:'10%', background:`radial-gradient(circle,${dc.color}33 0%,transparent 70%)`, filter:'blur(48px)', pointerEvents:'none' }} />
                  <div className="dhero-img-wrap">
                    {sel.image
                      ? <img src={sel.image} alt={sel.title} className="dhero-img" />
                      : <div className="dhero-img-ph"><Ic.Img /></div>
                    }
                    <span className="ibadge" style={{ top:14, left:14, background:dc.pill, color:'#fff' }}>{sel.category}</span>
                    {sel.trending && (
                      <span className="ibadge" style={{ bottom:14, left:14, background:'rgba(239,68,68,.92)', color:'#fff' }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:'#fff', display:'inline-block' }} />Trending
                      </span>
                    )}
                    <span className="ibadge" style={{ bottom:14, right:14, background:'rgba(37,99,235,.92)', color:'#fff' }}>📖 {sel.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="dbody">
              {/* Action bar */}
              <div className="action-bar">
                <span className="ab-meta">{sel.readTime} · {sel.date}</span>
                <button className={`ab-btn ${liked?'liked':''}`} onClick={() => setLiked(!liked)}>
                  <Ic.Heart f={liked} /> {liked ? 'Liked' : 'Like'}
                </button>
                <button className={`ab-btn ${saved?'saved':''}`} onClick={() => setSaved(!saved)}>
                  <Ic.Bookmark f={saved} /> {saved ? 'Saved' : 'Save'}
                </button>
                <button className="ab-btn" onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('🔗 Link copied!') }}>
                  <Ic.Share /> Share
                </button>
                <span className="ab-sep" />
                <button className="ab-edit" onClick={() => openEdit(sel)}><Ic.Edit /> Edit</button>
                <button className="ab-del"  onClick={() => setDelTgt(sel)}><Ic.Trash /> Delete</button>
              </div>

              <div className="dgrid">
                {/* Left: content */}
                <div>
                  <div className="art-body">
                    <div className="art-blocks">
                      {sel.content?.length > 0 ? sel.content.map((b, i) => {
                        if (b.type==='h2') return (
                          <h2 key={i} className="b-h2">
                            <span className="b-h2-bar" style={{ background:`linear-gradient(180deg,${dc.color},#6366f1)` }} />
                            {b.text}
                          </h2>
                        )
                        if (b.type==='p')       return <p key={i} className="b-p">{b.text}</p>
                        if (b.type==='callout') return <div key={i} className="b-callout" style={{ background:dc.bg, border:`1px solid ${dc.border}`, color:'#374151' }}>{b.text}</div>
                        if (b.type==='quote')   return (
                          <blockquote key={i} className="b-quote">
                            <p>"{b.text}"</p>
                            {b.author && <cite>— {b.author}</cite>}
                          </blockquote>
                        )
                        return null
                      }) : <p className="b-p">{sel.brief}</p>}
                    </div>
                    {sel.tags?.length > 0 && (
                      <div className="art-tags">
                        {sel.tags.map(t => <span key={t} className="art-tag">{t}</span>)}
                      </div>
                    )}
                  </div>

                  {sel.authorBio && (
                    <div className="auth-bio" style={{ background:dc.bg, border:`1px solid ${dc.border}` }}>
                      <div className="auth-bio-av" style={{ background:dc.av, color:dc.color, border:`2px solid ${dc.border}` }}>{sel.initials}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="auth-bio-name">{sel.author}</div>
                        <div className="auth-bio-role" style={{ color:dc.color }}>{sel.authorRole}</div>
                        <p className="auth-bio-text">{sel.authorBio}</p>
                      </div>
                    </div>
                  )}

                  <div className="trust-grid">
                    {[
                      { ico:<Ic.Shield/>, label:'Expert Verified',  sub:'By certified professionals', color:'#10b981', bg:'#ecfdf5' },
                      { ico:<Ic.Award/>,  label:'In-Depth Guide',   sub:'Evidence-backed content',    color:'#6366f1', bg:'#f5f3ff' },
                      { ico:<Ic.Users/>,  label:'Community',        sub:'Join the discussion',         color:'#2563eb', bg:'#eff6ff' },
                      { ico:<Ic.Trend/>,  label:'Actionable Steps', sub:'Apply it today',              color:'#f59e0b', bg:'#fffbeb' },
                    ].map(({ ico, label, sub, color, bg }) => (
                      <div key={label} className="trust-card">
                        <div className="trust-ico" style={{ background:bg }}><span style={{ color }}>{ico}</span></div>
                        <div><div className="trust-lbl">{label}</div><div className="trust-sub">{sub}</div></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="dsidebar" style={{ position:'sticky', top:20, display:'flex', flexDirection:'column' }}>
                  {h2s.length > 0 && (
                    <div className="sc">
                      <p className="sc-lbl">📋 In This Article</p>
                      {h2s.map((b, i) => <span key={i} className="toc-item">{b.text}</span>)}
                    </div>
                  )}
                  <div className="sc">
                    <p className="sc-lbl">About the Author</p>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:11 }}>
                      <div style={{ width:42, height:42, borderRadius:12, background:dc.av, color:dc.color, border:`1px solid ${dc.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--ffd)', fontWeight:700, fontSize:14, flexShrink:0 }}>{sel.initials}</div>
                      <div>
                        <div style={{ fontFamily:'var(--ffd)', fontWeight:700, fontSize:13.5, color:'var(--ink)' }}>{sel.author}</div>
                        <div style={{ fontSize:11.5, color:dc.color, fontWeight:600 }}>{sel.authorRole}</div>
                      </div>
                    </div>
                    {sel.views && (
                      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 11px', borderRadius:10, background:dc.bg, border:`1px solid ${dc.border}`, marginBottom:9 }}>
                        <Ic.Eye />
                        <span style={{ fontFamily:'var(--ffd)', fontWeight:700, fontSize:14, color:'var(--ink)' }}>{sel.views}</span>
                        <span style={{ fontSize:11.5, color:'var(--light)' }}>total views</span>
                      </div>
                    )}
                    {sel.authorBio && <p style={{ fontSize:12.5, color:'var(--muted)', lineHeight:1.65 }}>{sel.authorBio}</p>}
                  </div>
                  <div className="nl-card">
                    <div style={{ fontSize:26, marginBottom:8 }}>📬</div>
                    <div style={{ fontFamily:'var(--ffd)', fontWeight:700, fontSize:15, color:'var(--ink)', marginBottom:6 }}>Get Weekly Insights</div>
                    <p style={{ fontSize:12.5, color:'var(--muted)', lineHeight:1.6, marginBottom:12 }}>Expert articles from top trainers every Tuesday.</p>
                    <input type="email" className="nl-inp" placeholder="Your email address" />
                    <button className="nl-btn">Subscribe Free →</button>
                  </div>
                  <div className="sc">
                    <div className="mini-tg">
                      {[['🛡️','Verified Expert'],['🏆','Award-Winning'],['👥','50k+ Readers'],['📊','Data-Backed']].map(([ico,lbl]) => (
                        <div key={lbl} className="mini-ti">
                          <span className="mini-tico">{ico}</span>
                          <span className="mini-tlbl">{lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CREATE / EDIT MODAL ═══ */}
        {showModal && (
          <ArticleFormModal
            article={editing}
            onSave={handleSave}
            onClose={closeModal}
          />
        )}

      </div>
    </>
  )
}
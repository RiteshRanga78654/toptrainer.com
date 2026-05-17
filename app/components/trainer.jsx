"use client";

import { useState } from "react";
import { Star, MapPin, Clock, Users, BadgeCheck, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";

/* ─── Trainer data ─────────────────────────────────────────── */
const allTrainers = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Leadership & Executive Coach",
    location: "Delhi, India",
    rating: 4.9,
    reviews: 312,
    sessions: "1.2K+",
    experience: "8 yrs",
    tags: ["Leadership", "Soft Skills", "Management"],
    badge: "Top Rated",
    badgeColor: "#2563eb",
    avatar: "/Images/trainer1.png",
    bio: "Helping senior professionals unlock their leadership potential with proven frameworks.",
    available: true,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Full Stack & AI Engineer",
    location: "Bangalore, India",
    rating: 4.8,
    reviews: 278,
    sessions: "980+",
    experience: "6 yrs",
    tags: ["Technical", "AI", "Web Dev"],
    badge: "Rising Star",
    badgeColor: "#7c3aed",
    avatar: "/Images/trainer2.png",
    bio: "From React to LLMs — practical, project-based learning that gets you hired.",
    available: true,
  },
  {
    id: 3,
    name: "Ananya Verma",
    role: "Data Science & Analytics",
    location: "Mumbai, India",
    rating: 5.0,
    reviews: 195,
    sessions: "740+",
    experience: "5 yrs",
    tags: ["Data Science", "Python", "ML"],
    badge: "Expert",
    badgeColor: "#059669",
    avatar: "/Images/trainer3.png",
    bio: "Making data science approachable — from Excel to neural networks step by step.",
    available: false,
  },
  {
    id: 4,
    name: "Vikram Nair",
    role: "Communication & Public Speaking",
    location: "Hyderabad, India",
    rating: 4.9,
    reviews: 421,
    sessions: "1.5K+",
    experience: "10 yrs",
    tags: ["Communication", "Soft Skills", "Confidence"],
    badge: "Most Booked",
    badgeColor: "#d97706",
    avatar: "/Images/trainer4.png",
    bio: "Transforming introverts into compelling speakers through structured daily practice.",
    available: true,
  },
  {
    id: 5,
    name: "Sneha Pillai",
    role: "Wellness & Mindfulness Coach",
    location: "Pune, India",
    rating: 4.7,
    reviews: 156,
    sessions: "620+",
    experience: "4 yrs",
    tags: ["Wellness", "Mindfulness", "Productivity"],
    badge: "New",
    badgeColor: "#0891b2",
    avatar: "/Images/trainer5.png",
    bio: "Science-backed stress management and habit-building for modern professionals.",
    available: true,
  },
  {
    id: 6,
    name: "Arjun Kapoor",
    role: "Sales & Business Development",
    location: "Gurgaon, India",
    rating: 4.8,
    reviews: 289,
    sessions: "870+",
    experience: "7 yrs",
    tags: ["Sales", "B2B", "Negotiation"],
    badge: "Top Rated",
    badgeColor: "#2563eb",
    avatar: "/Images/trainer6.png",
    bio: "Closed $50M+ in enterprise deals. Now teaching the exact playbook to others.",
    available: false,
  },
  {
    id: 7,
    name: "Divya Menon",
    role: "UX Design & Product Thinking",
    location: "Chennai, India",
    rating: 4.9,
    reviews: 203,
    sessions: "590+",
    experience: "5 yrs",
    tags: ["Design", "UX", "Product"],
    badge: "Expert",
    badgeColor: "#059669",
    avatar: "/Images/trainer7.png",
    bio: "Figma to strategy — building design thinkers who create products people love.",
    available: true,
  },
  {
    id: 8,
    name: "Rohan Gupta",
    role: "Finance & Investment Coach",
    location: "Kolkata, India",
    rating: 4.6,
    reviews: 134,
    sessions: "410+",
    experience: "6 yrs",
    tags: ["Finance", "Investment", "Leadership"],
    badge: "Rising Star",
    badgeColor: "#7c3aed",
    avatar: "/Images/trainer8.png",
    bio: "Demystifying personal finance and wealth-building for young working professionals.",
    available: true,
  },
];

/* ─── Tag colour map ─────────────────────────────────────────── */
const tagColors = {
  Leadership:    "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Soft Skills": "bg-red-50 text-red-600 border-red-200",
  Management:    "bg-indigo-50 text-indigo-700 border-indigo-200",
  Technical:     "bg-blue-50 text-blue-700 border-blue-200",
  AI:            "bg-purple-50 text-purple-700 border-purple-200",
  "Web Dev":     "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Data Science":"bg-green-50 text-green-700 border-green-200",
  Python:        "bg-emerald-50 text-emerald-700 border-emerald-200",
  ML:            "bg-teal-50 text-teal-700 border-teal-200",
  Communication: "bg-pink-50 text-pink-700 border-pink-200",
  Confidence:    "bg-rose-50 text-rose-700 border-rose-200",
  Wellness:      "bg-lime-50 text-lime-700 border-lime-200",
  Mindfulness:   "bg-green-50 text-green-700 border-green-200",
  Productivity:  "bg-sky-50 text-sky-700 border-sky-200",
  Sales:         "bg-orange-50 text-orange-700 border-orange-200",
  B2B:           "bg-amber-50 text-amber-700 border-amber-200",
  Negotiation:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  Design:        "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  UX:            "bg-violet-50 text-violet-700 border-violet-200",
  Product:       "bg-indigo-50 text-indigo-700 border-indigo-200",
  Finance:       "bg-emerald-50 text-emerald-700 border-emerald-200",
  Investment:    "bg-green-50 text-green-700 border-green-200",
};

const styles = `
  .tr-section {
    background: linear-gradient(135deg, #f8faff 0%, #faf8ff 50%, #f8fffc 100%);
    position: relative;
    overflow: hidden;
  }
  .tr-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%);
    pointer-events: none;
  }
  .tr-blob-1 {
    position: absolute; width: 400px; height: 400px; top: -6%; right: -8%;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%);
    filter: blur(50px); pointer-events: none;
    animation: trBlob 14s ease-in-out infinite;
  }
  .tr-blob-2 {
    position: absolute; width: 300px; height: 300px; bottom: 5%; left: -5%;
    border-radius: 40% 60% 70% 30% / 40% 60% 30% 70%;
    background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%);
    filter: blur(40px); pointer-events: none;
    animation: trBlob 18s ease-in-out infinite reverse;
  }
  @keyframes trBlob {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translateY(0); }
    50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translateY(-16px); }
  }

  .tr-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: trShimmer 4s linear infinite;
  }
  @keyframes trShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* ══ GRID — stretch gives all cards in a row equal height ══ */
  .tr-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    align-items: stretch;  /* default, but explicit */
  }
  @media (min-width: 640px)  { .tr-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .tr-grid { grid-template-columns: repeat(4, 1fr); } }

  /* ══ CARD — flex column so button pins to bottom ══ */
  .tr-card {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(226,232,240,0.8);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    animation: trFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
    /* these 3 lines are the fix */
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .tr-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(37,99,235,0.13), 0 8px 24px rgba(37,99,235,0.07);
    border-color: rgba(37,99,235,0.2);
  }
  .tr-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #2563eb, #7c3aed, #0891b2);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .tr-card:hover::before { opacity: 1; }

  /* ══ BODY — flex column that grows to fill card ══ */
  .tr-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
  }

  /* tags row */
  .tr-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }

  /* ══ SPACER — eats remaining space, pushes button down ══ */
  .tr-spacer { flex: 1; min-height: 0; }

  /* Avatar ring */
  .tr-avatar-ring {
    position: relative;
    width: 72px; height: 72px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    flex-shrink: 0;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .tr-card:hover .tr-avatar-ring { transform: scale(1.07); }
  .tr-avatar-inner {
    width: 100%; height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: #f1f5f9;
    border: 2px solid white;
  }

  .tr-avail-dot {
    position: absolute; bottom: 2px; right: 2px;
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid white;
    background: #22c55e;
  }
  .tr-avail-dot.offline { background: #94a3b8; }

  .tr-stars { display: flex; align-items: center; gap: 2px; }

  .tr-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 100px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.04em; text-transform: uppercase;
  }

  .tr-stat {
    display: flex; flex-direction: column; align-items: center;
    background: #f8faff; border: 1px solid #e2e8f0;
    border-radius: 12px; padding: 8px 14px;
    transition: all 0.3s ease;
  }
  .tr-card:hover .tr-stat { border-color: rgba(37,99,235,0.15); background: #f0f6ff; }

  /* ══ BUTTON — fixed 44px height, never shrinks ══ */
  .tr-btn {
    width: 100%;
    height: 44px;
    flex-shrink: 0;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border: none;
    border-radius: 14px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .tr-btn::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
    opacity: 0; transition: opacity 0.4s ease;
  }
  .tr-btn:hover::before { opacity: 1; }
  .tr-btn:hover { box-shadow: 0 8px 28px rgba(37,99,235,0.38); transform: translateY(-2px); }
  .tr-btn:active { transform: scale(0.97); }
  .tr-btn span { position: relative; z-index: 1; display: flex; align-items: center; gap: 6px; }

  .tr-load-btn {
    background: white;
    border: 1.5px solid #e2e8f0;
    border-radius: 16px;
    padding: 13px 36px;
    font-size: 15px; font-weight: 600;
    color: #2563eb; cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
    box-shadow: 0 4px 20px rgba(37,99,235,0.07);
  }
  .tr-load-btn:hover {
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: white; border-color: transparent;
    box-shadow: 0 12px 36px rgba(37,99,235,0.28);
    transform: translateY(-3px);
  }

  .tr-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);
    border: 1px solid rgba(37,99,235,0.12); border-radius: 100px;
    padding: 6px 18px; font-size: 12px; font-weight: 600;
    color: #475569; letter-spacing: 0.05em; text-transform: uppercase;
    box-shadow: 0 2px 12px rgba(37,99,235,0.07);
  }
  .tr-dot-pulse { animation: trDotPulse 1.5s ease-in-out infinite; }
  @keyframes trDotPulse {
    0%,100% { opacity:0.4; transform:scale(1); }
    50%      { opacity:1;   transform:scale(1.4); }
  }

  @keyframes trFadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .tr-fade-up { animation: trFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }

  @keyframes trSpin { to { transform:rotate(360deg); } }
  .tr-spin { animation: trSpin 0.8s linear infinite; }
`;

function Stars({ rating }) {
  return (
    <div className="tr-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          color={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
        />
      ))}
    </div>
  );
}

function TrainerCard({ trainer, delay }) {
  return (
    <div className="tr-card" style={{ animationDelay: `${delay}s` }}>
      <div className="tr-card-body">

        {/* Avatar + name row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="tr-avatar-ring">
            <div className="tr-avatar-inner">
              <Image
                src={trainer.avatar}
                alt={trainer.name}
                width={72}
                height={72}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.style.background =
                    "linear-gradient(135deg,#eff6ff,#f5f3ff)";
                }}
              />
            </div>
            <div className={`tr-avail-dot ${trainer.available ? "" : "offline"}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              <p className="font-bold text-gray-800 text-sm leading-tight">{trainer.name}</p>
              <BadgeCheck size={14} className="text-blue-500 flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-500 leading-tight line-clamp-1">{trainer.role}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={10} className="text-gray-400 flex-shrink-0" />
              <p className="text-[10px] text-gray-400">{trainer.location}</p>
            </div>
          </div>

          <div
            className="tr-badge flex-shrink-0"
            style={{
              background: `${trainer.badgeColor}14`,
              color: trainer.badgeColor,
              border: `1px solid ${trainer.badgeColor}30`,
            }}
          >
            {trainer.badge}
          </div>
        </div>

        {/* Bio — clamped to 2 lines so height is consistent */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{trainer.bio}</p>

        {/* Rating row */}
        <div className="flex items-center gap-2 mb-4">
          <Stars rating={trainer.rating} />
          <span className="text-xs font-bold text-gray-800">{trainer.rating}</span>
          <span className="text-xs text-gray-400">({trainer.reviews} reviews)</span>
          <span
            className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: trainer.available ? "#f0fdf4" : "#f8fafc",
              color: trainer.available ? "#16a34a" : "#94a3b8",
              border: `1px solid ${trainer.available ? "#bbf7d0" : "#e2e8f0"}`,
            }}
          >
            {trainer.available ? "● Available" : "● Busy"}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="tr-stat">
            <span className="text-xs font-bold text-gray-800">{trainer.sessions}</span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
              <Users size={9} /> Sessions
            </span>
          </div>
          <div className="tr-stat">
            <span className="text-xs font-bold text-gray-800">{trainer.experience}</span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
              <Clock size={9} /> Exp.
            </span>
          </div>
          <div className="tr-stat">
            <span className="text-xs font-bold text-gray-800">{trainer.rating}</span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
              <Star size={9} /> Rating
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="tr-tags">
          {trainer.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                tagColors[tag] || "bg-gray-50 text-gray-600 border-gray-200"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer — pushes button to the very bottom */}
        <div className="tr-spacer" />

        {/* Book button — always at bottom, always 44px tall */}
        <button className="tr-btn">
          <span>
            Book a Session
            <ChevronRight size={14} />
          </span>
        </button>

      </div>
    </div>
  );
}

export default function Trainer() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 4, allTrainers.length));
      setLoading(false);
    }, 800);
  };

  const visibleTrainers = allTrainers.slice(0, visibleCount);
  const hasMore = visibleCount < allTrainers.length;

  return (
    <>
      <style>{styles}</style>

      <section className="tr-section w-full px-4 sm:px-8 md:px-16 py-14 md:py-20">
        <div className="tr-blob-1" />
        <div className="tr-blob-2" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <div className="tr-fade-up flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <div className="tr-pill mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 tr-dot-pulse" />
                Popular Trainers
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Learn from <span className="tr-shimmer">Top Experts</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-2 max-w-md">
                Hand-picked trainers with verified credentials, real results, and thousands of happy learners.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              {[
                { val: "1,200+", label: "Verified Trainers" },
                { val: "4.9★",   label: "Avg. Rating" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/80 backdrop-blur border border-white/90 rounded-2xl px-4 py-3 shadow-sm text-center"
                  style={{ minWidth: 100 }}
                >
                  <p className="text-base font-bold text-gray-800">{s.val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="tr-grid">
            {visibleTrainers.map((trainer, i) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                delay={i < 4 ? 0.1 + (i % 4) * 0.08 : 0}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button className="tr-load-btn" onClick={handleLoadMore} disabled={loading}>
                {loading ? (
                  <><Loader2 size={16} className="tr-spin" /> Loading...</>
                ) : (
                  <>Load More Trainers <ChevronRight size={16} /></>
                )}
              </button>
            </div>
          )}

          {!hasMore && visibleCount > 4 && (
            <p className="text-center text-sm text-gray-400 mt-8">
              You've seen all {allTrainers.length} trainers ✓
            </p>
          )}
        </div>
      </section>
    </>
  );
}
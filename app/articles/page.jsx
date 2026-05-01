"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const ARTICLES = [
  {
    id: 1,
    cat: "Gym Trainer", catKey: "gym",
    catColor: "#e05a00", avatarBg: "#fff0ea", avatarColor: "#e05a00",
    title: "5 Compound Lifts That Build More Muscle Than 30 Isolation Exercises",
    excerpt: "Master these five foundational lifts to transform your physique and build functional, real-world strength.",
    tags: ["Workout", "Strength", "Form"],
    author: "Marcus Hale", initials: "MH",
    readTime: "5 min", date: "Apr 27",
    image: "/articleSection/image1.jpg",
    trending: true,
  },
  {
    id: 2,
    cat: "Doctor", catKey: "doctor",
    catColor: "#2980c8", avatarBg: "#e0f0ff", avatarColor: "#2980c8",
    title: "The Hidden Sleep Window Most People Are Missing",
    excerpt: "Your body has a specific 90-minute window where sleep architecture is optimal. Learn how to identify yours.",
    tags: ["Sleep", "Recovery", "Science"],
    author: "Dr. Priya Raman", initials: "PR",
    readTime: "6 min", date: "Apr 26",
    image: "/articleSection/image2.jpg",
  },
  {
    id: 3,
    cat: "Technical Expert", catKey: "tech",
    catColor: "#8040d0", avatarBg: "#f0eaff", avatarColor: "#8040d0",
    title: "How AI Is Quietly Rewriting Personal Training Programs",
    excerpt: "The next era of fitness isn't about harder workouts — it's about smarter data. See how ML is predicting your optimal routine.",
    tags: ["AI Health", "Data", "Future"],
    author: "Devon Park", initials: "DP",
    readTime: "4 min", date: "Apr 25",
    image: "/articleSection/image3.jpg",
    trending: true,
  },
  {
    id: 4,
    cat: "Nutritionist", catKey: "nutrition",
    catColor: "#1a9e60", avatarBg: "#e0fff0", avatarColor: "#1a9e60",
    title: "Eat For Energy, Not For Discipline",
    excerpt: "By shifting your focus from what you can't eat to what fuels you, you naturally gravitate toward better choices.",
    tags: ["Diet Tips", "Energy", "Mindset"],
    author: "Aria Solis", initials: "AS",
    readTime: "3 min", date: "Apr 23",
    image: "/articleSection/image4.jpg",
  },
  {
    id: 5,
    cat: "Mental Health Coach", catKey: "mental",
    catColor: "#e0507a", avatarBg: "#ffe0f0", avatarColor: "#e0507a",
    title: "Why Your Anxiety Spikes At 3 PM (And What To Do About It)",
    excerpt: "That mid-afternoon wave of panic isn't just in your head — it's a biological response to cortisol and blood sugar dips.",
    tags: ["Mindfulness", "Anxiety", "Routine"],
    author: "Yuki Tanaka", initials: "YT",
    readTime: "7 min", date: "Apr 20",
    image: "/articleSection/image5.jpg",
  },
  {
    id: 6,
    cat: "Fitness Coach", catKey: "fitness",
    catColor: "#0080a0", avatarBg: "#e0f5ff", avatarColor: "#0080a0",
    title: "The 12-Minute Mobility Routine Every Desk Worker Needs",
    excerpt: "Sitting is systematically shortening your hip flexors. This daily sequence undoes the damage of 9 hours at a desk.",
    tags: ["Mobility", "Posture", "Habits"],
    author: "Coach Irena Reyes", initials: "CR",
    readTime: "5 min", date: "Apr 18",
    image: "/articleSection/image6.jpg",
  },
  {
    id: 7,
    cat: "Gym Trainer", catKey: "gym",
    catColor: "#e05a00", avatarBg: "#fff0ea", avatarColor: "#e05a00",
    title: "Progressive Overload: The Only Principle That Actually Matters",
    excerpt: "Fad workouts come and go, but the law of progressive overload remains undefeated. Here's exactly how to track it.",
    tags: ["Training", "Muscle", "Basics"],
    author: "David Vance", initials: "DV",
    readTime: "10 min", date: "Apr 16",
    image: "/articleSection/image7.jpg",
    trending: true,
  },
  {
    id: 8,
    cat: "Nutritionist", catKey: "nutrition",
    catColor: "#1a9e60", avatarBg: "#e0fff0", avatarColor: "#1a9e60",
    title: "Protein Powders Demystified: What You Actually Need",
    excerpt: "Whey, casein, plant-based, isolate — navigating the supplement aisle is exhausting. A breakdown of what works and what's marketing.",
    tags: ["Supplements", "Protein", "Guide"],
    author: "Sarah Jenkins", initials: "SJ",
    readTime: "9 min", date: "Apr 12",
    image: "/articleSection/image8.jpg",
  },
  {
    id: 9,
    cat: "Mental Health Coach", catKey: "mental",
    catColor: "#e0507a", avatarBg: "#ffe0f0", avatarColor: "#e0507a",
    title: "The Power of the Morning Brain Dump",
    excerpt: "Before you look at a screen, empty your mind onto paper. Three pages of stream-of-consciousness writing can clarify your entire day.",
    tags: ["Journaling", "Focus", "Morning"],
    author: "Dr. Elias Thorne", initials: "ET",
    readTime: "8 min", date: "Apr 10",
    image: "/articleSection/image9.jpg",
  },
];

const FILTERS = [
  { id: "all", label: "All Trainers", icon: "⚡" },
  { id: "gym", label: "Gym Trainers", icon: "🏋️" },
  { id: "doctor", label: "Doctors", icon: "🩺" },
  { id: "fitness", label: "Fitness Coaches", icon: "🏃" },
  { id: "tech", label: "Technical Experts", icon: "🔬" },
  { id: "nutrition", label: "Nutritionists", icon: "🥗" },
  { id: "mental", label: "Mental Health Coaches", icon: "🧠" },
];

// ─────────────────────────────────────────────
// GLOBAL STYLES (injected once)
// ─────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #e0f2fe;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { display: none; }
  * { scrollbar-width: none; }

  /* ── Card hover ── */
  .card {
    background: #eff6ff;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #bfdbfe;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(30, 64, 175, 0.14);
  }
  .card:hover .card-img {
    transform: scale(1.05);
  }
  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  /* ── Featured card ── */
  .featured-card {
    background: #eff6ff;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #bfdbfe;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: row;
  }
  .featured-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(30, 64, 175, 0.14);
  }
  .featured-card:hover .featured-img {
    transform: scale(1.05);
  }
  .featured-img {
    transition: transform 0.4s ease;
  }

  /* ── Search input ── */
  .search-input::placeholder { color: #7ba8d4; }

  /* ── Filter tab ── */
  .filter-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 99px;
    font-size: 13px;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
    font-weight: 700;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  /* ── Like button ── */
  .like-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(239, 246, 255, 0.95);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.15s;
    z-index: 2;
  }
  .like-btn:hover { transform: scale(1.15); }

  /* ── Load more button ── */
  .load-more-btn {
    background: #1e40af;
    color: #fff;
    border: none;
    padding: 13px 36px;
    border-radius: 99px;
    font-size: 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
    font-weight: 600;
    transition: background 0.15s, transform 0.15s;
  }
  .load-more-btn:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  /* ── Search btn ── */
  .search-btn {
    background: #1e6fd4;
    color: #fff;
    border: none;
    border-radius: 99px;
    padding: 9px 22px;
    font-size: 14px;
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
    white-space: nowrap;
    transition: background 0.15s;
  }
  .search-btn:hover { background: #155bb5; }

  /* ────────────────────────────────────
     RESPONSIVE
  ──────────────────────────────────── */

  /* Article grid: 3 → 2 → 1 */
  .article-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 1024px) {
    .article-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .article-grid { grid-template-columns: 1fr; }
  }

  /* Featured card: row → column on mobile */
  @media (max-width: 768px) {
    .featured-card { flex-direction: column; }
    .featured-image-wrap { width: 100% !important; min-height: 220px !important; }
    .featured-body { padding: 20px !important; }
    .featured-title { font-size: 20px !important; }
    .featured-desc { font-size: 14px !important; }
  }

  /* Hero text */
  @media (max-width: 640px) {
    .hero-stats { gap: 1.5rem !important; }
    .hero-search-wrap { flex-direction: column; gap: 10px; border-radius: 14px !important; padding: 10px !important; }
    .hero-search-wrap input { width: 100%; }
    .search-btn { width: 100%; justify-content: center; border-radius: 10px !important; padding: 11px 0 !important; }
  }

  /* Filter tabs: scrollable on mobile */
  .filter-scroll {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding: 10px 0;
    scrollbar-width: none;
  }
  .filter-scroll::-webkit-scrollbar { display: none; }

  @media (max-width: 768px) {
    .filter-scroll { justify-content: flex-start; }
  }

  /* Content padding */
  .content-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1.75rem 1rem 4rem;
  }

  /* Featured outer */
  .featured-outer {
    max-width: 1450px;
    margin: 0 auto 2rem;
    padding: 0 20px;
  }
  @media (max-width: 640px) {
    .featured-outer { padding: 0 12px; }
    .content-wrap { padding: 1.25rem 0.75rem 3rem; }
  }
`;

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function HeroSection({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #050d1a 0%, #0a1628 55%, #0d1f3c 100%)",
        padding: "4rem 1.5rem 3rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Glows */}
      {[
        { top: -120, left: -120, w: 560, h: 560, color: "rgba(30,90,200,0.22)" },
        { bottom: -100, right: -100, w: 480, h: 480, color: "rgba(0,140,255,0.15)", isBottom: true },
      ].map((g, i) => (
        <div key={i} style={{
          position: "absolute",
          ...(g.isBottom ? { bottom: g.bottom, right: g.right } : { top: g.top, left: g.left }),
          width: g.w, height: g.h,
          background: `radial-gradient(circle, ${g.color} 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />
      ))}
      <div style={{
        position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
        width: 700, height: 300,
        background: "radial-gradient(ellipse, rgba(56,120,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(100,160,255,0.2)",
        color: "#93b8e8", fontSize: 12, padding: "5px 16px",
        borderRadius: 99, marginBottom: "1.5rem",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5eb0ff", display: "inline-block" }} />
        The world&apos;s best experts in one place
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
        color: "#fff", letterSpacing: 1,
        lineHeight: 1.0, marginBottom: "1rem",
        position: "relative", zIndex: 1,
      }}>
        Explore powerful{" "}
        <span style={{ color: "#4da6ff" }}>insights,</span>{" "}
        <span style={{ color: "#7dd3fc" }}>stories,</span>
        <br />and ideas.
      </h1>

      <p style={{
        color: "#7ba8d4", fontSize: "clamp(13px, 2.5vw, 15px)", maxWidth: 420,
        margin: "0 auto 2rem", lineHeight: 1.65,
        position: "relative", zIndex: 1,
      }}>
        Expert trainers, real results. Discover actionable insights from the people who know best.
      </p>

      {/* Search */}
      <div
        className="hero-search-wrap"
        style={{
          display: "flex", alignItems: "center",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(100,160,255,0.2)",
          borderRadius: 99, padding: "6px 6px 6px 20px",
          maxWidth: 480, margin: "0 auto 2.5rem",
          position: "relative", zIndex: 1,
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
          placeholder="Search neuroscience, nutrition, habits…"
          className="search-input"
          style={{
            background: "none", border: "none", outline: "none",
            color: "#fff", fontSize: 14, flex: 1,
            fontFamily: "inherit", minWidth: 0,
          }}
        />
        <button className="search-btn" onClick={() => onSearch(query)}>
          Search
        </button>
      </div>

      {/* Stats */}
      <div
        className="hero-stats"
        style={{
          display: "flex", justifyContent: "center", gap: "3rem",
          flexWrap: "wrap",
          position: "relative", zIndex: 1,
        }}
      >
        {[["500+", "Verified Trainers"], ["12k+", "Articles"], ["6", "Expert Categories"]].map(
          ([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2rem", color: "#fff", letterSpacing: 0.5,
              }}>{num}</div>
              <div style={{
                fontSize: 10, color: "#5a88b8",
                letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 2,
              }}>{label}</div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function FilterTabs({ active, onFilter }) {
  return (
    <div style={{
      background: "#dbeafe",
      borderBottom: "1px solid #bfdbfe",
      padding: "0 1rem",
    }}>
      <div className="filter-scroll" style={{ maxWidth: 1280, margin: "0 auto" }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilter(f.id)}
            className="filter-tab"
            style={{
              border: `1px solid ${active === f.id ? "#1e40af" : "#93c5fd"}`,
              background: active === f.id ? "#1e40af" : "#eff6ff",
              color: active === f.id ? "#fff" : "#1e40af",
            }}
          >
            <span style={{ fontSize: 14 }}>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedCard() {
  return (
    <div className="featured-outer">
      <div className="featured-card">
        {/* Image */}
        <div
          className="featured-image-wrap"
          style={{ position: "relative", width: "45%", minHeight: 260, overflow: "hidden" }}
        >
          <Image
            src="/articleNewSection/image-banner.png"
            alt="featured"
            fill
            className="featured-img"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        {/* Body */}
        <div
          className="featured-body"
          style={{
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {/* Badges */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{
              background: "#dbeafe", color: "#1d4ed8",
              fontSize: 12, fontWeight: 700,
              padding: "6px 14px", borderRadius: 999, letterSpacing: "0.6px",
            }}>🔥 Trending</span>
            <span style={{
              background: "#ede9fe", color: "#6d28d9",
              fontSize: 12, fontWeight: 700,
              padding: "6px 14px", borderRadius: 999, letterSpacing: "0.6px",
            }}>Masterclass</span>
          </div>

          {/* Title */}
          <h2
            className="featured-title"
            style={{
              fontSize: 26, fontWeight: 700,
              color: "#0f172a", lineHeight: 1.4, marginBottom: 14,
            }}
          >
            The Neuroscience of Building Habits That Actually Stick
          </h2>

          {/* Description */}
          <p
            className="featured-desc"
            style={{
              fontSize: 16, color: "#475569", lineHeight: 1.7, marginBottom: 20,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            Discover how top performers engineer their environments to make the right choice the
            default — bypassing motivation entirely with neuroscience-backed systems.
          </p>

          {/* Author footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#dbeafe",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#1d4ed8",
              flexShrink: 0,
            }}>MC</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>Dr. Maya Collins</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Mental Health Coach</div>
            </div>
            <div style={{
              marginLeft: "auto",
              width: 34, height: 34, borderRadius: "50%",
              background: "#bfdbfe",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: "#1d4ed8", flexShrink: 0,
            }}>→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card">
      {/* Image */}
      <div style={{ position: "relative", height: 190, flexShrink: 0, overflow: "hidden" }}>
        <img
          src={article.image}
          alt={article.title}
          className="card-img"
        />
        {article.trending && (
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: "rgba(239,246,255,0.95)", color: "#1d4ed8",
            fontSize: 11, fontWeight: 700,
            padding: "5px 12px", borderRadius: 999, zIndex: 2,
          }}>🔥 Trending</span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
          aria-label="Like article"
          className="like-btn"
          style={{ color: liked ? "#e11d48" : "#64748b" }}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Category */}
        <p style={{
          fontSize: 12, fontWeight: 700,
          textTransform: "uppercase",
          color: article.catColor,
          marginBottom: 8, letterSpacing: "0.6px",
        }}>{article.cat}</p>

        {/* Title */}
        <h3 style={{
          fontSize: 18, fontWeight: 600,
          color: "#0f172a", lineHeight: 1.5, marginBottom: 10,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{article.title}</h3>

        {/* Excerpt */}
        <p style={{
          fontSize: 14, color: "#64748b",
          lineHeight: 1.6, marginBottom: 14,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
        }}>{article.excerpt}</p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {article.tags.map((tag) => (
            <span key={tag} style={{
              background: "#dbeafe", color: "#1e40af",
              fontSize: 12, padding: "5px 12px", borderRadius: 999,
            }}>{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          borderTop: "1px solid #bfdbfe", paddingTop: 14,
          marginTop: "auto",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: article.avatarBg, color: article.avatarColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>{article.initials}</div>
          <span style={{ fontSize: 13, color: "#94a3b8", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {article.author} · {article.readTime} · {article.date}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function FitPulsePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded, setExpanded] = useState(false);

  const filteredArticles = ARTICLES.filter((a) => {
    const matchesFilter = activeFilter === "all" || a.catKey === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  const handleToggle = () => {
    if (expanded) {
      setVisibleCount(6);
      setExpanded(false);
    } else {
      setVisibleCount(filteredArticles.length);
      setExpanded(true);
    }
  };

  function handleSearch(q) {
    setSearchQuery(q);
    setActiveFilter("all");
    setVisibleCount(6);
    setExpanded(false);
  }

  function handleFilter(id) {
    setActiveFilter(id);
    setVisibleCount(6);
    setExpanded(false);
  }

  return (
    <>
      <style>{globalStyles}</style>

      <main style={{ minHeight: "100vh", background: "#e0f2fe" }}>
        <HeroSection onSearch={handleSearch} />
        <FilterTabs active={activeFilter} onFilter={handleFilter} />

        <div className="content-wrap">
          {/* Featured */}
          {activeFilter === "all" && searchQuery === "" && <FeaturedCard />}

          {/* Search meta */}
          {searchQuery && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "1rem", flexWrap: "wrap", gap: 8,
            }}>
              <p style={{ fontSize: 13, color: "#475569" }}>
                {visibleArticles.length} result{visibleArticles.length !== 1 ? "s" : ""} for{" "}
                <strong style={{ color: "#0f172a" }}>&quot;{searchQuery}&quot;</strong>
              </p>
              <button
                onClick={() => { setSearchQuery(""); setVisibleCount(6); setExpanded(false); }}
                style={{
                  background: "none", border: "1px solid #93c5fd",
                  borderRadius: 99, padding: "4px 12px", fontSize: 12,
                  cursor: "pointer", color: "#1e40af", fontFamily: "inherit",
                }}
              >
                Clear ✕
              </button>
            </div>
          )}

          {/* Section label */}
          <p style={{
            fontSize: 17, letterSpacing: "1.8px",
            textTransform: "uppercase", color: "#60a5fa",
            marginBottom: "1rem", fontWeight: 700,
          }}>
            {searchQuery ? "Search Results" : "Latest Articles"}
          </p>

          {/* Grid */}
          {visibleArticles.length > 0 ? (
            <div className="article-grid">
              {visibleArticles.map((article) => {
                const slug = article.title
                  .toLowerCase()
                  .replace(/[^a-z0-9 ]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <Link
                    key={article.id}
                    href={`/articles/${slug}-${article.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ArticleCard article={article} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: "center", padding: "3rem 1rem",
              color: "#64748b", fontSize: 16,
            }}>
              No articles found. Try a different search or filter.
            </div>
          )}

          {/* Load more */}
          {filteredArticles.length > 6 && (
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <button className="load-more-btn" onClick={handleToggle}>
                {expanded ? "Show Less ↑" : "Load More Articles →"}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
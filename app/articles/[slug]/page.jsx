"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ARTICLE = [
  {
    id: 1,
    category: "Gym Trainer",
    title: "Why Progressive Overload Is the Key to Muscle Growth",
    readTime: "6 min read",
    date: "28 Apr 2026",
    views: "5.1k",
    author: {
      name: "Marcus Hale",
      initials: "MH",
      role: "Certified Strength Coach",
      bio: "Marcus specializes in hypertrophy training and strength development with 10+ years of coaching experience.",
    },
    coverImage: "/articleSection/image1.jpg",
    tags: ["Workout", "Muscle", "Strength"],
    content: [
      { type: "lead", text: "If you're not progressively increasing your workload, your muscles have no reason to grow." },
      { type: "h2", text: "1. What Is Progressive Overload?" },
      { type: "p", text: "It refers to gradually increasing weight, reps, or intensity to challenge your muscles." },
      { type: "h2", text: "2. Why It Works" },
      { type: "p", text: "Muscles adapt to stress. Increasing resistance forces them to grow stronger." },
      { type: "h2", text: "Final Thoughts" },
      { type: "p", text: "Track your workouts consistently to ensure long-term progress." }
    ]
  },

  {
    id: 2,
    category: "Doctor",
    title: "The Science Behind Deep Sleep and Recovery",
    readTime: "5 min read",
    date: "26 Apr 2026",
    views: "6.3k",
    author: {
      name: "Dr. Priya Raman",
      initials: "PR",
      role: "Sleep Specialist",
      bio: "Dr. Priya focuses on sleep cycles, circadian rhythm, and recovery science.",
    },
    coverImage: "/articleSection/image2.jpg",
    tags: ["Sleep", "Health", "Recovery"],
    content: [
      { type: "lead", text: "Deep sleep is when your body performs its most critical repair functions." },
      { type: "h2", text: "1. Sleep Cycles Explained" },
      { type: "p", text: "Your body cycles through REM and non-REM stages every 90 minutes." },
      { type: "h2", text: "2. Why Deep Sleep Matters" },
      { type: "p", text: "It boosts memory, recovery, and hormone regulation." },
      { type: "h2", text: "Final Thoughts" },
      { type: "p", text: "Prioritize sleep like you prioritize diet and exercise." }
    ]
  },

  {
    id: 3,
    category: "Technical Expert",
    title: "How AI Is Transforming Personalized Fitness",
    readTime: "7 min read",
    date: "25 Apr 2026",
    views: "8.8k",
    author: {
      name: "Devon Park",
      initials: "DP",
      role: "AI Engineer",
      bio: "Devon works on machine learning systems for health-tech and fitness analytics.",
    },
    coverImage: "/articleSection/image3.jpg",
    tags: ["AI", "Fitness", "Technology"],
    content: [
      { type: "lead", text: "Artificial Intelligence is reshaping how fitness programs are designed." },
      { type: "h2", text: "1. Data-Driven Workouts" },
      { type: "p", text: "AI tracks performance and adapts routines in real time." },
      { type: "h2", text: "2. Predictive Training" },
      { type: "p", text: "Machine learning predicts optimal recovery and training loads." },
      { type: "h2", text: "Final Thoughts" },
      { type: "p", text: "The future of fitness is personalized and data-driven." }
    ]
  },

  {
    id: 4,
    category: "Nutritionist",
    title: "How to Eat for Energy Throughout the Day",
    readTime: "4 min read",
    date: "23 Apr 2026",
    views: "4.2k",
    author: {
      name: "Aria Solis",
      initials: "AS",
      role: "Clinical Nutritionist",
      bio: "Aria focuses on sustainable eating habits and energy optimization.",
    },
    coverImage: "/articleSection/image4.jpg",
    tags: ["Diet", "Energy", "Nutrition"],
    content: [
      { type: "lead", text: "Your diet should fuel your day, not drain it." },
      { type: "h2", text: "1. Balanced Meals" },
      { type: "p", text: "Include protein, carbs, and fats in every meal." },
      { type: "h2", text: "2. Avoid Sugar Crashes" },
      { type: "p", text: "Limit processed sugars to maintain stable energy levels." },
      { type: "h2", text: "Final Thoughts" },
      { type: "p", text: "Consistency matters more than perfection." }
    ]
  },

  {
    id: 5,
    category: "Mental Health Coach",
    title: "How to Manage Midday Anxiety Effectively",
    readTime: "6 min read",
    date: "21 Apr 2026",
    views: "7.5k",
    author: {
      name: "Yuki Tanaka",
      initials: "YT",
      role: "Mental Wellness Coach",
      bio: "Yuki helps professionals manage stress, anxiety, and emotional balance.",
    },
    coverImage: "/articleSection/image5.jpg",
    tags: ["Mental Health", "Anxiety", "Mindfulness"],
    content: [
      { type: "lead", text: "Afternoon anxiety spikes are more common than you think." },
      { type: "h2", text: "1. Identify Triggers" },
      { type: "p", text: "Stress, caffeine, and lack of sleep can contribute." },
      { type: "h2", text: "2. Quick Fix Techniques" },
      { type: "p", text: "Breathing exercises and short walks help regulate stress." },
      { type: "h2", text: "Final Thoughts" },
      { type: "p", text: "Build small habits to maintain mental balance." }
    ]
  },

  {
    id: 6,
    category: "Fitness Coach",
    title: "The 15-Minute Daily Mobility Routine",
    readTime: "5 min read",
    date: "19 Apr 2026",
    views: "3.9k",
    author: {
      name: "Irena Reyes",
      initials: "IR",
      role: "Mobility Specialist",
      bio: "Irena focuses on flexibility, posture correction, and injury prevention.",
    },
    coverImage: "/articleSection/image6.jpg",
    tags: ["Mobility", "Flexibility", "Routine"],
    content: [
      { type: "lead", text: "Mobility is the foundation of long-term fitness." },
      { type: "h2", text: "1. Why Mobility Matters" },
      { type: "p", text: "It improves movement efficiency and prevents injuries." },
      { type: "h2", text: "2. Daily Routine" },
      { type: "p", text: "Focus on hips, shoulders, and spine flexibility." },
      { type: "h2", text: "Final Thoughts" },
      { type: "p", text: "Consistency is key for lasting results." }
    ]
  }
];

const RELATED = [
  {
    id: 1,
    title: "Top 10 Real Estate Courses in India After 12th",
    date: "23 Apr 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80",
  },
  {
    id: 2,
    title: "RERA Explained: Everything First-Time Buyers Must Know",
    date: "20 Apr 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
  },
  {
    id: 3,
    title: "How to Read a Property Sale Agreement in India",
    date: "17 Apr 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
  },
];

export default function ArticlePage() {
  
  const [showToast, setShowToast] = useState(false);
  const articleRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);

  // useEffect(() => {
  //   fetch("https://service.ireedindia.com/v1/blog?published=true&size=1000")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  useEffect(() => {
  const onScroll = () => {
    const el = articleRef.current;
    if (!el) return;

    const top = el.getBoundingClientRect().top;
    const height = el.offsetHeight;
    const windowH = window.innerHeight;

    const scrolled = Math.max(0, -top);
    const total = height - windowH;

    setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  return (
    <div className="page" ref={articleRef}>
      {/* ── Topbar ── */}
      <header className="topbar">
        <Link href="/articles" className="back-btn">← Back to Articles</Link>
      </header>

      {/* ── Toast ── */}
      {showToast && <div className="toast">✅ Link copied to clipboard!</div>}

      <main className="main-layout">
        {/* ── Left sticky sidebar ── */}
        <aside className="sidebar-left">
          
        </aside>

        {/* ── Article ── */}
        <article className="article-body">
          {/* Category + meta */}
          <div className="article-meta-top">
            <span className="cat-badge">{ARTICLE.category}</span>
            <span className="meta-dot" />
            <span className="meta-text">{ARTICLE.readTime}</span>
            <span className="meta-dot" />
            <span className="meta-text">{ARTICLE.date}</span>
            <span className="meta-dot" />
            <span className="meta-text">👁 {ARTICLE.views} views</span>
          </div>

          {/* Title */}
          <h1 className="article-title">{ARTICLE.title}</h1>

          {/* Author row */}
          <div className="author-row">
            <div className="author-avatar">{ARTICLE.author.initials}</div>
            <div>
              <div className="author-name">{ARTICLE.author.name}</div>
              <div className="author-role">{ARTICLE.author.role}</div>
            </div>
          </div>

          {/* Cover image */}
          <div className="cover-wrap">
            <img src={ARTICLE.coverImage} alt="Article cover" className="cover-img" />
            <div className="cover-overlay" />
          </div>

          {/* Content blocks */}
          <div className="content-blocks">
            {ARTICLE.content.map((block, i) => {
              if (block.type === "lead") return <p key={i} className="lead-text">{block.text}</p>;
              if (block.type === "h2") return <h2 key={i} className="content-h2">{block.text}</h2>;
              if (block.type === "p") return <p key={i} className="content-p">{block.text}</p>;
              if (block.type === "callout") return (
                <div key={i} className="callout">{block.text}</div>
              );
              if (block.type === "quote") return (
                <blockquote key={i} className="pull-quote">
                  <p>"{block.text}"</p>
                  <cite>— {block.author}</cite>
                </blockquote>
              );
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="tags-row">
            {ARTICLE.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          {/* Author card */}
          <div className="author-card">
            <div className="author-card-avatar">{ARTICLE.author.initials}</div>
            <div>
              <div className="author-card-name">{ARTICLE.author.name}</div>
              <div className="author-card-role">{ARTICLE.author.role}</div>
              <p className="author-card-bio">{ARTICLE.author.bio}</p>
            </div>
          </div>
        </article>

        {/* ── Right sidebar ── */}
        <aside className="sidebar-right">
          <div className="toc-card">
            <div className="toc-title">📋 In This Article</div>
            {ARTICLE.content
              .filter((b) => b.type === "h2")
              .map((b, i) => (
                <a key={i} href="#" className="toc-item">{b.text}</a>
              ))}
          </div>

          <div className="newsletter-card">
            <div className="nl-emoji">📬</div>
            <div className="nl-title">Get Weekly Insights</div>
            <p className="nl-sub">Expert articles delivered to your inbox every Tuesday.</p>
            <input className="nl-input" placeholder="Your email address" type="email" />
            <button className="nl-btn">Subscribe Free</button>
          </div>
        </aside>
      </main>

      {/* ── Related Articles ── */}
      <section className="related-section">
        <h3 className="related-title">Related Articles</h3>
        <div className="related-grid">
          {RELATED.map((r) => (
            <a key={r.id} href="#" className="related-card">
              <img src={r.image} alt={r.title} className="related-img" />
              <div className="related-body">
                <p className="related-meta">{r.date} · {r.readTime} read</p>
                <p className="related-card-title">{r.title}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          background: #f7f8fc;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        /* Progress */
        .progress-bar {
          position: fixed;
          top: 0; left: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          z-index: 100;
          transition: width 0.1s linear;
          border-radius: 0 2px 2px 0;
        }

        /* Topbar */
        .topbar {
          position: sticky;
          top: 3px;
          z-index: 50;
          background: rgba(247, 248, 252, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8f0;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .back-btn {
          font-size: 0.875rem;
          font-weight: 600;
          color: #6366f1;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .back-btn:hover { opacity: 0.75; }
        .topbar-actions {
          display: flex;
          gap: 0.5rem;
        }
        .action-btn {
          padding: 0.38rem 0.9rem;
          border-radius: 8px;
          border: 1.5px solid #e2e2ef;
          background: #fff;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.18s;
        }
        .action-btn:hover { border-color: #6366f1; color: #6366f1; }
        .active-like { background: #fef2f2 !important; color: #e11d48 !important; border-color: #fca5a5 !important; }
        .active-save { background: #f0fdf4 !important; color: #16a34a !important; border-color: #86efac !important; }
        .share-btn:hover { background: #eef2ff; }

        /* Toast */
        .toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: #1e1b4b;
          color: #fff;
          padding: 0.65rem 1.5rem;
          border-radius: 99px;
          font-size: 0.875rem;
          font-weight: 600;
          z-index: 200;
          animation: fadeUp 0.3s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Layout */
        .main-layout {
          max-width: 1700px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem;
          display: grid;
          grid-template-columns: 64px 1fr 280px;
          gap: 2.5rem;
          align-items: start;
        }

        /* Left sidebar */
        .sidebar-left {
          position: sticky;
          top: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .side-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 0.6rem;
          border-radius: 12px;
          border: 1.5px solid #e2e2ef;
          background: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          width: 52px;
          transition: all 0.18s;
          font-family: inherit;
        }
        .side-btn span {
          font-size: 0.6rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .side-btn:hover { border-color: #6366f1; }
        .side-liked { background: #fef2f2; border-color: #fca5a5; }
        .side-saved { background: #f0fdf4; border-color: #86efac; }
        .side-progress {
          width: 3px;
          height: 80px;
          background: #e2e2ef;
          border-radius: 2px;
          margin-top: 0.5rem;
          overflow: hidden;
          position: relative;
        }
        .side-progress-fill {
          width: 100%;
          background: linear-gradient(180deg, #6366f1, #a855f7);
          border-radius: 2px;
          transition: height 0.1s linear;
        }

        /* Article */
        .article-body {
          background: #fff;
          border-radius: 20px;
          padding: 2.5rem 3rem;
          border: 1px solid #ebebf5;
          box-shadow: 0 2px 20px rgba(0,0,0,0.04);
        }

        .article-meta-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .cat-badge {
          background: #eef2ff;
          color: #4f46e5;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 6px;
        }
        .meta-dot {
          width: 3px; height: 3px;
          background: #cbd5e1;
          border-radius: 50%;
        }
        .meta-text {
          font-size: 0.82rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .article-title {
          font-family: 'Lora', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 1.5rem;
          letter-spacing: -0.3px;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .author-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .author-name { font-size: 0.9rem; font-weight: 700; color: #1e293b; }
        .author-role { font-size: 0.78rem; color: #94a3b8; }

        .cover-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .cover-img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          display: block;
        }
        .cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.15), transparent);
        }

        /* Content */
        .content-blocks { display: flex; flex-direction: column; gap: 1.25rem; }

        .lead-text {
          font-family: 'Lora', serif;
          font-size: 1.15rem;
          color: #334155;
          line-height: 1.8;
          font-style: italic;
          border-left: 3px solid #6366f1;
          padding-left: 1.25rem;
        }
        .content-h2 {
          font-family: 'Lora', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 0.75rem;
          letter-spacing: -0.2px;
        }
        .content-p {
          font-size: 0.975rem;
          color: #475569;
          line-height: 1.85;
        }
        .callout {
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          font-size: 0.9rem;
          color: #3730a3;
          font-weight: 500;
          line-height: 1.6;
        }
        .pull-quote {
          border-left: 4px solid #a855f7;
          padding: 1rem 1.5rem;
          background: #faf5ff;
          border-radius: 0 12px 12px 0;
        }
        .pull-quote p {
          font-family: 'Lora', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: #4c1d95;
          line-height: 1.7;
          margin-bottom: 0.5rem;
        }
        .pull-quote cite {
          font-size: 0.8rem;
          color: #7c3aed;
          font-weight: 600;
        }

        /* Tags */
        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }
        .tag {
          padding: 4px 12px;
          border-radius: 99px;
          border: 1.5px solid #e2e8f0;
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s;
        }
        .tag:hover { border-color: #6366f1; color: #6366f1; background: #eef2ff; }

        /* Author card */
        .author-card {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding: 1.5rem;
          background: #f8faff;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
        }
        .author-card-avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .author-card-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; }
        .author-card-role { font-size: 0.78rem; color: #6366f1; font-weight: 600; margin-bottom: 0.35rem; }
        .author-card-bio { font-size: 0.82rem; color: #64748b; line-height: 1.6; }

        /* Right sidebar */
        .sidebar-right {
          position: sticky;
          top: 80px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .toc-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #ebebf5;
          padding: 1.25rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .toc-title {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #94a3b8;
          margin-bottom: 0.9rem;
        }
        .toc-item {
          display: block;
          font-size: 0.825rem;
          color: #475569;
          text-decoration: none;
          padding: 0.38rem 0;
          border-bottom: 1px solid #f1f5f9;
          font-weight: 500;
          transition: color 0.15s;
          line-height: 1.4;
        }
        .toc-item:last-child { border-bottom: none; }
        .toc-item:hover { color: #6366f1; }

        .newsletter-card {
          background: linear-gradient(135deg, #1e1b4b, #312e81);
          border-radius: 14px;
          padding: 1.5rem 1.25rem;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nl-emoji { font-size: 1.5rem; }
        .nl-title { font-size: 1rem; font-weight: 700; }
        .nl-sub { font-size: 0.78rem; color: #a5b4fc; line-height: 1.5; }
        .nl-input {
          margin-top: 0.5rem;
          padding: 0.55rem 0.875rem;
          border-radius: 8px;
          border: none;
          background: rgba(255,255,255,0.12);
          color: #fff;
          font-size: 0.82rem;
          font-family: inherit;
          outline: none;
          width: 100%;
        }
        .nl-input::placeholder { color: rgba(255,255,255,0.45); }
        .nl-btn {
          padding: 0.6rem;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.15s;
        }
        .nl-btn:hover { opacity: 0.88; }

        /* Related */
        .related-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }
        .related-title {
          font-family: 'Lora', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.25rem;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .related-card {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #ebebf5;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          display: block;
        }
        .related-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        .related-img { width: 100%; height: 140px; object-fit: cover; display: block; }
        .related-body { padding: 1rem; }
        .related-meta { font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.4rem; }
        .related-card-title { font-size: 0.875rem; font-weight: 700; color: #1e293b; line-height: 1.4; }

        @media (max-width: 1024px) {
          .main-layout { grid-template-columns: 1fr; }
          .sidebar-left, .sidebar-right { display: none; }
          .article-body { padding: 1.75rem; }
          .related-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .topbar { padding: 0.6rem 1rem; }
          .article-title { font-size: 1.5rem; }
          .related-grid { grid-template-columns: 1fr; }
          .main-layout { padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
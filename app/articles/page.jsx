"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import HeroSection from "../components/articleHeroSection";
import { Clock } from "lucide-react";
import Link from "next/link";

/* ------------------ DATA ------------------ */
const TABS = [
  "All Articles",
  "Tech",
  "Business",
  "Health",
  "Finance",
  "Marketing",
  "Creative",
  "Growth",
];

const categoryStyles = {
  FINANCE: { bg: "bg-blue-100", text: "text-blue-700" },
  WELLNESS: { bg: "bg-purple-100", text: "text-purple-700" },
  HEALTH: { bg: "bg-emerald-100", text: "text-emerald-700" },
  MARKETING: { bg: "bg-rose-100", text: "text-rose-700" },
  TECH: { bg: "bg-cyan-100", text: "text-cyan-700" },
  GROWTH: { bg: "bg-amber-100", text: "text-amber-700" },
};

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("All Articles");
  const [visibleCount, setVisibleCount] = useState(6);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://service.ireedindia.com/v1/blog?published=true&size=1000")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeTab]);

  const filteredArticles =
    data?.blogs
      ?.filter((a) =>
        activeTab === "All Articles"
          ? true
          : a.category?.toLowerCase() === activeTab.toLowerCase()
      ) || [];

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <div className="w-full font-[Manrope] bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">

      {/* HERO */}
      <HeroSection />

      {/* TABS */}
<div className="sticky top-0 z-20 backdrop-blur-md bg-[#eeedf8]/80">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">

    {/* wrapper (old style container) */}
    <div className="tab-wrapper">

      <div className="tab-bar">

        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn ${activeTab === tab ? "tab-active" : ""}`}
          >
            {tab}
          </button>
        ))}

      </div>
    </div>
  </div>

  {/* CSS */}
  <style>{`
    .tab-wrapper {
      background: #e2e1f0;
      padding: 8px 12px;
      border-radius: 14px;
      display: flex;
      justify-content: center;
      width: 100%;
      overflow: hidden;
    }

    .tab-bar {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .tab-bar::-webkit-scrollbar {
      display: none;
    }

    .tab-btn {
      padding: 0.55rem 1.4rem;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: #4b5563;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .tab-btn:hover {
      color: #1e1b4b;
    }

    .tab-active {
      background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
      color: #fff !important;
      font-weight: 700;
      box-shadow: 0 3px 12px rgba(99, 102, 241, 0.35);
    }

    /* mobile tweak */
    @media (max-width: 640px) {
      .tab-wrapper {
        border-radius: 10px;
        padding: 6px 8px;
      }

      .tab-btn {
        padding: 0.55rem 1.3rem;
  border-radius: 999px;
  border: none;
  background: transparent;

  color: #5b5f77;
  font-size: 0.92rem;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.25s ease;

  white-space: nowrap;
  flex-shrink: 0;

  /* ✨ cute feel */
  font-family: "Poppins", "Inter", sans-serif;
  letter-spacing: 0.2px;
      }
    }
  `}</style>

</div>

      {/* ARTICLES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Latest Articles
          </h2>

          <span className="text-sm text-blue-500">
            {visibleArticles.length} / {filteredArticles.length}
          </span>
        </div>

        {/* GRID (RESPONSIVE FIX) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {visibleArticles.map((a) => {
            const cat =
              categoryStyles[a.category?.toUpperCase()] ||
              categoryStyles.TECH;

            return (
              <div
                key={a._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1"
              >

                {/* IMAGE */}
                <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-xl group">

                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* CATEGORY */}
                  <span className={`absolute top-3 left-3 ${cat.bg} ${cat.text} text-xs px-3 py-1 rounded-full`}>
                    {a?.userPostDataInfo?.[0]?.role || "Article"}
                  </span>

                  {/* READ TIME */}
                  <span className="absolute bottom-3 right-3 bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock size={14} /> 5 min
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-5">

                  <h3 className="font-bold text-sm sm:text-base mb-2 hover:text-indigo-600">
                    {a.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
                    {a.description}
                  </p>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center mt-4">

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-500 text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                        {getInitials(a.researchAssociate)}
                      </div>

                      <div className="leading-tight">
                        <p className="text-sm font-semibold">
                          {a.researchAssociate}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(a.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                    </div>

                    {/* READ BUTTON */}
                    <Link
                      href="/soloArticlePage"
                      className="text-xs sm:text-sm text-blue-600 font-semibold flex items-center gap-1 group"
                    >
                      Read Article
                      <span className="group-hover:translate-x-1 transition">
                        →
                      </span>
                    </Link>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* EMPTY */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No articles found
          </div>
        )}

        {/* LOAD MORE */}
        {filteredArticles.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  prev >= filteredArticles.length ? 6 : prev + 3
                )
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              {visibleCount >= filteredArticles.length
                ? "Show Less"
                : "Load More"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
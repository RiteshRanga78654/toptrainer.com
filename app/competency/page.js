"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import YoutubeSection from "../components/youtube";
import axios from "axios";
import CategoryTrainerExplorer from "../components/CategoryTrainerExplorer";

function ArticleSlider({ articles }) {
  const scrollRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(articles.length / cardsPerSlide);

  const goToSlide = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.offsetWidth;
    el.scrollTo({ left: width * index, behavior: "smooth" });
    setCurrent(index);
  };

  const next = () => {
    if (current < totalSlides - 1) goToSlide(current + 1);
  };

  const prev = () => {
    if (current > 0) goToSlide(current - 1);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
          const start = slideIndex * cardsPerSlide;
          const chunk = articles.slice(start, start + cardsPerSlide);

          return (
            <div
              key={slideIndex}
              className="min-w-full snap-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {chunk.map((a) => (
                <div
                  key={a._id || a.id || a.slug || a.title}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 h-68"
                >
                  <Image
                    src={a.image || a.thumbnail || "/Images/workshop2.png"}
                    alt={a.title || "Article"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {a.featured && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      Featured
                    </span>
                  )}

                  <div className="absolute bottom-2 left-5 right-5 z-10">
                    <p className="text-white font-bold text-lg leading-snug truncate">
                      {a.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 disabled:opacity-40"
          >
            Prev
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  current === i ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === totalSlides - 1}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function Competency() {
  const router = useRouter();

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  // No tab-matching, no filter — just show every article that's been
  // assigned to a competency in admin, directly, once.
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setArticlesLoading(true);

        const res = await axios.get("https://toptrainer-backend-production.up.railway.app/ckend-production.up.railway.app//api/articles", {
          params: {
            competency: "any",
          },
        });

        const rawArticles = res?.data?.data || res?.data?.articles || [];

        const normalized = rawArticles.map((item) => ({
          ...item,
          featured: Boolean(item?.featured || item?.isFeatured),
          image:
            item?.image?.url ||
            item?.thumbnail?.url ||
            item?.thumbnail ||
            item?.coverImage?.url ||
            item?.coverImage ||
            "/Images/workshop2.png",
        }));

        normalized.sort((a, b) => Number(b.featured) - Number(a.featured));

        setArticles(normalized);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setArticlesLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #f0fdf4 100%)",
      }}
    >
      {/* Hero */}
      <div className="relative h-[330px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Images/industry-hero.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/70" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">Explore Top Trainers</h1>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-8">By Competency</p>
        </div>
      </div>

      <CategoryTrainerExplorer headingLabel="Trainers" />

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
          <button
            onClick={() => router.push("/articles")}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            View All
          </button>
        </div>
        {articlesLoading ? (
          <div className="text-sm text-gray-500 py-10">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="text-sm text-gray-500 py-10">
            No articles added yet.
          </div>
        ) : articles.length > 3 ? (
          <ArticleSlider articles={articles} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <div
                key={a._id || a.id || a.slug || a.title}
                className="relative rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 h-68"
              >
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {a.featured && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    Featured
                  </span>
                )}

                <div className="absolute bottom-2 left-5 right-5 z-10">
                  <p className="text-white font-bold text-lg leading-snug ">{a.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <YoutubeSection scope="entity" entityType="Competency" />
    </div>
  );
}
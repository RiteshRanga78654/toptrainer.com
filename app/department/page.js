"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import YoutubeSection from "../components/youtube";
import axios from "axios";

function normalizeTrainer(trainer) {
  const domains = trainer?.expertiseDomain?.domain?.filter(Boolean) || [];
  const tagsLine = trainer?.tagsLine?.filter(Boolean) || [];
  const feesRaw = trainer?.additionalDetails?.feesPerDay;
  const feesNumber = feesRaw ? Number(String(feesRaw).replace(/[^\d.]/g, "")) : null;

  return {
    id: trainer?._id,
    trainerId: trainer?.trainerId || trainer?._id,
    name: trainer?.fullName || "Unnamed Trainer",
    role: trainer?.expertiseDomain?.TrainerType || trainer?.entityType || "Trainer",
    tags: (tagsLine.length > 0 ? tagsLine : domains).slice(0, 3),
    price: Number.isFinite(feesNumber) && feesNumber > 0 ? feesNumber : null,
    image: trainer?.profilePhoto?.url || "/Images/trainee2.png",
  };
}

function TrainerCard({ trainer }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={trainer.image}
            alt={trainer.name}
            fill
            unoptimized
            className="object-cover"
          />

          <div className={`absolute inset-0 `} />
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-bold text-gray-900 text-base">{trainer.name}</h3>
          <svg className="w-4 h-4 text-blue-500 fill-blue-500" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <p className="text-sm text-gray-500 mb-3">{trainer.role}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {trainer.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between mt-4">
          <a href={`/trainer-profile/${trainer.trainerId}`}>
            <button className="border border-blue-600 text-blue-600 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 group-hover:shadow-sm">
              View Profile
            </button>
          </a>

          <div className="text-right">
            <p className="text-sm text-gray-500 mt-1">
              {trainer.price ? `₹${trainer.price.toLocaleString("en-IN")} / Day` : "Contact for pricing"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default function Department() {
  const router = useRouter();

  const [departmentsData, setDepartmentsData] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);

  const [activeDepartment, setActiveDepartment] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [showAll, setShowAll] = useState(false);

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  // Real departments, each populated with the trainers an admin has
  // linked to them (see Department.trainers in the backend model). This
  // replaces the old hardcoded industries/extraIndustries/trainersData
  // mock lists.
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setDepartmentsLoading(true);

        const res = await axios.get("http://localhost:5000/api/departments/active");
        const list = res?.data?.departments || [];

        setDepartmentsData(list);
        setActiveDepartment((prev) => prev || list[0]?.name || "");
      } catch (error) {
        console.error("Error fetching Departments:", error);
        setDepartmentsData([]);
      } finally {
        setDepartmentsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const departmentNames = useMemo(
    () => departmentsData.map((item) => item.name),
    [departmentsData]
  );

  const trainersForActiveDepartment = useMemo(() => {
    const entry = departmentsData.find((item) => item.name === activeDepartment);
    return (entry?.trainers || []).filter(Boolean).map(normalizeTrainer);
  }, [departmentsData, activeDepartment]);

  const trainers = useMemo(() => {
    let result = trainersForActiveDepartment;

    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    } else if (sortBy === "Name (A-Z)") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [trainersForActiveDepartment, sortBy]);

  const displayed = showAll ? trainers : trainers.slice(0, 8);

  // No tab-matching, no filter — just show every article that's been
  // assigned to a department in admin, directly, once.
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setArticlesLoading(true);

        const res = await axios.get("http://localhost:5000/api/articles", {
          params: {
            department: "any",
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
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-300 mb-8">By Department</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-wrap gap-3 items-end">
          {/* Department */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
              Department
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  if (e.target.value) {
                    setActiveDepartment(e.target.value);
                    setShowAll(false);
                  }
                }}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none"
              >
                <option value="">Departments</option>
                {departmentNames.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">City</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <select value={city} onChange={e => setCity(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                <option value="">Select City</option>
                <option>Delhi</option><option>Mumbai</option><option>Bengaluru</option><option>Hyderabad</option><option>Chennai</option>
              </select>
            </div>
          </div>

          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Experience Level</label>
            <select value={experience} onChange={e => setExperience(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
              <option value="">Any Experience</option>
              <option>Beginner</option><option>Intermediate</option><option>Expert</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Training Type</label>
            <select value={trainingType} onChange={e => setTrainingType(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
              <option value="">Any Type</option>
              <option>Online</option><option>Offline</option><option>Hybrid</option>
            </select>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-sm shadow-blue-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Experts
          </button>
        </div>
      </div>

      {/* Trainer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Experts in {activeDepartment}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded-lg text-sm text-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
              <option>Most Popular</option><option>Highest Rated</option><option>Price: Low to High</option><option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentsLoading ? (
            <div className="col-span-full text-sm text-gray-500 py-10">Loading trainers...</div>
          ) : displayed.length === 0 ? (
            <div className="col-span-full text-sm text-gray-500 py-10">
              No trainers assigned to this department yet.
            </div>
          ) : (
            displayed.map((trainer) => (
              <TrainerCard key={trainer.trainerId || trainer.name} trainer={trainer} />
            ))
          )}
        </div>

        {trainers.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-blue-200 text-blue-600 font-semibold text-sm px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center gap-2"
            >
              {showAll ? "Show Less" : "View More Trainers"}
              <svg className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

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
                  <p className="text-white font-bold text-lg leading-snug ">
                    {a.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <YoutubeSection scope="entity" entityType="Department" />
    </div>
  );
}

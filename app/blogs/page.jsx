"use client";
import { useState } from "react";
import Link from "next/link";

import {
  Building2,
  Grip,
  User,
  Presentation,
  Signature,
  PersonStanding,
  ChartLine,
  UsersRound,
  Cpu,
  MailOpen,
  Search,
} from "lucide-react";

// ---------------- DATA -------------------

const CATEGORIES_DATA = [
  { icon: Grip, name: "All Topics" },
  { icon: Building2, name: "Corporate Training" },
  { icon: PersonStanding, name: "Trainer Development" },
  { icon: Presentation, name: "L&D Strategies" },
  { icon: Signature, name: "Soft Skills" },
  { icon: User, name: "Leadership" },
  { icon: ChartLine, name: "Sales Training" },
  { icon: UsersRound, name: "Workplace Culture" },
  { icon: Cpu, name: "Technology in Training" },
];

const FEED_DATA = [
  {
    slug: "how-to-choose-the-right-corporate-trainer",
    tag: "Corporate Training",
    title: "How to Choose the Right Corporate Trainer for Your Organization",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
    subtext:
      "Key factors to consider when selecting a trainer who can deliver real impact.",
    authorImage:
      "https://ui-avatars.com/api/?name=Priya+Mehta&background=2563eb&color=fff",
    authorName: "Priya Mehta",
    date: "May 20, 2024",
    time: "6 min read",
  },
  {
    slug: "7-ld-strategies-to-build-a-future-ready-workforce",
    tag: "L&D Strategies",
    title: "7 L&D Strategies to Build a Future-Ready Workforce",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop",
    subtext:
      "Practical strategies to align learning initiatives with business goals.",
    authorImage:
      "https://ui-avatars.com/api/?name=Rahul+Desai&background=0e4b8c&color=fff",
    authorName: "Rahul Desai",
    date: "May 18, 2024",
    time: "5 min read",
  },
  {
    slug: "the-most-in-demand-soft-skills-in-2024",
    tag: "Soft Skills",
    title: "The Most In-Demand Soft Skills in 2024",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    subtext:
      "Skills that professionals need to thrive in the modern workplace.",
    authorImage:
      "https://ui-avatars.com/api/?name=Anjali+Shah&background=2563eb&color=fff",
    authorName: "Anjali Shah",
    date: "May 15, 2024",
    time: "4 min read",
  },
  {
    slug: "how-technology-is-transforming-corporate-training",
    tag: "Technology in Training",
    title: "How Technology is Transforming Corporate Training",
    image:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&auto=format&fit=crop",
    subtext:
      "Explore the latest tools and trends shaping the future of learning.",
    authorImage:
      "https://ui-avatars.com/api/?name=Karan+Malhotra&background=0e4b8c&color=fff",
    authorName: "Karan Malhotra",
    date: "May 12, 2024",
    time: "6 min read",
  },
];

// Tag color map
const TAG_COLORS = {
  "Corporate Training": "bg-blue-50 text-blue-700 border border-blue-200",
  "L&D Strategies": "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "Soft Skills": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Technology in Training": "bg-cyan-50 text-cyan-700 border border-cyan-200",
};

// ------------------- Hero Section ---------------------

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-xl">
          <h1 className="font-extrabold text-5xl text-gray-900 mb-4 leading-tight">
            Blog
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Insights, tips and trends to help you build a stronger learning
            culture and drive performance.
          </p>
        </div>
        <div className="hidden md:block">
          <img
            src="/blogs/hero.jpg"
            alt="Blog hero"
            className="h-52 w-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

// ------------------- Categories Sidebar ---------------------

const Categories = ({ activeCategory, setActiveCategory }) => {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col gap-4">
      {/* Category List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <p className="font-bold text-gray-800 text-base px-2 mb-3">
          Categories
        </p>
        <div className="flex flex-col gap-0.5">
          {CATEGORIES_DATA.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex gap-3 items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Newsletter */}
      <div className="bg-gradient-to-br from-[#0e4b8c] to-[#2563eb] rounded-2xl p-5 text-white shadow-md">
        <div className="flex gap-3 items-start mb-3">
          <div className="bg-white/20 rounded-lg p-2 mt-0.5">
            <MailOpen size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">Stay Ahead in L&D</p>
            <p className="text-blue-100 text-xs mt-1 leading-relaxed">
              Subscribe to get the latest insights delivered to your inbox.
            </p>
          </div>
        </div>
        <button className="w-full bg-white text-[#0e4b8c] font-semibold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors duration-200">
          Subscribe
        </button>
      </div>
    </aside>
  );
};

// ------------------- Search Bar ---------------------

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 flex-1 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
      <Search size={16} className="text-gray-400 flex-shrink-0" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
      />
    </div>
  );
};

// ------------------- Filter ---------------------

const Filter = ({ filter, setFilter }) => {
  return (
    <select
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none cursor-pointer hover:border-blue-400 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="Most Recent">Most Recent</option>
      <option value="Popular">Popular</option>
    </select>
  );
};

// ------------------- Blog Card ---------------------

const BlogCard = ({ data }) => {
  const tagClass =
    TAG_COLORS[data.tag] || "bg-gray-100 text-gray-600 border border-gray-200";

  return (
    <Link href={`/blogs/${data.slug}`} className="block group">
      <article className="flex gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-50 h-58 rounded-xl overflow-hidden">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
          <div>
            {/* Tag */}
            <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-1.5 ${tagClass}`}>
              {data.tag}
            </span>

            {/* Title */}
            <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">
              {data.title}
            </h3>

            {/* Subtext */}
            <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
              {data.subtext}
            </p>
          </div>

          {/* Author row */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <img
              src={data.authorImage}
              alt={data.authorName}
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
            />
            <span className="text-[11px] font-medium text-gray-700">{data.authorName}</span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-[11px] text-gray-400">{data.date}</span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-[11px] text-gray-400">{data.time}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

// ------------------- Pagination ---------------------

const TOTAL_PAGES = 8;

const Pagination = ({ currentPage, setCurrentPage }) => {
  const pages = [1, 2, 3, "...", TOTAL_PAGES];

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      {/* Prev */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
      >
        ‹
      </button>

      {pages.map((p) =>
        p === "..." ? (
          <span key={p} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${
              currentPage === p
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
        disabled={currentPage === TOTAL_PAGES}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
      >
        ›
      </button>
    </div>
  );
};

// ------------------- Feed Cards ---------------------

const FeedCards = ({ search, filter }) => {
  const filtered = FEED_DATA.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.tag.toLowerCase().includes(q) ||
      d.subtext.toLowerCase().includes(q)
    );
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {filtered.length === 0 ? (
        <div className="col-span-2 text-center py-16 text-gray-400 text-sm">
          No articles found.
        </div>
      ) : (
        filtered.map((data) => <BlogCard key={data.title} data={data} />)
      )}
    </div>
  );
};

// ------------------- Blog Feed (right panel) ---------------------

const BlogFeed = ({ search, setSearch, filter, setFilter, currentPage, setCurrentPage }) => {
  return (
    <div className="flex-1 flex flex-col gap-5 min-w-0">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <SearchBar search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} />
      </div>

      {/* Cards */}
      <FeedCards search={search} filter={filter} />

      {/* Pagination */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

// ------------------- Main Section ---------------------

const MainSection = ({ search, setSearch, filter, setFilter, currentPage, setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState("All Topics");

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex gap-8 items-start">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <BlogFeed
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

// ------------------- Page ---------------------

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <MainSection
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Layers,
  Building2,
  Star,
  MapPin,
  Briefcase,
  PlayCircle,
  Search,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const CATEGORY_TYPES = [
  { value: "All", label: "All", icon: Layers },
  { value: "Industry", label: "Industry", icon: Building2 },
  { value: "Competency", label: "Competency", icon: Star },
  { value: "Department", label: "Department", icon: Briefcase },
];

function normalizeTrainer(trainer) {
  const industry = trainer?.expertiseDomain?.industry?.filter(Boolean) || [];
  const competencies = trainer?.expertiseDomain?.competencies?.filter(Boolean) || [];
  const domain = trainer?.expertiseDomain?.domain?.filter(Boolean) || [];
  const tagsLine = trainer?.tagsLine?.filter(Boolean) || [];
  const feesRaw = trainer?.additionalDetails?.feesPerDay;
  const feesNumber = feesRaw ? Number(String(feesRaw).replace(/[^\d.]/g, "")) : null;
  const yearsRaw = trainer?.additionalDetails?.trainingExperience;

  return {
    id: trainer?._id,
    trainerId: trainer?.trainerId || trainer?._id,
    name: trainer?.fullName || "Unnamed Trainer",
    role: trainer?.expertiseDomain?.TrainerType || trainer?.entityType || "Trainer",
    tags: (tagsLine.length > 0 ? tagsLine : competencies).slice(0, 3),
    price: Number.isFinite(feesNumber) && feesNumber > 0 ? feesNumber : null,
    image: trainer?.profilePhoto?.url || "/Images/trainee2.png",
    city: trainer?.contactInfo?.location?.city || "",
    industry,
    competencies,
    domain,
    experienceYears: yearsRaw ? String(yearsRaw) : "",
    trainingType: trainer?.expertiseDomain?.TrainerType || "",
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
          <div className="absolute inset-0" />
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Toggle shortlist"
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

export default function CategoryTrainerExplorer({ headingLabel = "Trainers" }) {
  const [trainersData, setTrainersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [industries, setIndustries] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [categoryType, setCategoryType] = useState("All");
  const [categoryValue, setCategoryValue] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [showAll, setShowAll] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [trainerRes, industryRes, competencyRes, departmentRes] = await Promise.all([
          axios.get(`${API_BASE}/search/trainers`, { params: { limit: 200 } }),
          axios.get(`${API_BASE}/industries/active`),
          axios.get(`${API_BASE}/competencies/active`),
          axios.get(`${API_BASE}/departments/active`),
        ]);

        setTrainersData(trainerRes?.data?.trainers || []);
        setIndustries((industryRes?.data?.industries || []).map((i) => i.name).filter(Boolean));
        setCompetencies((competencyRes?.data?.competencies || []).map((c) => c.name).filter(Boolean));
        setDepartments((departmentRes?.data?.departments || []).map((d) => d.name).filter(Boolean));
      } catch (error) {
        console.error("Error loading trainers:", error);
        setTrainersData([]);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const categoryOptions = useMemo(() => {
    if (categoryType === "Industry") return industries;
    if (categoryType === "Competency") return competencies;
    if (categoryType === "Department") return departments;
    return [];
  }, [categoryType, industries, competencies, departments]);

  const normalized = useMemo(() => trainersData.map(normalizeTrainer), [trainersData]);

  const trainers = useMemo(() => {
    let result = normalized;

    if (categoryType !== "All") {
      result = result.filter((t) => {
        if (categoryType === "Industry") return t.industry.includes(categoryValue);
        if (categoryType === "Competency") return t.competencies.includes(categoryValue);
        if (categoryType === "Department") return t.domain.includes(categoryValue);
        return true;
      });
    }

    if (city) {
      result = result.filter((t) => t.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (experience) {
      result = result.filter((t) => {
        const raw = t.experienceYears;
        const years = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
        if (Number.isNaN(years)) return true;
        if (experience === "Beginner") return years <= 3;
        if (experience === "Intermediate") return years > 3 && years <= 7;
        if (experience === "Expert") return years > 7;
        return true;
      });
    }

    if (trainingType) {
      result = result.filter((t) =>
        t.trainingType.toLowerCase().includes(trainingType.toLowerCase())
      );
    }

    if (keyword) {
      const q = keyword.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (sortBy === "Price: Low to High") {
      result = [...result].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sortBy === "Price: High to Low") {
      result = [...result].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    } else if (sortBy === "Name (A-Z)") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [normalized, categoryType, categoryValue, city, experience, trainingType, keyword, sortBy]);

  const displayed = showAll ? trainers : trainers.slice(0, 8);

  const heading = categoryType === "All" ? `All ${headingLabel}` : `${categoryValue || categoryType} ${headingLabel}`;

  const selectClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none";

  const handleCategoryTypeChange = (value) => {
    setCategoryType(value);
    setCategoryValue("");
    setShowAll(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-wrap gap-3 items-end">
          {/* Category type */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
              Category
            </label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={categoryType}
                onChange={(e) => handleCategoryTypeChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none"
              >
                {CATEGORY_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category value */}
          {categoryType !== "All" && (
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                {categoryType}
              </label>
              <div className="relative">
                <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={categoryValue}
                  onChange={(e) => {
                    setCategoryValue(e.target.value);
                    setShowAll(false);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none"
                >
                  <option value="">Select {categoryType}</option>
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Keyword */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Trainer, skill..."
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          {/* City */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">City</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 appearance-none">
                <option value="">All Cities</option>
                <option>Delhi</option><option>Mumbai</option><option>Bengaluru</option><option>Hyderabad</option><option>Chennai</option>
              </select>
            </div>
          </div>

          {/* Experience Level */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Experience Level</label>
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className={selectClass}>
              <option value="">Any Experience</option>
              <option>Beginner</option><option>Intermediate</option><option>Expert</option>
            </select>
          </div>

          {/* Training Type */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Training Type</label>
            <select value={trainingType} onChange={(e) => setTrainingType(e.target.value)} className={selectClass}>
              <option value="">Any Type</option>
              <option>Online</option><option>Offline</option><option>Hybrid</option>
            </select>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-sm shadow-blue-200">
            <Search className="w-4 h-4" />
            Search Experts
          </button>
        </div>
      </div>

      {/* Trainer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-200 rounded-lg text-sm text-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name (A-Z)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-sm text-gray-500 py-10">Loading trainers...</div>
        ) : displayed.length === 0 ? (
          <div className="text-sm text-gray-500 py-10">
            No trainers found. Try changing your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayed.map((trainer) => (
              <TrainerCard key={trainer.trainerId || trainer.id || trainer.name} trainer={trainer} />
            ))}
          </div>
        )}

        {!loading && trainers.length > 8 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-blue-200 text-blue-600 font-semibold text-sm px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center gap-2"
            >
              {showAll ? "Show Less" : `View More Trainers (${trainers.length})`}
              <svg className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

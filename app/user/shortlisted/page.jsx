"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Briefcase,
  Network,
  Target,
  CircleDollarSign,
  Users,
  ChevronDown,
  BadgeCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  User,
  Star,
} from "lucide-react";
import Link from "next/link";
import { userDashboardAPI } from "../../lib/api"; // apne path ke hisab se change karo

const savedWorkshopsSeed = [
  {
    id: "ws-1",
    title: "Advanced AI Ethics",
    meta: "15 Jul • Online",
    shortLabel: "AI Ethics",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "ws-2",
    title: "Negotiation Skills for Leaders",
    meta: "20 Jul • In-person (London)",
    shortLabel: "Negotiation Skills",
    color: "bg-teal-50 text-teal-700",
  },
  {
    id: "ws-3",
    title: "Product Strategy Masterclass",
    meta: "25 Jul • Online",
    shortLabel: "Product Strategy",
    color: "bg-blue-50 text-blue-700",
  },
];

export default function ShortlistedProfiles() {
  const [trainers, setTrainers] = useState([]);
  const [savedWorkshops] = useState(savedWorkshopsSeed);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchShortlistedProfiles() {
      try {
        setLoading(true);
        setError("");

        const res = await userDashboardAPI.getShortlistedProfiles();
        const rawList =
          res?.data?.shortlisted ||
          res?.data?.trainers ||
          res?.data?.profiles ||
          res?.data?.data ||
          [];

     const mapped = rawList.map((item, index) => {
  const trainer = item?.trainer || item;

  return {
    trainerId:
      item?.trainerId ||
      trainer?.trainerId ||
      trainer?._id ||
      trainer?.id ||
      `trainer-${index}`,
    name: trainer?.fullName || trainer?.name || "Unnamed Trainer",
    role:
      trainer?.subjectLine ||
      trainer?.role ||
      trainer?.headline ||
      "Trainer",
    rating: Number(trainer?.rating || 0),
    reviews: Number(trainer?.reviews || trainer?.reviewCount || 0),
    tags:
      trainer?.tags ||
      trainer?.tagsLine ||
      trainer?.skills ||
      trainer?.expertiseDomain?.competencies ||
      [],
    verified:
      trainer?.verified === true ||
      trainer?.isVerified === true ||
      trainer?.status === "approved",
    image:
      trainer?.profilePhoto?.url ||
      trainer?.avatar?.url ||
      trainer?.image ||
      "",
  };
});

        if (!ignore) {
          setTrainers(mapped);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to fetch shortlisted profiles"
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchShortlistedProfiles();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTrainers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return trainers;

    return trainers.filter((trainer) => {
      const searchable = [
        trainer.name,
        trainer.role,
        trainer.id,
        ...(Array.isArray(trainer.tags) ? trainer.tags : []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [trainers, search]);

  const getProfileHref = (trainer) => {
    if (trainer.slug) return `/trainer/${trainer.slug}`;
    if (trainer.id) return `/trainer-profile/${trainer.id}`;
    return "/trainer";
  };

  const handleUnshortlist = async (trainerId) => {
    try {
      setRemovingId(trainerId);

      await userDashboardAPI.removeShortlistedProfile(trainerId);

      setTrainers((prev) => prev.filter((trainer) => trainer.id !== trainerId));
    } catch (err) {
      console.error(
        err?.response?.data?.message || err?.message || "Failed to remove shortlisted trainer"
      );
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div className="pb-10">
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search shortlisted profiles..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 text-[15px] shadow-sm placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex gap-4 flex-1 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full">
          <button className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700 min-w-[140px]">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" /> Industry
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700 min-w-[170px]">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-slate-400" /> Department/Domain
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700 min-w-[180px]">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-400" /> Competencies/Skills
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700 min-w-[150px]">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-slate-400" /> Price Range
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700 min-w-[200px]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" /> Mode (Online/Offline)
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <button className="flex w-full lg:w-auto items-center justify-center lg:justify-between gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-semibold text-slate-700 flex-shrink-0">
          Sort by <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Loading shortlisted profiles...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-sm text-red-600 shadow-sm">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.length === 0 ? (
              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
                No shortlisted profiles found.
              </div>
            ) : (
              filteredTrainers.map((trainer, idx) => {
                const trainerKey = trainer.id || `${trainer.name}-${idx}`;

                return (
                  <div
                    key={trainerKey}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full relative"
                  >
                    <div className="absolute top-0 right-4 w-6 h-9 bg-blue-600 z-10 flex items-center justify-center rounded-b-md shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleUnshortlist(trainerKey)}
                        disabled={removingId === trainerKey}
                        className="w-full h-full flex items-center justify-center disabled:opacity-60"
                        aria-label={`Remove ${trainer.name} from shortlist`}
                        title="Remove from shortlist"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-white fill-white" />
                      </button>
                    </div>

                    <div className="relative h-[200px] w-full bg-slate-100 flex items-center justify-center text-slate-300 overflow-hidden">
                      {trainer.image ? (
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-24 h-24" />
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[17px] font-bold text-slate-900 leading-none">
                          {trainer.name}
                        </h3>
                        {trainer.verified ? (
                          <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                        ) : (
                          <span className="px-1.5 py-0.5 border border-slate-200 text-[10px] font-semibold text-slate-500 rounded-full">
                            Unverified
                          </span>
                        )}
                      </div>

                      <p className="text-[13px] text-slate-600 mb-2">{trainer.role}</p>

                      <div className="flex items-center gap-1.5 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-slate-700">
                          {trainer.rating || 0}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({trainer.reviews || 0} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 flex-1 content-start">
                        {(Array.isArray(trainer.tags) ? trainer.tags : []).map(
                          (tag, tagIndex) => (
                            <span
                              key={`${trainerKey}-tag-${tag}-${tagIndex}`}
                              className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-full text-[11px] font-semibold"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>

                      <Link
                        href={`/trainer-profile/${trainer.trainerId}`}
                        
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
                      >
                        View Profile <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}

            <div className="lg:col-span-3 sm:col-span-2 col-span-1 flex items-center justify-center gap-4 mt-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-sm">
                1
              </button>
              <p className="text-sm text-slate-600 font-medium px-2">of 1</p>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[17px] font-bold text-slate-900">
                  Saved Workshops
                </h2>
                <Bookmark className="w-4 h-4 text-blue-600" />
              </div>

              <div className="flex flex-col gap-6 flex-1">
                {savedWorkshops.map((workshop, index) => (
                  <div
                    key={workshop.id || `${workshop.title}-${index}`}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center relative ${workshop.color}`}
                    >
                      <span className="font-bold text-[8px] leading-tight text-center px-1">
                        {workshop.shortLabel}
                      </span>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[10px] text-slate-500 overflow-hidden">
                        <User className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="flex-1 mt-0.5">
                      <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                        {workshop.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1">{workshop.meta}</p>
                    </div>

                    <button className="text-blue-600 mt-1" type="button">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex justify-center">
                <Link
                  href="/saved-workshops"
                  className="text-blue-600 text-[13px] font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View all saved workshops <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
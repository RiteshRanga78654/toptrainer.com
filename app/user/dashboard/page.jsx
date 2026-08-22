"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Bookmark,
  MapPin,
  IndianRupee,
  Monitor,
  Target,
  PenTool,
  Users,
  Star,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { userDashboardAPI } from "../../lib/api";
import AuthGuard from "../../components/AuthGuard";
const videos = [
  { id: "bAulddz4q94", title: "How I leveled up as a Full Stack Developer | Paras Kumar | IREED India", views: "9.8K views" },
  { id: "xA7AWhLQXKQ", title: "From Beginner to Developer | Web Development Journey | IREED India", views: "7.6K views" },
  { id: "SHmN2dyX7u4", title: "How to Stay Motivated While Learning New Skills", views: "6.4K views" },
];

function fmtWorkshopDate(d) {
  if (!d) return { day: "--", month: "" };
  const dt = new Date(d);
  return { day: String(dt.getDate()).padStart(2, "0"), month: dt.toLocaleString("en-US", { month: "short" }).toUpperCase() };
}

function UserDashboardContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shortlisting, setShortlisting] = useState(null);
  const [shortlisted, setShortlisted] = useState({});

  useEffect(() => {
    let ignore = false;
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");
        const res = await userDashboardAPI.getDashboard();
        // NOTE: backend historically returns this under `data` (was a `date`
        // typo before) — fall back to `date` too in case an older backend
        // build is still deployed somewhere.
        const d = res?.data?.data || res?.data?.date || {};
        if (!ignore) setData(d);
      } catch (err) {
        if (!ignore) setError(err?.response?.data?.message || err.message || "Failed to load dashboard");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchDashboard();
    return () => { ignore = true; };
  }, []);

  async function handleShortlist(trainerId) {
    if (!trainerId) return;
    setShortlisting(trainerId);
    try {
      await userDashboardAPI.toggleShortlist(trainerId);
      setShortlisted((prev) => ({ ...prev, [trainerId]: !prev[trainerId] }));
    } catch (err) {
      console.error(err);
    } finally {
      setShortlisting(null);
    }
  }

  if (loading) {
    return <div className="bg-white p-8 rounded-2xl border border-slate-100 text-sm text-slate-500">Loading your dashboard…</div>;
  }
  if (error) {
    return <div className="bg-red-50 p-8 rounded-2xl border border-red-200 text-sm text-red-600">{error}</div>;
  }

  const newTrainers = data?.newTrainers?.trainers || [];
  const newTrainersCount = data?.newTrainers?.count ?? newTrainers.length;
  const newArticles = (data?.newArticles?.articles?.length ? data.newArticles.articles : data?.latestArticles) || [];
  const newArticlesCount = data?.newArticles?.count ?? newArticles.length;
  const upcomingWorkshops = data?.upcomingWorkshops || [];
  const recommendedTrainers = data?.recommendedTrainers || [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* New Trainers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-bold text-slate-900">New Trainers Added</h2>
              <span className="text-xs text-slate-500 font-medium">{newTrainersCount} new trainer{newTrainersCount !== 1 ? "s" : ""} this week</span>
            </div>
            {newTrainers.length === 0 ? (
              <p className="text-sm text-slate-400 mb-6 px-2">No new trainers this week.</p>
            ) : (
              <div className="flex -space-x-3 mb-6 px-2">
                {newTrainers.slice(0, 5).map((t, i) => (
                  <img
                    key={t._id || i}
                    src={t.profilePhoto?.url || `https://i.pravatar.cc/150?u=trainer${i}`}
                    alt={t.fullName || "Trainer"}
                    title={t.fullName}
                    className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-sm relative z-0 hover:z-10 transition-transform hover:scale-110"
                  />
                ))}
                {newTrainers.length > 5 && (
                  <div className="w-14 h-14 rounded-full border-2 border-white bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold relative z-0">
                    +{newTrainers.length - 5}
                  </div>
                )}
              </div>
            )}
          </div>
          <Link href="/find-trainer" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit">
            View all new trainers <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* New Articles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-slate-900">New Articles Published</h2>
              <span className="text-xs text-slate-500 font-medium">{newArticlesCount} new article{newArticlesCount !== 1 ? "s" : ""} this week</span>
            </div>
            {newArticles.length === 0 ? (
              <p className="text-sm text-slate-400 mb-4">No articles yet.</p>
            ) : (
              <div className="space-y-4 mb-4">
                {newArticles.slice(0, 3).map((a, i) => (
                  <Link href={`/articles/${a._id}`} key={a._id || i} className="flex gap-4 items-center">
                    <img
                      src={a.coverImage?.url || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop"}
                      alt={a.title}
                      className="w-14 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <h3 className="text-sm font-bold text-slate-800 leading-tight">{a.title}</h3>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/articles" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit">
            View all articles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Upcoming Workshops */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-slate-900 mb-6">Upcoming Workshops</h2>
            {upcomingWorkshops.length === 0 ? (
              <p className="text-sm text-slate-400 mb-4">No upcoming workshops right now.</p>
            ) : (
              <div className="space-y-5 mb-4">
                {upcomingWorkshops.slice(0, 3).map((w, i) => {
                  const { day, month } = fmtWorkshopDate(w.schedule?.startDate);
                  const trainerName = w.createdBy?.fullName || "TopTrainer";
                  return (
                    <Link href={`/workshops/${w._id}`} key={w._id || i} className="flex gap-5 items-center">
                      <div className="flex flex-col items-center justify-center text-indigo-600 w-10 flex-shrink-0">
                        <span className="text-[22px] font-bold leading-none">{day}</span>
                        <span className="text-[10px] font-bold tracking-wider">{month}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{w.basicInformation?.title || "Untitled Workshop"}</h3>
                        <p className="text-[11px] text-slate-500 mb-0.5 mt-0.5">by {trainerName}</p>
                        <p className="text-[10px] text-slate-400">
                          {w.schedule?.timeSlot || "Time TBA"} {w.schedule?.deliveryMode ? `| ${w.schedule.deliveryMode}` : ""}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <Link href="/workshops" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit mt-2">
            View all workshops <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Post your requirement */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Post your Requirement</h2>
                <p className="text-[13px] text-slate-500">Let us know what you need, and we'll suggest the best trainers for you.</p>
              </div>
              <Link href="/user/my-requirements" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors shadow-sm">
                Create New Requirement
              </Link>
            </div>
            <div className="flex flex-wrap md:flex-nowrap justify-between items-start pt-5 border-t border-slate-100 gap-4 md:gap-0">
              <div className="flex flex-col gap-1.5 w-full md:w-1/5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]"><PenTool className="w-[18px] h-[18px] text-slate-400" /> Define Your Need</div>
                <span className="text-[11px] text-slate-400 pl-7">Specify your training goals</span>
              </div>
              <div className="flex flex-col gap-1.5 w-full md:w-1/5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]"><Monitor className="w-[18px] h-[18px] text-slate-400" /> Preferred Mode</div>
                <span className="text-[11px] text-slate-400 pl-7">Online, In-person or Both</span>
              </div>
              <div className="flex flex-col gap-1.5 w-full md:w-1/5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]"><MapPin className="w-[18px] h-[18px] text-slate-400" /> Location</div>
                <span className="text-[11px] text-slate-400 pl-7">Add preferred locations</span>
              </div>
              <div className="flex flex-col gap-1.5 w-full md:w-1/5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]"><Star className="w-[18px] h-[18px] text-slate-400" /> Experience Level</div>
                <span className="text-[11px] text-slate-400 pl-7">Select trainer experience</span>
              </div>
              <div className="flex flex-col gap-1.5 w-full md:w-1/5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]"><IndianRupee className="w-[18px] h-[18px] text-slate-400" /> Budget Range</div>
                <span className="text-[11px] text-slate-400 pl-7">Set your budget</span>
              </div>
            </div>
          </div>

          {/* Your Requirement Profile — NOTE: no backend model for "requirements"
              exists yet, so this stays a static placeholder until that's built. */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 flex-1">
            <div className="w-full md:w-[200px] flex-shrink-0 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
              <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-[15px] font-bold text-slate-900 mb-2">Your Requirement Profile</h2>
              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">Post a requirement above to see your preferences summarized here.</p>
            </div>
            <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
              No requirement posted yet.
            </div>
          </div>
        </div>

        {/* Recommended for You */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
          <div>
            <h2 className="font-bold text-slate-900 text-[15px]">Recommended for You</h2>
            <p className="text-[12px] text-slate-500 mb-6 mt-0.5">Featured trainers on TopTrainer</p>

            {recommendedTrainers.length === 0 ? (
              <p className="text-sm text-slate-400">No recommendations yet.</p>
            ) : (
              <div className="space-y-5">
                {recommendedTrainers.slice(0, 3).map((t) => (
                  <div key={t._id} className="flex justify-between items-start group">
                    <Link href={`/trainer-profile/${t.trainerId}`} className="flex gap-3">
                      <img
                        src={t.profilePhoto?.url || "https://i.pravatar.cc/150"}
                        alt={t.fullName}
                        className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t.fullName}</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">{t.subjectLine || "Trainer"}</p>
                        {t.additionalDetails?.trainingExperience && (
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.additionalDetails.trainingExperience}</p>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => handleShortlist(t.trainerId)}
                      disabled={shortlisting === t.trainerId}
                      className={`pt-1 transition-colors ${shortlisted[t.trainerId] ? "text-indigo-600" : "text-slate-300 hover:text-indigo-600"}`}
                    >
                      <Bookmark className="w-[18px] h-[18px]" fill={shortlisted[t.trainerId] ? "currentColor" : "none"} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <Link href="/find-trainer" className="text-indigo-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              View all recommendations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Videos section — no backend field for this, kept static */}
      <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-sm md:text-lg md:font-bold lg:text-xl p-1 mb-4">Learn from Youtube Videos</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {videos.map((vids) => (
            <iframe
              key={vids.id}
              className="aspect-video w-full rounded-xl"
              src={`https://www.youtube.com/embed/${vids.id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
    </>
  );
}

export default function UserDashboard() {
  return (
    <AuthGuard allowedRoles={["user"]}>
      <UserDashboardContent />
    </AuthGuard>
  );
}
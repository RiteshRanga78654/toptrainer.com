"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft, Star, Clock, Users, Tag, CheckCircle2,
  BadgeCheck, Zap, ArrowRight, ChevronRight, Award,
  Camera, IndianRupee, Wifi, MapPin, Play, Calendar,
  GraduationCap, Brain, BarChart3, Mic, Leaf,
  TrendingUp, Shield, Bookmark
} from "lucide-react";
import { useAuth } from "../../hooks";
import { userDashboardAPI } from "../../lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "sales", label: "Sales" },
  { id: "tech", label: "Tech" },
  { id: "leadership", label: "Leadership" },
  { id: "softskills", label: "Soft Skills" },
  { id: "wellness", label: "Wellness" },
  { id: "ai", label: "AI & ML" },
];

const CAT_COLORS = {
  sales: { pill: "#F59E0B", bg: "#fff7ed", text: "#b45309", border: "#fed7aa" },
  tech: { pill: "#0891B2", bg: "#ecfeff", text: "#0e7490", border: "#a5f3fc" },
  leadership: { pill: "#7C3AED", bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
  softskills: { pill: "#EC4899", bg: "#fdf2f8", text: "#be185d", border: "#fbcfe8" },
  wellness: { pill: "#10B981", bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
  ai: { pill: "#F97316", bg: "#fff7ed", text: "#c2410c", border: "#fdba74" },
};

const ICON_MAP = {
  Wifi, MapPin, Play, Calendar, GraduationCap,
  Award, Brain, BarChart3, Mic, Leaf,
};

const KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap');

  :root {
    --font-display: 'Clash Display', sans-serif;
    --font-body: 'Satoshi', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: var(--font-body); }

  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes blobMorph {
    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50%     { border-radius: 50% 60% 30% 60% / 30% 40% 60% 50%; }
    75%     { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70%  { box-shadow: 0 0 0 16px rgba(37,99,235,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0) scale(1);   opacity: 0.6; }
    33%  { transform: translateY(-28px) translateX(14px) scale(1.2); opacity: 0.9; }
    66%  { transform: translateY(-12px) translateX(-9px) scale(0.8); opacity: 0.4; }
    100% { transform: translateY(0) translateX(0) scale(1);   opacity: 0.6; }
  }
  @keyframes liveDot {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.3; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes underlineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }

  .anim-up    { animation: fadeUp   0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-right { animation: fadeRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-scale { animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.15s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.42s; }
  .d5 { animation-delay: 0.58s; }

  .hero-bg-anim {
    background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 40%, #eef2ff 70%, #e0f2fe 100%);
    background-size: 300% 300%;
    animation: gradientShift 14s ease infinite;
  }
  .blob-blue-anim {
    animation: blobMorph 12s ease-in-out infinite, floatY 8s ease-in-out infinite;
  }
  .blob-purple-anim {
    animation: blobMorph 16s ease-in-out infinite reverse, floatY 11s ease-in-out infinite 2s;
  }
  .float-anim  { animation: floatY 6s ease-in-out infinite; }
  .float-anim2 { animation: floatY 4s ease-in-out infinite 0.5s; }
  .pulse-ring  { animation: pulseRing 4s ease-out infinite; }
  .live-dot    { animation: liveDot 1.5s ease-in-out infinite; }
  .particle-1  { animation: particleDrift 6s ease-in-out infinite; }
  .particle-2  { animation: particleDrift 8s ease-in-out infinite 1s; }
  .particle-3  { animation: particleDrift 7s ease-in-out infinite 2s; }
  .particle-4  { animation: particleDrift 9s ease-in-out infinite 0.5s; }
  .particle-5  { animation: particleDrift 5s ease-in-out infinite 1.5s; }
  .particle-6  { animation: particleDrift 10s ease-in-out infinite 3s; }
  .particle-7  { animation: particleDrift 7s ease-in-out infinite 0.8s; }

  .text-shimmer {
    background: linear-gradient(90deg, #1d4ed8 0%, #7c3aed 30%, #1d4ed8 60%, #0891b2 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .cta-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .cta-btn:hover::before { opacity: 1; }
  .cta-btn:hover {
    box-shadow: 0 10px 32px rgba(37,99,235,0.4);
    transform: translateY(-2px) scale(1.02);
  }
  .cta-btn:active { transform: scale(0.97); }
  .cta-btn > * { position: relative; z-index: 1; }

  .stat-badge-hover {
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .stat-badge-hover:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 12px 32px rgba(37,99,235,0.14);
    border-color: rgba(37,99,235,0.2);
  }

  .photo-frame img { transition: transform 0.5s ease; }
  .photo-frame:hover img { transform: scale(1.07); }

  .related-card {
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
  }
  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(37,99,235,0.12);
  }

  .content-card-hover {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .content-card-hover:hover {
    border-color: #bfdbfe;
    box-shadow: 0 6px 24px rgba(37,99,235,0.08);
  }

  .sec-btn {
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
  }
  .sec-btn:hover {
    border-color: #93c5fd;
    color: #2563eb;
    background: #eff6ff;
    transform: translateY(-1px);
  }
`;

function fmt(value) {
  return Number(value || 0).toLocaleString("en-IN");
}

function calcPct(original, discounted) {
  const o = Number(original || 0);
  const d = Number(discounted || 0);
  if (!o || d >= o) return 0;
  return Math.round(((o - d) / o) * 100);
}

function normalizeCategory(category) {
  const value = String(category || "").toLowerCase().trim();
  if (["sales", "sale"].includes(value)) return "sales";
  if (["tech", "technology", "it", "software"].includes(value)) return "tech";
  if (["leadership", "management"].includes(value)) return "leadership";
  if (["softskills", "soft skills", "communication"].includes(value)) return "softskills";
  if (["wellness", "health", "mindfulness"].includes(value)) return "wellness";
  if (["ai", "ai & ml", "artificial intelligence", "machine learning", "ml"].includes(value)) return "ai";
  return "tech";
}

function slugToId(idOrSlug) {
  const value = String(idOrSlug || "");
  const match = value.match(/^[a-f\d]{24}/i);
  return match ? match[0] : value;
}

function mapTrainerClassTypes(workshop) {
  const deliveryMode = workshop?.schedule?.deliveryMode || "";
  const conductedAs = workshop?.conductedMode?.conductedAs || [];
  const arr = [];

  if (deliveryMode === "Online" || conductedAs.includes("Live Online")) {
    arr.push({
      iconName: "Wifi",
      type: "Live Online",
      count: "Interactive",
      colorClass: "text-blue-600",
      borderColor: "#bfdbfe",
      bg: "#eff6ff",
    });
  }

  if (deliveryMode === "Offline" || deliveryMode === "In-Person" || conductedAs.includes("Offline")) {
    arr.push({
      iconName: "MapPin",
      type: "Offline",
      count: "Venue Based",
      colorClass: "text-emerald-600",
      borderColor: "#bbf7d0",
      bg: "#ecfdf5",
    });
  }

  if (conductedAs.includes("Recorded")) {
    arr.push({
      iconName: "Play",
      type: "Recorded",
      count: "On Demand",
      colorClass: "text-violet-600",
      borderColor: "#ddd6fe",
      bg: "#f5f3ff",
    });
  }

  if (!arr.length) {
    arr.push({
      iconName: "Calendar",
      type: deliveryMode || "Workshop",
      count: "Scheduled",
      colorClass: "text-slate-600",
      borderColor: "#e2e8f0",
      bg: "#f8fafc",
    });
  }

  return arr;
}

function getDisplayPerson(item) {
  const assigned =
    item?.assignedTrainer &&
    typeof item.assignedTrainer === "object" &&
    !Array.isArray(item.assignedTrainer)
      ? item.assignedTrainer
      : null;

  const created =
    item?.createdBy &&
    typeof item.createdBy === "object" &&
    !Array.isArray(item.createdBy)
      ? item.createdBy
      : null;

  const person = assigned || created || {};

  const isTrainer = item?.creatorType === "TrainerProfile" || !!assigned;

  const certs = Array.isArray(person?.certifications)
    ? person.certifications.map((c) => c?.name).filter(Boolean)
    : Array.isArray(person?.additionalDetails?.trainerCertifications)
    ? person.additionalDetails.trainerCertifications.filter(Boolean)
    : [];

  const students =
    item?.analytics?.enrolledCount ||
    (Array.isArray(person?.workshops)
      ? person.workshops.reduce((sum, ws) => sum + (ws?.totalParticipants || 0), 0)
      : 0);

  return {
    type: isTrainer ? "trainer" : "admin",
    name:
      person?.fullName ||
      person?.name ||
      (isTrainer ? "Trainer Name" : "Admin Name"),
    role:
      person?.subjectLine ||
      person?.companyName ||
      (isTrainer ? "Trainer Role" : "Workshop Coordinator"),
    exp:
      person?.additionalDetails?.trainingExperience ||
      (isTrainer ? "Experience not added" : "Coordinator"),
    students,
    avatar:
      person?.profilePhoto?.url ||
      person?.avatar?.url ||
      person?.avatar ||
      "https://res.cloudinary.com/dxjv0gq2r/image/upload/v1690911871/fitnessApp/profilePhoto/defaultProfilePhoto.png",
    certifications:
      certs.length
        ? certs
        : isTrainer
        ? ["Certification details not added"]
        : [],
  };
}
function mapWorkshopDetail(item) {
  const person = getDisplayPerson(item);

  const galleryPhotos = Array.isArray(item?.mediaGallery?.snapshots)
    ? item.mediaGallery.snapshots
    : [];

  const fallbackPhotos = galleryPhotos.length
    ? galleryPhotos.map((photo, idx) => ({
      src: photo?.url,
      label: `Session ${idx + 1}`,
    }))
    : [
      {
        src: item?.basicInformation?.coverImage?.url || item?.basicInformation?.thumbnail?.url,
        label: "Workshop Preview",
      },
    ].filter((p) => p.src);

  return {
    id: item?._id,
    category: normalizeCategory(item?.basicInformation?.category),
    isLive: (item?.conductedMode?.conductedAs || []).includes("Live Online"),
    title: item?.basicInformation?.title || "Untitled Workshop",
    shortDesc: item?.basicInformation?.shortDescription || "",
    fullDesc:
      item?.basicInformation?.fullDescription ||
      item?.basicInformation?.targetAudience ||
      "Workshop details will be updated soon.",
    coverImg:
      item?.basicInformation?.coverImage?.url ||
      item?.basicInformation?.thumbnail?.url ||
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85",
    tags: Array.isArray(item?.classification?.tags) ? item.classification.tags : [],
    seats: item?.schedule?.maxCapacity || 0,
    rating: item?.analytics?.rating || 4.8,
    reviews: item?.analytics?.views || 0,
    duration: item?.schedule?.duration ? `${item.schedule.duration} Days` : "Workshop",
    dateRange: item?.schedule?.dateRange || "",
    timeSlot: item?.schedule?.timeSlot || "",
    location: item?.schedule?.location || item?.schedule?.venue || "",
    price: {
      original: item?.pricing?.originalPrice || item?.pricing?.price || 0,
      discounted: item?.pricing?.discountedPrice || item?.pricing?.price || 0,
      emi: item?.pricing?.emiPerMonth || 0,
      includes: Array.isArray(item?.learningDetails?.includedItems)
        ? item.learningDetails.includedItems
        : [],
    },
    trainer: {
      ...person,
      classTypes: mapTrainerClassTypes(item),
    },
    photos: fallbackPhotos,
  };
}

export default function WorkshopDetailPage() {
  const { id: slugParam } = useParams();
  const router = useRouter();
  const { user, initialized } = useAuth();
  const workshopId = useMemo(() => slugToId(slugParam), [slugParam]);
  const [w, setW] = useState(null);
  const [relatedWorkshops, setRelatedWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [bookmarkBusy, setBookmarkBusy] = useState(false);

  useEffect(() => {
    if (!initialized || !user || !workshopId) {
      setIsSaved(false);
      return;
    }
    let ignore = false;

    (async () => {
      try {
        const res = await userDashboardAPI.getSavedWorkshopStatus(workshopId);
        if (!ignore) setIsSaved(Boolean(res?.data?.isSaved));
      } catch (_) {
        // ignore — leave as unsaved
      }
    })();

    return () => { ignore = true; };
  }, [initialized, user, workshopId]);

  const handleToggleBookmark = async () => {
    if (!initialized) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    setBookmarkBusy(true);
    const wasSaved = isSaved;
    setIsSaved(!wasSaved);

    try {
      const res = await userDashboardAPI.toggleSaveWorkshop(workshopId);
      const saved = Boolean(res?.data?.isSaved);
      setIsSaved(saved);
      toast.success(saved ? "Workshop bookmarked" : "Bookmark removed");
    } catch (err) {
      setIsSaved(wasSaved);
      if (err?.response?.status === 401) {
        router.push("/auth/login");
      } else {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    } finally {
      setBookmarkBusy(false);
    }
  };

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/api/workshops/published/${workshopId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          setW(null);
          return;
        }

        const mapped = mapWorkshopDetail(data.workshop);
        setW(mapped);

        const relatedRes = await fetch(`${API_BASE}/api/workshops/published`);
        const relatedData = await relatedRes.json();

        if (relatedRes.ok && relatedData.success) {
          const relatedMapped = (relatedData.workshops || [])
            .map(mapWorkshopDetail)
            .filter((item) => item.id !== mapped.id && item.category === mapped.category)
            .slice(0, 3);

          setRelatedWorkshops(relatedMapped);
        }
      } catch (error) {
        setW(null);
      } finally {
        setLoading(false);
      }
    };

    if (workshopId) fetchWorkshop();
  }, [workshopId]);

  if (loading) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
          <div className="text-xl text-slate-500">Loading workshop...</div>
        </div>
      </>
    );
  }

  if (!w) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="text-5xl">🔍</div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
          Workshop not found
        </h2>
        <Link
          href="/workshops"
          className="cta-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white no-underline"
          style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
        >
          <ArrowLeft size={14} /> <span>Back to Workshops</span>
        </Link>
      </div>
    );
  }

  const col = CAT_COLORS[w.category] || CAT_COLORS.sales;
  const disc = calcPct(w.price.original, w.price.discounted);
  const CatLabel = CATEGORIES.find((c) => c.id === w.category)?.label || w.category;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-slate-50">
        <div className="hero-bg-anim relative" style={{ overflow: "hidden" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            }}
          />

          <div
            className="blob-blue-anim absolute pointer-events-none"
            style={{
              width: 360, height: 360, top: "-10%", right: "-5%",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
              filter: "blur(32px)", opacity: 0.6,
            }}
          />
          <div
            className="blob-purple-anim absolute pointer-events-none"
            style={{
              width: 280, height: 280, bottom: "-5%", left: "-8%",
              borderRadius: "40% 60% 70% 30% / 40% 60% 30% 70%",
              background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
              filter: "blur(40px)", opacity: 0.5,
            }}
          />

          {[
            { cls: "particle-1", size: 6, bg: "#2563eb", top: "14%", left: "4%" },
            { cls: "particle-2", size: 4, bg: "#8b5cf6", top: "30%", left: "12%" },
            { cls: "particle-3", size: 7, bg: "#06b6d4", top: "62%", left: "3%" },
            { cls: "particle-4", size: 5, bg: "#10b981", top: "78%", left: "16%" },
            { cls: "particle-5", size: 5, bg: "#6366f1", top: "18%", right: "6%" },
            { cls: "particle-6", size: 4, bg: "#f59e0b", top: "55%", right: "4%" },
            { cls: "particle-7", size: 6, bg: "#2563eb", top: "70%", right: "13%" },
          ].map((p, i) => (
            <div
              key={i}
              className={`${p.cls} absolute rounded-full pointer-events-none`}
              style={{ width: p.size, height: p.size, background: p.bg, top: p.top, left: p.left, right: p.right }}
            />
          ))}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
              maxWidth: 1280,
              margin: "0 auto",
              padding: "5rem 1.5rem 4.5rem",
              position: "relative",
              zIndex: 10,
            }}
            className="hero-inner-workshop"
          >
            <div>
              <div className="anim-up d1" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(37,99,235,0.15)", borderRadius: 99,
                      padding: "7px 16px", fontFamily: "var(--font-display)", fontWeight: 700,
                      fontSize: 11, letterSpacing: "0.08em", color: "#0f172a", textTransform: "uppercase",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
                    }}
                  >
                    <span className="live-dot" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                    {CatLabel.toUpperCase()} WORKSHOP
                  </span>
                  {w.isLive && (
                    <span
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "rgba(239,68,68,0.9)", color: "#fff",
                        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                        padding: "7px 14px", borderRadius: 99,
                      }}
                    >
                      <span className="live-dot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                      LIVE NOW
                    </span>
                  )}

                  <button
                    onClick={handleToggleBookmark}
                    disabled={bookmarkBusy}
                    aria-label={isSaved ? "Remove bookmark" : "Bookmark this workshop"}
                    style={{
                      marginLeft: "auto",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 38, height: 38, borderRadius: 99,
                      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(37,99,235,0.15)",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.08)",
                      cursor: bookmarkBusy ? "wait" : "pointer",
                      opacity: bookmarkBusy ? 0.7 : 1,
                    }}
                  >
                    <Bookmark
                      size={16}
                      style={{ color: isSaved ? "#ef4444" : "#64748b" }}
                      fill={isSaved ? "#ef4444" : "none"}
                    />
                  </button>
                </div>
              </div>

              <h1
                className="anim-up d2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#0f172a",
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                {(() => {
                  const words = w.title.split(" ");
                  const head = words.slice(0, Math.ceil(words.length * 0.6)).join(" ");
                  const tail = words.slice(Math.ceil(words.length * 0.6)).join(" ");
                  return <>{head} <span className="text-shimmer">{tail}</span></>;
                })()}
              </h1>

              <p
                className="anim-up d3"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#475569",
                  fontSize: "clamp(14px, 2vw, 16px)",
                  lineHeight: 1.75,
                  marginBottom: 24,
                  maxWidth: 480,
                }}
              >
                {w.shortDesc}
              </p>

              <div className="anim-up d3" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, color: "#f59e0b" }}>
                  <Star size={14} fill="currentColor" /> {w.rating}
                  <span style={{ fontWeight: 400, color: "#94a3b8", marginLeft: 2 }}>({w.reviews})</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b" }}>
                  <Clock size={13} style={{ color: "#2563eb" }} /> {w.duration}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 13, color: "#64748b" }}>
                  <Users size={13} style={{ color: "#2563eb" }} /> {w.trainer.students} students
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "#ef4444" }}>
                  <span className="live-dot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
                  Only {w.seats} seats left
                </span>
              </div>

              <div className="anim-up d5" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                {[
                  [w.rating, "Expert Rating"],
                  [w.trainer.students, "Students Trained"],
                  [`${disc}% OFF`, "Limited Discount"],
                ].map(([num, lbl]) => (
                  <div key={lbl} style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "#334155",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {num}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        color: "#94a3b8",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginTop: 2,
                      }}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="anim-scale d3" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  width: "80%",
                  height: "70%",
                  left: "10%",
                  top: "10%",
                  background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
                  filter: "blur(52px)",
                }}
              />

              <div
                className="float-anim"
                style={{
                  position: "relative",
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(37,99,235,0.2), 0 16px 40px rgba(139,92,246,0.12)",
                }}
              >
                <img
                  src={w.coverImg}
                  alt={w.title}
                  style={{ width: "100%", height: 480, objectFit: "cover", objectPosition: "center top", display: "block" }}
                />

                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(37,99,235,0.06) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)" }} />

                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: col.pill,
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "7px 14px",
                    borderRadius: 99,
                  }}
                >
                  {CatLabel}
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "linear-gradient(135deg, #2563eb, #6366f1)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "7px 14px",
                    borderRadius: 99,
                    boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
                  }}
                >
                  🏷️ {disc}% OFF
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(37,99,235,0.92)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "8px 14px",
                    borderRadius: 99,
                    boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
                  }}
                >
                  ⏱ {w.duration}
                </div>

                {w.seats && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(239,68,68,0.92)",
                      color: "#fff",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 11,
                      padding: "8px 14px",
                      borderRadius: 99,
                    }}
                  >
                    <span className="live-dot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                    {w.seats} seats left
                  </div>
                )}
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .hero-inner-workshop {
                grid-template-columns: 1fr !important;
                padding: 3rem 1.25rem !important;
                text-align: center;
              }
              .hero-inner-workshop > div:last-child { display: none; }
            }
          `}</style>
        </div>

        <div className="max-w-7xl mx-auto gap-5 px-5 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px]">
          <div className="anim-up d2 flex flex-col gap-6">
            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #2563eb, #6366f1)" }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>About This Workshop</h2>
              </div>
              <p className="text-slate-500 leading-relaxed text-[15px]" style={{ fontFamily: "var(--font-body)" }}>{w.fullDesc}</p>
            </section>

            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #2563eb, #6366f1)" }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>What You'll Learn</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {w.price.includes.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: "linear-gradient(135deg, #f5f7ff, #eef2ff)", border: "1px solid #e0e7ff" }}
                  >
                    <div className="w-6 h-6 rounded-lg flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}>
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <span className="font-medium text-[13px] text-slate-700" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #2563eb, #6366f1)" }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Topics Covered</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {w.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full font-semibold text-[13px]"
                    style={{ fontFamily: "var(--font-body)", background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <Camera size={18} className="text-slate-400" />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Session Snapshots</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {w.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="photo-frame relative overflow-hidden rounded-2xl"
                    style={{ height: 180 }}
                  >
                    <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
                    {idx === 0 && w.isLive && (
                      <div
                        className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white font-bold text-[9px]"
                        style={{ fontFamily: "var(--font-display)", background: "rgba(239,68,68,0.9)" }}
                      >
                        <span className="live-dot w-1 h-1 rounded-full bg-white" /> LIVE
                      </div>
                    )}
                    <span
                      className="absolute bottom-2.5 left-2.5 font-semibold text-[11px] text-white px-2.5 py-0.5 rounded-lg"
                      style={{ fontFamily: "var(--font-body)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
                    >
                      {photo.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #2563eb, #6366f1)" }} />
                <h2 className="font-bold text-[18px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>How It's Conducted</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {w.trainer.classTypes.map((cls, i) => {
                  const Icon = ICON_MAP[cls.iconName] || Play;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center border"
                      style={{ borderColor: cls.borderColor || "#e2e8f0", background: cls.bg || "#f8fafc" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border-[1.5px]"
                        style={{ background: cls.bg || "#f1f5f9", borderColor: cls.borderColor || "#e2e8f0" }}
                      >
                        <Icon size={18} className={cls.colorClass} />
                      </div>
                      <div className="font-semibold text-[12px] text-slate-700" style={{ fontFamily: "var(--font-display)" }}>{cls.type}</div>
                      <div className="text-[10px] text-slate-400" style={{ fontFamily: "var(--font-body)" }}>{cls.count}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Shield, label: "Money Back", sub: "7-day guarantee", color: "#10b981", bg: "#ecfdf5" },
                { icon: Award, label: "Certificate", sub: "On completion", color: "#6366f1", bg: "#f5f3ff" },
                { icon: Users, label: "Community", sub: "Peer network", color: "#2563eb", bg: "#eff6ff" },
                { icon: TrendingUp, label: "Career Support", sub: "Post-workshop", color: "#f59e0b", bg: "#fffbeb" },
              ].map(({ icon: Icon, label, sub, color, bg }, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="font-bold text-[12px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{label}</div>
                  <div className="text-[10px] text-slate-400" style={{ fontFamily: "var(--font-body)" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="anim-right d2 content-card-hover bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p
  className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-4"
  style={{ fontFamily: "var(--font-display)" }}
>
  {w?.trainer?.type === "admin" ? "Workshop Coordinator" : "Your Trainer"}
</p>

              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md">
                    <img src={w.trainer.avatar} alt={w.trainer.name} className="w-full h-full object-cover" />
                  </div>
                  <div
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}
                  >
                    <BadgeCheck size={11} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[16px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>{w.trainer.name}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{w.trainer.role}</div>
                  <div className="flex items-center gap-1.5 mt-1 font-semibold text-[12px] text-indigo-500" style={{ fontFamily: "var(--font-body)" }}>
                    <Award size={11} /> {w.trainer.exp}
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl mb-5"
                style={{ background: "linear-gradient(135deg, #f0f4ff, #eef2ff)", border: "1px solid #e0e7ff" }}
              >
                <Users size={13} className="text-indigo-500" />
                <span className="font-bold text-[14px] text-indigo-800" style={{ fontFamily: "var(--font-display)" }}>{w.trainer.students}</span>
                <span className="text-[12px] text-slate-400" style={{ fontFamily: "var(--font-body)" }}>students trained</span>
              </div>

              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-2.5" style={{ fontFamily: "var(--font-display)" }}>
                Certifications
              </p>
             <div className="flex flex-col gap-2">
  {(w.trainer.certifications?.length
    ? w.trainer.certifications
    : [w.trainer.type === "admin" ? "Verified Workshop Publisher" : "Certified Trainer"]
  ).map((cert, i) => (
    <div
      key={i}
      className="flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-[12px] text-indigo-700"
      style={{ fontFamily: "var(--font-body)", background: "#f0f4ff", border: "1px solid #e0e7ff" }}
    >
      <BadgeCheck size={12} className="text-indigo-500 flex-shrink-0" /> {cert}
    </div>
  ))}
</div>
            </div>

            <div
              className="anim-right d3 bg-white border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-20"
              style={{ boxShadow: "0 12px 48px rgba(37,99,235,0.16)" }}
            >
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-bold text-[10px]"
                  style={{ fontFamily: "var(--font-display)", background: "#10b981" }}
                >
                  <Tag size={8} /> {disc}% OFF
                </span>
                <span className="text-[13px] text-slate-300 line-through" style={{ fontFamily: "var(--font-body)" }}>
                  ₹{fmt(w.price.original)}
                </span>
                <span className="ml-auto font-semibold text-[12px] text-emerald-600" style={{ fontFamily: "var(--font-body)" }}>
                  Save ₹{fmt(w.price.original - w.price.discounted)}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <IndianRupee size={18} className="text-slate-900" strokeWidth={2.5} />
                <span className="font-bold text-[34px] text-slate-900 leading-none" style={{ fontFamily: "var(--font-display)" }}>
                  {fmt(w.price.discounted)}
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-6" style={{ fontFamily: "var(--font-body)" }}>
                <Zap size={10} className="text-indigo-500" /> ₹{w.price.emi}/mo × 12 at 0% interest
              </p>

              <button
                className="cta-btn w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[14px] font-semibold text-white mb-2.5"
                style={{ fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
              >
                <span>Enroll Now</span> <ArrowRight size={14} />
              </button>

              <button
                className="sec-btn w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl text-[13px] font-semibold text-slate-500 border border-slate-200 bg-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                View Schedule <ChevronRight size={13} />
              </button>

              <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-2.5">
                {w.price.includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-slate-500" style={{ fontFamily: "var(--font-body)" }}>
                    <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>

              <div
                className="mt-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-[12px] text-red-500"
                style={{ fontFamily: "var(--font-body)", background: "#fef2f2", border: "1px solid #fecaca" }}
              >
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                Only {w.seats} seats remaining — filling fast!
              </div>
            </div>
          </div>
        </div>

        <RelatedWorkshops current={w} related={relatedWorkshops} />
      </div>
    </>
  );
}

function RelatedWorkshops({ current, related = [] }) {
  if (related.length === 0) return null;

  const catLabel = CATEGORIES.find((c) => c.id === current.category)?.label;

  return (
    <div className="max-w-6xl mx-auto px-5 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-[22px] rounded-full flex-shrink-0" style={{ background: "linear-gradient(180deg, #2563eb, #6366f1)" }} />
        <h2 className="font-bold text-[20px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
          More in <span className="text-shimmer">{catLabel}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((w) => {
          const discPct = calcPct(w.price.original, w.price.discounted);

          return (
            <Link
              key={w.id}
              href={`/workshops/${w.id}`}
              className="related-card flex gap-3.5 p-4 bg-white rounded-2xl border border-slate-200 no-underline"
              onMouseEnter={e => e.currentTarget.style.borderColor = "#bfdbfe"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
            >
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={w.coverImg} alt={w.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="overflow-hidden flex-1">
                <h3
                  className="font-semibold text-[13px] text-slate-900 leading-snug mb-2 line-clamp-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {w.title}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Star size={10} className="text-amber-400 fill-amber-400" />
                  <span className="text-[12px] text-slate-500" style={{ fontFamily: "var(--font-body)" }}>{w.rating}</span>
                  <span className="text-slate-200">·</span>
                  <span className="font-bold text-[13px] text-slate-900" style={{ fontFamily: "var(--font-display)" }}>₹{fmt(w.price.discounted)}</span>
                  {discPct > 0 && (
                    <span className="font-semibold text-[11px] text-emerald-500" style={{ fontFamily: "var(--font-body)" }}>{discPct}% off</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
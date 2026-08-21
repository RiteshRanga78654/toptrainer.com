"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Phone, MapPin, Mail, Linkedin, Twitter, Youtube, Globe,
  Star, ChevronRight, Users, Award, BookOpen, Briefcase,
  Languages, MessageSquare, Download, ExternalLink,
  CheckCircle2, TrendingUp, Lightbulb, Target, Building2,
  GraduationCap, Trophy, Camera, Zap, Play, ShieldCheck,
  Facebook, Instagram, Share2, PenSquare, X,
} from "lucide-react";
import Footer from "../../components/footer";
import DownloadButton from "../../profile/DownloadButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://toptrainer-backend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/ckend-production.up.railway.app/pi";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-blue-100 p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, linkText }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
          <Icon size={18} className="text-blue-700" />
        </div>
        <h2 className="text-lg font-semibold text-black">{title}</h2>
      </div>
      {linkText && (
        <button className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors">
          {linkText} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold text-white">{value}</span>
      <span className="text-xs text-blue-200 mt-0.5 text-center">{label}</span>
    </div>
  );
}

function Tag({ label }) {
  if (!label) return null;
  return (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm">
      {label}
    </span>
  );
}

function WorkshopCard({ title, desc, image, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="group rounded-2xl h-[250px] overflow-hidden border border-blue-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="relative h-36 overflow-hidden">
          <Image
            src={image}
            alt={title || "Workshop"}
            fill
            unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-blue-900 text-sm mb-1">{title || "Workshop"}</h3>
          <p className="text-xs text-blue-500">{desc || "Workshop details available."}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function ArticleCard({ title, date, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="flex gap-3 group cursor-pointer hover:bg-blue-50 p-2 rounded-xl transition-colors">
        <div className="w-16 h-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center overflow-hidden">
          <BookOpen size={20} className="text-white/80" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900 group-hover:text-blue-700 transition-colors leading-snug">{title}</p>
          {date && <p className="text-xs text-blue-400 mt-1">{date}</p>}
        </div>
      </div>
    </FadeIn>
  );
}

function Milestone({ icon: Icon, label, org, year, delay }) {
  return (
    <FadeIn delay={delay} className="flex flex-col items-center text-center w-full">
      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center mb-2 ring-2 ring-blue-200">
        <Icon size={20} className="text-blue-700" />
      </div>
      <p className="text-xs font-semibold text-blue-900">{label || "-"}</p>
      {org && <p className="text-xs text-blue-500">{org}</p>}
      {year && <p className="text-xs font-bold text-blue-700 mt-0.5">{year}</p>}
    </FadeIn>
  );
}

function Testimonial({ quote, name, role, rating = 5, delay }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return (
    <FadeIn delay={delay}>
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 h-full">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < filled ? "fill-yellow-400 text-yellow-400" : "fill-blue-100 text-blue-200"}
            />
          ))}
        </div>
        <p className="text-sm text-blue-800 leading-relaxed mb-4 italic">"{quote}"</p>
        <div>
          {name && <p className="text-sm font-semibold text-blue-900">{name}</p>}
          {role && <p className="text-xs text-blue-500">{role}</p>}
        </div>
      </div>
    </FadeIn>
  );
}

function CompanyLogo({ name, color = "text-blue-800" }) {
  return (
    <div className="flex items-center justify-center px-4 py-3 rounded-xl border border-blue-100 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
      <span className={`font-bold text-sm tracking-wide ${color}`}>{name}</span>
    </div>
  );
}

function GalleryThumb({ image, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer relative group">
        <Image
          src={image}
          alt="Gallery"
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
      </div>
    </FadeIn>
  );
}

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const rand = (min, max) => Math.random() * (max - min) + min;

    const dots = Array.from({ length: 50 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(1.5, 3.5),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.2, -0.05),
      alpha: rand(0.35, 0.7),
      pulse: rand(0, Math.PI * 2),
    }));

    const blobs = Array.from({ length: 4 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(120, 220),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.07, 0.07),
      hue: rand(250, 280),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue}, 70%, 85%, 0.18)`);
        g.addColorStop(1, `hsla(${b.hue}, 70%, 85%, 0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      dots.forEach((d) => {
        d.pulse += 0.02;
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -4) {
          d.y = canvas.height + 4;
          d.x = rand(0, canvas.width);
        }
        if (d.x < -4) d.x = canvas.width + 4;
        if (d.x > canvas.width + 4) d.x = -4;
        const alphaNow = d.alpha * (0.7 + 0.3 * Math.sin(d.pulse));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alphaNow})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1 }}
    />
  );
}

function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ShareButton({ title }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || "Trainer Profile",
        text: "Check out this trainer profile",
        url: window.location.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share"
      className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 shadow-md"
    >
      <Share2 size={15} />
    </button>
  );
}

function getClientToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("tt_token") ||
    document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1] ||
    null
  );
}

export default function Profile() {
  const { trainerId } = useParams();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleWriteReview = () => {
    const loggedIn = !!user || !!token || !!getClientToken();
    if (!loggedIn) {
      router.push(`/auth/login?redirect=/review/${trainerId}`);
      return;
    }
    router.push(`/review/${trainerId}`);
  };

  useEffect(() => {
    if (!trainerId) return;

    const fetchTrainer = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/trainers/${trainerId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch trainer profile");
        }

        setTrainer(data.trainer);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  // Real, admin-approved reviews submitted by users for this trainer.
  useEffect(() => {
    if (!trainerId) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/reviews/trainer/${trainerId}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setReviews(data.reviews || []);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setReviews([]);
      }
    };

    fetchReviews();
  }, [trainerId]);

  const location = useMemo(() => {
    return [
      trainer?.contactInfo?.location?.city,
      trainer?.contactInfo?.location?.state,
      trainer?.contactInfo?.location?.country,
    ]
      .filter(Boolean)
      .join(", ");
  }, [trainer]);

  const socialRow1 = [
    trainer?.onlinePresence?.linkedin && { Icon: Linkedin, color: "hover:bg-blue-600", label: "LinkedIn", href: trainer.onlinePresence.linkedin },
    trainer?.onlinePresence?.twitter && { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter", href: trainer.onlinePresence.twitter },
    trainer?.onlinePresence?.youtube && { Icon: Youtube, color: "hover:bg-red-500", label: "YouTube", href: trainer.onlinePresence.youtube },
  ].filter(Boolean);

  const socialRow2 = [
    trainer?.onlinePresence?.website && { Icon: Globe, color: "hover:bg-blue-500", label: "Website", href: trainer.onlinePresence.website },
    trainer?.onlinePresence?.facebook && { Icon: Facebook, color: "hover:bg-blue-700", label: "Facebook", href: trainer.onlinePresence.facebook },
    trainer?.onlinePresence?.instagram && { Icon: Instagram, color: "hover:bg-pink-500", label: "Instagram", href: trainer.onlinePresence.instagram },
  ].filter(Boolean);

  const waClass =
    "absolute -bottom-1 -right-1 w-8 h-8 md:w-9 md:h-9 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white hover:bg-green-600 transition-colors shadow-md z-10";

  const waLink = trainer?.contactInfo?.whatsapp
    ? `https://wa.me/${String(trainer.contactInfo.whatsapp).replace(/\D/g, "")}`
    : null;

  const heroTags =
    trainer?.tagsLine?.filter(Boolean) || [];

  const aboutText =
    trainer?.profileSummary?.profileSummary?.trim() || "";

  const workshopItems =
    trainer?.workshops?.filter(Boolean) || [];

  const galleryImages =
    trainer?.profileSummary?.galleryImages?.filter((img) => img?.url) || [];

  const contactItems = [
    trainer?.contactInfo?.phone && { icon: Phone, text: trainer.contactInfo.phone },
    trainer?.email && { icon: Mail, text: trainer.email },
    location && { icon: MapPin, text: location },
    trainer?.onlinePresence?.website && { icon: Globe, text: trainer.onlinePresence.website },
  ].filter(Boolean);

  const expertiseItems = [
    trainer?.expertiseDomain?.industry && { icon: Building2, title: "Industry", value: trainer.expertiseDomain.industry },
    trainer?.expertiseDomain?.competencies?.length > 0 && {
      icon: Target,
      title: "Competency",
      value: trainer.expertiseDomain.competencies.join(", "),
    },
    trainer?.expertiseDomain?.domain && { icon: Lightbulb, title: "Domain", value: trainer.expertiseDomain.domain },
    (trainer?.expertiseDomain?.TrainerType || trainer?.entityType) && {
      icon: Briefcase,
      title: "Trainer Type",
      value: trainer?.expertiseDomain?.TrainerType || trainer?.entityType,
    },
    trainer?.additionalDetails?.feesPerDay && {
      icon: TrendingUp,
      title: "Commercials Charged",
      value: `Rs. ${trainer.additionalDetails.feesPerDay} / Day`,
    },
  ].filter(Boolean);

  const awards = trainer?.awards?.filter(Boolean) || [];
  const education = trainer?.education?.filter(Boolean) || [];
  const certifications = trainer?.certifications?.filter(Boolean) || [];
  const languagesKnown = trainer?.additionalDetails?.languagesFluent?.filter(Boolean) || [];
  const companiesWorkedWith = [
    ...new Set(
      (trainer?.workshops || [])
        .map((w) => w?.companyName)
        .filter(Boolean)
    ),
  ];

  const articles = trainer?.articles?.filter(Boolean) || [];

  // "What People Say" is sourced from real user reviews that have been
  // approved by an admin (status: "approved"), not from self-reported
  // trainer testimonials.
  const testimonials = (reviews || [])
    .filter(Boolean)
    .map((r) => {
      const reviewerName =
        `${r?.user?.firstName || ""} ${r?.user?.lastName || ""}`.trim() ||
        r?.sessionInfo?.reviewerName ||
        "Anonymous User";

      const role =
        r?.workshop?.basicInformation?.title
          ? `Attended: ${r.workshop.basicInformation.title}`
          : r?.sessionInfo?.city || "";

      const quote =
        r?.ratings?.overAllComment ||
        r?.ratings?.deliveryComment ||
        r?.ratings?.contentQualityComment ||
        r?.ratings?.engagmentComment ||
        "Great experience working with this trainer.";

      return {
        id: r?._id,
        quote,
        name: reviewerName,
        role,
        rating: r?.averageRating || r?.ratings?.overAll || 5,
      };
    });
  const featuredVideos = trainer?.videos?.filter(Boolean) || [];
  const marketKnowledge = trainer?.globalMarketKnowledge?.filter(Boolean) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700 bg-white">
        Loading profile...
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-white">
        {error || "Trainer not found"}
      </div>
    );
  }

  return (
    <>
      <AnimatedBackground />

      <div className="w-full min-h-screen relative" style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-geist-sans, 'Geist Sans', sans-serif)", background: "transparent" }}>
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="relative overflow-hidden w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 rounded-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative max-w-6xl mx-auto px-6 pt-6 pb-10">
              <div className="flex flex-col md:flex-row items-stretch md:items-start gap-6">
                <div className="relative flex flex-row items-center justify-between md:flex-col md:justify-start gap-4 flex-shrink-0 w-full md:w-auto">
                  <div className="flex items-center gap-3 md:hidden absolute top-0 -right-4">
                    <ShareButton title={trainer?.fullName} />
                    <DownloadButton trainer={trainer} reviews={reviews} />
                    <button
                      onClick={() => router.push("/find-trainer")}
                      aria-label="Close and browse trainers"
                      className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 shadow-md"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center ring-4 ring-white/20 overflow-hidden shadow-2xl">
                      <Image
                        src={trainer?.profilePhoto?.url || "/Images/trainee1.png"}
                        alt={trainer?.fullName || "Trainer"}
                        width={150}
                        height={150}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {waLink && (
                      <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={waClass}>
                        <WhatsAppIcon size={16} />
                      </a>
                    )}
                  </div>

                  {(socialRow1.length > 0 || socialRow2.length > 0) && (
                    <div className="flex flex-col gap-2 items-center md:items-center mr-24 md:mr-0 -mt-4 md:mt-0">
                      <div className="flex items-center gap-2 justify-center">
                        {socialRow1.map(({ Icon, color, label, href }, i) => (
                          <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 ${color}`}
                          >
                            <Icon size={15} />
                          </a>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 justify-center">
                        {socialRow2.map(({ Icon, color, label, href }, i) => (
                          <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 ${color}`}
                          >
                            <Icon size={15} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                   <button
                    onClick={handleWriteReview}
                    className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white text-blue-800 hover:bg-blue-50 transition-all duration-200 shadow-md active:scale-95"
                  >
                    <PenSquare size={15} />
                    Write a Review
                  </button>
                </div>

                <div className="flex-1 min-w-0 mt-2 md:mt-0">
                  <div className="flex items-start justify-between gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {trainer?.fullName || "Trainer"}
                    </h1>
                    <div className="hidden md:flex items-center gap-4 flex-shrink-0 -mt-3">
                      <ShareButton title={trainer?.fullName} />
                      <DownloadButton trainer={trainer} reviews={reviews} />
                      <button
                        onClick={() => router.push("/find-trainer")}
                        aria-label="Close and browse trainers"
                        className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 shadow-md"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mt-2 mb-2">
                    {location && (
                      <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                        <MapPin size={13} /> {location}
                      </span>
                    )}

                    {trainer?.status && (
                      <span className="flex items-center gap-1.5 text-blue-200">
                        <CheckCircle2 size={13} /> {trainer.status}
                      </span>
                    )}
                  </div>

                  {(trainer?.subjectLine || trainer?.companyName) && (
                    <p className="text-blue-200 font-medium text-sm md:text-base">
                      {trainer?.subjectLine || ""}
                      {trainer?.subjectLine && trainer?.companyName ? " | " : ""}
                      {trainer?.companyName || ""}
                    </p>
                  )}

                  {aboutText && (
                    <p className="text-blue-300 text-sm mt-2 max-w-lg leading-relaxed">
                      {aboutText}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-6 mt-5">
                    {trainer?.additionalDetails?.trainingExperience && (
                      <>
                        <StatPill value={trainer.additionalDetails.trainingExperience} label="Years in Training" />
                        <div className="w-px bg-white/20 hidden sm:block" />
                      </>
                    )}

                    {trainer?.workshops?.length > 0 && (
                      <>
                        <StatPill value={trainer.workshops.length} label="Workshops Done" />
                        <div className="w-px bg-white/20 hidden sm:block" />
                      </>
                    )}

                    {trainer?.awards?.length > 0 && (
                      <>
                        <StatPill value={trainer.awards.length} label="Awards" />
                        <div className="w-px bg-white/20 hidden sm:block" />
                      </>
                    )}

                    {trainer?.rating && (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <Star size={18} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {trainer.rating}/5
                          </span>
                        </div>
                        <span className="text-xs text-blue-200 mt-0.5">Trainer Rating</span>
                      </div>
                    )}
                  </div>

                  {heroTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {heroTags.map((t, i) => (
                        <Tag key={`${t}-${i}`} label={t} />
                      ))}
                    </div>
                  )}

                 
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                {aboutText && (
                  <FadeIn>
                    <Card>
                      <SectionHeader icon={Users} title="About Me" />
                      <p className="text-sm text-black leading-relaxed">{aboutText}</p>
                    </Card>
                  </FadeIn>
                )}

                {testimonials.length > 0 && (
                  <FadeIn delay={80}>
                    <Card>
                      <SectionHeader icon={MessageSquare} title="What People Say" linkText="View All" />
                      <div className="grid sm:grid-cols-2 gap-4">
                        {testimonials.slice(0, 2).map((item, index) => (
                          <Testimonial
                            key={item?.id || index}
                            quote={item?.quote}
                            name={item?.name}
                            role={item?.role}
                            rating={item?.rating}
                            delay={index * 120}
                          />
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {expertiseItems.length > 0 && (
                  <FadeIn delay={100}>
                    <Card>
                      <div className="flex flex-col divide-y divide-blue-50">
                        {expertiseItems.map(({ icon: Icon, title, value }, i) => (
                          <div key={i} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon size={17} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">{title}</p>
                              <p className="text-sm text-black leading-snug">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {workshopItems.length > 0 && (
                  <FadeIn delay={150}>
                    <Card>
                      <SectionHeader icon={Zap} title="Popular Workshops" linkText="View All" />
                      <div className="grid sm:grid-cols-3 gap-4">
                        {workshopItems.slice(0, 3).map((item, index) => (
                          <WorkshopCard
                            key={index}
                            title={item?.title}
                            desc={item?.summary || item?.domain || item?.industry}
                            image={item?.photos?.[0]?.url || trainer?.bannerPhoto?.url || trainer?.profilePhoto?.url || "/Images/trainee1.png"}
                            delay={index * 100}
                          />
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {galleryImages.length > 0 && (
                  <FadeIn delay={200}>
                    <Card>
                      <SectionHeader icon={Camera} title="Gallery" />
                      <div className="grid grid-cols-5 gap-2">
                        {galleryImages.map((img, i) => (
                          <GalleryThumb key={i} image={img.url} delay={i * 60} />
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {(awards.length > 0 || education.length > 0 || certifications.length > 0) && (
                  <FadeIn delay={250}>
                    <Card>
                      {awards.length > 0 && (
                        <div className={education.length > 0 || certifications.length > 0 ? "mb-6 pb-6 border-b border-blue-100" : ""}>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                              <Trophy size={18} className="text-blue-700" />
                            </div>
                            <h2 className="text-lg font-semibold text-black">Awards & Recognition</h2>
                          </div>
                          <div className="relative">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                              {awards.slice(0, 5).map((item, index) => (
                                <Milestone
                                  key={index}
                                  icon={Trophy}
                                  label={item?.title || item?.name}
                                  org={item?.organisation || item?.organization}
                                  year={item?.year}
                                  delay={index * 80}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {education.length > 0 && (
                        <div className={certifications.length > 0 ? "mb-6 pb-6 border-b border-blue-100" : ""}>
                          <SectionHeader icon={GraduationCap} title="Professional Experience" />
                          <div className="relative">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                              {education.slice(0, 5).map((item, index) => (
                                <Milestone
                                  key={index}
                                  icon={GraduationCap}
                                  label={item?.highestQualification || item?.degree || item?.title}
                                  org={item?.institution || item?.organization}
                                  year={item?.completionYear || item?.year}
                                  delay={index * 80}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {certifications.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                              <ShieldCheck size={18} className="text-blue-700" />
                            </div>
                            <h2 className="text-lg font-semibold text-black">Education & Certifications</h2>
                          </div>
                          <div className="relative">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                              {certifications.slice(0, 5).map((item, index) => (
                                <Milestone
                                  key={index}
                                  icon={ShieldCheck}
                                  label={item?.name || item?.title}
                                  org={item?.organisation || item?.organization}
                                  year={item?.year}
                                  delay={index * 80}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </FadeIn>
                )}
              </div>

              <div className="lg:w-80 space-y-6">
                {articles.length > 0 && (
                  <FadeIn delay={100}>
                    <Card>
                      <SectionHeader icon={BookOpen} title="Articles" linkText="View All" />
                      <div className="space-y-1">
                        {articles.slice(0, 3).map((article, index) => (
                          <ArticleCard
                            key={index}
                            title={article?.title}
                            date={article?.date || article?.publishedAt}
                            delay={index * 80}
                          />
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {featuredVideos.length > 0 && (
                  <FadeIn delay={170}>
                    <Card>
                      <SectionHeader icon={Play} title="Featured Video" />
                      <div className="space-y-3">
                        {featuredVideos.slice(0, 1).map((video, index) => (
                          <a
                            key={index}
                            href={video?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block w-full rounded-xl overflow-hidden bg-blue-950 aspect-video group cursor-pointer"
                          >
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                              <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                                <Play size={24} className="text-white fill-white ml-1" />
                              </div>
                              <span className="text-xs text-blue-200 mt-1">Watch Preview</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/60 via-blue-900/40 to-blue-950/80" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                              <p className="text-xs font-semibold text-white leading-snug">{video?.title}</p>
                              {video?.duration && <p className="text-xs text-blue-300 mt-0.5">{video.duration}</p>}
                            </div>
                          </a>
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {marketKnowledge.length > 0 && (
                  <FadeIn delay={210}>
                    <Card>
                      <SectionHeader icon={Globe} title="Global Market Knowledge" />
                      <div className="space-y-1">
                        {marketKnowledge.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 py-2.5 border-b border-blue-50 last:border-0">
                            <Star size={15} className="fill-yellow-400 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-900 leading-snug">{item?.label || item?.title}</p>
                              {item?.detail && <p className="text-xs text-blue-400 mt-0.5 leading-snug">{item.detail}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {contactItems.length > 0 && (
                  <FadeIn delay={250}>
                    <Card>
                      <SectionHeader icon={Phone} title="Contact Details" />
                      <div className="space-y-3">
                        {contactItems.map(({ icon: Icon, text }, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-blue-700 hover:text-blue-900 transition-colors cursor-pointer">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon size={13} className="text-blue-500" />
                            </div>
                            <span className="break-all leading-snug">{text}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {companiesWorkedWith.length > 0 && (
                  <FadeIn delay={150}>
                    <Card>
                      <SectionHeader icon={Building2} title="Companies Worked With" />
                      <div className="grid grid-cols-3 gap-2">
                        {companiesWorkedWith.slice(0, 6).map((name, i) => (
                          <CompanyLogo key={i} name={name} color="text-blue-600" />
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {languagesKnown.length > 0 && (
                  <FadeIn delay={200}>
                    <Card>
                      <SectionHeader icon={Languages} title="Languages Known" />
                      <div className="grid grid-cols-3 gap-2">
                        {languagesKnown.map((lang, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center px-4 py-3 rounded-xl border border-blue-100 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            <span className="font-bold text-sm tracking-wide text-blue-600">{lang}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </FadeIn>
                )}

                {trainer?.profileSummary?.profilepdf?.url && (
                  <FadeIn delay={220}>
                    <Card>
                      <SectionHeader icon={Download} title="Profile PDF" />
                      <a
                        href={trainer.profileSummary.profilepdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 transition-colors"
                      >
                        <Download size={16} />
                        Download Profile
                        <ExternalLink size={14} />
                      </a>
                    </Card>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Footer />
      </div>

      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #ffffff 0%, #f5f3ff 50%, #faf8ff 100%) !important;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}
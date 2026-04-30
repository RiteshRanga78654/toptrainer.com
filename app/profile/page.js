"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Phone, MapPin, Mail, Linkedin, Twitter, Youtube, Globe,
  Star, ChevronRight, Users, Award, BookOpen, Briefcase,
  Languages, MessageSquare, Download, ExternalLink,
  CheckCircle2, TrendingUp, Lightbulb, Target, Building2,
  GraduationCap, Trophy, Send, Camera, Zap,
} from "lucide-react";
import Footer from "../components/footer";

// ─── Animation Hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-blue-100 p-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
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

// ─── Stat Pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold text-white">{value}</span>
      <span className="text-xs text-blue-200 mt-0.5 text-center">{label}</span>
    </div>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm">
      {label}
    </span>
  );
}

// ─── Workshop Card ────────────────────────────────────────────────────────────
function WorkshopCard({ title, desc, image, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="group rounded-2xl h-[250px] overflow-hidden border border-blue-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="relative h-36 overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-blue-900 text-sm mb-1">{title}</h3>
          <p className="text-xs text-blue-500">{desc}</p>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ title, date, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="flex gap-3 group cursor-pointer hover:bg-blue-50 p-2 rounded-xl transition-colors">
        <div className="w-16 h-14 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center overflow-hidden">
          <BookOpen size={20} className="text-white/80" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900 group-hover:text-blue-700 transition-colors leading-snug">{title}</p>
          <p className="text-xs text-blue-400 mt-1">{date}</p>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Timeline Milestone ───────────────────────────────────────────────────────
function Milestone({ icon: Icon, label, org, year, delay }) {
  return (
    <FadeIn delay={delay} className="flex flex-col items-center text-center w-full">
      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center mb-2 ring-2 ring-blue-200">
        <Icon size={20} className="text-blue-700" />
      </div>
      <p className="text-xs font-semibold text-blue-900">{label}</p>
      <p className="text-xs text-blue-500">{org}</p>
      <p className="text-xs font-bold text-blue-700 mt-0.5">{year}</p>
    </FadeIn>
  );
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
function Testimonial({ quote, name, role, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 h-full">
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-sm text-blue-800 leading-relaxed mb-4 italic">"{quote}"</p>
        <div>
          <p className="text-sm font-semibold text-blue-900">{name}</p>
          <p className="text-xs text-blue-500">{role}</p>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Company Logo ─────────────────────────────────────────────────────────────
function CompanyLogo({ name, color = "text-blue-800" }) {
  return (
    <div className="flex items-center justify-center px-4 py-3 rounded-xl border border-blue-100 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
      <span className={`font-bold text-sm tracking-wide ${color}`}>{name}</span>
    </div>
  );
}

// ─── Gallery Thumb ────────────────────────────────────────────────────────────
function GalleryThumb({ image, delay }) {
  return (
    <FadeIn delay={delay}>
      <div className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer relative group">
        <Image src={image} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
      </div>
    </FadeIn>
  );
}

// ─── Canvas Animated Background ───────────────────────────────────────────────
// ─── Animated Background Canvas ──────────────────────────────────────────────
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

    // Sparse small dots
    const dots = Array.from({ length: 50 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(1.5, 3.5),
      vx: rand(-0.15, 0.15),
      vy: rand(-0.2, -0.05),
      alpha: rand(0.35, 0.7),
      pulse: rand(0, Math.PI * 2),
    }));

    // Soft large blobs in light purple
    const blobs = Array.from({ length: 4 }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(120, 220),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.07, 0.07),
      hue: rand(250, 280), // purple range
    }));

    let tick = 0;

    const draw = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft purple blobs
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

      // Floating dots
      dots.forEach((d) => {
        d.pulse += 0.02;
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -4) { d.y = canvas.height + 4; d.x = rand(0, canvas.width); }
        if (d.x < -4) d.x = canvas.width + 4;
        if (d.x > canvas.width + 4) d.x = -4;

        // Gently pulse alpha
        const alphaNow = d.alpha * (0.7 + 0.3 * Math.sin(d.pulse));

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alphaNow})`; // violet-500
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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Profile() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleDownload = async () => {
    try {
      if (typeof window === "undefined") return;

      const [{ toPng }, { jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
      ]);

      const element = document.getElementById("pdf-content");
      if (!element) return;

      const downloadBtn = document.getElementById("download-btn");
      if (downloadBtn) downloadBtn.style.visibility = "hidden";

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#eef2ff",
        filter: (node) => {
          if (!node.getAttribute) return true;
          if (node.getAttribute("data-html2canvas-ignore") === "true") return false;
          if (node.id === "download-btn") return false;
          if (node.tagName?.toLowerCase() === "footer") return false;
          return true;
        },
      });

      if (downloadBtn) downloadBtn.style.visibility = "visible";

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const img = new window.Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgHeight = (img.height * pdfWidth) / img.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("trainer-profile.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <>
      {/* ── Canvas background — fixed behind everything ── */}
      <AnimatedBackground />

      {/* ── Page content — sits above canvas ── */}
      <div
        id="pdf-content"
        className="min-h-screen relative"
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-geist-sans, 'Geist Sans', sans-serif)",
          // Semi-transparent so the canvas animation shows through
          background: "transparent",
        }}
      >
        {/* ── Hero Banner ── */}
        <div
          id="profile-section"
          className="relative overflow-hidden w-full max-w-7xl mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600"
        >
          {/* Download Button */}
          <button
            id="download-btn"
            onClick={handleDownload}
            className="absolute top-3 right-3 mr-10 md:top-4 md:right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/50 hover:bg-blue-800 text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Download size={15} />
          </button>

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center ring-4 ring-white/20 overflow-hidden shadow-2xl">
                  <Image
                    src="/Images/trainee1.png"
                    alt="Trainer"
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center ring-2 ring-white">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Karan Malhotra</h1>
                <p className="text-blue-200 font-medium mt-1 text-sm md:text-base">
                  Leadership & Agile Coach &nbsp;|&nbsp; Elevate Learning Solutions Pvt. Ltd.
                </p>
                <p className="text-blue-300 text-sm mt-2 max-w-lg leading-relaxed">
                  Helping leaders and teams unlock their true potential through experiential learning and practical strategies.
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mt-5">
                  <StatPill value="12+" label="Years in Training" />
                  <div className="w-px bg-white/20 hidden sm:block" />
                  <StatPill value="250+" label="Workshops Done" />
                  <div className="w-px bg-white/20 hidden sm:block" />
                  <StatPill value="15+" label="Industries Served" />
                  <div className="w-px bg-white/20 hidden sm:block" />
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl md:text-3xl font-bold text-white">4.8/5</span>
                    </div>
                    <span className="text-xs text-blue-200 mt-0.5">Trainer Rating</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Leadership", "Agile", "Change Management", "Team Building"].map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              </div>

              {/* Company Badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl shadow-lg">
                  <Building2 size={16} className="text-white" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-blue-200">Currently at</span>
                    <span className="text-sm font-semibold text-white">Elevate Learning Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="border-t border-white/10 bg-blue-900/40 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Phone size={14} /> +91 9876543210
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <MapPin size={14} /> Bengaluru, Karnataka
                </span>
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Mail size={14} /> karan.malhotra@elevatelearning.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Linkedin, color: "hover:bg-blue-600" },
                  { Icon: Twitter, color: "hover:bg-sky-500" },
                  { Icon: Youtube, color: "hover:bg-red-500" },
                  { Icon: Globe, color: "hover:bg-blue-500" },
                ].map(({ Icon, color }, i) => (
                  <button
                    key={i}
                    className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 ${color}`}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── Left Column ── */}
            <div className="flex-1 space-y-6">

              {/* About Me */}
              <FadeIn>
                <Card>
                  <SectionHeader icon={Users} title="About Me" />
                  <p className="text-sm text-black leading-relaxed">
                    I help leaders and teams unlock their true potential through experiential learning and practical strategies.
                    With over a decade of experience, I specialize in driving agile mindset, leadership excellence and organizational transformation.
                  </p>
                </Card>
              </FadeIn>

              {/* Details Grid */}
              <FadeIn delay={100}>
                <Card>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: Building2, title: "Industry", value: "IT & Software, BFSI, Manufacturing, Healthcare, Education, Startups" },
                      { icon: Target, title: "Competency", value: "Leadership Development, Agile Transformation, Team Effectiveness, Change Management" },
                      { icon: Lightbulb, title: "Domain", value: "Agile & Scrum, Emotional Intelligence, Design Thinking, Communication, OKRs" },
                      { icon: Briefcase, title: "Trainer Type", value: "Corporate Trainer | Leadership Coach | Facilitator" },
                      { icon: TrendingUp, title: "Commercials Charged", value: "₹75,000 – ₹1,50,000 / Workshop (Customizable as per need)" },
                    ].map(({ icon: Icon, title, value }, i) => (
                      <div key={i} className="flex gap-3">
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

              {/* Popular Workshops */}
              <FadeIn delay={150}>
                <Card>
                  <SectionHeader icon={Zap} title="Popular Workshops" linkText="View All" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <WorkshopCard title="Agile Leadership Masterclass" desc="Build agile mindset & lead high-performing teams" image="/Images/workshop1.png" delay={0} />
                    <WorkshopCard title="Effective Communication for Leaders" desc="Communicate with clarity and impact" image="/Images/workshop2.png" delay={100} />
                    <WorkshopCard title="Design Thinking Workshop" desc="Solve problems creatively & drive innovation" image="/Images/workshop3.png" delay={200} />
                  </div>
                </Card>
              </FadeIn>

              {/* Gallery */}
              <FadeIn delay={200}>
                <Card>
                  <SectionHeader icon={Camera} title="Gallery" />
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "/Images/trainner-workshop.jpg",
                      "/Images/trainner-workshop.jpg",
                      "/Images/trainner-workshop.jpg",
                      "/Images/trainner-workshop.jpg",
                      "/Images/trainner-workshop.jpg",
                    ].map((img, i) => (
                      <GalleryThumb key={i} image={img} delay={i * 60} />
                    ))}
                  </div>
                </Card>
              </FadeIn>

              {/* Milestones */}
              <FadeIn delay={250}>
                <Card>
                  <SectionHeader icon={GraduationCap} title="Educational & Professional Milestones" />
                  <div className="relative">
                    <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-blue-100 hidden sm:block" />
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                      <Milestone icon={GraduationCap} label="MBA – HR" org="Symbiosis Institute of Management" year="2008" delay={0} />
                      <Milestone icon={Award} label="Professional Scrum Trainer (PST)" org="Scrum.org" year="2016" delay={80} />
                      <Milestone icon={CheckCircle2} label="Certified Agile Leadership Coach" org="ICAgle" year="2018" delay={160} />
                      <Milestone icon={Trophy} label="Leadership Excellence Award" org="Elevate Learning" year="2021" delay={240} />
                      <Milestone icon={Star} label="Top Trainer of the Year" org="ABP Awards" year="2022" delay={320} />
                    </div>
                  </div>
                </Card>
              </FadeIn>

              {/* Testimonials */}
              <FadeIn delay={300}>
                <Card>
                  <SectionHeader icon={MessageSquare} title="What People Say" linkText="View All" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Testimonial
                      quote="Karan's session on Agile Leadership was transformative. Very engaging and practical!"
                      name="Priya Sharma"
                      role="Delivery Head, Infosys"
                      delay={0}
                    />
                    <Testimonial
                      quote="One of the best trainers I have attended. Real-world examples and case studies made it so impactful."
                      name="Rahul Mehta"
                      role="Project Manager, TCS"
                      delay={120}
                    />
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* ── Right Column ── */}
            <div className="lg:w-80 space-y-6">

              {/* Articles */}
              <FadeIn delay={100}>
                <Card>
                  <SectionHeader icon={BookOpen} title="Articles" linkText="View All" />
                  <div className="space-y-1">
                    <ArticleCard title="5 Ways Agile Leaders Inspire High-Performing Teams" date="May 12, 2024" delay={0} />
                    <ArticleCard title="The Future of Leadership in a Hybrid World" date="April 28, 2024" delay={80} />
                    <ArticleCard title="Why Emotional Intelligence is a Game Changer" date="March 15, 2024" delay={160} />
                  </div>
                </Card>
              </FadeIn>

              {/* Contact Details */}
              <FadeIn delay={250}>
                <Card>
                  <SectionHeader icon={Phone} title="Contact Details" />
                  <div className="space-y-3">
                    {[
                      { icon: Phone, text: "+91 98765 43210" },
                      { icon: Mail, text: "karan.malhotra@elevatelearning.com" },
                      { icon: MapPin, text: "Bengaluru, Karnataka" },
                    ].map(({ icon: Icon, text }, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 transition-colors cursor-pointer">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Icon size={13} className="text-blue-500" />
                        </div>
                        <span className="break-all">{text}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>

              {/* Companies */}
              <FadeIn delay={150}>
                <Card>
                  <SectionHeader icon={Building2} title="Companies Worked With" />
                  <div className="grid grid-cols-3 gap-2">
                    <CompanyLogo name="TATA" color="text-blue-600" />
                    <CompanyLogo name="Infosys" color="text-blue-600" />
                    <CompanyLogo name="Wipro" color="text-blue-600" />
                    <CompanyLogo name="HDFC" color="text-blue-600" />
                    <CompanyLogo name="Deloitte" color="text-blue-600" />
                    <CompanyLogo name="ICICI" color="text-blue-600" />
                  </div>
                </Card>
              </FadeIn>

              {/* Languages */}
              <FadeIn delay={200}>
                <Card>
                  <SectionHeader icon={Languages} title="Languages Known" />
                  <div className="space-y-2">
                    {["English", "Hindi", "Kannada"].map((lang) => (
                      <div key={lang} className="flex items-center justify-between py-2 border-b border-blue-50 last:border-0">
                        <span className="text-sm text-blue-800">{lang}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i < (lang === "English" ? 5 : lang === "Hindi" ? 4 : 3)
                                  ? "bg-blue-500"
                                  : "bg-blue-100"
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>

              {/* Connect */}
              <FadeIn delay={300}>
                <Card>
                  <SectionHeader icon={ExternalLink} title="Connect With Me" />
                  <div className="space-y-2">
                    {[
                      { icon: Linkedin, label: "linkedin.com/in/karanmalhotra", color: "bg-blue-700" },
                      { icon: Twitter, label: "twitter.com/karanmalhotra", color: "bg-sky-500" },
                      { icon: Youtube, label: "youtube.com/@karanmalhotra", color: "bg-red-500" },
                      { icon: Globe, label: "www.elevatelearning.com", color: "bg-blue-600" },
                    ].map(({ icon: Icon, label, color }, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={14} className="text-white" />
                        </div>
                        <span className="text-sm text-blue-700 group-hover:text-blue-900 transition-colors truncate">{label}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>

              {/* CTA */}
              <FadeIn delay={350}>
                <div className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 p-5 text-white shadow-lg">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                    <Briefcase size={18} />
                  </div>
                  <h3 className="font-bold text-base mb-1">Interested in Hiring Karan?</h3>
                  <p className="text-blue-200 text-xs mb-4 leading-relaxed">Get in touch to book a workshop for your team.</p>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 mb-2">
                    <Send size={14} /> Send Inquiry
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer — above canvas, no z-index issues ── */}
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
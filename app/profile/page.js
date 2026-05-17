"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Phone, MapPin, Mail, Linkedin, Twitter, Youtube, Globe,
  Star, ChevronRight, Users, Award, BookOpen, Briefcase,
  Languages, MessageSquare, Download, ExternalLink,
  CheckCircle2, TrendingUp, Lightbulb, Target, Building2,
  GraduationCap, Trophy, Send, Camera, Zap, Play, ShieldCheck,
} from "lucide-react";
import Footer from "../components/footer";
import DownloadButton from "./DownloadButton";

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
        <Image src={image} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
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
      x: rand(0, window.innerWidth), y: rand(0, window.innerHeight),
      r: rand(1.5, 3.5), vx: rand(-0.15, 0.15), vy: rand(-0.2, -0.05),
      alpha: rand(0.35, 0.7), pulse: rand(0, Math.PI * 2),
    }));
    const blobs = Array.from({ length: 4 }, () => ({
      x: rand(0, window.innerWidth), y: rand(0, window.innerHeight),
      r: rand(120, 220), vx: rand(-0.08, 0.08), vy: rand(-0.07, 0.07),
      hue: rand(250, 280),
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b) => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `hsla(${b.hue}, 70%, 85%, 0.18)`);
        g.addColorStop(1, `hsla(${b.hue}, 70%, 85%, 0)`);
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      dots.forEach((d) => {
        d.pulse += 0.02; d.x += d.vx; d.y += d.vy;
        if (d.y < -4) { d.y = canvas.height + 4; d.x = rand(0, canvas.width); }
        if (d.x < -4) d.x = canvas.width + 4;
        if (d.x > canvas.width + 4) d.x = -4;
        const alphaNow = d.alpha * (0.7 + 0.3 * Math.sin(d.pulse));
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${alphaNow})`; ctx.fill();
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

// WhatsApp SVG Icon component
function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Profile() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <AnimatedBackground />

      <div
        className="min-h-screen relative"
        style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-geist-sans, 'Geist Sans', sans-serif)", background: "transparent" }}
      >
        {/* ── Hero Banner ── */}
        <div className="relative overflow-hidden w-full max-w-7xl mx-auto bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">

          <DownloadButton />

          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center ring-4 ring-white/20 overflow-hidden shadow-2xl">
                  <Image src="/Images/trainee1.png" alt="Trainer" width={150} height={150} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center ring-2 ring-white">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Karan Malhotra</h1>

                {/* ── Contact details moved below name ── */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mt-2 mb-2">
                
                  <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <MapPin size={13} /> Bengaluru, Karnataka
                  </span>
                </div>

                <p className="text-blue-200 font-medium text-sm md:text-base">
                  Agile Coach &nbsp;|&nbsp; Elevate Learning Solutions Pvt. Ltd.
                </p>
                <p className="text-blue-300 text-sm mt-2 max-w-lg leading-relaxed">
                  Helping leaders and teams unlock their true potential through experiential learning and practical strategies.
                </p>

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

                <div className="flex flex-wrap gap-2 mt-4">
                  {["City", "Agile", "Change Management", "Team Building"].map((t) => (
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

          {/* Contact Bar — social icons only */}
          <div className="border-t border-white/10 bg-blue-900/40 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-end gap-3">
              <div className="flex items-center gap-3">
                {[
                  { Icon: Linkedin, color: "hover:bg-blue-600", label: "LinkedIn" },
                  { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                  { Icon: Youtube, color: "hover:bg-red-500", label: "YouTube" },
                  { Icon: Globe, color: "hover:bg-blue-500", label: "Website" },
                ].map(({ Icon, color, label }, i) => (
                  <button key={i} aria-label={label} className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 ${color}`}>
                    <Icon size={15} />
                  </button>
                ))}
                {/* WhatsApp icon */}
                <button aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:bg-green-500">
                  <WhatsAppIcon size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── Left Column ── */}
            <div className="flex-1 space-y-6">

              <FadeIn>
                <Card>
                  <SectionHeader icon={Users} title="About Me" />
                  <p className="text-sm text-black leading-relaxed">
                    I help leaders and teams unlock their true potential through experiential learning and practical strategies.
                    With over a decade of experience, I specialize in driving agile mindset, leadership excellence and organizational transformation.
                  </p>
                </Card>
              </FadeIn>

              <FadeIn delay={100}>
                <Card>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: Building2, title: "Industry", value: "IT & Software, BFSI, Manufacturing, Healthcare, Education, Startups" },
                      { icon: Target, title: "Competency", value: "Leadership Development, Agile Transformation, Team Effectiveness, Change Management" },
                      { icon: Lightbulb, title: "Domain", value: "Agile & Scrum, Emotional Intelligence, Design Thinking, Communication, OKRs" },
                      { icon: Briefcase, title: "Trainer Type", value: "Corporate Trainer | Leadership Coach | Facilitator" },
                      { icon: TrendingUp, title: "Commercials Charged", value: "Rs. 75,000 - 1,50,000 / Workshop (Customizable as per need)" },
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

              <FadeIn delay={200}>
                <Card>
                  <SectionHeader icon={Camera} title="Gallery" />
                  <div className="grid grid-cols-5 gap-2">
                    {[...Array(5)].map((_, i) => (
                      <GalleryThumb key={i} image="/Images/trainner-workshop.jpg" delay={i * 60} />
                    ))}
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={250}>
                <Card>
                  <SectionHeader icon={GraduationCap} title="Educational & Professional Milestones" />
                  <div className="relative">
                    <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-blue-100 hidden sm:block" />
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                      <Milestone icon={GraduationCap} label="MBA - HR" org="Symbiosis Institute of Management" year="2008" delay={0} />
                      <Milestone icon={Award} label="Professional Scrum Trainer (PST)" org="Scrum.org" year="2016" delay={80} />
                      <Milestone icon={CheckCircle2} label="Certified Agile Leadership Coach" org="ICAgle" year="2018" delay={160} />
                      <Milestone icon={Trophy} label="Leadership Excellence Award" org="Elevate Learning" year="2021" delay={240} />
                      <Milestone icon={Star} label="Top Trainer of the Year" org="ABP Awards" year="2022" delay={320} />
                    </div>
                  </div>

                  {/* ── Training Certifications sub-section ── */}
                  <div className="mt-6 pt-5 border-t border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                        <ShieldCheck size={18} className="text-blue-700" />
                      </div>
                      <h2 className="text-lg font-semibold text-black">Training Certifications</h2>
                    </div>
                    <div className="relative">
                      <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-blue-100 hidden sm:block" />
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative">
                        <Milestone icon={ShieldCheck} label="Certified Scrum Master (CSM)" org="Scrum Alliance" year="2014" delay={0} />
                        <Milestone icon={Award} label="Professional Scrum Trainer (PST)" org="Scrum.org" year="2016" delay={80} />
                        <Milestone icon={CheckCircle2} label="Certified Agile Coach (ICP-ACC)" org="ICAgile" year="2018" delay={160} />
                        <Milestone icon={ShieldCheck} label="DISC Certified Trainer" org="John Maxwell Team" year="2019" delay={240} />
                        <Milestone icon={Star} label="Certified Design Thinking Facilitator" org="IDEO" year="2021" delay={320} />
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={300}>
                <Card>
                  <SectionHeader icon={MessageSquare} title="What People Say" linkText="View All" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Testimonial quote="Karan's session on Agile Leadership was transformative. Very engaging and practical!" name="Priya Sharma" role="Delivery Head, Infosys" delay={0} />
                    <Testimonial quote="One of the best trainers I have attended. Real-world examples and case studies made it so impactful." name="Rahul Mehta" role="Project Manager, TCS" delay={120} />
                  </div>
                </Card>
              </FadeIn>

            </div>

            {/* ── Right Column ── */}
            <div className="lg:w-80 space-y-6">

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

              <FadeIn delay={170}>
                <Card>
                  <SectionHeader icon={Play} title="Featured Video" />
                  <div className="space-y-3">
                    {/* Video embed placeholder */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-blue-950 aspect-video group cursor-pointer">
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                          <Play size={24} className="text-white fill-white ml-1" />
                        </div>
                        <span className="text-xs text-blue-200 mt-1">Watch Preview</span>
                      </div>
                      {/* Decorative gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/60 via-blue-900/40 to-blue-950/80" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                        <p className="text-xs font-semibold text-white leading-snug">Agile Leadership Masterclass — Introduction</p>
                        <p className="text-xs text-blue-300 mt-0.5">12:45 mins</p>
                      </div>
                    </div>
                    {/* Additional video thumbnails */}
                    {[
                      { title: "Design Thinking for Teams", duration: "8:20 mins" },
                      { title: "Emotional Intelligence at Work", duration: "10:05 mins" },
                    ].map((v, i) => (
                      <div key={i} className="flex gap-3 group cursor-pointer hover:bg-blue-50 p-2 rounded-xl transition-colors">
                        <div className="w-16 h-12 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center relative overflow-hidden">
                          <Play size={16} className="text-white fill-white z-10" />
                          <div className="absolute inset-0 bg-blue-800/60" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-sm font-medium text-blue-900 group-hover:text-blue-700 transition-colors leading-snug">{v.title}</p>
                          <p className="text-xs text-blue-400 mt-0.5">{v.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={250}>
                <Card>
                  <SectionHeader icon={Phone} title="Contact Details" />
                  <div className="space-y-3">
                    {[
                      { icon: Phone, text: "+91 98765 43210" },
                      { icon: Mail, text: "karan.malhotra@elevatelearning.com" },
                      { icon: MapPin, text: "No. 42, 3rd Cross, Koramangala 5th Block, Bengaluru, Karnataka – 560095" },
                      { icon: Globe, text: "www.elevatelearning.com" },
                    ].map(({ icon: Icon, text }, i) => (
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

              <FadeIn delay={150}>
                <Card>
                  <SectionHeader icon={Building2} title="Companies Worked With" />
                  <div className="grid grid-cols-3 gap-2">
                    {["TATA", "Infosys", "Wipro", "HDFC", "Deloitte", "ICICI"].map((name) => (
                      <CompanyLogo key={name} name={name} color="text-blue-600" />
                    ))}
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={200}>
                <Card>
                  <SectionHeader icon={Languages} title="Languages Known" />
                  <div className="space-y-2">
                    {[
                      { lang: "English", level: 5 },
                      { lang: "Hindi", level: 4 },
                      { lang: "Kannada", level: 3 },
                    ].map(({ lang, level }) => (
                      <div key={lang} className="flex items-center justify-between py-2 border-b border-blue-50 last:border-0">
                        <span className="text-sm text-blue-800">{lang}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < level ? "bg-blue-500" : "bg-blue-100"}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>


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
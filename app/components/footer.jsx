"use client";

import { useState } from "react";
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  X,
  Mail,
  ShieldCheck,
  Star,
  Users,
  Lock,
  Headphones,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const exploreLinks = [
  { name: "Find Trainers", href: "/find-trainer" },
  { name: "All Categories", href: "/Industry" },
  { name: "Articles", href: "/articles" },
  { name: "Videos", href: "#" },
  { name: "Workshops", href: "/trainer" },
  { name: "Ebooks / Reading Material", href: "#" },
  { name: "Training Companies", href: "#" },
  { name: "Popular Social Channels", href: "#" },
];

const learnerLinks = [
  { name: "Post a Requirement", href: "/join-as-trainer" },
  { name: "How It Works", href: "#" },
  { name: "Corporate Training Solutions", href: "/trainer" },
  { name: "Custom Workshops", href: "#" },
  { name: "Find Training Partners", href: "/partners" },
  { name: "Pricing & Plans", href: "#" },
  { name: "Success Stories", href: "#" },
  { name: "Help Center", href: "#" },
];

const trainerLinks = [
  { name: "Create Trainer Profile", href: "/trainer-profile" },
  { name: "Write Articles", href: "/articles" },
  { name: "Upload Videos", href: "#" },
  { name: "Host Workshops", href: "/trainer" },
  { name: "Sell Ebooks / Courses", href: "#" },
  { name: "Grow Your Audience", href: "#" },
  { name: "Trainer Resources", href: "#" },
  { name: "Guidelines & Policies", href: "#" },
];

const popularCategories = [
  "Leadership",
  "Communication",
  "Sales & Marketing",
  "Personal Development",
  "Soft Skills",
  "IT Skills",
  "HR & Management",
];

const popularChannels = [
  {
    name: "IREED India",
    followers: "125K Followers",
    color: "bg-[#1877F2]",
    icon: Facebook,
    href: "https://www.facebook.com/IREEDAcademy/"
  },
  {
    name: "IREED India",
    followers: "98K Followers",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    icon: Instagram,
    href: "https://www.instagram.com/ireed_india/"

  },
  {
    name: "IREED India",
    followers: "245K Subscribers",
    color: "bg-[#FF0000]",
    icon: Youtube,
    href: "https://www.youtube.com/@ireedindia"
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified & Trusted",
    desc: "Every trainer is verified for authenticity.",
  },
  {
    icon: Star,
    title: "High Quality Content",
    desc: "Carefully curated articles, videos & resources.",
  },
  {
    icon: Users,
    title: "Learn at Your Own Pace",
    desc: "Flexible learning for every schedule.",
  },
  {
    icon: Lock,
    title: "Secure & Safe",
    desc: "Your data and privacy are our priority.",
  },
  {
    icon: Headphones,
    title: "Support",
    desc: "We're here to help you succeed.",
  },
];

const footerNavLinks = [
  { name: "About Us", href: "/about" },
  { name: "Trainers", href: "/find-trainer" },
  { name: "Blog", href: "/blogs" },
  { name: "Articles", href: "/articles" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Cookies Policy", href: "#" },
];

const footerLegalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Cookies Policy", href: "#" },
];

const trustedStats = [
  { num: "2,000+", label: "Trainer" },
  { num: "100K+", label: "User" },
  { num: "100%", label: "Secure Platform" },
];

const socialIcons = [
  { Icon: Linkedin, color: "bg-[#0A66C2]" },
  { Icon: Facebook, color: "bg-[#1877F2]" },
  {
    Icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
  },
  { Icon: Youtube, color: "bg-[#FF0000]" },
  { Icon: X, color: "bg-[#1a1a1a]" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-white text-gray-800 w-full">
      {/* ── Newsletter Bar ── */}
      <div className="w-full bg-white/80 backdrop-blur-sm border-y border-gray-200/50 shadow-[0_4px_24px_rgba(37,99,235,0.03)]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center shrink-0">
              <Mail size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                Stay Updated, Always.
              </h3>
              <p className="text-[13px] sm:text-[14px] text-gray-500 mt-0.5">
                Get the latest articles, videos, workshops
                <br className="hidden sm:block" /> and platform updates.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full sm:w-auto items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-[260px] px-4 py-2.5 rounded-l-lg border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold text-sm rounded-r-lg hover:from-blue-700 hover:to-purple-600 transition-all whitespace-nowrap shadow-[0_2px_8px_rgba(37,99,235,0.15)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="w-full">
        <div className="w-full mx-auto px-5 md:px-8 py-12 lg:py-14 ">
          <div className="flex w-full justify-center">
            {/* Brand Column */}
            <div className="lg:col-span-3 border-r border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center shrink-0">
                  <span className="text-white font-extrabold text-xl leading-none">
                    T
                  </span>
                </div>
                <h2 className="text-[22px] font-bold text-gray-900 leading-none">
                  TopTrainer
                </h2>
              </div>

              <p className="text-[17px] font-bold text-gray-900 leading-snug mb-4">
                Connecting Expertise.
                <br />
                Inspiring Growth.
              </p>

              <p className="text-[13px] leading-relaxed text-gray-500 mb-6 max-w-[260px]">
                A platform where experienced trainers showcase their knowledge,
                share insights and empower learners and organisations to grow.
              </p>

              <div className="flex gap-2.5">
                {socialIcons.map(({ Icon, color }, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white hover:opacity-85 transition-opacity`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links  */}
            <div className="flex justify-between p-6 gap-6">
              {/* Explore */}
              <div className="lg:col-span-2">
                <h4 className="text-[15px] font-bold text-gray-900 mb-4">
                  Explore
                </h4>
                <ul className="space-y-2.5">
                  {exploreLinks.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="group flex items-center gap-1 text-[13px] text-gray-600 hover:text-blue-700 transition-colors"
                      >
                        {item.name}
                        <ChevronRight
                          size={12}
                          className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Learners / Organisations */}
              <div className="lg:col-span-2">
                <h4 className="text-[15px] font-bold text-gray-900 mb-4">
                  For Learners / Organisations
                </h4>
                <ul className="space-y-2.5">
                  {learnerLinks.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="group flex items-center gap-1 text-[13px] text-gray-600 hover:text-blue-700 transition-colors"
                      >
                        {item.name}
                        <ChevronRight
                          size={12}
                          className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Trainers */}
              <div className="lg:col-span-2">
                <h4 className="text-[15px] font-bold text-gray-900 mb-4">
                  For Trainers
                </h4>
                <ul className="space-y-2.5">
                  {trainerLinks.map((item, i) => (
                    <li key={i}>
                      <a
                        href={item.href}
                        className="group flex items-center gap-1 text-[13px] text-gray-600 hover:text-blue-700 transition-colors"
                      >
                        {item.name}
                        <ChevronRight
                          size={12}
                          className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Categories */}
              <div>
                <h4 className="text-[15px] font-bold text-gray-900 mb-4">
                  Popular Categories
                </h4>
                <ul className="space-y-2.5 mb-4 md:mb-0">
                  {popularCategories.map((cat, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-[13px] text-gray-600 hover:text-blue-700 transition-colors"
                      >
                        {cat}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#"
                      className="text-[13px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      View All Categories
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Follow Popular Channels */}
            <div className="space-y-3 border border-slate-200 rounded-xl p-6 ">

              <div className="flex justify-between gap-4 font-bold ">
                <p>Follow Popular Channels</p>
                <p className="text-blue-600 cursor-pointer hover:text-blue-500">View All</p>
              </div>

              <div className="flex flex-col gap-6 mt-10 ">
                {popularChannels.map((ch, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full ${ch.color} flex items-center justify-center text-white shrink-0`}
                    >
                      <ch.icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-900 leading-tight truncate">
                        {ch.name}
                      </p>
                      <p className="text-[11px] text-gray-500">{ch.followers}</p>
                    </div>
                    <button className="text-[11px] px-3 py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-blue-300 transition-colors font-medium whitespace-nowrap">
                      Follow
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Strip ── */}
      <div className="w-full bg-gray-50 border-t border-gray-200">
        <div className="w-full mx-auto px-5 md:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {trustFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3 border-r border-slate-200">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-blue-700" />
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-gray-900 leading-tight">
                    {f.title}
                  </h5>
                  <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="w-full bg-[#111827] text-white">
        <div className="w-full mx-auto px-5 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-8">
            {/* Left — Copyright */}
            <div className="text-center lg:text-left lg:shrink-0 ">
              <p className="text-[13px] text-gray-400">
                &copy; 2026 All Rights Reserved. | Powered by IREED MEDIA
              </p>
            </div>

            {/* Center — Nav Links */}
            <div className="grid grid-cols-4 gap-x-5 gap-y-2 text-gray-400 text-[13px]">
              {footerNavLinks.map((item, i) => (
                <span key={i} className="flex items-center gap-3 ">
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                  {i < footerNavLinks.length - 1 && (
                    <span className="text-gray-600">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Right — Trusted By */}
            <div className="shrink-0 ">
              <p className="text-[13px] font-semibold text-gray-300 mb-3 text-center lg:text-left">
                Trusted by
              </p>
              <div className="flex items-center justify-center lg:justify-end gap-5">
                {trustedStats.map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[15px] font-bold text-white">{s.num}</p>
                    <p className="text-[11px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

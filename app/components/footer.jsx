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
import Image from "next/image";
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

// Was centered in the old black bottom bar — now its own footer column,
// alongside Explore / Learners / Trainers / Popular Categories.
const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Trainers", href: "/find-trainer" },
  { name: "Blog", href: "/blogs" },
  { name: "Articles", href: "/articles" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "#" },
  { name: "Refund Policy", href: "#" },
  { name: "Cookies Policy", href: "#" },
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

// Was pinned bottom-right in the old black bar — now lives with the
// brand column, right under the social icons.
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

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-[15px] font-bold text-gray-900 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((item, i) => (
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
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-white text-gray-800 w-full">
      {/* ── Main Footer ── */}
      <div className="w-full">
        <div className="w-full mx-auto px-5 md:px-8 py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-4">
            {/* Brand Column */}
            <div className="lg:w-[280px] lg:shrink-0 lg:border-r lg:border-slate-200 p-0 lg:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <Link href={"/"}>
                                <Image
                                  src="/logo.png"
                                  alt="TopTrainer Logo"
                                  width={32}
                                  height={32}
                                  className="object-contain"
                                />
                              </Link>
                </div>
                 <Link href="/">
                               <span className="cursor-pointer">
                                <Image src="/toptrainerTextLogo.png" alt="toptrainer Logo" width={125} height={125} className="object-contain" />
                               </span>
                             </Link>
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

              <div className="flex gap-2.5 mb-6">
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

              {/* Trusted By — moved here from the old bottom-right slot */}
              <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-slate-100">
                {trustedStats.map((s, i) => (
                  <div key={i}>
                    <p className="text-[15px] font-bold text-gray-900">{s.num}</p>
                    <p className="text-[11px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links — responsive column grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 flex-1 lg:p-6">
              <LinkColumn title="Explore" links={exploreLinks} />
              <LinkColumn title="For Learners / Organisations" links={learnerLinks} />
              <LinkColumn title="For Trainers" links={trainerLinks} />

              {/* Popular Categories */}
              <div>
                <h4 className="text-[15px] font-bold text-gray-900 mb-4">
                  Popular Categories
                </h4>
                <ul className="space-y-2.5">
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

              {/* Company & Legal — moved here from the old center bottom bar */}
              <LinkColumn title="Company & Legal" links={companyLinks} />
            </div>

            {/* Newsletter */}
            <div className="lg:w-[320px] lg:shrink-0 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-6 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-white" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    Stay Updated, Always.
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-500 mt-0.5">
                    Get the latest articles, videos, workshops and platform
                    updates.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-2 sm:gap-0"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold text-sm rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:from-blue-700 hover:to-purple-600 transition-all whitespace-nowrap shadow-[0_2px_8px_rgba(37,99,235,0.15)]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Strip (kept low, right above the copyright line) ── */}
      <div className="w-full bg-gray-50 border-t border-gray-200">
        <div className="w-full mx-auto px-5 md:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y divide-slate-200 sm:divide-y-0 lg:divide-x">
            {trustFeatures.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-4 sm:py-0 sm:px-4 first:pl-0 first:pt-0 sm:first:pt-0"
              >
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

      {/* ── Bottom Bar — copyright only now, no more black background ── */}
      <div className="w-full bg-gray-50 border-t border-gray-200">
        <div className="w-full mx-auto px-5 md:px-8 py-5">
          <p className="text-[13px] text-gray-500 text-center">
            &copy; 2026 All Rights Reserved. | Powered by IREED MEDIA
          </p>
        </div>
      </div>
    </footer>
  );
}
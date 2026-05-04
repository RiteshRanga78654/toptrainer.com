

"use client";

import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const navItems = [
    { name: "Find Trainers", link: "/find-trainer" },
    { name: " Workshops", link: "/workshops" },
    
  { name: "Industry", link: "/Industry" },
  { name: "Department", link: "/department" },
  { name: "Competency", link: "/competency" },
 { name: "Articles", link: "/articles" },

  ];

  return (
    <>
      {/* ━━ STICKY WRAPPER ━━ */}
      <div className="sticky top-0 left-0 right-0 z-[100] relative">

        {/* 🔥 CENTER BLUR ONLY */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <div className="max-w-[1290px] mx-auto h-[50px] backdrop-blur-lg bg-white/30 rounded-2xl"></div>
        </div>

        {/* CONTENT */}
        <div className="relative px-2 md:px-4 py-2">

          {/* ━━ INNER NAV ━━ */}
          <div className="w-full md:max-w-[1290px] md:mx-auto flex items-center justify-between px-4 md:px-5 py-3
          bg-white/80 backdrop-blur-xl border border-white/70 rounded-xl md:rounded-2xl
          shadow-[0_4px_24px_rgba(37,99,235,0.08)]
          hover:shadow-[0_8px_40px_rgba(37,99,235,0.13)]
          transition-all duration-300">

            {/* Logo */}
            <h1 className="text-lg sm:text-xl font-bold leading-none">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Top
              </span>{" "}
              <span className="text-orange-400">Trainer</span>
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.link}>
                  <span
                    className="relative text-[13.5px] font-medium text-slate-600 px-3 py-1.5 rounded-lg cursor-pointer
                    hover:text-blue-700 hover:bg-blue-50 transition-all duration-200
                    after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1
                    after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-purple-500
                    after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-3">

              {/* User */}
             <Link href="/join-as-trainer">
  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full pl-3 pr-3 py-2 cursor-pointer hover:bg-blue-100 transition">
    

    <div>
      <p className="text-[13.5px] font-semibold text-slate-800">
        Join as Trainer
      </p>
    </div>

  </div>
</Link>

              {/* Login */}
             <Link
  href="/login"
  className="px-4 py-1.5 text-[13.5px] font-medium border border-blue-300 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition inline-block text-center"
>
  Login
</Link>

             
            </div>

            {/* Mobile Button */}
            <button
              className="flex md:hidden flex-col gap-[5px]"
              onClick={() => setOpen(!open)}
            >
              <span className="w-5 h-[2px] bg-gradient-to-r from-blue-600 to-purple-500 rounded"></span>
              <span className="w-5 h-[2px] bg-gradient-to-r from-blue-600 to-purple-500 rounded"></span>
              <span className="w-5 h-[2px] bg-gradient-to-r from-blue-600 to-purple-500 rounded"></span>
            </button>
          </div>
        </div>
      </div>

      {/* ━━ MOBILE MENU ━━ */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-lg px-5 py-8 overflow-y-auto">

          {/* Top */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Top
              </span>{" "}
              <span className="text-orange-400">Trainer</span>
            </h1>

            <button onClick={() => setOpen(false)}>
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Links */}
          <nav className="mb-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
              >
                <span className="block text-[16px] font-medium text-slate-700 py-3 border-b border-blue-100 hover:text-blue-600 transition">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          {/* <div className="flex gap-3">
           <Link
  href="/login"
  className="flex-1 block py-2 border border-blue-300 rounded-lg text-blue-600 bg-blue-50 text-center"
>
  Login
</Link>
            <button className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-800">
              Sign Up
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Navbar;
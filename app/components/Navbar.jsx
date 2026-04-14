"use client";

import React from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";

const Navbar = ({ open, setOpen, navItems }) => {
  return (
    <>
      {/* ✅ FIX: sticky top-0 (not top-3) so it sticks flush to top without gap */}
      <div className="sticky top-3 z-50 w-full bg-white">

        <div
          className="flex border border-gray-200 justify-between items-center 
          px-4 sm:px-6 md:px-8 py-3 shadow bg-white 
          mx-2 sm:mx-8 md:mx-10 lg:mx-20 
          my-3 rounded-lg"
        >
          {/* Logo */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 leading-none">
            Trainer <span className="text-orange-400">Hub</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {/* Nav Items */}
            <div className="flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <span
                  key={item}
                  className="relative cursor-pointer group hover:text-blue-600 transition text-sm lg:text-base"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </span>
              ))}
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <Image
                src="/Images/hr.png"
                alt="HR"
                width={40}
                height={40}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
              />
              <div className="text-xs sm:text-sm">
                <p className="font-medium">HR Manager</p>
                <p className="text-gray-500 text-xs">IREED</p>
              </div>
            </div>

            {/* Button */}
            <button
              className="flex items-center gap-2 
              border border-gray-300
              px-2 sm:px-3 lg:px-4
              py-2 
              rounded-lg 
              hover:bg-blue-500 hover:text-white hover:border-blue-500 transition 
              text-xs sm:text-sm lg:text-base 
              whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="hidden sm:inline">Bulk Inquiry</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button className="border p-2 rounded-lg">
              <ShoppingCart size={18} />
            </button>
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-white z-50 px-4 py-6 space-y-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="mt-4 text-lg font-bold text-blue-600">TrainerHub</h1>
            <button onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {navItems.map((item) => (
              <div
                key={item}
                className="cursor-pointer hover:text-blue-600 text-base sm:text-lg"
              >
                {item}
              </div>
            ))}
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 border-2 px-4 py-2 rounded-lg">
            <ShoppingCart size={18} />
            Bulk Inquiry
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
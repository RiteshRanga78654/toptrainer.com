"use client";

import React from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";

const Navbar = ({ open, setOpen, navItems, hr }) => {
  return (
    <>
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-2 shadow bg-white">
        {/* Logo */}
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-blue-600">
          TrainerHub
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
          <div className="flex items-center gap-3 border-l pl-4">
            <Image
              src={hr}
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
          <button className="flex items-center gap-2 border px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm">
            <ShoppingCart size={18} />
            Bulk Inquiry
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

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed inset-0 bg-white z-50 px-4 py-6 space-y-6 overflow-y-auto">
          {/* Top Bar with Logo + Close Button */}
          <div className="flex justify-between items-center">
            <h1 className="mt-4 text-lg font-bold text-blue-600">
              TrainerHub
            </h1>

            <button onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Nav Items */}
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

          {/* Button */}
          <button className="mt-6 w-full flex items-center justify-center gap-2 border px-4 py-2 rounded-lg">
            <ShoppingCart size={18} />
            Bulk Inquiry
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
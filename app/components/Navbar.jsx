"use client";

import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.token);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && !!(user || token);

  const navItems = [
    { name: "Find Trainers", link: "/find-trainer" },
    { name: "Workshops", link: "/workshops" },
    { name: "Industry", link: "/Industry" },
    { name: "Department", link: "/department" },
    { name: "Competency", link: "/competency" },
    { name: "Articles", link: "/articles" },
  ];

  const profileLink =
    user?.role ==="admin" ? "/admin" : "trainer" ? "/trainer/profile" : "/user/profile";

  const displayName =
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "User";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-[100] relative">
        <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <div className="max-w-[1290px] mx-auto h-[50px] backdrop-blur-lg bg-white/30 rounded-2xl"></div>
        </div>

        <div className="relative px-2 md:px-4 py-2">
          <div
            className="w-full md:max-w-[1290px] md:mx-auto flex items-center justify-between px-4 md:px-5 py-3
            bg-white/80 backdrop-blur-xl border border-white/70 rounded-xl md:rounded-2xl
            shadow-[0_4px_24px_rgba(37,99,235,0.08)]
            hover:shadow-[0_8px_40px_rgba(37,99,235,0.13)]
            transition-all duration-300"
          >
            <h1 className="flex items-center gap-2 text-lg sm:text-xl font-bold leading-none -ml-2">
              <Image
                src="/logo.png"
                alt="TopTrainer Logo"
                width={32}
                height={32}
                className="object-contain"
              />

              <Link href="/">
                <span className="cursor-pointer">
                 <Image
                src="/topTrainer-logo.png"
                alt="TopTrainer Logo"
               width={70}
                height={32}
              />
                </span>
              </Link>
            </h1>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.link}>
                  <span
                    className="block relative text-[13.5px] font-medium text-slate-600 px-3 py-1.5 rounded-lg cursor-pointer
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

            <div className="hidden md:flex items-center gap-3">
              {!mounted ? (
                <div className="px-4 py-1.5 text-[13.5px] font-medium border border-blue-300 rounded-lg text-blue-600 bg-blue-50">
                  Register / Login
                </div>
              ) : isLoggedIn ? (
                <Link
                  href={profileLink}
                  className="w-10 h-10 rounded-full overflow-hidden border border-blue-300 bg-blue-50 hover:bg-blue-100 transition flex items-center justify-center"
                  title={displayName}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-blue-700">
                      {initial}
                    </span>
                  )}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-4 py-1.5 text-[13.5px] font-medium border border-blue-300 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition inline-block text-center"
                >
                  Register / Login
                </Link>
              )}
            </div>

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

      {open && (
        <div className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-lg px-5 py-8 overflow-y-auto">
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

          {!mounted ? (
            <div className="flex gap-3">
              <div className="flex-1 block py-2 border border-blue-300 rounded-lg text-blue-600 bg-blue-50 text-center">
                Register / Login
              </div>
              <Link
                href="/join-as-trainer"
                className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-800 text-center"
                onClick={() => setOpen(false)}
              >
                Join as Trainer
              </Link>
            </div>
          ) : isLoggedIn ? (
            <Link href={profileLink} onClick={() => setOpen(false)}>
              <div className="w-full mb-4 py-2.5 px-4 flex items-center justify-center gap-3 text-center font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-300 bg-white flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-blue-700">
                      {initial}
                    </span>
                  )}
                </div>
                My Profile
              </div>
            </Link>
          ) : (
            <>
              <Link href="/join-as-trainer" onClick={() => setOpen(false)}>
                <div className="w-full mb-4 py-2.5 text-center font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition">
                  Join as Trainer
                </div>
              </Link>

              <div className="flex gap-3">
                <Link
                  href="/auth/login"
                  className="flex-1 block py-2 border border-blue-300 rounded-lg text-blue-600 bg-blue-50 text-center"
                  onClick={() => setOpen(false)}
                >
                  Register / Login
                </Link>
                <Link
                  href="/join-as-trainer"
                  className="flex-1 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-800 text-center"
                  onClick={() => setOpen(false)}
                >
                  Join as Trainer
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
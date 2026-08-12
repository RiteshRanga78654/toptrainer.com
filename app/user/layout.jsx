"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  LayoutGrid,
  Star,
  FileText,
  Settings,
  HelpCircle,
  ChevronDown,
  Bookmark,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const profileMenuRef = useRef(null);

  const navItems = [
    { name: "Dashboard", href: "/user/dashboard", icon: LayoutGrid },
    { name: "Shortlisted", href: "/user/shortlisted", icon: Star },
    { name: "My Requirements", href: "/user/my-requirements", icon: FileText },
    {name: "My Reviews", href: "/user/my-reviews", icon: Star},
    { name: "Settings", href: "/user/settings", icon: Settings },
    { name: "Help & Support", href: "/user/help", icon: HelpCircle },
  ];

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")?.[0] ||
    "User";
const profileImage =
  user?.profilePhoto?.url || user?.avatar ||
    user?.photo ||
    user?.image || "";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      setProfileMenuOpen(false);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`w-[260px] bg-white border-r border-slate-100 flex flex-col justify-between fixed h-full z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-6 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="TopTrainer Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                TopTrainer
              </span>
            </div>

            <button
              className="lg:hidden text-slate-500 hover:text-slate-900"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <Link
            className="text-indigo-700 bg-white p-4 m-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 block"
            href="/find-trainer"
          >
            Explore Trainers
          </Link>

          <div
            ref={profileMenuRef}
            className="relative p-3 m-4 border border-slate-100 rounded-2xl bg-white shadow-sm hover:border-slate-200 transition-colors"
          >
            <button
              type="button"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center border border-indigo-100 shrink-0">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-indigo-600" />
                  )}
                </div>

                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-sm font-semibold text-slate-900 truncate">
                    {displayName}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate">
                    My Account
                  </span>
                </div>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  profileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute left-0 right-0 bottom-[calc(100%+10px)] bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    router.push("/user/profile");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 w-full lg:ml-[260px] p-4 sm:p-8 max-w-full lg:max-w-[1400px]">
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {pathname.startsWith("/user/shortlisted") ? (
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 flex items-center gap-2">
                  Shortlisted Profiles
                  <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 stroke-[1.5]" />
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 sm:mt-1.5">
                  View and manage all your saved trainer profiles and workshops.
                  <span className="text-indigo-600 font-medium ml-1">
                    6 trainers, 3 workshops saved.
                  </span>
                </p>
              </div>
            ) : pathname.startsWith("/user/settings") ? (
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                  Account Settings
                </h1>
              </div>
            ) : pathname.startsWith("/user/profile") ? (
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                  User Profile
                </h1>
              </div>
            ) : pathname.startsWith("/user/help") ? (
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                  Help & Support
                </h1>
              </div>
            ) : pathname.startsWith("/user/my-requirements") ? (
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                  My Requirements
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 sm:mt-1.5">
                  Manage your training needs and track recommendations.
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 flex items-center gap-2">
                  Welcome back, {displayName}!
                  <span className="text-xl sm:text-2xl">👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Discover top trainers and build meaningful connections.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-2 md:mt-0 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-[320px] pl-11 pr-4 py-2.5 rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm shadow-sm placeholder:text-slate-400"
              />
            </div>

            <button className="relative p-2.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm flex-shrink-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
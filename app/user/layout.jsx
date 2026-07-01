"use client";
import React, { useState } from 'react';
import { 
    Search, Bell, LayoutGrid, Users, Star, FileText, Settings, HelpCircle, 
    GraduationCap, ChevronDown, Bookmark, Menu, X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/user/dashboard', icon: LayoutGrid },
    { name: 'Explore Trainers', href: '/user/explore-trainer', icon: Users },
    { name: 'Shortlisted', href: '/user/shortlisted', icon: Star },
    { name: 'My Requirements', href: '/user/my-requirements', icon: FileText },
    { name: 'Settings', href: '/user/settings', icon: Settings },
    { name: 'Help & Support', href: '/user/help', icon: HelpCircle },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[260px] bg-white border-r border-slate-100 flex flex-col justify-between fixed h-full z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="p-6 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-white w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">TopTrainer</span>
            </div>
            <button className="lg:hidden text-slate-500 hover:text-slate-900" onClick={() => setSidebarOpen(false)}>
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
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User Profile */}
        <div className="p-3 m-4 border border-slate-100 rounded-2xl flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-slate-200 transition-colors">
            <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?u=aris" alt="User" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">Aris Lee</span>
                    <span className="text-[11px] text-indigo-600 font-medium">View Profile</span>
                </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full lg:ml-[260px] p-4 sm:p-8 max-w-full lg:max-w-[1400px]">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
            <div className="flex items-center gap-4">
                <button 
                    className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                {pathname.startsWith('/user/shortlisted') ? (
                    <div>
                        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 flex items-center gap-2">
                            Shortlisted Profiles <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 stroke-[1.5]" />
                        </h1>
                        <p className="text-xs sm:text-[13px] text-slate-500 mt-1 sm:mt-1.5">
                            View and manage all your saved trainer profiles and workshops. <span className="text-indigo-600 font-medium ml-1">6 trainers, 3 workshops saved.</span>
                        </p>
                    </div>
                ) : pathname.startsWith('/user/settings') ? (
                    <div>
                        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                            Account Settings
                        </h1>
                    </div>
                ) : pathname.startsWith('/user/profile') ? (
                    <div>
                        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                            User Profile
                        </h1>
                    </div>
                ) : pathname.startsWith('/user/help') ? (
                    <div>
                        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900">
                            Help & Support
                        </h1>
                    </div>
                ) : pathname.startsWith('/user/my-requirements') ? (
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
                            Welcome back, Aris! <span className="text-xl sm:text-2xl">👋</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">Discover top trainers and build meaningful connections.</p>
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

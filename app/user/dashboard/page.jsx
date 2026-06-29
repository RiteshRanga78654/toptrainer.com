"use client";
import React from 'react';
import { 
    Search, Bell, LayoutGrid, Users, Star, FileText, Settings, HelpCircle, 
    GraduationCap, ChevronRight, Bookmark, MapPin, IndianRupee,
    Monitor, Target, ChevronDown, PenTool
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-slate-100 flex flex-col justify-between fixed h-full z-10">
        <div>
          <div className="p-6 flex items-center gap-2 mb-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">TrainConnect</span>
          </div>
          <nav className="px-4 space-y-1">
            <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium">
              <LayoutGrid className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Users className="w-5 h-5" />
              Explore Trainers
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Star className="w-5 h-5" />
              Shortlisted
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <FileText className="w-5 h-5" />
              My Requirements
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-medium transition-colors">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </Link>
          </nav>
        </div>
        
        {/* User Profile */}
        <div className="p-3 m-4 border border-slate-100 rounded-2xl flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-slate-200 transition-colors">
            <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?u=priya" alt="User" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">Priya Sharma</span>
                    <span className="text-[11px] text-indigo-600 font-medium">View Profile</span>
                </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px] p-8 max-w-[1400px]">
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-[28px] font-bold text-slate-900 flex items-center gap-2">
                    Welcome back, Priya! <span className="text-2xl">👋</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">Discover top trainers and build meaningful connections.</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search trainers, skills, topics..." 
                        className="w-[320px] pl-11 pr-4 py-2.5 rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm shadow-sm placeholder:text-slate-400"
                    />
                </div>
                <button className="relative p-2.5 rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>

        {/* Top 3 Cards Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
            {/* New Trainers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[280px]">
                <div>
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="font-bold text-slate-900">New Trainers Added</h2>
                        <span className="text-xs text-slate-500 font-medium">12 new trainers this week</span>
                    </div>
                    <div className="flex -space-x-3 mb-6 px-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img key={i} src={`https://i.pravatar.cc/150?u=trainer${i}`} alt="Trainer" className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-sm relative z-0 hover:z-10 transition-transform hover:scale-110" />
                        ))}
                        <div className="w-14 h-14 rounded-full border-2 border-white bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold relative z-0">
                            +7
                        </div>
                    </div>
                </div>
                <Link href="#" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                    View all new trainers <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* New Articles */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[280px]">
                <div>
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="font-bold text-slate-900">New Articles Published</h2>
                        <span className="text-xs text-slate-500 font-medium">8 new articles this week</span>
                    </div>
                    <div className="space-y-4 mb-4">
                        <div className="flex gap-4 items-center">
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop" alt="Article" className="w-14 h-12 rounded-lg object-cover" />
                            <h3 className="text-sm font-bold text-slate-800 leading-tight">5 Leadership Lessons Every Manager Should Know</h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&h=150&fit=crop" alt="Article" className="w-14 h-12 rounded-lg object-cover" />
                            <h3 className="text-sm font-bold text-slate-800 leading-tight">How to Improve Your Communication Skills</h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&h=150&fit=crop" alt="Article" className="w-14 h-12 rounded-lg object-cover" />
                            <h3 className="text-sm font-bold text-slate-800 leading-tight">Building a High Performance Team</h3>
                        </div>
                    </div>
                </div>
                <Link href="#" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                    View all articles <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Upcoming Workshops */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[280px]">
                <div>
                    <h2 className="font-bold text-slate-900 mb-6">Upcoming Workshops</h2>
                    <div className="space-y-5 mb-4">
                        {[
                            { date: '24', month: 'MAY', title: 'Leadership Mastery Workshop', author: 'Amit Verma', time: '10:00 AM - 01:00 PM | Online' },
                            { date: '30', month: 'MAY', title: 'Effective Communication Skills', author: 'Neha Kapoor', time: '04:00 PM - 06:00 PM | Online' },
                            { date: '06', month: 'JUN', title: 'Emotional Intelligence at Work', author: 'Sneha Iyer', time: '11:00 AM - 01:00 PM | Online' },
                        ].map((w, i) => (
                            <div key={i} className="flex gap-5 items-center">
                                <div className="flex flex-col items-center justify-center text-indigo-600 w-10">
                                    <span className="text-[22px] font-bold leading-none">{w.date}</span>
                                    <span className="text-[10px] font-bold tracking-wider">{w.month}</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">{w.title}</h3>
                                    <p className="text-[11px] text-slate-500 mb-0.5 mt-0.5">by {w.author}</p>
                                    <p className="text-[10px] text-slate-400">{w.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Link href="#" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all w-fit mt-2">
                    View all workshops <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 flex flex-col gap-6">
                {/* Post your requirement */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-1">Post your Requirement</h2>
                            <p className="text-[13px] text-slate-500">Let us know what you need, and we'll suggest the best trainers for you.</p>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors shadow-sm">
                            Create New Requirement
                        </button>
                    </div>
                    <div className="flex justify-between items-start pt-5 border-t border-slate-100">
                        <div className="flex flex-col gap-1.5 w-1/5">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]">
                                <PenTool className="w-[18px] h-[18px] text-slate-400" /> Define Your Need
                            </div>
                            <span className="text-[11px] text-slate-400 pl-7">Specify your training goals</span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-1/5">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]">
                                <Monitor className="w-[18px] h-[18px] text-slate-400" /> Preferred Mode
                            </div>
                            <span className="text-[11px] text-slate-400 pl-7">Online, In-person or Both</span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-1/5">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]">
                                <MapPin className="w-[18px] h-[18px] text-slate-400" /> Location
                            </div>
                            <span className="text-[11px] text-slate-400 pl-7">Add preferred locations</span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-1/5">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]">
                                <Star className="w-[18px] h-[18px] text-slate-400" /> Experience Level
                            </div>
                            <span className="text-[11px] text-slate-400 pl-7">Select trainer experience</span>
                        </div>
                        <div className="flex flex-col gap-1.5 w-1/5">
                            <div className="flex items-center gap-2 text-slate-700 font-semibold text-[13px]">
                                <IndianRupee className="w-[18px] h-[18px] text-slate-400" /> Budget Range
                            </div>
                            <span className="text-[11px] text-slate-400 pl-7">Set your budget</span>
                        </div>
                    </div>
                </div>

                {/* Your Requirement Profile */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-8 flex-1">
                    <div className="w-[200px] flex-shrink-0 flex flex-col justify-center border-r border-slate-100 pr-6">
                        <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h2 className="text-[15px] font-bold text-slate-900 mb-2">Your Requirement Profile</h2>
                        <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                            Helping us understand your needs helps us suggest the most relevant trainers.
                        </p>
                        <Link href="#" className="text-indigo-600 text-xs font-semibold hover:underline">
                            View / Edit Profile
                        </Link>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-[1fr_1.2fr] gap-x-6 gap-y-5 content-center py-2">
                        {/* Col 1 */}
                        <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="text-[11px] text-slate-500 block mb-0.5">Training Need</span>
                                <span className="text-[13px] font-semibold text-slate-800">Leadership Development</span>
                            </div>
                        </div>
                        
                        {/* Col 2 - Spans rows */}
                        <div className="row-span-3">
                            <span className="text-[13px] font-bold text-slate-900 block mb-3">Skills of Interest</span>
                            <div className="flex flex-wrap gap-2">
                                {['Leadership', 'Communication', 'Team Building', 'Emotional Intelligence', 'Change Management'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-semibold">
                                        {skill}
                                    </span>
                                ))}
                                <span className="text-indigo-600 text-[11px] font-bold self-center px-1">
                                    +2 more
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Monitor className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="text-[11px] text-slate-500 block mb-0.5">Preferred Mode</span>
                                <span className="text-[13px] font-semibold text-slate-800">Online, In-person</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="text-[11px] text-slate-500 block mb-0.5">Location</span>
                                <span className="text-[13px] font-semibold text-slate-800">Mumbai, Bangalore, Delhi</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Star className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="text-[11px] text-slate-500 block mb-0.5">Experience Level</span>
                                <span className="text-[13px] font-semibold text-slate-800">5+ Years</span>
                            </div>
                        </div>
                        
                        {/* Empty cell to push budget range under skills if needed, or place in next col */}
                        <div className="flex items-start gap-3 col-start-1">
                            <IndianRupee className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                                <span className="text-[11px] text-slate-500 block mb-0.5">Budget Range</span>
                                <span className="text-[13px] font-semibold text-slate-800">₹25,000 - ₹1,00,000</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Recommended for You */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
                <div>
                    <h2 className="font-bold text-slate-900 text-[15px]">Recommended for You</h2>
                    <p className="text-[12px] text-slate-500 mb-6 mt-0.5">Based on your requirements</p>
                    
                    <div className="space-y-5">
                        {[
                            { name: 'Sanjay Nair', role: 'Project Management Expert', exp: '9+ Years Exp.', rating: '4.7 (86)', img: '6' },
                            { name: 'Pooja Desai', role: 'HR & People Development', exp: '10+ Years Exp.', rating: '4.6 (65)', img: '7' },
                            { name: 'Karan Malhotra', role: 'Digital Marketing Trainer', exp: '7+ Years Exp.', rating: '4.5 (52)', img: '8' },
                        ].map((t, i) => (
                            <div key={i} className="flex justify-between items-start group cursor-pointer">
                                <div className="flex gap-3">
                                    <img src={`https://i.pravatar.cc/150?u=rec${t.img}`} alt={t.name} className="w-11 h-11 rounded-lg object-cover" />
                                    <div>
                                        <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t.name}</h3>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{t.role}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{t.exp}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-[11px] font-bold text-slate-700">{t.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-300 hover:text-indigo-600 transition-colors pt-1">
                                    <Bookmark className="w-[18px] h-[18px]" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                    <Link href="#" className="text-indigo-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                        View all recommendations <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>

        {/* Recent Articles */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-5 px-1">
                <h2 className="font-bold text-slate-900 text-lg">Recent Articles from Trainers</h2>
                <Link href="#" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View all <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { title: '5 Leadership Lessons Every Manager Should Know', author: 'Rohit Mehta', date: 'May 12, 2024', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop' },
                    { title: 'How to Improve Your Communication Skills', author: 'Neha Kapoor', date: 'May 10, 2024', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=300&h=200&fit=crop' },
                    { title: 'Building a High Performance Team', author: 'Amit Verma', date: 'May 8, 2024', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop' }
                ].map((a, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center hover:shadow-md transition-shadow cursor-pointer">
                        <img src={a.img} alt="Article" className="w-[100px] h-[72px] rounded-xl object-cover" />
                        <div>
                            <h3 className="text-[13px] font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2">{a.title}</h3>
                            <p className="text-[11px] text-slate-500">{a.author}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{a.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
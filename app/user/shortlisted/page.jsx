"use client";
import React from 'react';
import { 
    Search, Briefcase, Network, Target, CircleDollarSign, Users, 
    ChevronDown, SlidersHorizontal, Heart, Star, BadgeCheck, 
    ArrowRight, ChevronLeft, ChevronRight, Bookmark, User
} from 'lucide-react';
import Link from 'next/link';

export default function ShortlistedProfiles() {
  const trainers = [
    { name: 'Alice Chen', role: 'Senior PM & Leadership Coach', rating: 4.9, reviews: 62, tags: ['Leadership', 'Agile PM', 'Strategy'], verified: true },
    { name: 'Liam Chen', role: 'Senior PM & Leadership Coach', rating: 4.7, reviews: 62, tags: ['Leadership', 'Agile PM', 'Strategy'], verified: true },
    { name: 'Maha Eshonta', role: 'Senior PM & Leadership Coach', rating: 4.7, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], verified: false },
    { name: 'Liam Choois', role: 'Senior PM & Leadership Coach', rating: 4.6, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], verified: true },
    { name: 'Chloe Dubois', role: 'Digital Marketing Trainer', rating: 4.5, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], verified: true },
    { name: 'Seraphina Quinn', role: 'Digital Marketing Trainer', rating: 4.5, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], verified: true },
  ];

  return (
    <div className="pb-10">
      {/* Big Search Bar */}
      <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
              type="text" 
              placeholder="Search shortlisted profiles..." 
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 text-[15px] shadow-sm placeholder:text-slate-400"
          />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex gap-4 flex-1">
          <button className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" /> Industry
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          <button className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-slate-400" /> Department/Domain
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-400" /> Competencies/Skills
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-4 h-4 text-slate-400" /> Price Range
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" /> Mode (Online/Offline)
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-semibold text-slate-700">
          Sort by <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        {/* Left Column: Trainer Cards (Span 3 cols) */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {trainers.map((trainer, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full relative">
              
              {/* Bookmark Banner */}
              <div className="absolute top-0 right-4 w-6 h-9 bg-blue-600 z-10 flex items-center justify-center rounded-b-md shadow-sm">
                 <Bookmark className="w-3.5 h-3.5 text-white fill-white" />
              </div>

              <div className="relative h-[200px] w-full bg-slate-100 flex items-center justify-center text-slate-300">
                <User className="w-24 h-24" />
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[17px] font-bold text-slate-900 leading-none">{trainer.name}</h3>
                  {trainer.verified ? (
                      <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                  ) : (
                      <span className="px-1.5 py-0.5 border border-slate-200 text-[10px] font-semibold text-slate-500 rounded-full">Unverified</span>
                  )}
                </div>
                <p className="text-[13px] text-slate-600 mb-2">{trainer.role}</p>
                
                <div className="flex items-center gap-1.5 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-slate-700">{trainer.rating}</span>
                  <span className="text-xs text-slate-500">({trainer.reviews} reviews)</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6 flex-1 content-start">
                  {trainer.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-full text-[11px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link href="#" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
                  View Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="col-span-3 flex items-center justify-center gap-4 mt-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-sm">
                1
            </button>
            <p className="text-sm text-slate-600 font-medium px-2">of 1</p>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Saved Workshops */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[17px] font-bold text-slate-900">Saved Workshops</h2>
                <Bookmark className="w-4 h-4 text-blue-600" />
            </div>

            <div className="flex flex-col gap-6 flex-1">
                {/* Workshop 1 */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex-shrink-0 flex items-center justify-center relative">
                        <span className="text-indigo-600 font-bold text-[11px] leading-tight text-center px-1">AI<br/>Ethics</span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[10px] text-slate-500 overflow-hidden">
                            <User className="w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-1 mt-0.5">
                        <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Advanced AI Ethics</h3>
                        <p className="text-[11px] text-slate-500 mt-1">15 Jul • Online</p>
                    </div>
                    <button className="text-blue-600 mt-1">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>

                {/* Workshop 2 */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex-shrink-0 flex items-center justify-center relative">
                        <span className="text-teal-700 font-bold text-[8px] leading-tight text-center px-1">Negotiation<br/>Skills<br/>for Leaders</span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[10px] text-slate-500 overflow-hidden">
                            <User className="w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-1 mt-0.5">
                        <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Negotiation Skills for Leaders</h3>
                        <p className="text-[11px] text-slate-500 mt-1">20 Jul • In-person (London)</p>
                    </div>
                    <button className="text-blue-600 mt-1">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>

                {/* Workshop 3 */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex-shrink-0 flex items-center justify-center relative">
                        <span className="text-blue-700 font-bold text-[8px] leading-tight text-center px-1">Product<br/>Strategy<br/>Masterclass</span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[10px] text-slate-500 overflow-hidden">
                            <User className="w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex-1 mt-0.5">
                        <h3 className="text-[13px] font-bold text-slate-900 leading-tight">Product Strategy Masterclass</h3>
                        <p className="text-[11px] text-slate-500 mt-1">25 Jul • Online</p>
                    </div>
                    <button className="text-blue-600 mt-1">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex justify-center">
                <Link href="#" className="text-blue-600 text-[13px] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View all saved workshops <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

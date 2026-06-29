"use client";
import React from 'react';
import { 
    Search, Briefcase, Network, Target, CircleDollarSign, Users, 
    ChevronDown, SlidersHorizontal, Heart, Star, BadgeCheck, 
    ArrowRight, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import Link from 'next/link';

export default function ExploreTrainers() {
  const trainers = [
    { name: 'Alice Chen', role: 'Senior PM & Leadership Coach', rating: 4.9, reviews: 62, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: true, img: '1' },
    { name: 'Liam Chen', role: 'Senior PM & Leadership Coach', rating: 4.7, reviews: 62, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '2' },
    { name: 'Liam Chen', role: 'HR & People Development', rating: 4.6, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '3' },
    { name: 'Chloe Dubois', role: 'Digital Marketing Trainer', rating: 4.5, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '4' },
    { name: 'Alice Chen', role: 'Senior PM & Leadership Coach', rating: 4.9, reviews: 32, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '5' },
    { name: 'Maha Eshonta', role: 'Senior PM & Leadership Coach', rating: 4.7, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '6' },
    { name: 'Liam Choois', role: 'Senior PM & Leadership Coach', rating: 4.6, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '7' },
    { name: 'Chloe Dubois', role: 'Digital Marketing Trainer', rating: 4.5, reviews: 52, tags: ['Leadership', 'Agile PM', 'Strategy'], topRated: false, img: '8' },
  ];

  return (
    <div className="pb-10">
      {/* Big Search Bar */}
      <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
              type="text" 
              placeholder="Search by name, expertise, company..." 
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
          Sort by <SlidersHorizontal className="w-4 h-4 text-slate-400 ml-1" />
        </button>
      </div>

      {/* Trainer Cards Grid */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {trainers.map((trainer, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="relative h-[200px] w-full bg-slate-100 flex items-center justify-center text-slate-300">
              <User className="w-24 h-24" />
              {trainer.topRated && (
                <div className="absolute top-3 left-3 bg-emerald-100/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700 tracking-wide">Top Rated</span>
                </div>
              )}
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors text-white">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-[17px] font-bold text-slate-900 leading-none">{trainer.name}</h3>
                <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
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
              
              <Link href="#" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
                View Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 font-semibold transition-colors">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 font-semibold transition-colors">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 font-semibold transition-colors">
            4
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 font-semibold transition-colors">
            5
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors shadow-sm ml-2">
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button className="ml-4 flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-semibold text-slate-700">
            16 per page <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <p className="text-sm text-slate-500 font-medium">1 of 140</p>
      </div>
    </div>
  );
}

"use client";
import React from 'react';
import { 
    User, ShieldCheck, Bell, CreditCard, SlidersHorizontal, Save, ChevronDown
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="pb-10">
      
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 mb-8 px-1 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button className="flex items-center gap-2 pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold text-[15px] flex-shrink-0">
            <User className="w-4 h-4" /> General
        </button>
        <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors flex-shrink-0">
            <ShieldCheck className="w-4 h-4" /> Security
        </button>
        <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors flex-shrink-0">
            <Bell className="w-4 h-4" /> Notifications
        </button>
        <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors flex-shrink-0">
            <CreditCard className="w-4 h-4" /> Billing
        </button>
        <button className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-slate-600 hover:text-slate-900 font-medium text-[15px] transition-colors flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4" /> Preferences
        </button>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <User className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
                    <p className="text-[13px] text-slate-500 mt-0.5">Manage your personal information and contact details.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-2">Full Name</label>
                    <input 
                        type="text" 
                        defaultValue="Aris Lee" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-slate-900"
                    />
                </div>
                <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-2">Display Name (Optional)</label>
                    <input 
                        type="text" 
                        placeholder="Enter display name" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-slate-900 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-[13px] font-medium text-slate-600 mb-2">Email Address</label>
                <input 
                    type="email" 
                    defaultValue="aris.lee@learner.com" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-slate-900"
                />
            </div>

            <div>
                <label className="block text-[13px] font-medium text-slate-600 mb-2">Phone Number</label>
                <input 
                    type="text" 
                    defaultValue="+1 (555) 123-4567" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-slate-900"
                />
            </div>
        </div>

        {/* Account Preferences Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Account Preferences</h2>
                    <p className="text-[13px] text-slate-500 mt-0.5">Customize your account preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-2">Timezone</label>
                    <div className="relative">
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-slate-900 appearance-none bg-white">
                            <option>(GMT-05:00) Eastern Time</option>
                            <option>(GMT-08:00) Pacific Time</option>
                            <option>(GMT+00:00) London</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-[13px] font-medium text-slate-600 mb-2">Language Preference</label>
                    <div className="relative">
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm text-slate-900 appearance-none bg-white">
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button className="bg-[#1D4ED8] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}

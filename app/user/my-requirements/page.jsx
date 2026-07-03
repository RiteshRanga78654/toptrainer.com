"use client";
import React, { useState } from 'react';
import { 
    Users, MessageSquare, TrendingUp, CheckCircle, 
    MoreHorizontal, Tag, Monitor, Clock, 
    Lightbulb, FileText, ArrowRight, PlusCircle, User, 
    Search, HelpCircle, MessageCircle, UserCog, X
} from 'lucide-react';
import Link from 'next/link';

export default function MyRequirementsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const requirements = [
        {
            id: 1,
            title: "Leadership Development Program",
            description: "Looking for a comprehensive leadership training program for 35 mid-level managers.",
            category: "Leadership",
            format: "Online",
            formatIcon: Monitor,
            duration: "15-20 Hours",
            audience: "15-20 People",
            status: "Active",
            date: "May 12, 2024",
            icon: UserCog,
            iconColor: "text-indigo-600",
            iconBg: "bg-indigo-50"
        },
        {
            id: 2,
            title: "Communication Skills Training",
            description: "Need training to improve communication and interpersonal skills for our customer support team.",
            category: "Communication",
            format: "In-person",
            formatIcon: Users,
            duration: "8-12 Hours",
            audience: "20-25 People",
            status: "Active",
            date: "May 10, 2024",
            icon: MessageSquare,
            iconColor: "text-blue-500",
            iconBg: "bg-blue-50"
        },
        {
            id: 3,
            title: "Data Analytics Workshop",
            description: "Hands-on workshop on data analytics tools and techniques for our analytics team.",
            category: "Data Analytics",
            format: "Online",
            formatIcon: Monitor,
            duration: "12-16 Hours",
            audience: "10-15 People",
            status: "Active",
            date: "May 8, 2024",
            icon: TrendingUp,
            iconColor: "text-amber-500",
            iconBg: "bg-amber-50"
        },
        {
            id: 4,
            title: "Project Management Essentials",
            description: "Basic project management training for new team leads and coordinators.",
            category: "Project Management",
            format: "In-person",
            formatIcon: Users,
            duration: "8 Hours",
            audience: "12-18 People",
            status: "Completed",
            date: "Apr 28, 2024",
            icon: CheckCircle,
            iconColor: "text-emerald-500",
            iconBg: "bg-emerald-50"
        }
    ];

    const tabs = [
        { name: 'All Requirements (4)', id: 'All' },
        { name: 'Active (3)', id: 'Active' },
        { name: 'Completed (1)', id: 'Completed' },
        { name: 'Drafts (0)', id: 'Drafts' }
    ];

    return (
        <div className="relative animate-in fade-in duration-500 pb-20">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Top Stats Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Your Requirements</h2>
                            <p className="text-sm text-slate-500 mt-1">You have 4 active requirements</p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200 whitespace-nowrap">
                            Create New Requirements
                        </button>
                    </div>

                    {/* Filters and Sort */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                        activeTab === tab.id 
                                            ? 'bg-indigo-50 text-indigo-600' 
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Sort by:</span>
                            <select className="text-sm font-medium text-slate-900 bg-transparent focus:outline-none cursor-pointer">
                                <option>Latest</option>
                                <option>Oldest</option>
                            </select>
                        </div>
                    </div>

                    {/* Requirements List */}
                    <div className="space-y-4">
                        {requirements.map((req) => {
                            const Icon = req.icon;
                            const FormatIcon = req.formatIcon;
                            
                            return (
                                <div key={req.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col sm:flex-row gap-6 relative">
                                    
                                    {/* Icon Box */}
                                    <div className="flex-shrink-0 hidden sm:block">
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${req.iconBg}`}>
                                            <Icon className={`w-8 h-8 ${req.iconColor}`} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                                            <div className="flex items-center gap-4">
                                                {/* Mobile Icon Box */}
                                                <div className="flex-shrink-0 sm:hidden">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${req.iconBg}`}>
                                                        <Icon className={`w-6 h-6 ${req.iconColor}`} />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {req.title}
                                                </h3>
                                            </div>
                                            
                                            {/* Status and Actions (Desktop) */}
                                            <div className="hidden sm:flex flex-col items-end gap-2">
                                                <div className="flex items-center gap-3">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                                                        req.status === 'Active' 
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'bg-blue-50 text-blue-700'
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-slate-500 mb-4 max-w-2xl leading-relaxed">
                                            {req.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Tag className="w-4 h-4 text-slate-400" />
                                                {req.category}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <FormatIcon className="w-4 h-4 text-slate-400" />
                                                {req.format}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                {req.duration}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4 text-slate-400" />
                                                {req.audience}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Mobile Status and Date at bottom */}
                                    <div className="sm:hidden mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-col gap-1 text-xs text-slate-400">
                                            <span>Created on</span>
                                            <span className="font-medium text-slate-700">{req.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                                                req.status === 'Active' 
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-blue-50 text-blue-700'
                                            }`}>
                                                {req.status}
                                            </span>
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Desktop Date Absolute positioned */}
                                    <div className="hidden sm:flex absolute right-6 bottom-6 flex-col items-end text-xs text-slate-400">
                                        <span>Created on</span>
                                        <span className="font-medium text-slate-700">{req.date}</span>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-6">
                    
                    {/* Tips Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <Lightbulb className="w-5 h-5 text-slate-900" />
                            <h3 className="text-lg font-bold text-slate-900">Tips for Better Requirements</h3>
                        </div>
                        
                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Lightbulb className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Be specific about your training goals</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Clear goals help us find the right trainers</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Users className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Include target audience details</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Mention team size, roles, and experience levels</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Specify your preferred format</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Online, in-person, or hybrid preferences</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FileText className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Add timeline and budget range</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">Helps trainers provide accurate proposals</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <Link href="#" className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1 transition-colors">
                                View detailed guide <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            {/* SVG for Lightning bolt, as lucide-react Zap isn't always ideal, but let's just use Zap or an SVG */}
                            <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
                        </div>

                        <div className="space-y-1 -mx-2">
                            <button onClick={() => setIsModalOpen(true)} className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group transition-colors focus:outline-none">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <PlusCircle className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">Create New Requirement</h4>
                                        <p className="text-xs text-slate-500">Tell us what training you need</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </button>

                            <Link href="#" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <User className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">Browse Trainers</h4>
                                        <p className="text-xs text-slate-500">Explore trainers and their expertise</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </Link>

                            <Link href="#" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <Search className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">View Recommendations</h4>
                                        <p className="text-xs text-slate-500">See personalized trainer matches</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Need Help Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-5 h-5 text-slate-900" />
                            <h3 className="text-lg font-bold text-slate-900">Need Help?</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                            Our support team is here to help you find the perfect training solution.
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-600 py-2.5 rounded-lg text-sm font-semibold transition-colors border border-indigo-100">
                            Contact Support <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>

            {/* Create Requirement Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                            <h3 className="text-lg font-bold text-slate-900">Create New Requirement</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="p-6 overflow-y-auto">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Requirement Title</label>
                                    <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" placeholder="e.g., Leadership Development Program" />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                        <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white">
                                            <option value="">Select Category</option>
                                            <option>Leadership</option>
                                            <option>Communication</option>
                                            <option>Data Analytics</option>
                                            <option>Project Management</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Format</label>
                                        <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white">
                                            <option value="">Select Format</option>
                                            <option>Online</option>
                                            <option>In-person</option>
                                            <option>Hybrid</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Audience Size</label>
                                        <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white">
                                            <option value="">Select Size</option>
                                            <option>1-10 People</option>
                                            <option>11-25 People</option>
                                            <option>26-50 People</option>
                                            <option>50+ People</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                                        <input type="text" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" placeholder="e.g., 10-15 Hours" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm" rows="4" placeholder="Describe your training needs in detail..."></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                Create Requirement
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center transition-transform hover:scale-105 z-50">
                <MessageCircle className="w-6 h-6" />
            </button>
            
        </div>
    );
}
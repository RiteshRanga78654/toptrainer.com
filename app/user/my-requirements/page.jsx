"use client";
import React, { useEffect, useState } from 'react';
import { 
    Users, MessageSquare, CheckCircle, 
    Tag, Monitor, 
    Lightbulb, FileText, ArrowRight, PlusCircle, User, 
    Search, HelpCircle, MessageCircle, X, Loader2,
    XCircle, Hourglass
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { requirementsAPI } from '../../lib/api';

const CATEGORIES = ["Leadership", "Communication", "Data Analysis", "Project Management", "Other"];
const FORMATS = ["Online", "Offline", "Hybrid"];
const AUDIENCE_OPTIONS = ["1-10 People", "11-25 People", "26-50 People", "50+ People"];

const STATUS_META = {
    pending:  { label: "Pending",  classes: "bg-amber-50 text-amber-700" },
    approved: { label: "Approved", classes: "bg-emerald-50 text-emerald-700" },
    rejected: { label: "Rejected", classes: "bg-red-50 text-red-700" },
};

function StatusPill({ status }) {
    const meta = STATUS_META[status] || { label: status || "Unknown", classes: "bg-slate-100 text-slate-700" };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${meta.classes}`}>
            {meta.label}
        </span>
    );
}

function StatusIcon({ status }) {
    if (status === "approved") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (status === "rejected") return <XCircle className="w-4 h-4 text-red-500" />;
    return <Hourglass className="w-4 h-4 text-amber-500" />;
}

function formatDate(d) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const EMPTY_FORM = { title: "", category: "", format: "", audienceSize: "", description: "" };

export default function MyRequirementsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState(EMPTY_FORM);

    const loadRequirements = async () => {
        try {
            const res = await requirementsAPI.getMine();
            setRequirements(res?.data?.requirements || []);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Could not load your requirements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequirements();
    }, []);

    const counts = {
        All: requirements.length,
        pending: requirements.filter((r) => r.status === "pending").length,
        approved: requirements.filter((r) => r.status === "approved").length,
        rejected: requirements.filter((r) => r.status === "rejected").length,
    };

    const tabs = [
        { name: `All Requirements (${counts.All})`, id: 'All' },
        { name: `Pending (${counts.pending})`, id: 'pending' },
        { name: `Approved (${counts.approved})`, id: 'approved' },
        { name: `Rejected (${counts.rejected})`, id: 'rejected' },
    ];

    const visible = activeTab === 'All'
        ? requirements
        : requirements.filter((r) => r.status === activeTab);

    const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleCreate = async () => {
        if (!form.title.trim() || !form.category || !form.format) {
            toast.error("Please fill in the requirement title, category and format.");
            return;
        }
        setSubmitting(true);
        try {
            await requirementsAPI.create({
                title: form.title.trim(),
                category: form.category,
                format: form.format,
                audienceSize: form.audienceSize,
                description: form.description.trim(),
            });
            toast.success("Requirement submitted for admin review. It will be visible once approved.");
            setIsModalOpen(false);
            setForm(EMPTY_FORM);
            loadRequirements();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to create requirement.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative animate-in fade-in duration-500 pb-20">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Top Stats Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Your Requirements</h2>
                            <p className="text-sm text-slate-500 mt-1">
                                You have {counts.pending} pending, {counts.approved} approved and {counts.rejected} rejected requirement{counts.All === 1 ? "" : "s"}.
                            </p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200 whitespace-nowrap">
                            Create New Requirement
                        </button>
                    </div>

                    {/* Filters */}
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

                    {/* Requirements List */}
                    {loading ? (
                        <div className="flex items-center justify-center py-16 text-sm text-slate-400">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading your requirements...
                        </div>
                    ) : visible.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-100 p-12 shadow-sm text-center">
                            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-medium text-slate-600">No requirements here</p>
                            <p className="text-xs text-slate-400 mt-1">Create a requirement and it will show up after admin approval.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {visible.map((req) => (
                                <div key={req._id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col sm:flex-row gap-6 relative">

                                    {/* Icon Box */}
                                    <div className="flex-shrink-0 hidden sm:block">
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${req.status === "approved" ? "bg-emerald-50" : req.status === "rejected" ? "bg-red-50" : "bg-amber-50"}`}>
                                            <StatusIcon status={req.status} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 sm:hidden">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${req.status === "approved" ? "bg-emerald-50" : req.status === "rejected" ? "bg-red-50" : "bg-amber-50"}`}>
                                                        <StatusIcon status={req.status} />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {req.title}
                                                </h3>
                                            </div>

                                            <div className="hidden sm:flex flex-col items-end gap-2">
                                                <StatusPill status={req.status} />
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-500 mb-4 max-w-2xl leading-relaxed">
                                            {req.description || "No description provided."}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Tag className="w-4 h-4 text-slate-400" />
                                                {req.category || "—"}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Monitor className="w-4 h-4 text-slate-400" />
                                                {req.format || "—"}
                                            </div>
                                            {req.audienceSize && (
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4 text-slate-400" />
                                                    {req.audienceSize}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Status + Date */}
                                    <div className="sm:hidden mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex flex-col gap-1 text-xs text-slate-400">
                                            <span>Created on</span>
                                            <span className="font-medium text-slate-700">{formatDate(req.createdAt)}</span>
                                        </div>
                                        <StatusPill status={req.status} />
                                    </div>

                                    {/* Desktop Date */}
                                    <div className="hidden sm:flex absolute right-6 bottom-6 flex-col items-end text-xs text-slate-400">
                                        <span>Created on</span>
                                        <span className="font-medium text-slate-700">{formatDate(req.createdAt)}</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

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
                                    <p className="text-xs text-slate-500 leading-relaxed">Online, offline, or hybrid preferences</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
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

                            <Link href="/find-trainer" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group transition-colors">
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

                            <Link href="/find-trainer" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group transition-colors">
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
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => !submitting && setIsModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                            <h3 className="text-lg font-bold text-slate-900">Create New Requirement</h3>
                            <button onClick={() => !submitting && setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Requirement Title *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={setField("title")}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                        placeholder="e.g., Leadership Development Program"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                                        <select value={form.category} onChange={setField("category")} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white">
                                            <option value="">Select Category</option>
                                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Format *</label>
                                        <select value={form.format} onChange={setField("format")} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white">
                                            <option value="">Select Format</option>
                                            {FORMATS.map((f) => <option key={f}>{f}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Audience Size</label>
                                    <select value={form.audienceSize} onChange={setField("audienceSize")} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white">
                                        <option value="">Select Size</option>
                                        {AUDIENCE_OPTIONS.map((a) => <option key={a}>{a}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        value={form.description}
                                        onChange={setField("description")}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                                        rows="4"
                                        placeholder="Describe your training needs in detail..."
                                    ></textarea>
                                </div>

                                <p className="text-xs text-slate-400">
                                    New requirements are reviewed by our team before they go live.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                            <button onClick={() => !submitting && setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={submitting}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2"
                            >
                                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {submitting ? "Submitting..." : "Create Requirement"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button onClick={() => setIsModalOpen(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center transition-transform hover:scale-105 z-50">
                <MessageCircle className="w-6 h-6" />
            </button>

        </div>
    );
}

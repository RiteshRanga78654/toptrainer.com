"use client";
import React, { useState } from 'react';
import { 
    Search, User, Users, Calendar, CreditCard, ShieldCheck, Wrench, 
    Lock, Monitor, Headset, ChevronDown, ChevronUp, ArrowRight, 
    MessageCircle, PenTool, FileText, Mail
} from 'lucide-react';
import Link from 'next/link';

export default function HelpSupportPage() {
    const [expandedFaq, setExpandedFaq] = useState(0);

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "Go to the login page and click on \"Forgot Password?\". Enter your registered email address and we'll send you a link to reset your password."
        },
        {
            question: "How to create a workshop?",
            answer: "To create a workshop, go to your dashboard, click on 'Workshops' and select 'Create New Workshop'. Follow the step-by-step guide."
        },
        {
            question: "What are the fees?",
            answer: "Our fee structure is transparent. We charge a standard platform fee of 10% on successful bookings. There are no hidden charges."
        },
        {
            question: "How to become a verified trainer?",
            answer: "Navigate to the 'Verification' tab in your settings and upload your professional credentials. Our team will review them within 48 hours."
        },
        {
            question: "How do I get my certificate?",
            answer: "Once you complete a workshop, your certificate will automatically be generated and available for download in your profile."
        }
    ];

    const supportTickets = [
        { id: "#TR-1021", subject: "Unable to access workshop dashboard", status: "Open", time: "2 hours ago" },
        { id: "#TR-1018", subject: "Payment not reflected", status: "Resolved", time: "Yesterday" }
    ];

    const popularResources = [
        { title: "Getting Started Guide", icon: FileText },
        { title: "Trainer Verification Process", icon: ShieldCheck },
        { title: "Workshop Management", icon: Calendar },
        { title: "Billing & Payments", icon: CreditCard },
        { title: "Account Security", icon: Lock },
        { title: "Platform Policies", icon: FileText }
    ];

    return (
        <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 right-32 w-48 h-48 bg-indigo-400/30 rounded-full blur-2xl translate-y-1/2"></div>
                
                <div className="relative z-10 lg:w-2/3">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">How can we help you today?</h2>
                    <p className="text-indigo-100 text-sm sm:text-base mb-8 max-w-xl">
                        Find answers, manage support requests, and connect with our team.
                    </p>

                    <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search articles, billing issues, trainer verification, workshops..." 
                            className="w-full pl-12 pr-16 py-4 rounded-xl border-none bg-white text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-sm placeholder:text-slate-400"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 bg-slate-100 px-2 py-1 rounded text-xs font-semibold">
                            <span>⌘</span>
                            <span>K</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <User className="w-4 h-4" /> Account
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <Users className="w-4 h-4" /> Trainers
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <Calendar className="w-4 h-4" /> Workshops
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <CreditCard className="w-4 h-4" /> Billing
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <ShieldCheck className="w-4 h-4" /> Verification
                        </button>
                        <button className="flex items-center gap-2 bg-indigo-500/30 hover:bg-indigo-500/50 backdrop-blur-sm border border-indigo-400/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <Wrench className="w-4 h-4" /> Technical
                        </button>
                    </div>
                </div>

                {/* Right Illustration (Hidden on small screens) */}
                <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
                    <div className="relative">
                        <Headset className="w-40 h-40 text-white/90 drop-shadow-lg stroke-[1.5]" />
                        <MessageCircle className="w-12 h-12 text-white/90 absolute -top-4 -left-8 drop-shadow-md stroke-[1.5]" />
                        <div className="absolute top-8 -left-12 w-3 h-3 bg-white/60 rounded-full blur-[1px]"></div>
                        <div className="absolute top-2 -left-16 w-2 h-2 bg-white/40 rounded-full blur-[1px]"></div>
                    </div>
                </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-full">
                    <div>
                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Lock className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-slate-900 font-semibold mb-2">Account Issues</h3>
                        <p className="text-slate-500 text-sm mb-6">Resolve password or login problems.</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 group-hover:text-indigo-600 transition-colors">
                        <span>124 Articles</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-full">
                    <div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <CreditCard className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-slate-900 font-semibold mb-2">Payment Queries</h3>
                        <p className="text-slate-500 text-sm mb-6">Check billing history or update payment methods.</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 group-hover:text-emerald-600 transition-colors">
                        <span>86 Articles</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-full">
                    <div>
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Monitor className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-slate-900 font-semibold mb-2">Workshop Troubleshooting</h3>
                        <p className="text-slate-500 text-sm mb-6">Get technical help with live sessions.</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 group-hover:text-amber-600 transition-colors">
                        <span>92 Articles</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-full">
                    <div>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Headset className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-slate-900 font-semibold mb-2">Contact Support</h3>
                        <p className="text-slate-500 text-sm mb-6">Talk to an agent or send us an email.</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500 group-hover:text-blue-600 transition-colors">
                        <span>24 Articles</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Main Content Layout (Left column for FAQs/Tickets, Right column for Contact/Resources) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Left Column (Span 2) */}
                <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    
                    {/* FAQs Section */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div 
                                    key={index} 
                                    className={`border-b border-slate-100 last:border-0 pb-4 last:pb-0 ${expandedFaq === index ? '' : ''}`}
                                >
                                    <button 
                                        className="w-full flex items-center justify-between py-2 text-left hover:text-indigo-600 transition-colors focus:outline-none"
                                        onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                                    >
                                        <span className={`font-medium text-sm sm:text-base ${expandedFaq === index ? 'text-indigo-600' : 'text-slate-800'}`}>
                                            {faq.question}
                                        </span>
                                        {expandedFaq === index ? (
                                            <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                        )}
                                    </button>
                                    <div 
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedFaq === index ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="text-sm text-slate-500 leading-relaxed pr-8">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 flex items-center gap-1 justify-center mx-auto transition-colors">
                                View all FAQs <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Recent Support Requests */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm overflow-hidden">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Support Requests</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</th>
                                        <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {supportTickets.map((ticket, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                            <td className="py-4 text-sm font-semibold text-slate-800">{ticket.id}</td>
                                            <td className="py-4 text-sm text-slate-600">{ticket.subject}</td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                    ticket.status === 'Open' 
                                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                }`}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-slate-500">{ticket.time}</td>
                                            <td className="py-4 text-right">
                                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 -rotate-90 inline-block transition-colors" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 flex items-center gap-1 justify-center mx-auto transition-colors">
                                View all tickets <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Still Need Help Box */}
                    <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="text-slate-900 font-bold mb-1">Still need help?</h4>
                                <p className="text-slate-500 text-sm">
                                    Our support specialists are available Monday - Friday, 9 AM - 6 PM (EST).
                                </p>
                            </div>
                        </div>
                        <button className="whitespace-nowrap px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-indigo-600 font-medium hover:bg-slate-50 transition-colors shadow-sm text-sm">
                            Contact Support
                        </button>
                    </div>

                </div>

                {/* Right Column (Span 1) */}
                <div className="space-y-6 lg:space-y-8">
                    
                    {/* Need Immediate Help Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Need Immediate Help?</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-slate-700">Support Team Online</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">
                            Average Response Time <span className="text-emerald-600 font-semibold">&lt; 5 mins</span>
                        </p>
                        
                        <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors mb-6 shadow-sm shadow-indigo-200 text-sm">
                            <MessageCircle className="w-4 h-4" /> Start Live Chat
                        </button>

                        <div className="text-center relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-3 text-xs text-slate-400">Can't find your answer?</span>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 mt-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition-colors shadow-sm text-sm">
                            <PenTool className="w-4 h-4" /> Create a Support Ticket
                        </button>
                    </div>

                    {/* Popular Resources Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Resources</h3>
                        <ul className="space-y-3">
                            {popularResources.map((resource, index) => {
                                const Icon = resource.icon;
                                return (
                                    <li key={index}>
                                        <Link href="#" className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                                                </div>
                                                <span className="font-medium">{resource.title}</span>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-slate-300 -rotate-90 group-hover:text-indigo-500 transition-colors" />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

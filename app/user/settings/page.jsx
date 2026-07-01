"use client";
import React, { useState } from 'react';
import { 
    User, ShieldCheck, Bell, CreditCard, SlidersHorizontal, Save, ChevronDown, 
    Key, Smartphone, Laptop, Mail, MessageSquare, Download, Plus, CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = [
        { id: 'General', label: 'General', icon: User },
        { id: 'Security', label: 'Security', icon: ShieldCheck },
        { id: 'Notifications', label: 'Notifications', icon: Bell },
        { id: 'Billing', label: 'Billing', icon: CreditCard },
        { id: 'Preferences', label: 'Preferences', icon: SlidersHorizontal }
    ];

    return (
        <div className="pb-10 animate-in fade-in duration-500">
            
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-200 mb-8 px-1 overflow-x-auto no-scrollbar whitespace-nowrap">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 border-b-2 font-medium text-[15px] transition-colors flex-shrink-0 ${
                                isActive 
                                    ? 'border-indigo-600 text-indigo-600' 
                                    : 'border-transparent text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            <Icon className="w-4 h-4" /> {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-6">
                
                {/* ---------------- GENERAL TAB ---------------- */}
                {activeTab === 'General' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
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
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-slate-600 mb-2">Display Name (Optional)</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter display name" 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-[13px] font-medium text-slate-600 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                defaultValue="aris.lee@learner.com" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-slate-600 mb-2">Phone Number</label>
                            <input 
                                type="text" 
                                defaultValue="+1 (555) 123-4567" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900"
                            />
                        </div>

                        <div className="pt-6 mt-8 border-t border-slate-100 flex justify-end">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* ---------------- SECURITY TAB ---------------- */}
                {activeTab === 'Security' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        {/* Change Password */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
                                    <Key className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
                                    <p className="text-[13px] text-slate-500 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 max-w-xl">
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-600 mb-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900" />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-600 mb-2">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900" />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-slate-600 mb-2">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                                    Update Password
                                </button>
                            </div>
                        </div>

                        {/* Two-Factor Auth */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Two-Factor Authentication</h2>
                                    <p className="text-[13px] text-slate-500 mt-0.5">Add an extra layer of security to your account.</p>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 text-sm">Authenticator App</p>
                                    <p className="text-xs text-slate-500 mt-0.5">Not configured yet.</p>
                                </div>
                                <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700 bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- NOTIFICATIONS TAB ---------------- */}
                {activeTab === 'Notifications' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Email Notifications</h2>
                                    <p className="text-[13px] text-slate-500 mt-0.5">Choose what updates you want to receive via email.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Toggle Item */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">Trainer Recommendations</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Get notified when we find a matching trainer.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                                {/* Toggle Item */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">Messages & Chat</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Receive an email when a trainer messages you.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                                {/* Toggle Item */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">Marketing & Updates</p>
                                        <p className="text-xs text-slate-500 mt-0.5">News about product features and special offers.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Push Notifications</h2>
                                    <p className="text-[13px] text-slate-500 mt-0.5">Manage notifications on your active devices.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">Browser Notifications</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Show notifications in your web browser.</p>
                                    </div>
                                    <button className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                                        Enable
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- BILLING TAB ---------------- */}
                {activeTab === 'Billing' && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        {/* Current Plan */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Current Plan</h2>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-indigo-100 bg-indigo-50/30 rounded-xl">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-indigo-900 text-xl">Pro Learner</h3>
                                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">Unlimited access to premium workshops and verified trainers.</p>
                                    <p className="font-semibold text-slate-900">$29.00 <span className="text-slate-500 font-normal text-sm">/ month</span></p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                                        Upgrade Plan
                                    </button>
                                    <button className="text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">
                                        Cancel Subscription
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>
                                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1">
                                    <Plus className="w-4 h-4" /> Add New
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center">
                                        {/* Fake Visa Icon */}
                                        <span className="font-bold text-blue-800 text-xs italic">VISA</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 text-sm">Visa ending in 4242</p>
                                        <p className="text-xs text-slate-500">Expires 12/2025</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-1 rounded">Default</span>
                                    <button className="text-slate-400 hover:text-slate-600">Edit</button>
                                </div>
                            </div>
                        </div>

                        {/* Billing History */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Billing History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                                            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase text-right">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        <tr>
                                            <td className="py-4 text-slate-900">May 1, 2024</td>
                                            <td className="py-4 text-slate-600">$29.00</td>
                                            <td className="py-4"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium">Paid</span></td>
                                            <td className="py-4 text-right">
                                                <button className="text-slate-400 hover:text-indigo-600 inline-flex items-center gap-1 transition-colors">
                                                    <Download className="w-4 h-4" /> PDF
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-slate-900">Apr 1, 2024</td>
                                            <td className="py-4 text-slate-600">$29.00</td>
                                            <td className="py-4"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium">Paid</span></td>
                                            <td className="py-4 text-right">
                                                <button className="text-slate-400 hover:text-indigo-600 inline-flex items-center gap-1 transition-colors">
                                                    <Download className="w-4 h-4" /> PDF
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- PREFERENCES TAB ---------------- */}
                {activeTab === 'Preferences' && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
                                <SlidersHorizontal className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Account Preferences</h2>
                                <p className="text-[13px] text-slate-500 mt-0.5">Customize your local settings and workspace.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-[13px] font-medium text-slate-600 mb-2">Timezone</label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900 appearance-none bg-white">
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
                                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm text-slate-900 appearance-none bg-white">
                                        <option>English (US)</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        
                        
                        <div className="pt-6 mt-8 border-t border-slate-100 flex justify-end">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

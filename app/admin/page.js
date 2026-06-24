"use client"
import { dashboardStats, workshops, articles, users } from "./data/mockData"
import { StatCard, Card, Badge } from "../components/ui"
import { GraduationCap, Users, BookOpen, Newspaper, DollarSign, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatDate } from "../lib/api"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Users" value={dashboardStats.totalLearners.toLocaleString()} change="+124 this month" icon={<Users size={18} className="text-violet-600" />} color="bg-violet-50" />
        <StatCard label="Total Trainers" value={dashboardStats.totalTrainers} change="+3 this month" icon={<GraduationCap size={18} className="text-blue-600" />} color="bg-blue-50" />
        <StatCard label="Total Articles" value={dashboardStats.totalArticles} icon={<Newspaper size={18} className="text-amber-600" />} color="bg-amber-50" />
        <StatCard label="Total Workshops" value={dashboardStats.totalWorkshops} icon={<BookOpen size={18} className="text-emerald-600" />} color="bg-emerald-50" />
        <StatCard label="Revenue" value={`$${(dashboardStats.monthlyRevenue / 1000).toFixed(1)}k`} change="+12.3%" icon={<DollarSign size={18} className="text-pink-600" />} color="bg-pink-50" />
        <StatCard label="Enrollments" value={dashboardStats.activeEnrollments} icon={<TrendingUp size={18} className="text-cyan-600" />} color="bg-cyan-50" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Workshops</h2>
            <Link href="/dashboard/workshops" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <div className="divide-y divide-slate-50">
            {workshops.map(w => (
              <div key={w.id} className="flex items-center gap-4 px-5 py-3">
                <img src={w.image} alt={w.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{w.title}</p>
                  <p className="text-xs text-slate-500">{w.instructor} · {formatDate(w.date)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-slate-700">{w.enrolled}/{w.seats}</p>
                  <Badge variant={w.status === "full" ? "danger" : "success"}>{w.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Articles</h2>
            <Link href="/dashboard/articles" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <div className="divide-y divide-slate-50">
            {articles.map(a => (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{a.title}</p>
                  <p className="text-xs text-slate-500">{a.author} · {a.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant={a.status === "published" ? "success" : "warning"}>{a.status}</Badge>
                  {a.views > 0 && <p className="text-xs text-slate-500 mt-0.5">{a.views.toLocaleString()} views</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Users</h2>
          <Link href="/dashboard/users" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Workshops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">{u.name[0]}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge variant={u.role === "Admin" ? "info" : u.role === "Trainer" ? "warning" : "default"}>{u.role}</Badge></td>
                  <td className="px-5 py-3 text-sm text-slate-600">{formatDate(u.joined)}</td>
                  <td className="px-5 py-3"><Badge variant={u.status === "active" ? "success" : "danger"}>{u.status}</Badge></td>
                  <td className="px-5 py-3 text-sm text-slate-600">{u.workshopsCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
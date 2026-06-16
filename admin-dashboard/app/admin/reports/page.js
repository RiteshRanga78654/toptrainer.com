"use client"
import { Card, StatCard } from "../../components/ui"
import { dashboardStats, workshops, articles } from "../data/mockData"
import { TrendingUp, Users, DollarSign, BookOpen } from "lucide-react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const enrollmentData = [32, 48, 61, 55, 70, 75]
const revenueData = [52000, 61000, 58000, 71000, 78000, 84200]

export default function ReportsPage() {
  const maxEnrollment = Math.max(...enrollmentData)
  const maxRevenue = Math.max(...revenueData)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Enrollments" value={dashboardStats.activeEnrollments} change="+8% this month" icon={<TrendingUp size={18} className="text-blue-600" />} color="bg-blue-50" />
        <StatCard label="Total Learners" value={dashboardStats.totalLearners.toLocaleString()} change="+124 new" icon={<Users size={18} className="text-violet-600" />} color="bg-violet-50" />
        <StatCard label="Monthly Revenue" value={`$${(dashboardStats.monthlyRevenue / 1000).toFixed(1)}k`} change="+12.3%" icon={<DollarSign size={18} className="text-emerald-600" />} color="bg-emerald-50" />
        <StatCard label="Active Workshops" value={dashboardStats.totalWorkshops} icon={<BookOpen size={18} className="text-amber-600" />} color="bg-amber-50" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Enrollment Trend (6 months)</h2>
          <div className="flex items-end gap-3 h-40">
            {enrollmentData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-slate-700">{val}</span>
                <div className="w-full bg-blue-500 rounded-t-md" style={{ height: `${(val / maxEnrollment) * 120}px` }} />
                <span className="text-xs text-slate-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Revenue (6 months)</h2>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-slate-700">${(val / 1000).toFixed(0)}k</span>
                <div className="w-full bg-emerald-500 rounded-t-md" style={{ height: `${(val / maxRevenue) * 120}px` }} />
                <span className="text-xs text-slate-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="font-semibold text-slate-900 mb-4">Workshop Performance</h2>
        <div className="space-y-3">
          {workshops.map(w => {
            const pct = Math.round((w.enrolled / w.seats) * 100)
            return (
              <div key={w.id} className="flex items-center gap-4">
                <p className="text-sm text-slate-700 w-52 truncate">{w.title}</p>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-medium text-slate-600 w-12 text-right">{pct}%</span>
                <span className="text-xs text-slate-400 w-16 text-right">{w.enrolled}/{w.seats}</span>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
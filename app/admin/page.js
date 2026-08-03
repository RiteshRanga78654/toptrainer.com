"use client"
import { useEffect, useState } from "react"
import { StatCard, Card, Badge } from "../components/ui"
import { GraduationCap, Users, BookOpen, Newspaper, Video, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { analyticsAPI, formatDate } from "../lib/api"

const workshopTitle = (w) => w?.basicInformation?.title || "Untitled workshop"
const workshopImage = (w) => w?.basicInformation?.coverImage?.url || w?.basicInformation?.thumbnail?.url || ""
const workshopInstructor = (w) => w?.assignedTrainer?.fullName || "Unassigned"
const workshopDate = (w) => w?.schedule?.startDate || w?.createdAt
const workshopEnrolled = (w) => w?.analytics?.enrolledCount ?? 0

const articleImage = (a) => a?.coverImage?.url || ""
const articleAuthor = (a) =>
  a?.createdBy?.fullName ||
  [a?.createdBy?.firstName, a?.createdBy?.lastName].filter(Boolean).join(" ") ||
  a?.author ||
  a?.creatorType ||
  "Unknown"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)
  const [recentWorkshops, setRecentWorkshops] = useState([])
  const [recentArticles, setRecentArticles] = useState([])
  const [recentUsers, setRecentUsers] = useState([])

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await analyticsAPI.getDashboard()
      const data = res?.data?.data || {}

      setStats(data.stats || null)
      setRecentWorkshops(data.recentWorkshops || [])
      setRecentArticles(data.recentArticles || [])
      setRecentUsers(data.recentUsers || [])
    } catch (err) {
      console.log("Dashboard fetch error:", err?.response?.data || err.message)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-sm text-slate-500">Loading dashboard...</div>
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-sm text-slate-500">
        {error}
        <div className="mt-3">
          <button onClick={fetchDashboard} className="text-blue-600 hover:underline text-sm font-medium">
            Retry
          </button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Users" value={(stats?.totalUsers ?? 0).toLocaleString()} change={`+${stats?.newUsersThisMonth ?? 0} this month`} icon={<Users size={18} className="text-violet-600" />} color="bg-violet-50" />
        <StatCard label="Total Trainers" value={stats?.totalTrainers ?? 0} change={`+${stats?.newTrainersThisMonth ?? 0} this month`} icon={<GraduationCap size={18} className="text-blue-600" />} color="bg-blue-50" />
        <StatCard label="Total Articles" value={stats?.totalArticles ?? 0} icon={<Newspaper size={18} className="text-amber-600" />} color="bg-amber-50" />
        <StatCard label="Total Workshops" value={stats?.totalWorkshops ?? 0} icon={<BookOpen size={18} className="text-emerald-600" />} color="bg-emerald-50" />
        <StatCard label="Total Videos" value={stats?.totalVideos ?? 0} icon={<Video size={18} className="text-pink-600" />} color="bg-pink-50" />
        <StatCard label="Total Reviews" value={stats?.totalReviews ?? 0} icon={<MessageSquare size={18} className="text-cyan-600" />} color="bg-cyan-50" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Workshops</h2>
            <Link href="/admin/workshops" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentWorkshops.length === 0 ? (
              <div className="px-5 py-6 text-sm text-slate-500">No workshops yet.</div>
            ) : (
              recentWorkshops.map((w) => (
                <div key={w._id} className="flex items-center gap-4 px-5 py-3">
                  {workshopImage(w) ? (
                    <img src={workshopImage(w)} alt={workshopTitle(w)} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{workshopTitle(w)}</p>
                    <p className="text-xs text-slate-500">{workshopInstructor(w)} · {formatDate(workshopDate(w))}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-slate-700">{workshopEnrolled(w)} enrolled</p>
                    <Badge variant={w.status === "published" ? "success" : "warning"}>{w.status}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Articles</h2>
            <Link href="/admin/articles" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentArticles.length === 0 ? (
              <div className="px-5 py-6 text-sm text-slate-500">No articles yet.</div>
            ) : (
              recentArticles.map((a) => (
                <div key={a._id} className="flex items-center gap-4 px-5 py-3">
                  {articleImage(a) ? (
                    <img src={articleImage(a)} alt={a.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{a.title}</p>
                    <p className="text-xs text-slate-500">{articleAuthor(a)} · {a.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant={a.status === "published" ? "success" : "warning"}>{a.status}</Badge>
                    {a.views > 0 && <p className="text-xs text-slate-500 mt-0.5">{a.views.toLocaleString()} views</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Users</h2>
          <Link href="/admin/users" className="text-xs text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-6 text-sm text-slate-500">No users yet.</td>
                </tr>
              ) : (
                recentUsers.map((u) => {
                  const name = [u.firstName, u.lastName].filter(Boolean).join(" ") || "Unnamed"
                  return (
                    <tr key={u._id} className="hover:bg-slate-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">{name[0]}</div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{name}</p>
                            <p className="text-xs text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-600">{formatDate(u.createdAt)}</td>
                      <td className="px-5 py-3"><Badge variant={u.status === "active" ? "success" : "danger"}>{u.status || "active"}</Badge></td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
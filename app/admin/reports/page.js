"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, StatCard, Badge } from "../../components/ui"
import { analyticsAPI } from "../../lib/api"
import { TrendingUp, Users, GraduationCap, BookOpen, Newspaper, Star } from "lucide-react"

function getLastSixMonths() {
  const now = new Date()
  const months = []

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      label: d.toLocaleString("en-US", { month: "short" }),
    })
  }

  return months
}

function mapGrowthToMonths(growth = [], months) {
  return months.map((m) => {
    const found = growth.find(
      (g) => g?._id?.month === m.month && g?._id?.year === m.year
    )
    return found?.count || 0
  })
}

function statusCount(statusArr = [], status) {
  return statusArr.find((s) => s?._id === status)?.count || 0
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)
  const [recentWorkshops, setRecentWorkshops] = useState([])
  const [growth, setGrowth] = useState({
    userGrowth: [],
    trainerGrowth: [],
    workshopStats: [],
    articleStats: [],
  })

  const months = useMemo(() => getLastSixMonths(), [])

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)

      const [dashboardRes, analyticsRes] = await Promise.all([
        analyticsAPI.getDashboard(),
        analyticsAPI.getAnalytics(),
      ])

      const dashboardData = dashboardRes?.data?.data || {}
      const analyticsData = analyticsRes?.data?.data || {}

      setStats(dashboardData.stats || null)
      setRecentWorkshops(dashboardData.recentWorkshops || [])
      setGrowth({
        userGrowth: analyticsData.userGrowth || [],
        trainerGrowth: analyticsData.trainerGrowth || [],
        workshopStats: analyticsData.workshopStats || [],
        articleStats: analyticsData.articleStats || [],
      })
    } catch (err) {
      console.log("Reports fetch error:", err?.response?.data || err.message)
      setError("Failed to load reports")
    } finally {
      setLoading(false)
    }
  }

  const userSeries = mapGrowthToMonths(growth.userGrowth, months)
  const trainerSeries = mapGrowthToMonths(growth.trainerGrowth, months)
  const maxGrowth = Math.max(1, ...userSeries, ...trainerSeries)

  const workshopDraft = statusCount(growth.workshopStats, "draft")
  const workshopPublished = statusCount(growth.workshopStats, "published")
  const articleDraft = statusCount(growth.articleStats, "draft")
  const articlePublished = statusCount(growth.articleStats, "published")

  const maxEnrolled = Math.max(
    1,
    ...recentWorkshops.map((w) => w?.analytics?.enrolledCount || 0)
  )

  if (loading) {
    return <div className="text-sm text-slate-500">Loading reports...</div>
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-sm text-slate-500">
        {error}
        <div className="mt-3">
          <button onClick={fetchReports} className="text-blue-600 hover:underline text-sm font-medium">
            Retry
          </button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Learners"
          value={(stats?.totalUsers ?? 0).toLocaleString()}
          change={`+${stats?.newUsersThisMonth ?? 0} this month`}
          icon={<Users size={18} className="text-violet-600" />}
          color="bg-violet-50"
        />
        <StatCard
          label="Total Trainers"
          value={(stats?.totalTrainers ?? 0).toLocaleString()}
          change={`+${stats?.newTrainersThisMonth ?? 0} this month`}
          icon={<GraduationCap size={18} className="text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          label="Total Workshops"
          value={stats?.totalWorkshops ?? 0}
          icon={<BookOpen size={18} className="text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          label="Total Reviews"
          value={stats?.totalReviews ?? 0}
          icon={<Star size={18} className="text-amber-600" />}
          color="bg-amber-50"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900 text-[15px]">User Growth (6 months)</h2>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Learners
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400" /> Trainers
              </span>
            </div>
          </div>

          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end justify-center gap-1 h-32">
                  <div
                    className="w-2.5 rounded-t-md bg-blue-500 transition-all"
                    style={{ height: `${Math.max(4, (userSeries[i] / maxGrowth) * 100)}%` }}
                    title={`${userSeries[i]} learners`}
                  />
                  <div
                    className="w-2.5 rounded-t-md bg-violet-400 transition-all"
                    style={{ height: `${Math.max(4, (trainerSeries[i] / maxGrowth) * 100)}%` }}
                    title={`${trainerSeries[i]} trainers`}
                  />
                </div>
                <span className="text-[11px] text-slate-500">{m.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900 text-[15px] mb-5">Content Status</h2>

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span className="font-medium text-slate-700">Workshops</span>
                <span>{workshopPublished + workshopDraft} total</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${
                      workshopPublished + workshopDraft > 0
                        ? (workshopPublished / (workshopPublished + workshopDraft)) * 100
                        : 0
                    }%`,
                  }}
                />
                <div
                  className="h-full bg-amber-300"
                  style={{
                    width: `${
                      workshopPublished + workshopDraft > 0
                        ? (workshopDraft / (workshopPublished + workshopDraft)) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {workshopPublished} published</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-300" /> {workshopDraft} draft</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span className="font-medium text-slate-700">Articles</span>
                <span>{articlePublished + articleDraft} total</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${
                      articlePublished + articleDraft > 0
                        ? (articlePublished / (articlePublished + articleDraft)) * 100
                        : 0
                    }%`,
                  }}
                />
                <div
                  className="h-full bg-amber-300"
                  style={{
                    width: `${
                      articlePublished + articleDraft > 0
                        ? (articleDraft / (articlePublished + articleDraft)) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> {articlePublished} published</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-300" /> {articleDraft} draft</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 text-[15px]">Recent Workshop Enrollment</h2>
          <TrendingUp size={16} className="text-slate-400" />
        </div>

        {recentWorkshops.length === 0 ? (
          <div className="text-sm text-slate-500 py-6 text-center">No workshops yet.</div>
        ) : (
          <div className="space-y-3">
            {recentWorkshops.map((w) => {
              const enrolled = w?.analytics?.enrolledCount || 0
              const pct = Math.round((enrolled / maxEnrolled) * 100)

              return (
                <div key={w._id} className="flex items-center gap-4">
                  <p className="text-sm text-slate-700 w-52 truncate">
                    {w?.basicInformation?.title || "Untitled workshop"}
                  </p>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <Badge variant={w.status === "published" ? "success" : "warning"}>{w.status}</Badge>
                  <span className="text-xs text-slate-500 w-20 text-right">{enrolled} enrolled</span>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}

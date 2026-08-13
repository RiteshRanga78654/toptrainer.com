"use client"
import { useEffect, useState } from "react"
import { StatCard, Card, Badge, StatusBadge, Button, Modal, ConfirmDialog, Toast, Avatar } from "../components/ui"
import { GraduationCap, Users, BookOpen, Newspaper, Video, MessageSquare, ArrowRight, Clock, Check, X, Eye, FileText } from "lucide-react"
import Link from "next/link"
import { analyticsAPI, adminRequirementsAPI, formatDate } from "../lib/api"

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

const requirementUserName = (u) => {
  if (!u) return "Unknown user";
  return [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || "Unknown user";
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)
  const [recentWorkshops, setRecentWorkshops] = useState([])
  const [recentArticles, setRecentArticles] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [requirementStats, setRequirementStats] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [latestPending, setLatestPending] = useState([])
  const [viewing, setViewing] = useState(null)
  const [confirmReject, setConfirmReject] = useState(null)
  const [actingId, setActingId] = useState(null)
  const [toast, setToast] = useState(null)

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
      setRequirementStats(data.requirementStats || { pending: 0, approved: 0, rejected: 0 })
      setLatestPending(data.latestPendingRequirements || [])
    } catch (err) {
      console.log("Dashboard fetch error:", err?.response?.data || err.message)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const approve = async (req) => {
    setActingId(req._id);
    try {
      await adminRequirementsAPI.approve(req._id);
      setToast({ type: "success", message: "Requirement approved and is now visible publicly." });
      setViewing(null);
      fetchDashboard();
    } catch {
      setToast({ type: "error", message: "Failed to approve requirement." });
    } finally {
      setActingId(null);
    }
  };

  const reject = async () => {
    const req = confirmReject;
    if (!req) return;
    setActingId(req._id);
    try {
      await adminRequirementsAPI.reject(req._id);
      setToast({ type: "success", message: "Requirement rejected." });
      setConfirmReject(null);
      setViewing(null);
      fetchDashboard();
    } catch {
      setToast({ type: "error", message: "Failed to reject requirement." });
    } finally {
      setActingId(null);
    }
  };

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
        <StatCard label="Users Registered (Last 3 Months)" value={(stats?.newUsersLast90Days ?? 0).toLocaleString()} change={`+${stats?.newUsersThisMonth ?? 0} this month`} icon={<Users size={18} className="text-violet-600" />} color="bg-violet-50" />
        <StatCard label="Trainers Registered (Last 3 Months)" value={stats?.newTrainersLast90Days ?? 0} change={`+${stats?.newTrainersThisMonth ?? 0} this month`} icon={<GraduationCap size={18} className="text-blue-600" />} color="bg-blue-50" />
        <StatCard label="Total Articles" value={stats?.totalArticles ?? 0} icon={<Newspaper size={18} className="text-amber-600" />} color="bg-amber-50" />
        <StatCard label="Total Workshops" value={stats?.totalWorkshops ?? 0} icon={<BookOpen size={18} className="text-emerald-600" />} color="bg-emerald-50" />
        <StatCard label="Total Videos" value={stats?.totalVideos ?? 0} icon={<Video size={18} className="text-pink-600" />} color="bg-pink-50" />
        <StatCard label="Total Reviews" value={stats?.totalReviews ?? 0} icon={<MessageSquare size={18} className="text-cyan-600" />} color="bg-cyan-50" />
      </div>

      {/* ── Requirements Review ── */}
      <Card>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="font-semibold text-slate-900">Requirement Reviews</h2>
            <p className="text-xs text-slate-500 mt-0.5">Approve or reject user-submitted training requirements.</p>
          </div>
          <Link href="/admin/requirements" className="text-xs text-blue-600 hover:underline flex items-center gap-1">Open review section <ArrowRight size={12} /></Link>
        </div>

        <div className="grid grid-cols-3 gap-4 p-5 border-b border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600"><Clock size={13} /> Total Pending</span>
            <span className="text-2xl font-bold text-slate-900">{requirementStats.pending ?? 0}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600"><Check size={13} /> Total Approved</span>
            <span className="text-2xl font-bold text-slate-900">{requirementStats.approved ?? 0}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600"><X size={13} /> Total Rejected</span>
            <span className="text-2xl font-bold text-slate-900">{requirementStats.rejected ?? 0}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Latest 5 Pending Items</h3>
          {latestPending.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">No pending requirements right now.</p>
          ) : (
            <div className="space-y-2">
              {latestPending.map((req) => (
                <div key={req._id} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Avatar name={requirementUserName(req.user)} size={36} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{req.title}</p>
                    <p className="text-xs text-slate-500 truncate">{requirementUserName(req.user)} · {formatDate(req.createdAt)}</p>
                  </div>
                  <StatusBadge status={req.status} />
                  <Button variant="secondary" size="sm" onClick={() => setViewing(req)}>
                    <Eye size={13} /> Open
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

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

      {/* ── Requirement detail modal (read-only review) ── */}
      {viewing && (
        <Modal
          isOpen
          onClose={() => setViewing(null)}
          title="Requirement details"
          size="md"
          footer={
            <>
              {viewing.status !== "rejected" && (
                <Button
                  variant="danger"
                  onClick={() => {
                    setConfirmReject(viewing);
                    setViewing(null);
                  }}
                >
                  <X size={14} /> Reject
                </Button>
              )}
              {viewing.status !== "approved" && (
                <Button
                  variant="primary"
                  onClick={() => approve(viewing)}
                  loading={actingId === viewing._id}
                >
                  <Check size={14} /> Approve
                </Button>
              )}
            </>
          }
        >
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={requirementUserName(viewing.user)} size={40} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{viewing.title}</p>
                  <p className="text-xs text-slate-500">{requirementUserName(viewing.user)} · {viewing.user?.email}</p>
                </div>
              </div>
              <StatusBadge status={viewing.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <BookOpen size={14} className="text-slate-400 shrink-0" />
                <span>Category: <span className="font-medium text-slate-900">{viewing.category || "—"}</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Video size={14} className="text-slate-400 shrink-0" />
                <span>Format: <span className="font-medium text-slate-900">{viewing.format || "—"}</span></span>
              </div>
              {viewing.audienceSize && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Users size={14} className="text-slate-400 shrink-0" />
                  <span>Audience: <span className="font-medium text-slate-900">{viewing.audienceSize}</span></span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-600">
                <FileText size={14} className="text-slate-400 shrink-0" />
                <span>Created: <span className="font-medium text-slate-900">{formatDate(viewing.createdAt)}</span></span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm font-medium text-slate-800 mb-2">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {viewing.description || "No description provided."}
              </p>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!confirmReject}
        onClose={() => setConfirmReject(null)}
        onConfirm={reject}
        title="Reject this requirement?"
        message="The requirement will be marked as rejected and will not be visible to the public."
        confirmLabel="Reject"
        loading={actingId === confirmReject?._id}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
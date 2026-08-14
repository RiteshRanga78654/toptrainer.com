"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { articlesAdminAPI, formatDate } from "../../lib/api"
import {
  Card,
  Badge,
  Button,
  SearchInput,
  Tabs,
  EmptyState,
  PageLoader,
  PageHeader,
  Toast,
  ConfirmDialog,
  StatCard,
  Avatar,
} from "../../components/ui"
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  FileText,
  Users,
  CheckCircle2,
  Clock3,
  Newspaper,
  AlertCircle,
} from "lucide-react"
import ArticleFormModal from "./ArticleFormModal"

const SOURCE_FILTERS = [
  { key: "all", label: "All Articles" },
  { key: "admin", label: "Admin Articles" },
  { key: "trainer", label: "Trainer Articles" },
]

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Draft" },
  { key: "pending", label: "Pending Review" },
]

const toArr = (res) => {
  if (Array.isArray(res?.data?.data)) return res.data.data
  if (Array.isArray(res?.data)) return res.data
  return []
}

function normalize(a) {
  return {
    ...a,
    _id: a._id || a.id,
    title: a.title || "",
    category: a.category || "",
    status: a.status || "draft",
    image: a.coverImage?.url || a.image || null,
    coverImage: a.coverImage || (a.image ? { url: a.image } : null),
    author:
      a.author ||
      a.createdBy?.fullName ||
      `${a.createdBy?.firstName || ""} ${a.createdBy?.lastName || ""}`.trim() ||
      a.trainer?.fullName ||
      "Unknown",
    sections: a.sections || [],
    tags: a.tags || [],
    featured: !!a.featured,
    publishedAt: a.publishedAt || null,
    createdAt: a.createdAt || null,
    views: a.views || 0,
    creatorType: a.creatorType || "Admin",
    trainer: a.trainer || null,
    createdBy: a.createdBy || null,
  }
}

function StatusPill({ status }) {
  if (status === "published")
    return <Badge variant="success">Published</Badge>
  if (status === "pending")
    return <Badge variant="warning">Pending Review</Badge>
  return <Badge variant="gray">Draft</Badge>
}

function SectionError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
      <span className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
        <AlertCircle size={22} />
      </span>
      <div>
        <p style={{ fontWeight: 600, color: "var(--text-secondary, #64748b)" }}>
          Couldn't load articles
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted, #94a3b8)", marginTop: 2 }}>
          {message}
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  )
}

function ArticlesSection({
  title,
  icon,
  accent,
  count,
  articles,
  trainerMode,
  loading,
  error,
  onRetry,
  onEdit,
  onDelete,
  emptyTitle,
  emptyDescription,
}) {
  return (
    <Card>
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent}18`, color: accent }}
          >
            {icon}
          </span>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary, #0f172a)" }}>
              {title}
            </h2>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted, #94a3b8)" }}>
              {count} article{count === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <Badge variant="brand">{count}</Badge>
      </div>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <SectionError message={error} onRetry={onRetry} />
      ) : articles.length === 0 ? (
        <EmptyState
          icon="📰"
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                  {trainerMode && (
                    <th className="px-5 py-3 font-medium">Trainer</th>
                  )}
                  <th className="px-5 py-3 font-medium">Article</th>
                  <th className="px-5 py-3 font-medium">{trainerMode ? "Trainer Name" : "Author"}</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Published</th>
                  <th className="px-5 py-3 font-medium text-right">Views</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {articles.map((a) => (
                  <tr key={a._id} className="hover:bg-slate-50 transition-colors">
                    {trainerMode && (
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            name={a.trainer?.fullName || a.author}
                            src={a.trainer?.profilePhoto?.url}
                            size={34}
                          />
                          <span className="text-sm font-medium text-slate-900">
                            {a.trainer?.fullName || a.author}
                          </span>
                        </div>
                      </td>
                    )}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {a.image ? (
                          <img
                            src={a.image}
                            alt={a.title}
                            className="w-12 h-10 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <span className="w-12 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 shrink-0">
                            <Newspaper size={18} />
                          </span>
                        )}
                        <p className="text-sm font-medium text-slate-900 max-w-[260px] line-clamp-2">
                          {a.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">{a.author}</td>
                    <td className="px-5 py-3">
                      <Badge>{a.category}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <StatusPill status={a.status} />
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600">
                      {formatDate(a.publishedAt || a.createdAt)}
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center justify-end gap-1 text-sm text-slate-600">
                        <Eye size={13} className="text-slate-400" />
                        {a.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(a)} title="Edit">
                          <Edit2 size={13} />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(a)}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 p-4">
            {articles.map((a) => (
              <div
                key={a._id}
                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex gap-3 p-3.5">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-16 h-14 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <span className="w-16 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 shrink-0">
                      <Newspaper size={20} />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    {trainerMode && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <Avatar
                          name={a.trainer?.fullName || a.author}
                          src={a.trainer?.profilePhoto?.url}
                          size={18}
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {a.trainer?.fullName || a.author}
                        </span>
                      </div>
                    )}
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{a.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{a.author}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 px-3.5 pb-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Badge>{a.category}</Badge>
                  </div>
                  <div className="flex justify-end">
                    <StatusPill status={a.status} />
                  </div>
                  <div>
                    <span className="text-slate-400">Published:</span>{" "}
                    {formatDate(a.publishedAt || a.createdAt)}
                  </div>
                  <div className="flex justify-end">
                    <span className="flex items-center gap-1">
                      <Eye size={12} className="text-slate-400" />
                      {a.views.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2.5 border-t border-slate-100">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(a)}>
                    <Edit2 size={12} /> Edit
                  </Button>
                  <Button variant="danger" size="sm" className="flex-1" onClick={() => onDelete(a)}>
                    <Trash2 size={12} /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  )
}

export default function BlogsPage() {
  const [adminArticles, setAdminArticles] = useState([])
  const [trainerArticles, setTrainerArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const [adminRes, trainerRes] = await Promise.all([
        articlesAdminAPI.getAllAdminArticles({ page: 1, limit: 500 }),
        articlesAdminAPI.getAllTrainerArticles({ page: 1, limit: 500 }),
      ])
      setAdminArticles(toArr(adminRes).map(normalize))
      setTrainerArticles(toArr(trainerRes).map(normalize))
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Could not load articles.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const counts = useMemo(() => {
    const countBy = (arr, s) => arr.filter((a) => a.status === s).length
    return {
      total: adminArticles.length + trainerArticles.length,
      admin: adminArticles.length,
      trainer: trainerArticles.length,
      published: countBy(adminArticles, "published") + countBy(trainerArticles, "published"),
      draft: countBy(adminArticles, "draft") + countBy(trainerArticles, "draft"),
      pending: countBy(adminArticles, "pending") + countBy(trainerArticles, "pending"),
    }
  }, [adminArticles, trainerArticles])

  const matches = useCallback(
    (a) => {
      const q = search.trim().toLowerCase()
      const okSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      const okStatus = statusFilter === "all" || a.status === statusFilter
      return okSearch && okStatus
    },
    [search, statusFilter]
  )

  const adminFiltered = useMemo(
    () => adminArticles.filter(matches),
    [adminArticles, matches]
  )
  const trainerFiltered = useMemo(
    () => trainerArticles.filter(matches),
    [trainerArticles, matches]
  )

  const openCreate = () => {
    setEditing(null)
    setModal(true)
  }
  const openEdit = (a) => {
    setEditing(a)
    setModal(true)
  }

  const handleSaved = (data) => {
    const saved = data?.article || data
    if (!saved) return

    const updated = normalize(saved)

    if (editing) {
      setAdminArticles((prev) => prev.map((a) => (a._id === updated._id ? updated : a)))
      setTrainerArticles((prev) => prev.map((a) => (a._id === updated._id ? updated : a)))
      setToast({ type: "success", message: "Article updated successfully." })
    } else {
      if (updated.creatorType === "TrainerProfile") {
        setTrainerArticles((prev) => [updated, ...prev])
      } else {
        setAdminArticles((prev) => [updated, ...prev])
      }
      setToast({
        type: "success",
        message: updated.status === "draft" ? "Article saved as draft." : "Article created.",
      })
    }
    setModal(false)
  }

  const confirmDelete = async () => {
    const target = confirmDeleteTarget
    if (!target) return
    setDeleting(true)
    try {
      await articlesAdminAPI.delete(target._id)
      setAdminArticles((prev) => prev.filter((a) => a._id !== target._id))
      setTrainerArticles((prev) => prev.filter((a) => a._id !== target._id))
      setConfirmDeleteTarget(null)
      setToast({ type: "success", message: "Article deleted permanently." })
    } catch {
      setToast({ type: "error", message: "Failed to delete article." })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Blogs"
        subtitle="Manage every article on the platform — Admin Blogs and Trainer Articles in one place."
        actions={
          <Button variant="primary" onClick={openCreate}>
            <Plus size={15} /> New Blogs
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Articles" value={counts.total} color="#2563eb" icon={<Newspaper size={20} />} />
        <StatCard label="Admin Blogs" value={counts.admin} color="#7c3aed" icon={<FileText size={20} />} />
        <StatCard label="Trainer Articles" value={counts.trainer} color="#0891b2" icon={<Users size={20} />} />
        <StatCard label="Published" value={counts.published} color="#10b981" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Pending Review" value={counts.pending} color="#f59e0b" icon={<Clock3 size={20} />} />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          <Tabs tabs={SOURCE_FILTERS} activeTab={sourceFilter} onChange={setSourceFilter} />
          <Tabs tabs={STATUS_FILTERS} activeTab={statusFilter} onChange={setStatusFilter} />
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by title, author or category..."
        />
      </div>

      {loading ? (
        <PageLoader />
      ) : (
        <>
          {sourceFilter !== "trainer" && (
            <ArticlesSection
              title="Admin Blogs"
              icon={<FileText size={18} />}
              accent="#7c3aed"
              count={adminFiltered.length}
              articles={adminFiltered}
              trainerMode={false}
              loading={false}
              error={error && !adminArticles.length ? error : ""}
              onRetry={loadAll}
              onEdit={openEdit}
              onDelete={setConfirmDeleteTarget}
              emptyTitle="No admin articles found"
              emptyDescription="There are no admin articles matching your filters right now."
            />
          )}

          {sourceFilter !== "admin" && (
            <ArticlesSection
              title="Trainer Articles"
              icon={<Users size={18} />}
              accent="#0891b2"
              count={trainerFiltered.length}
              articles={trainerFiltered}
              trainerMode
              loading={false}
              error={error && !trainerArticles.length ? error : ""}
              onRetry={loadAll}
              onEdit={openEdit}
              onDelete={setConfirmDeleteTarget}
              emptyTitle="No trainer articles found"
              emptyDescription="Articles submitted or created by trainers will appear here."
            />
          )}
        </>
      )}

      {modal && (
        <ArticleFormModal
          article={editing}
          onClose={() => setModal(false)}
          onSaved={handleSaved}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDeleteTarget}
        onClose={() => setConfirmDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete this article?"
        message={`Are you sure you want to delete "${confirmDeleteTarget?.title?.slice(0, 60) || "this article"}"? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
        loading={deleting}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
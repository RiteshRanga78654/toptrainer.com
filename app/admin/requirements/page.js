"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Check,
  X,
  Eye,
  Tag,
  Monitor,
  Users,
  FileText,
} from "lucide-react";

import { adminRequirementsAPI } from "../../lib/api";
import {
  Card,
  StatusBadge,
  Button,
  Tabs,
  SearchInput,
  Pagination,
  EmptyState,
  PageLoader,
  PageHeader,
  Toast,
  Modal,
  ConfirmDialog,
  StatCard,
  Avatar,
  RowMenu,
} from "../../components/ui";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

function userName(u) {
  if (!u) return "Unknown user";
  const full = `${u.firstName || ""} ${u.lastName || ""}`.trim();
  return full || u.email || "Unknown user";
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminRequirementsPage() {
  const [requirements, setRequirements] = useState([]);
  const [latestPending, setLatestPending] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [toast, setToast] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [confirmReject, setConfirmReject] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [actingId, setActingId] = useState(null);

  const load = () => {
    setLoading(true);
    adminRequirementsAPI
      .getAll({ status: tab, keyword: search || undefined, page, limit: 10 })
      .then((res) => {
        const data = res?.data || {};
        setRequirements(data.requirements || []);
        setLatestPending(data.latestPending || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.count || 0);
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {
        setRequirements([]);
        setToast({ type: "error", message: "Could not load requirements. Please try again." });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, page]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      load();
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const approve = async (requirement) => {
    setActingId(requirement._id);
    try {
      await adminRequirementsAPI.approve(requirement._id);
      setToast({ type: "success", message: "Requirement approved and is now visible publicly." });
      load();
    } catch {
      setToast({ type: "error", message: "Failed to approve requirement." });
    } finally {
      setActingId(null);
    }
  };

  const reject = async () => {
    const requirement = confirmReject;
    if (!requirement) return;
    setActingId(requirement._id);
    try {
      await adminRequirementsAPI.reject(requirement._id);
      setToast({ type: "success", message: "Requirement rejected." });
      setConfirmReject(null);
      load();
    } catch {
      setToast({ type: "error", message: "Failed to reject requirement." });
    } finally {
      setActingId(null);
    }
  };

  const removeRequirement = async () => {
    const requirement = confirmDelete;
    if (!requirement) return;
    setActingId(requirement._id);
    try {
      await adminRequirementsAPI.delete(requirement._id);
      setToast({ type: "success", message: "Requirement deleted." });
      setConfirmDelete(null);
      load();
    } catch {
      setToast({ type: "error", message: "Failed to delete requirement." });
    } finally {
      setActingId(null);
    }
  };

  const statCards = useMemo(
    () => [
      { label: "Total Pending", value: stats.pending, color: "#f59e0b", icon: <Clock size={20} /> },
      { label: "Total Approved", value: stats.approved, color: "#10b981", icon: <Check size={20} /> },
      { label: "Total Rejected", value: stats.rejected, color: "#ef4444", icon: <X size={20} /> },
    ],
    [stats]
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Requirements"
        subtitle="Review requirements submitted by users. New submissions need approval before they become public."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value ?? 0} icon={s.icon} color={s.color} />
        ))}
      </div>

      <Card>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Latest Pending Submissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">The most recent {latestPending.length} submissions waiting for review.</p>
          </div>
        </div>

        {loading ? (
          <PageLoader />
        ) : latestPending.length === 0 ? (
          <EmptyState
            icon="📥"
            title="No pending submissions"
            description="There are no requirements waiting for review right now."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-5">
            {latestPending.map((req) => (
              <div
                key={req._id}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar name={userName(req.user)} size={32} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{req.title}</p>
                      <p className="text-xs text-slate-500 truncate">{userName(req.user)}</p>
                    </div>
                  </div>
                  <StatusBadge status={req.status} />
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Tag size={12} /> {req.category || "—"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Monitor size={12} /> {req.format || "—"}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <FileText size={12} /> {formatDate(req.createdAt)}
                  </span>
                  <Button variant="secondary" size="sm" onClick={() => setViewing(req)}>
                    <Eye size={13} /> Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Tabs
          tabs={TABS}
          activeTab={tab}
          onChange={(k) => {
            setTab(k);
            setPage(1);
          }}
        />
        <SearchInput value={search} onChange={setSearch} placeholder="Search by title, category or description..." />
      </div>

      <Card>
        {loading ? (
          <PageLoader />
        ) : !requirements.length ? (
          <EmptyState
            icon="📭"
            title="No requirements found"
            description="There are no requirements matching this filter right now."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Created By</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Created Date</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requirements.map((req) => {
                  const busy = actingId === req._id;
                  return (
                    <tr key={req._id} className="hover:bg-slate-50 align-top">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={userName(req.user)} size={32} />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate max-w-[220px]">{req.title}</p>
                            {req.format && <p className="text-xs text-slate-500">{req.format}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm text-slate-600">{req.category || "—"}</span>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-slate-700">{userName(req.user)}</p>
                        <p className="text-xs text-slate-500">{req.user?.email}</p>
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-600">{formatDate(req.createdAt)}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button variant="ghost" size="sm" onClick={() => setViewing(req)} disabled={busy}>
                            <Eye size={13} />
                          </Button>
                          {req.status !== "approved" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="!bg-emerald-50 !text-emerald-700 !border-emerald-200 hover:!bg-emerald-100"
                              onClick={() => approve(req)}
                              loading={busy}
                            >
                              <Check size={13} /> Approve
                            </Button>
                          )}
                          {req.status !== "rejected" && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setConfirmReject(req)}
                              disabled={busy}
                            >
                              <X size={13} /> Reject
                            </Button>
                          )}
                          <RowMenu
                            row={req}
                            onDelete={() => setConfirmDelete(req)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
      </Card>

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
                  onClick={() => {
                    approve(viewing);
                    setViewing(null);
                  }}
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
                <Avatar name={userName(viewing.user)} size={40} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{viewing.title}</p>
                  <p className="text-xs text-slate-500">{userName(viewing.user)} · {viewing.user?.email}</p>
                </div>
              </div>
              <StatusBadge status={viewing.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Tag size={14} className="text-slate-400 shrink-0" />
                <span>Category: <span className="font-medium text-slate-900">{viewing.category || "—"}</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Monitor size={14} className="text-slate-400 shrink-0" />
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

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={removeRequirement}
        title="Delete this requirement?"
        message="This will permanently remove the requirement. This action cannot be undone."
        confirmLabel="Delete"
        loading={actingId === confirmDelete?._id}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
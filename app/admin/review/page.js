"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Star,
  Check,
  X,
  Eye,
  Trash2,
  MessageSquareQuote,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react";

import { adminReviewsAPI } from "../../lib/api";
import {
  Card,
  Badge,
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
} from "../../components/ui";

// ─── helpers ──────────────────────────────────────────────────────────────────

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

function trainerName(t) {
  if (!t) return "Unknown trainer";
  return t.fullName || t.companyName || "Unknown trainer";
}

function formatDateTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StarRow({ value = 0, size = 13 }) {
  const rounded = Math.round(Number(value) || 0);
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rounded ? "fill-amber-400 text-amber-400" : "text-slate-200"}
        />
      ))}
    </span>
  );
}

const RATING_ROWS = [
  { key: "overAll", commentKey: "overAllComment", label: "Overall" },
  { key: "delivery", commentKey: "deliveryComment", label: "Delivery" },
  { key: "contentQuality", commentKey: "contentQualityComment", label: "Content Quality" },
  { key: "engagement", commentKey: "engagmentComment", label: "Engagement" },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
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
    adminReviewsAPI
      .getAll({ status: tab, keyword: search || undefined, page, limit: 10 })
      .then((res) => {
        const data = res?.data || {};
        setReviews(data.reviews || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.count || 0);
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {
        setReviews([]);
        setToast({ type: "error", message: "Could not load reviews. Please try again." });
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

  const approve = async (review) => {
    setActingId(review._id);
    try {
      await adminReviewsAPI.approve(review._id);
      setToast({ type: "success", message: "Review approved and is now live." });
      load();
    } catch {
      setToast({ type: "error", message: "Failed to approve review." });
    } finally {
      setActingId(null);
    }
  };

  const reject = async () => {
    const review = confirmReject;
    if (!review) return;
    setActingId(review._id);
    try {
      await adminReviewsAPI.reject(review._id);
      setToast({ type: "success", message: "Review rejected." });
      setConfirmReject(null);
      load();
    } catch {
      setToast({ type: "error", message: "Failed to reject review." });
    } finally {
      setActingId(null);
    }
  };

  const removeReview = async () => {
    const review = confirmDelete;
    if (!review) return;
    setActingId(review._id);
    try {
      await adminReviewsAPI.delete(review._id);
      setToast({ type: "success", message: "Review deleted." });
      setConfirmDelete(null);
      load();
    } catch {
      setToast({ type: "error", message: "Failed to delete review." });
    } finally {
      setActingId(null);
    }
  };

  const toggleFeatured = async (review) => {
    setActingId(review._id);
    try {
      await adminReviewsAPI.toggleFeatured(review._id);
      setToast({
        type: "success",
        message: review.isFeatured ? "Removed from featured." : "Marked as featured.",
      });
      load();
    } catch {
      setToast({ type: "error", message: "Failed to update featured status." });
    } finally {
      setActingId(null);
    }
  };

  const statCards = useMemo(
    () => [
      { label: "Pending review", value: stats.pending, color: "#f59e0b", icon: <MessageSquareQuote size={20} /> },
      { label: "Approved", value: stats.approved, color: "#10b981", icon: <Check size={20} /> },
      { label: "Rejected", value: stats.rejected, color: "#ef4444", icon: <X size={20} /> },
      { label: "Total reviews", value: stats.total, color: "#2563eb", icon: <Star size={20} /> },
    ],
    [stats]
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reviews"
        subtitle="Moderate reviews submitted by users before they appear publicly on trainer profiles."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value ?? 0} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Tabs
          tabs={TABS}
          activeTab={tab}
          onChange={(k) => {
            setTab(k);
            setPage(1);
          }}
        />
        <SearchInput value={search} onChange={setSearch} placeholder="Search by reviewer or trainer..." />
      </div>

      <Card>
        {loading ? (
          <PageLoader />
        ) : !reviews.length ? (
          <EmptyState
            icon="⭐"
            title="No reviews found"
            description="There are no reviews matching this filter right now."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                  <th className="px-5 py-3 font-medium">Reviewer</th>
                  <th className="px-5 py-3 font-medium">Trainer</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium">Comment</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reviews.map((r) => {
                  const busy = actingId === r._id;
                  return (
                    <tr key={r._id} className="hover:bg-slate-50 align-top">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={userName(r.user)} size={32} />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {r.sessionInfo?.reviewerName || userName(r.user)}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{r.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm font-medium text-slate-900">
                          {r.sessionInfo?.trainerName || trainerName(r.trainer)}
                        </p>
                        <p className="text-xs text-slate-500">{r.trainer?.companyName || "—"}</p>
                      </td>
                      <td className="px-5 py-3">
                        <StarRow value={r.averageRating || r.ratings?.overAll} />
                        <p className="text-xs text-slate-500 mt-0.5">
                          {(r.averageRating || 0).toFixed(1)} / 5
                        </p>
                      </td>
                      <td className="px-5 py-3 max-w-xs">
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {r.ratings?.overAllComment || "No comment provided."}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-1 items-start">
                          <StatusBadge status={r.status} />
                          {r.isFeatured && <Badge variant="violet">Featured</Badge>}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-600">{formatDateTime(r.createdAt)}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button variant="ghost" size="sm" onClick={() => setViewing(r)} disabled={busy}>
                            <Eye size={13} />
                          </Button>
                          {r.status !== "approved" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              className="!bg-emerald-50 !text-emerald-700 !border-emerald-200 hover:!bg-emerald-100"
                              onClick={() => approve(r)}
                              loading={busy}
                            >
                              <Check size={13} /> Approve
                            </Button>
                          )}
                          {r.status !== "rejected" && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => setConfirmReject(r)}
                              disabled={busy}
                            >
                              <X size={13} /> Reject
                            </Button>
                          )}
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

      {/* ── View detail modal ── */}
      {viewing && (
        <Modal
          isOpen
          onClose={() => setViewing(null)}
          title="Review details"
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => toggleFeatured(viewing)}>
                <Star size={14} className={viewing.isFeatured ? "fill-amber-400 text-amber-400" : ""} />
                {viewing.isFeatured ? "Unfeature" : "Mark featured"}
              </Button>
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
                  <p className="text-sm font-semibold text-slate-900">
                    {viewing.sessionInfo?.reviewerName || userName(viewing.user)}
                  </p>
                  <p className="text-xs text-slate-500">{viewing.user?.email}</p>
                </div>
              </div>
              <StatusBadge status={viewing.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <MessageSquareQuote size={14} className="text-slate-400 shrink-0" />
                <span>Trainer: <span className="font-medium text-slate-900">{viewing.sessionInfo?.trainerName || trainerName(viewing.trainer)}</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar size={14} className="text-slate-400 shrink-0" />
                <span>Session: {formatDateTime(viewing.sessionInfo?.sessionDate)}</span>
              </div>
              {viewing.sessionInfo?.city && (
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span>{viewing.sessionInfo.city}</span>
                </div>
              )}
              {viewing.sessionInfo?.whatsappNumber && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span>{viewing.sessionInfo.whatsappNumber}</span>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-4">
              {RATING_ROWS.map((row) => {
                const val = viewing.ratings?.[row.key];
                const comment = viewing.ratings?.[row.commentKey];
                if (val === undefined) return null;
                return (
                  <div key={row.key} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{row.label}</p>
                      {comment && <p className="text-xs text-slate-500 mt-0.5 max-w-xs">{comment}</p>}
                    </div>
                    <StarRow value={val} />
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}

      {/* ── Reject confirm ── */}
      <ConfirmDialog
        isOpen={!!confirmReject}
        onClose={() => setConfirmReject(null)}
        onConfirm={reject}
        title="Reject this review?"
        message="The reviewer will not be notified, and this review will stay hidden from the trainer's public profile."
        confirmLabel="Reject"
        loading={actingId === confirmReject?._id}
      />

      {/* ── Delete confirm ── */}
      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={removeReview}
        title="Delete this review?"
        message="This will permanently remove the review. This action cannot be undone."
        confirmLabel="Delete"
        loading={actingId === confirmDelete?._id}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
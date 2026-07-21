"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Star,
  BadgeCheck,
  Edit,
  Trash2,
  Calendar,
  MessageSquare,
  TrendingUp,
  User,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { reviewsAPI } from "../../lib/api";

const SORT_OPTIONS = ["Newest", "Oldest", "Highest", "Lowest"];
const RATING_OPTIONS = ["All", "5", "4", "3", "2", "1"];

const RATING_CATEGORIES = [
  { key: "overAll",        label: "Overall impression" },
  { key: "delivery",       label: "Delivery" },
  { key: "contentQuality", label: "Content quality" },
  { key: "engagement",     label: "Engagement" },
];

export default function MyReviews() {
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    approvedReviews: 0,
  });
  const [deleteReview, setDeleteReview] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await reviewsAPI.getMine();
      const raw = res?.data?.reviews || [];

      const mapped = raw.map((review) => ({
        _id: review?._id,
        trainerId: review?.trainer?.trainerId || "",
        trainerName: review?.trainer?.fullName || "Trainer",
        trainerRole: review?.trainer?.subjectLine || "Trainer",
        company: review?.trainer?.companyName || "",
        trainerImage: review?.trainer?.profilePhoto?.url || "",
        verified: review?.trainer?.status === "approved",
        workshopTitle: review?.workshop?.basicInformation?.title || "",
        averageRating: Number(review?.averageRating) || 0,
        ratings: {
          overAll: Number(review?.ratings?.overAll) || 0,
          delivery: Number(review?.ratings?.delivery) || 0,
          contentQuality: Number(review?.ratings?.contentQuality) || 0,
          engagement: Number(review?.ratings?.engagement) || 0,
          overAllComment: review?.ratings?.overAllComment || "",
        },
        sessionInfo: {
          city: review?.sessionInfo?.city || "",
        },
        status: review?.status || "pending",
        createdAt: review?.createdAt || new Date().toISOString(),
      }));

      setReviews(mapped);

      const totalReviews = mapped.length;
      const averageRating =
        totalReviews === 0
          ? 0
          : Number(
              (
                mapped.reduce((sum, item) => sum + item.averageRating, 0) / totalReviews
              ).toFixed(1)
            );
      const approvedReviews = mapped.filter((r) => r.status === "approved").length;

      setStats({ totalReviews, averageRating, approvedReviews });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    let data = [...reviews];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((review) => {
        const trainerName = review.trainerName?.toLowerCase?.() || "";
        const comment = review.ratings.overAllComment?.toLowerCase?.() || "";
        const workshop = review.workshopTitle?.toLowerCase?.() || "";
        return trainerName.includes(q) || comment.includes(q) || workshop.includes(q);
      });
    }

    if (ratingFilter !== "All") {
      data = data.filter(
        (item) => Math.round(item.averageRating) === Number(ratingFilter)
      );
    }

    switch (sortBy) {
      case "Newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "Highest":
        data.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "Lowest":
        data.sort((a, b) => a.averageRating - b.averageRating);
        break;
      default:
        break;
    }

    return data;
  }, [reviews, search, ratingFilter, sortBy]);

  // ─── Edit → redirect to the full review form, pre-filled ───────────
  // Backend has no PATCH-partial-field endpoint, and updateReview
  // replaces the whole `ratings` + `sessionInfo` subdocuments, so the
  // full review form (which already collects every field) is reused
  // instead of a separate modal.
  const handleEditClick = (review) => {
    if (!review.trainerId) {
      toast.error("Can't edit this review — trainer reference is missing.");
      return;
    }
    router.push(`/review/${review.trainerId}?editId=${review._id}`);
  };

  const openDelete = (review) => setDeleteReview(review);
  const closeDeleteModal = () => {
    if (isDeleting) return;
    setDeleteReview(null);
  };

  const handleDeleteReview = async () => {
    if (!deleteReview?._id) return;
    try {
      setIsDeleting(true);
      await reviewsAPI.deleteMyReview(deleteReview._id);
      toast.success("Review deleted successfully");
      setDeleteReview(null);
      await fetchMyReviews();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Reviews</h1>
          <p className="mt-1 text-slate-500">
            Manage all reviews you&apos;ve written for trainers.
          </p>
        </div>

        <Link
          href="/find-trainer"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Find More Trainers
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Total Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {stats.totalReviews}
              </h2>
            </div>
            <MessageSquare className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Average Rating</p>
              <h2 className="mt-2 flex items-center gap-2 text-3xl font-bold text-slate-900">
                {stats.averageRating}
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </h2>
            </div>
            <TrendingUp className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Approved Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {stats.approvedReviews}
              </h2>
            </div>
            <BadgeCheck className="h-10 w-10 text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-200"
          >
            {RATING_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "All" : `${option} Star${option === "1" ? "" : "s"}`}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-200"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border bg-white p-10 text-center text-slate-600">
          Loading reviews...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && filteredReviews.length === 0 && (
        <div className="rounded-2xl border bg-white p-16 text-center">
          <MessageSquare className="mx-auto h-16 w-16 text-slate-300" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900">No Reviews Found</h2>
          <p className="mt-2 text-slate-500">
            Start reviewing trainers after attending sessions.
          </p>
        </div>
      )}

      {!loading && !error && filteredReviews.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                    {review.trainerImage ? (
                      <img
                        src={review.trainerImage}
                        alt={review.trainerName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-slate-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-lg font-bold text-slate-900">
                        {review.trainerName}
                      </h2>
                      {review.verified && (
                        <BadgeCheck className="h-5 w-5 shrink-0 fill-blue-100 text-blue-600" />
                      )}
                      {review.status === "approved" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
                          <CheckCircle2 className="h-3 w-3" /> Approved
                        </span>
                      )}
                      {review.status === "pending" && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-600">
                          Pending
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-500">{review.trainerRole}</p>

                    {review.company && (
                      <p className="text-xs text-slate-400">{review.company}</p>
                    )}
                    {review.workshopTitle && (
                      <p className="mt-0.5 text-xs font-medium text-blue-500">
                        Workshop: {review.workshopTitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(review.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-slate-700">
                    {review.averageRating.toFixed(1)}/5
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3">
                  {RATING_CATEGORIES.map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{label}</span>
                      <span className="flex items-center gap-0.5 font-semibold text-slate-700">
                        {review.ratings[key]}
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </span>
                    </div>
                  ))}
                </div>

                {review.ratings.overAllComment && (
                  <p className="mt-4 break-words leading-7 text-slate-600">
                    {review.ratings.overAllComment}
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                    {review.sessionInfo.city && (
                      <div className="mt-1 text-xs text-slate-400">
                        Session in {review.sessionInfo.city}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(review)}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => openDelete(review)}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>

                    {review.trainerId && (
                      <Link
                        href={`/trainer-profile/${review.trainerId}`}
                        className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-black"
                      >
                        View Trainer
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-3 text-xl font-bold text-slate-900">Delete Review?</h2>
            <p className="mb-6 text-slate-500">This action cannot be undone.</p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteReview}
                disabled={isDeleting}
                className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
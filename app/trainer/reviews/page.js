"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageSquare,
  User,
  Filter,
  TrendingUp,
  Award,
  Eye,
  ThumbsUp,
} from "lucide-react";

import { trainerDashboardAPI } from "../../lib/api";

export default function TrainerMyReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  useEffect(() => {
    fetchReviews();
  }, []);

  // ─── GET /api/reviews/trainer-dashboard/my-reviews ─────────────
  // Backend populates: user (firstName, lastName — User model has
  // no fullName/profilePhoto), workshop (basicInformation.title)
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await trainerDashboardAPI.getMyReviews();
      const raw = res?.data?.reviews || [];

      const mapped = raw.map((review) => {
        const first = review.user?.firstName || "";
        const last = review.user?.lastName || "";
        const reviewerName = `${first} ${last}`.trim() || "Anonymous User";

        return {
          _id: review?._id,
          reviewerName,
          reviewerImage: "", // User model has no profilePhoto field
          rating: Number(review?.averageRating) || 0,
          ratings: {
            overAll: Number(review?.ratings?.overAll) || 0,
            delivery: Number(review?.ratings?.delivery) || 0,
            contentQuality: Number(review?.ratings?.contentQuality) || 0,
            engagement: Number(review?.ratings?.engagement) || 0,
          },
          comment: review?.ratings?.overAllComment || "",
          workshopTitle: review?.workshop?.basicInformation?.title || "",
          featured: review?.isFeatured || false,
          status: review?.status || "pending",
          createdAt: review?.createdAt || null,
          userId: review?.user?._id,
        };
      });

      setReviews(mapped);
      setFilteredReviews(mapped);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = [...reviews];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.reviewerName.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q) ||
          r.workshopTitle.toLowerCase().includes(q)
      );
    }

    if (ratingFilter !== "All") {
      data = data.filter((r) => Math.round(r.rating) === Number(ratingFilter));
    }

    setFilteredReviews(data);
    setCurrentPage(1);
  }, [search, ratingFilter, reviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (
      reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const totalReviews = reviews.length;
  const featuredReviews = reviews.filter((r) => r.featured).length;
  const fiveStarReviews = reviews.filter((r) => Math.round(r.rating) === 5).length;

  // ── Pagination (was computed but never applied before — fixed) ──
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage) || 1;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-500">Loading Reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchReviews}
            className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Reviews</h1>
          <p className="text-slate-500 mt-1">
            See what learners are saying about you.
          </p>
        </div>

        <Link
          href="/trainer/profile"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <Eye size={18} />
          View Public Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Reviews</p>
              <h2 className="text-3xl font-bold mt-2">{totalReviews}</h2>
            </div>
            <MessageSquare className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">Average Rating</p>
              <h2 className="text-3xl font-bold mt-2 flex items-center gap-2">
                {averageRating}
                <Star className="fill-yellow-400 text-yellow-400" size={22} />
              </h2>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">Featured Reviews</p>
              <h2 className="text-3xl font-bold mt-2">{featuredReviews}</h2>
            </div>
            <Award className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm">5 Star Reviews</p>
              <h2 className="text-3xl font-bold mt-2">{fiveStarReviews}</h2>
            </div>
            <BadgeCheck className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div className="relative">
            <Filter
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none"
            >
              <option>All</option>
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List — now correctly uses the paginated slice */}
      <div className="space-y-6">
        {currentReviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <MessageSquare className="mx-auto text-slate-300 mb-4" size={60} />
            <h3 className="text-xl font-bold text-slate-700">No Reviews Found</h3>
            <p className="text-slate-500 mt-2">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          currentReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
            >
              {/* Top */}
              <div className="p-6 flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="flex gap-5">
                  <img
                    src={review.reviewerImage || "/Images/default-user.png"}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-bold text-slate-900">
                        {review.reviewerName}
                      </h2>

                      {review.featured && (
                        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                          Featured Review
                        </span>
                      )}

                      {review.status === "pending" && (
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                          Pending Approval
                        </span>
                      )}
                    </div>

                    <p className="text-slate-500 text-sm mt-1">
                      {review.workshopTitle || "General Training"}
                    </p>

                    <div className="flex items-center gap-1 mt-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={
                            star <= Math.round(review.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }
                        />
                      ))}
                      <span className="ml-2 font-semibold">
                        {review.rating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-slate-500 whitespace-nowrap">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : "—"}
                </div>
              </div>

              {/* Comment */}
              {review.comment && (
                <div className="px-6 pb-6">
                  <p className="text-slate-700 leading-7">{review.comment}</p>
                </div>
              )}

              {/* Bottom */}
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ThumbsUp size={18} />
                  Helpful Review
                </div>

                <div className="flex items-center gap-3">
                  {/* No backend endpoint yet for viewing a learner's
                      profile or replying to a review from the trainer
                      side — disabled until that's built */}
                  <button
                    disabled
                    title="Coming soon"
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-400 cursor-not-allowed"
                  >
                    View User
                  </button>

                  <button
                    disabled
                    title="Coming soon"
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-400 cursor-not-allowed"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Section — uses full filtered list (all pages), not just current page */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Rating Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold mb-6">Rating Distribution</h2>

          {[5, 4, 3, 2, 1].map((star) => {
            const count = filteredReviews.filter(
              (r) => Math.round(r.rating) === star
            ).length;
            const percent = filteredReviews.length
              ? (count / filteredReviews.length) * 100
              : 0;

            return (
              <div key={star} className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 w-12">
                  <span className="font-medium">{star}</span>
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                </div>

                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <span className="text-sm text-slate-500 w-10 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold mb-5">Recent Reviews</h2>

          <div className="space-y-5">
            {filteredReviews.length === 0 && (
              <p className="text-sm text-slate-400">No reviews yet.</p>
            )}
            {filteredReviews.slice(0, 5).map((review) => (
              <div key={review._id} className="flex gap-3">
                <img
                  src={review.reviewerImage || "/Images/default-user.png"}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{review.reviewerName}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {review.comment || "No comment"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold mb-5">Analytics</h2>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-500">Positive Reviews</p>
              <h3 className="text-3xl font-bold text-green-600">
                {Math.round(
                  (filteredReviews.filter((r) => r.rating >= 4).length /
                    (filteredReviews.length || 1)) *
                    100
                )}
                %
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Average Rating</p>
              <h3 className="text-3xl font-bold text-blue-600">{averageRating}</h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Reviews</p>
              <h3 className="text-3xl font-bold text-purple-600">{totalReviews}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-100"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-11 h-11 rounded-xl font-semibold transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white border hover:bg-slate-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-slate-100"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-800">
          {currentReviews.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-800">
          {filteredReviews.length}
        </span>{" "}
        review{filteredReviews.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
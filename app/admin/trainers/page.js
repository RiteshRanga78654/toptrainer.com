"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { Button, Toast } from "../../components/ui";
import { trainersAPI, cn } from "../../lib/api";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await trainersAPI.AgetAll();
      const raw = res?.data?.trainers || res?.data?.data || [];
      setTrainers(raw);
    } catch (err) {
      console.error("Failed to fetch trainers:", err?.response?.data || err.message);
      setToast({ type: "error", message: "Failed to fetch trainers" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleToggleStatus = async (trainer, nextStatus) => {
    try {
      await trainersAPI.updateStatus(trainer._id, { status: nextStatus });

      setTrainers((prev) =>
        prev.map((item) =>
          item._id === trainer._id ? { ...item, status: nextStatus } : item
        )
      );

      setToast({
        type: "success",
        message: nextStatus === "approved" ? "Trainer activated" : "Trainer deactivated",
      });

      setFilterStatus("all");
    } catch (err) {
      console.error("Status update failed:", err?.response?.data || err.message);
      setToast({ type: "error", message: "Failed to update trainer status" });
    }
  };

  const handleToggleFeatured = async (trainer) => {
    const nextFeatured = !trainer.isFeatured;

    try {
      await trainersAPI.updateFeatured(trainer._id, { isFeatured: nextFeatured });

      setTrainers((prev) =>
        prev.map((item) =>
          item._id === trainer._id ? { ...item, isFeatured: nextFeatured } : item
        )
      );

      setToast({
        type: "success",
        message: nextFeatured ? "Trainer featured" : "Trainer unfeatured",
      });
    } catch (err) {
      console.error("Featured update failed:", err?.response?.data || err.message);
      setToast({ type: "error", message: "Failed to update featured status" });
    }
  };

  const filtered = useMemo(() => {
    return trainers.filter((t) => {
      const name = t?.fullName || "";
      const company = t?.companyName || "";
      const industry = Array.isArray(t?.expertiseDomain?.industry)
        ? t.expertiseDomain.industry.join(", ")
        : t?.expertiseDomain?.industry || "";

      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        company.toLowerCase().includes(search.toLowerCase()) ||
        industry.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "approved" && t?.status === "approved") ||
        (filterStatus === "inactive" && t?.status === "inactive");

      return matchesSearch && matchesStatus;
    });
  }, [trainers, search, filterStatus]);

  return (
    <div className="space-y-4">
      {toast && (
        <Toast type={toast.type} onClose={() => setToast(null)}>
          {toast.message}
        </Toast>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full rounded-md border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-400"
            placeholder="Search trainer, company, industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="approved">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <Button onClick={fetchTrainers}>Refresh</Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-5 py-4 font-semibold text-gray-700">Trainer Name</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Company Name</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Industry Name</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">Featured</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">Status</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-center text-gray-500">
                    Loading trainers...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-center text-gray-500">
                    No trainers found
                  </td>
                </tr>
              ) : (
                filtered.map((trainer) => {
                  const isActive = trainer?.status === "approved";
                  const industries = Array.isArray(trainer?.expertiseDomain?.industry)
                    ? trainer.expertiseDomain.industry.join(", ")
                    : trainer?.expertiseDomain?.industry || "-";

                  return (
                    <tr key={trainer._id} className="border-t border-gray-100">
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {trainer?.fullName || "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {trainer?.companyName || "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {industries}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(trainer)}
                          className="inline-flex items-center justify-center"
                          aria-label={
                            trainer?.isFeatured ? "Remove featured" : "Mark as featured"
                          }
                        >
                          <Star
                            className={cn(
                              "h-5 w-5 transition-colors",
                              trainer?.isFeatured
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        </button>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                            isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          )}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleStatus(
                              trainer,
                              isActive ? "inactive" : "approved"
                            )
                          }
                          className={cn(
                            "relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200",
                            isActive ? "bg-green-500" : "bg-red-400"
                          )}
                          aria-label={isActive ? "Deactivate trainer" : "Activate trainer"}
                        >
                          <span
                            className={cn(
                              "inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200",
                              isActive ? "translate-x-8" : "translate-x-1"
                            )}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
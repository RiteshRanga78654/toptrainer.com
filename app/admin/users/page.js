"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Mail } from "lucide-react";
import { Button, Toast } from "../../components/ui";
import { userAPI, cn, formatDate } from "../../lib/api";
import QuickSendModal from "../../components/admin/communications/QuickSendModal";
import WhatsAppIcon from "../../components/admin/communications/WhatsAppIcon";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);
  const [quickModal, setQuickModal] = useState({ open: false, recipient: null, mode: "email" });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getAll();
      const raw = res?.data?.users || res?.data?.data || [];
      setUsers(raw);
    } catch (err) {
      console.error("Failed to fetch users:", err?.response?.data || err.message);
      setToast({ type: "error", message: "Failed to fetch users" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user, nextStatus) => {
    try {
      await userAPI.updateStatus(user._id, { status: nextStatus });

      setUsers((prev) =>
        prev.map((item) =>
          item._id === user._id ? { ...item, status: nextStatus } : item
        )
      );

      setToast({
        type: "success",
        message: nextStatus === "active" ? "User activated" : "User deactivated",
      });
    } catch (err) {
      console.error("Status update failed:", err?.response?.data || err.message);
      setToast({ type: "error", message: "Failed to update user status" });
    }
  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const username =
        `${u?.firstName || ""} ${u?.lastName || ""}`.trim() || "";
      const email = u?.email || "";
      const phone = u?.phoneNumber ? String(u.phoneNumber) : "";

      const matchesSearch =
        username.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase()) ||
        phone.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && u?.status === "active") ||
        (filterStatus === "inactive" && u?.status === "inactive");

      return matchesSearch && matchesStatus;
    });
  }, [users, search, filterStatus]);

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
            placeholder="Search username, email, phone..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <Button onClick={fetchUsers}>Refresh</Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-5 py-4 font-semibold text-gray-700">Username</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Email</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Phone</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Joined Date</th>
                <th className="px-5 py-4 font-semibold text-gray-700">Last Online</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">Mail</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">WhatsApp</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">Status</th>
                <th className="px-5 py-4 text-center font-semibold text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                      <td colSpan={9} className="px-5 py-6 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const isActive = user?.status === "active";
                  const username =
                    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "-";
                  const email = user?.email || "-";
                  const phone = user?.phoneNumber ? String(user.phoneNumber) : "-";
                  const joinedDate = user?.createdAt;
                  const lastOnline = user?.lastSeen;

                  return (
                    <tr key={user._id || user.id} className="border-t border-gray-100">
                      <td className="px-5 py-4 font-medium text-gray-900">{username}</td>

                      <td className="px-5 py-4 text-gray-700">{email}</td>

                      <td className="px-5 py-4 text-gray-700">{phone}</td>

                      <td className="px-5 py-4 text-gray-700">
                        {formatDate(joinedDate)}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {formatDate(lastOnline)}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {email !== "-" ? (
                          <button
                            onClick={() =>
                              setQuickModal({ open: true, recipient: { id: user._id, type: "user", name: username, email: email, phone: user?.phoneNumber ? String(user.phoneNumber) : "" }, mode: "email" })
                            }
                            className="inline-flex items-center justify-center rounded-lg p-2 text-blue-500 transition-all hover:bg-blue-50 hover:scale-110"
                            title={`Send email to ${username}`}
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {user?.phoneNumber ? (
                          <button
                            onClick={() =>
                              setQuickModal({ open: true, recipient: { id: user._id, type: "user", name: username, email: email, phone: String(user.phoneNumber) }, mode: "whatsapp" })
                            }
                            className="inline-flex items-center justify-center rounded-lg p-2 text-emerald-500 transition-all hover:bg-emerald-50 hover:scale-110"
                            title={`Send WhatsApp to ${username}`}
                          >
                            <WhatsAppIcon size={16} />
                          </button>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
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
                              user,
                              isActive ? "inactive" : "active"
                            )
                          }
                          className={cn(
                            "relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200",
                            isActive ? "bg-green-500" : "bg-red-400"
                          )}
                          aria-label={isActive ? "Deactivate user" : "Activate user"}
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

      <QuickSendModal
        isOpen={quickModal.open}
        onClose={() => setQuickModal({ open: false, recipient: null, mode: "email" })}
        recipient={quickModal.recipient}
        mode={quickModal.mode}
      />
    </div>
  );
}
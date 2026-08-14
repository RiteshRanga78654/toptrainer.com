"use client";
import { Users } from "lucide-react";
import { Card } from "../ui";
import { formatDate } from "../../lib/api";

const USER_TYPE_STYLES = {
  Student: "bg-blue-50 text-blue-700 border-blue-200",
  Professional: "bg-purple-50 text-purple-700 border-purple-200",
  "Own Business": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getAvatar(user) {
  const url = user?.avatar?.url || user?.profileImage;
  if (url) return <img src={url} alt="" className="h-9 w-9 rounded-full object-cover" />;

  const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const initials = name
    ? name
        .split(/\s+/)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 shrink-0">
      {initials}
    </div>
  );
}

export default function EntityUsers({ users = [], entityName = "", icon = "", emptyText = "" }) {
  return (
    <Card className="p-4 border border-slate-200 rounded-xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {users.length} User{users.length === 1 ? "" : "s"}
            </div>
            <div className="text-xs text-slate-400">
              {entityName ? `${icon || ""} ${entityName}`.trim() : "Interested users"}
            </div>
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">
          {emptyText || "No users found."}
        </p>
      ) : (
        <div className="mt-3 max-h-80 overflow-y-auto space-y-2">
          {users.map((user) => {
            const name = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Unnamed User";
            const userType = user?.userType || "";

            return (
              <div
                key={user._id || user.id}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                {getAvatar(user)}

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-900 truncate">{name}</div>
                  <div className="text-xs text-slate-400 truncate">{user?.email || "—"}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {userType && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${
                        USER_TYPE_STYLES[userType] || "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {userType}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {formatDate(user?.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

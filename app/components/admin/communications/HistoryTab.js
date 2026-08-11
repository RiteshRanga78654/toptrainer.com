"use client"

import { useEffect, useState } from "react"
import { Badge, Toast } from "../../ui"
import { communicationAPI, formatDate } from "../../../lib/api"
import { Mail, Loader2, Users, ChevronLeft, ChevronRight } from "lucide-react"
import WhatsAppIcon from "./WhatsAppIcon"

const AUDIENCE_LABELS = {
  all: "All Users & Trainers",
  all_users: "All Users",
  all_trainers: "All Trainers",
  selected: "Selected",
  test: "Test",
}

export default function HistoryTab() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [toast, setToast] = useState(null)

  const fetchHistory = async (p = 1) => {
    setLoading(true)
    try {
      const res = await communicationAPI.getHistory({ page: p, limit: 10 })
      setRows(res?.data?.communications || [])
      setPages(res?.data?.pages || 1)
      setTotal(res?.data?.total || 0)
    } catch {
      setToast({ type: "error", message: "Failed to load message history" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchHistory(page) }, [page])

  return (
    <div className="space-y-4">
      {toast && <Toast type={toast.type} onClose={() => setToast(null)}>{toast.message}</Toast>}

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left">
                <th className="px-5 py-3.5 font-semibold text-slate-700">Message</th>
                <th className="px-5 py-3.5 font-semibold text-slate-700">Channel</th>
                <th className="px-5 py-3.5 font-semibold text-slate-700">Audience</th>
                <th className="px-5 py-3.5 text-center font-semibold text-slate-700">Recipients</th>
                <th className="px-5 py-3.5 font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3.5 font-semibold text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    <Loader2 size={18} className="animate-spin inline mr-2" /> Loading history...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">No messages sent yet.</td>
                </tr>
              ) : (
                rows.map((r) => {
                  const title = r.subject || r.whatsappMessage || "(no message)"
                  return (
                    <tr key={r._id} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-slate-900 max-w-[260px] truncate">{title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {r.isTest ? "Test message" : r.audience ? AUDIENCE_LABELS[r.audience] : ""}
                          {r.status === "scheduled" && r.scheduledAt ? ` · scheduled ${formatDate(r.scheduledAt)}` : ""}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1.5">
                          {r.channels.includes("email") && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 text-blue-600 text-[11px] font-semibold px-2 py-1">
                              <Mail size={11} /> Email
                            </span>
                          )}
                          {r.channels.includes("whatsapp") && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2 py-1">
                              <WhatsAppIcon size={11} /> WhatsApp
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                          <Users size={12} className="text-slate-400" />
                          {AUDIENCE_LABELS[r.audience] || r.audience}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center text-sm text-slate-700 font-medium">
                        {r.totalRecipients ?? r.recipients?.length ?? 0}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {(r.counts?.sent || 0) > 0 && (
                            <Badge variant="success">{r.counts.sent} sent</Badge>
                          )}
                          {(r.counts?.failed || 0) > 0 && (
                            <Badge variant="error">{r.counts.failed} failed</Badge>
                          )}
                          {(r.counts?.pending || 0) > 0 && (
                            <Badge variant="warning">{r.counts.pending} pending</Badge>
                          )}
                          {r.status === "scheduled" && <Badge variant="info">Scheduled</Badge>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(r.sentAt || r.createdAt)}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">{total} messages total</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-xs text-slate-600 font-medium">Page {page} of {pages}</span>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

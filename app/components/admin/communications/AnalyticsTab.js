"use client"

import { useEffect, useState } from "react"
import { Badge } from "../../ui"
import { communicationAPI, formatDate } from "../../../lib/api"
import { Mail, Loader2, TrendingUp, MousePointerClick, MailOpen, Send } from "lucide-react"
import WhatsAppIcon from "./WhatsAppIcon"

export default function AnalyticsTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await communicationAPI.getAnalytics()
        setData(res?.data?.data || null)
      } catch {
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 size={20} className="animate-spin mr-2" /> Loading analytics...
      </div>
    )
  }

  const cards = [
    { label: "Total Emails Sent", value: data?.totalEmailsSent ?? 0, icon: <Mail size={18} />, color: "#3b82f6", bg: "bg-blue-50" },
    { label: "Total WhatsApp Sent", value: data?.totalWhatsAppSent ?? 0, icon: <WhatsAppIcon size={18} />, color: "#10b981", bg: "bg-emerald-50" },
    { label: "Delivery Rate", value: `${data?.deliveryRate ?? 0}%`, icon: <Send size={18} />, color: "#8b5cf6", bg: "bg-violet-50" },
    { label: "Open Rate (Email)", value: `${data?.openRate ?? 0}%`, icon: <MailOpen size={18} />, color: "#f59e0b", bg: "bg-amber-50" },
    { label: "Click Rate", value: `${data?.clickRate ?? 0}%`, icon: <MousePointerClick size={18} />, color: "#f43f5e", bg: "bg-rose-50" },
    { label: "Total Messages", value: data?.totalSent ?? 0, icon: <TrendingUp size={18} />, color: "#0d9488", bg: "bg-teal-50" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color + "1a", color: c.color }}>
                {c.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-blue-600" />
          <h3 className="font-semibold text-slate-900">Recent Campaign Activity</h3>
        </div>

        {(data?.recentCampaigns || []).length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">No campaigns yet. Send your first message from the Compose tab.</p>
        ) : (
          <div className="space-y-3">
            {data.recentCampaigns.map((c) => {
              const title = c.subject || c.whatsappMessage || "(untitled)"
              const sent = (c.stats?.emailSent || 0) + (c.stats?.whatsappSent || 0)
              return (
                <div key={c._id} className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 hover:bg-slate-50/60">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${c.channels.includes("whatsapp") ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                    {c.channels.includes("whatsapp") ? <WhatsAppIcon size={16} /> : <Mail size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{title}</p>
                    <p className="text-xs text-slate-400">
                      {formatDate(c.createdAt)} · {c.isTest ? "Test" : c.audience} · {sent} sent
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {c.channels.includes("email") && <Badge variant="default">Email</Badge>}
                    {c.channels.includes("whatsapp") && <Badge variant="success">WhatsApp</Badge>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

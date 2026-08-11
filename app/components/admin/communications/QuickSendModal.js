"use client"

import { useEffect, useState } from "react"
import { Modal, Button, Toast, Textarea } from "../../ui"
import { communicationAPI } from "../../../lib/api"
import { Mail, Send, CalendarClock } from "lucide-react"
import WhatsAppIcon from "./WhatsAppIcon"

const WHATSAPP_LIMIT = 2000

export default function QuickSendModal({ isOpen, onClose, recipient, mode }) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null)
  const [tab, setTab] = useState("now")

  useEffect(() => {
    if (isOpen) {
      setSubject("")
      setMessage("")
      setScheduledAt("")
      setSending(false)
      setToast(null)
      setTab("now")
    }
  }, [isOpen])

  const isEmail = mode === "email"
  const recipientLabel = recipient?.name || "this recipient"

  const handleSend = async () => {
    if (isEmail && !subject.trim()) {
      setToast({ type: "error", message: "Subject is required for email" })
      return
    }
    if (!message.trim()) {
      setToast({ type: "error", message: "Message cannot be empty" })
      return
    }

    setSending(true)
    try {
      await communicationAPI.send({
        channels: [mode],
        audience: "selected",
        recipients: [
          {
            id: recipient?.id,
            type: recipient?.type === "trainer" ? "trainer" : "user",
            name: recipient?.name,
            email: recipient?.email,
            phone: recipient?.phone,
          },
        ],
        subject: isEmail ? subject : "",
        htmlBody: isEmail ? message.split("\n").map(l => l.trim() ? `<p>${l}</p>` : "<br/>").join("") : "",
        whatsappMessage: isEmail ? "" : message,
        scheduledAt: tab === "schedule" && scheduledAt ? scheduledAt : null,
      })
      setToast({ type: "success", message: `${isEmail ? "Email" : "WhatsApp message"} ${tab === "schedule" ? "scheduled" : "sent"} to ${recipientLabel}` })
      setTimeout(() => onClose(), 1200)
    } catch (err) {
      setToast({ type: "error", message: err?.response?.data?.message || "Failed to send message" })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {toast && <Toast type={toast.type} onClose={() => setToast(null)}>{toast.message}</Toast>}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEmail ? `Quick Email to ${recipientLabel}` : `Quick WhatsApp to ${recipientLabel}`}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSend} loading={sending} icon={tab === "schedule" ? <CalendarClock size={15} /> : <Send size={15} />}>
              {tab === "schedule" ? "Schedule" : "Send"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isEmail ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}>
              {isEmail ? <Mail size={16} /> : <WhatsAppIcon size={16} />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{recipient?.name || "Recipient"}</p>
              <p className="text-xs text-slate-500 truncate">
                {isEmail ? (recipient?.email || "no email") : (recipient?.phone || "no phone")}
              </p>
            </div>
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-400">{recipient?.type}</span>
          </div>

          <div className="flex gap-2">
            {[
              { key: "now", label: "Send now" },
              { key: "schedule", label: "Schedule" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t.key ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "schedule" && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          )}

          {isEmail && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {isEmail ? "Message" : "WhatsApp message"}
            </label>
            <Textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, WHATSAPP_LIMIT))}
              placeholder={isEmail ? "Write your message..." : "Type your WhatsApp message..."}
            />
            <p className="text-right text-xs text-slate-400 mt-1">
              {isEmail ? "Plain text is converted to HTML" : `${message.length} / ${WHATSAPP_LIMIT}`}
            </p>
          </div>

          {(recipient?.email || recipient?.phone) && (
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-500 mb-1.5">Live preview</p>
              {isEmail ? (
                <div className="text-sm text-slate-800">
                  <p className="font-semibold">{subject || "Subject"}</p>
                  <p className="text-slate-600 whitespace-pre-wrap line-clamp-3">{message || "Your message will appear here"}</p>
                </div>
              ) : (
                <div className="rounded-2xl rounded-tl-sm bg-[#e7ffdb] px-3 py-2 text-sm text-slate-800 max-w-[85%] shadow-sm">
                  <p className="whitespace-pre-wrap line-clamp-3">{message || "Your message will appear here"}</p>
                  <p className="text-right text-[10px] text-slate-400 mt-1">via WhatsApp</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

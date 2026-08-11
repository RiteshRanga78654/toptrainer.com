"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Modal, Textarea, Toast } from "../../ui"
import { communicationAPI } from "../../../lib/api"
import {
  Mail, Send, CalendarClock, Users, Save, Search, X,
  Bold, Italic, Underline, List, Link2, Heading2, Eye, CheckCircle2,
} from "lucide-react"
import WhatsAppIcon from "./WhatsAppIcon"

const WHATSAPP_LIMIT = 2000

const AUDIENCES = [
  { key: "all_users", label: "All Users", desc: "Every registered user", icon: Users, grad: "from-blue-500 to-indigo-500" },
  { key: "all_trainers", label: "All Trainers", desc: "Every trainer on the platform", icon: Users, grad: "from-emerald-500 to-teal-500" },
  { key: "all", label: "All Users & Trainers", desc: "Everyone combined", icon: Users, grad: "from-violet-500 to-purple-500" },
  { key: "selected", label: "Selected Recipients", desc: "Pick specific users / trainers", icon: Search, grad: "from-amber-500 to-orange-500" },
]

const TEMPLATE_CATEGORIES = [
  "Workshop Notifications",
  "Event Announcements",
  "Trainer Updates",
  "Article Updates",
  "Marketing Campaigns",
  "Custom Messages",
]

function RichEditor({ value, onChange }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ""
    }
  }, [value])

  const exec = (command, arg = null) => {
    ref.current?.focus()
    document.execCommand(command, false, arg)
    if (onChange) onChange(ref.current?.innerHTML || "")
  }

  const toolbarBtn = (title, onClick, children) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
    >
      {children}
    </button>
  )

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 bg-white">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50 flex-wrap">
        {toolbarBtn("Bold", () => exec("bold"), <Bold size={14} />)}
        {toolbarBtn("Italic", () => exec("italic"), <Italic size={14} />)}
        {toolbarBtn("Underline", () => exec("underline"), <Underline size={14} />)}
        {toolbarBtn("Bullet list", () => exec("insertUnorderedList"), <List size={14} />)}
        {toolbarBtn("Heading", () => exec("formatBlock", "h3"), <Heading2 size={14} />)}
        {toolbarBtn("Insert link", () => {
          const url = window.prompt("Enter URL")
          if (url) exec("createLink", url)
        }, <Link2 size={14} />)}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current?.innerHTML || "")}
        className="min-h-[180px] px-4 py-3 text-sm text-slate-900 outline-none [&_h3]:text-base [&_h3]:font-bold [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-blue-600 [&_a]:underline [&_p]:mb-2"
        placeholder="Write your email body..."
      />
    </div>
  )
}

export default function ComposeTab({ templatePayload, onTemplateConsumed }) {
  const [channels, setChannels] = useState([])
  const [audience, setAudience] = useState("all")
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selected, setSelected] = useState([])

  const [subject, setSubject] = useState("")
  const [htmlBody, setHtmlBody] = useState("")
  const [whatsappMessage, setWhatsappMessage] = useState("")

  const [sendTab, setSendTab] = useState("now")
  const [scheduledAt, setScheduledAt] = useState("")
  const [sendTest, setSendTest] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [testPhone, setTestPhone] = useState("")

  const [showPreview, setShowPreview] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [templateCategory, setTemplateCategory] = useState(TEMPLATE_CATEGORIES[0])
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (templatePayload) {
      setSubject(templatePayload.subject || "")
      setHtmlBody(templatePayload.htmlBody || "")
      setWhatsappMessage(templatePayload.whatsappMessage || "")
      if (templatePayload.channels) setChannels(templatePayload.channels)
      onTemplateConsumed()
    }
  }, [templatePayload, onTemplateConsumed])

  const toggleChannel = (ch) => {
    setChannels((prev) => prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch])
  }

  useEffect(() => {
    if (audience !== "selected") return
    const timer = setTimeout(async () => {
      if (!search.trim()) { setResults([]); return }
      setSearching(true)
      try {
        const res = await communicationAPI.getRecipients({ search, type: "all" })
        setResults(res?.data?.recipients || [])
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [search, audience])

  const toggleRecipient = (r) => {
    setSelected((prev) => {
      const exists = prev.some((s) => s.id === r.id && s.type === r.type)
      return exists ? prev.filter((s) => !(s.id === r.id && s.type === r.type)) : [...prev, r]
    })
  }

  const removeRecipient = (id, type) =>
    setSelected((prev) => prev.filter((s) => !(s.id === id && s.type === type)))

  const recipientCount = useMemo(() => (audience === "selected" ? selected.length : 0), [audience, selected])
  const canSend = channels.length > 0 && (audience !== "selected" || selected.length > 0)

  const handleSend = async (isTest = false) => {
    if (!canSend && !isTest) {
      setToast({ type: "error", message: "Select at least one channel and a recipient group" })
      return
    }
    if (channels.includes("email") && !subject.trim()) {
      setToast({ type: "error", message: "Subject is required when Email is selected" })
      return
    }
    if (channels.includes("whatsapp") && !whatsappMessage.trim() && !isTest) {
      setToast({ type: "error", message: "WhatsApp message cannot be empty" })
      return
    }

    setSending(true)
    try {
      const res = await communicationAPI.send({
        channels,
        audience,
        recipients: audience === "selected" ? selected : [],
        subject,
        htmlBody,
        whatsappMessage,
        scheduledAt: sendTab === "schedule" ? scheduledAt : null,
        sendTest: isTest,
        testEmail: isTest ? testEmail : "",
        testPhone: isTest ? testPhone : "",
      })
      setToast({ type: "success", message: res?.data?.message || "Message sent" })
      if (!isTest && sendTab === "now") {
        setSubject(""); setHtmlBody(""); setWhatsappMessage(""); setSelected([])
      }
    } catch (err) {
      setToast({ type: "error", message: err?.response?.data?.message || "Failed to send message" })
    } finally {
      setSending(false)
    }
  }

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      setToast({ type: "error", message: "Template name is required" })
      return
    }
    setSaving(true)
    try {
      await communicationAPI.createTemplate({
        name: templateName,
        category: templateCategory,
        subject,
        htmlBody,
        whatsappMessage,
      })
      setToast({ type: "success", message: "Template saved" })
      setSaveOpen(false)
      setTemplateName("")
    } catch (err) {
      setToast({ type: "error", message: err?.response?.data?.message || "Failed to save template" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {toast && <Toast type={toast.type} onClose={() => setToast(null)}>{toast.message}</Toast>}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Recipients */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Users size={16} className="text-blue-600" /> Recipients
              {recipientCount > 0 && (
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-blue-600 text-white text-xs font-bold px-2.5 py-1">
                  <CheckCircle2 size={12} /> {recipientCount} selected
                </span>
              )}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {AUDIENCES.map((a) => {
                const active = audience === a.key
                return (
                  <button
                    key={a.key}
                    onClick={() => setAudience(a.key)}
                    className={`rounded-xl border p-3 text-left transition-all ${active ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20" : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"}`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${a.grad} text-white flex items-center justify-center mb-2`}>
                      <a.icon size={15} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{a.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{a.desc}</p>
                  </button>
                )
              })}
            </div>

            {audience === "selected" && (
              <div className="mt-4">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users & trainers by name or email..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>

                {selected.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selected.map((s) => (
                      <span key={`${s.type}-${s.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {s.name}
                        <button onClick={() => removeRecipient(s.id, s.type)} className="text-blue-400 hover:text-blue-700">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {search.trim() && (
                  <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100">
                    {searching ? (
                      <p className="px-4 py-3 text-sm text-slate-400">Searching...</p>
                    ) : results.length === 0 ? (
                      <p className="px-4 py-3 text-sm text-slate-400">No matching recipients</p>
                    ) : (
                      results.map((r) => {
                        const isSelected = selected.some((s) => s.id === r.id && s.type === r.type)
                        return (
                          <label key={`${r.type}-${r.id}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleRecipient(r)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate">{r.name}</p>
                              <p className="text-xs text-slate-500 truncate">{r.email || r.phone || "—"}</p>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                              {r.type}
                            </span>
                          </label>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Channels */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3">Channels</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggleChannel("email")}
                className={`rounded-xl border p-4 text-left transition-all ${channels.includes("email") ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-500/20" : "border-slate-200 hover:border-blue-200"}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${channels.includes("email") ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
                  <Mail size={17} />
                </div>
                <p className="text-sm font-semibold text-slate-900">Email</p>
                <p className="text-[11px] text-slate-500">Rich HTML with subject line</p>
              </button>

              <button
                onClick={() => toggleChannel("whatsapp")}
                className={`rounded-xl border p-4 text-left transition-all ${channels.includes("whatsapp") ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 ring-2 ring-emerald-500/20" : "border-slate-200 hover:border-emerald-200"}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${channels.includes("whatsapp") ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"}`}>
                  <WhatsAppIcon size={17} />
                </div>
                <p className="text-sm font-semibold text-slate-900">WhatsApp</p>
                <p className="text-[11px] text-slate-500">Text message with counter</p>
              </button>
            </div>
          </section>

          {/* Composer */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Message Composer</h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${showPreview ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                <Eye size={14} /> {showPreview ? "Hide preview" : "Live preview"}
              </button>
            </div>

            {channels.includes("email") && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
            )}

            {channels.includes("email") && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email body</label>
                <RichEditor value={htmlBody} onChange={setHtmlBody} />
              </div>
            )}

            {channels.includes("whatsapp") && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp message</label>
                <Textarea
                  rows={4}
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value.slice(0, WHATSAPP_LIMIT))}
                  placeholder="Type your WhatsApp message..."
                />
                <p className={`text-right text-xs mt-1 ${whatsappMessage.length >= WHATSAPP_LIMIT ? "text-red-500" : "text-slate-400"}`}>
                  {whatsappMessage.length} / {WHATSAPP_LIMIT}
                </p>
              </div>
            )}

            {channels.length === 0 && (
              <p className="text-sm text-slate-400 bg-slate-50 rounded-lg px-4 py-3">
                Select at least one channel above to start composing.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSaveOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Save size={14} /> Save as template
              </button>

              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setSendTest(!sendTest)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${sendTest ? "bg-amber-100 text-amber-700 border border-amber-200" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  Send test
                </button>
                <button
                  onClick={() => handleSend(false)}
                  disabled={!canSend || sending}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-xs font-semibold shadow-sm shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} /> {sending ? "Sending..." : "Send now"}
                </button>
              </div>
            </div>

            {sendTest && (
              <div className="grid sm:grid-cols-2 gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3">
                <div>
                  <label className="block text-xs font-medium text-amber-800 mb-1">Test email</label>
                  <input
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-amber-800 mb-1">Test phone</label>
                  <input
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <p className="text-xs text-amber-700 sm:col-span-2">
                  Sends a test to the addresses above without touching real recipients.
                </p>
                <div className="sm:col-span-2">
                  <button
                    onClick={() => handleSend(true)}
                    disabled={sending}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 text-white px-4 py-2 text-xs font-semibold disabled:opacity-50"
                  >
                    <Mail size={14} /> {sending ? "Sending..." : "Send test message"}
                  </button>
                </div>
              </div>
            )}

            {/* Send timing */}
            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
              <span className="text-xs font-semibold text-slate-600">When:</span>
              {[
                { key: "now", label: "Immediately" },
                { key: "schedule", label: "Schedule for later" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSendTab(t.key)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${sendTab === t.key ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {t.key === "schedule" ? <CalendarClock size={14} /> : <Send size={14} />} {t.label}
                </button>
              ))}
              {sendTab === "schedule" && (
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                />
              )}
            </div>
          </section>
        </div>

        {/* ── Right: live preview ── */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sticky top-5">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={15} className="text-slate-400" />
              <h3 className="font-semibold text-slate-900">Live Preview</h3>
            </div>

            {!showPreview && (
              <button
                onClick={() => setShowPreview(true)}
                className="w-full rounded-lg border-2 border-dashed border-slate-200 py-8 text-sm text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-colors"
              >
                Click to enable preview
              </button>
            )}

            {showPreview && channels.includes("email") && (
              <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[11px] text-slate-400 truncate">email preview</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-slate-900 mb-2">{subject || "Subject"}</p>
                  <div
                    className="text-sm text-slate-700 prose-sm"
                    dangerouslySetInnerHTML={{ __html: htmlBody || "<p>Your email body will appear here</p>" }}
                  />
                </div>
              </div>
            )}

            {showPreview && channels.includes("whatsapp") && (
              <div className="bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22><rect fill=%22%23efeae2%22 width=%22240%22 height=%22240%22/></svg>')] rounded-xl p-3 mb-4">
                <div className="rounded-2xl rounded-tl-sm bg-[#e7ffdb] px-3 py-2 text-sm text-slate-800 max-w-[90%] shadow-sm">
                  <p className="whitespace-pre-wrap break-words">{whatsappMessage || "Your WhatsApp message will appear here"}</p>
                  <p className="text-right text-[10px] text-slate-400 mt-1">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    <span className="ml-1 inline-block w-3.5 h-2.5 align-middle">
                      <svg viewBox="0 0 16 12" className="w-3.5 h-2.5 fill-[#53bdeb]"><path d="M11.07.13a.5.5 0 0 0-.7.14.5.5 0 0 0 .14.7l1.24.86-3.04 4.22a.5.5 0 0 0 .4.8c.18 0 .34-.1.42-.25l3.16-4.39 1.15.8a.5.5 0 0 0 .7-.14.5.5 0 0 0-.14-.7l-1.33-.92L14.3.27a.5.5 0 0 0-.14-.7.5.5 0 0 0-.7.14l-1.2 1.66L11.07.13zM6.07.13a.5.5 0 0 0-.7.14.5.5 0 0 0 .14.7l1.24.86-3.04 4.22a.5.5 0 0 0 .4.8c.18 0 .34-.1.42-.25l3.16-4.39 1.15.8a.5.5 0 0 0 .7-.14.5.5 0 0 0-.14-.7l-1.33-.92L9.3.27a.5.5 0 0 0-.14-.7.5.5 0 0 0-.7.14l-1.2 1.66L6.07.13z"/></svg>
                    </span>
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 font-medium flex items-center gap-1">
                  <WhatsAppIcon size={11} /> WhatsApp preview
                </p>
              </div>
            )}

            {showPreview && !channels.includes("email") && !channels.includes("whatsapp") && (
              <p className="text-sm text-slate-400 py-6 text-center">Select a channel to preview</p>
            )}
          </div>
        </div>
      </div>

      {/* Save as template modal */}
      <Modal
        isOpen={saveOpen}
        onClose={() => setSaveOpen(false)}
        title="Save as template"
        size="sm"
        footer={
          <>
            <button onClick={() => setSaveOpen(false)} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
            <button onClick={handleSaveTemplate} disabled={saving} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-50">
              {saving ? "Saving..." : "Save template"}
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Template name</label>
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. Workshop Reminder"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={templateCategory}
              onChange={(e) => setTemplateCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
            >
              {TEMPLATE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {channels.includes("email") && (
            <p className="text-xs text-slate-500">Captures subject: <span className="font-medium text-slate-700">{subject || "—"}</span></p>
          )}
        </div>
      </Modal>
    </div>
  )
}

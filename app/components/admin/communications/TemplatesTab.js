"use client"

import { useEffect, useState } from "react"
import { Modal, Button, Toast, Badge } from "../../ui"
import { communicationAPI, formatDate } from "../../../lib/api"
import { Plus, Pencil, Trash2, Clipboard, Search, Loader2 } from "lucide-react"

const CATEGORIES = [
  "Workshop Notifications",
  "Event Announcements",
  "Trainer Updates",
  "Article Updates",
  "Marketing Campaigns",
  "Custom Messages",
]

const CATEGORY_COLORS = {
  "Workshop Notifications": "bg-blue-50 text-blue-700 border-blue-100",
  "Event Announcements": "bg-violet-50 text-violet-700 border-violet-100",
  "Trainer Updates": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Article Updates": "bg-amber-50 text-amber-700 border-amber-100",
  "Marketing Campaigns": "bg-pink-50 text-pink-700 border-pink-100",
  "Custom Messages": "bg-slate-100 text-slate-600 border-slate-200",
}

export default function TemplatesTab({ onApply }) {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [toast, setToast] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: "", category: CATEGORIES[0], subject: "", htmlBody: "", whatsappMessage: "" })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchTemplates = async () => {
    setLoading(true)
    try {
      const res = await communicationAPI.listTemplates()
      setTemplates(res?.data?.templates || [])
    } catch {
      setToast({ type: "error", message: "Failed to load templates" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTemplates() }, [])

  const openNew = () => {
    setEditing(null)
    setForm({ name: "", category: CATEGORIES[0], subject: "", htmlBody: "", whatsappMessage: "" })
    setModalOpen(true)
  }

  const openEdit = (t) => {
    setEditing(t)
    setForm({
      name: t.name,
      category: t.category,
      subject: t.subject || "",
      htmlBody: t.htmlBody || "",
      whatsappMessage: t.whatsappMessage || "",
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) {
      setToast({ type: "error", message: "Template name is required" })
      return
    }
    setSaving(true)
    try {
      if (editing) {
        await communicationAPI.updateTemplate(editing._id, form)
        setToast({ type: "success", message: "Template updated" })
      } else {
        await communicationAPI.createTemplate(form)
        setToast({ type: "success", message: "Template created" })
      }
      setModalOpen(false)
      fetchTemplates()
    } catch (err) {
      setToast({ type: "error", message: err?.response?.data?.message || "Failed to save template" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete template "${t.name}"?`)) return
    setDeletingId(t._id)
    try {
      await communicationAPI.deleteTemplate(t._id)
      setToast({ type: "success", message: "Template deleted" })
      fetchTemplates()
    } catch {
      setToast({ type: "error", message: "Failed to delete template" })
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = templates.filter((t) => {
    const q = search.toLowerCase()
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.subject || "").toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-5">
      {toast && <Toast type={toast.type} onClose={() => setToast(null)}>{toast.message}</Toast>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full sm:w-72 pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
        </div>
        <Button onClick={openNew} icon={<Plus size={15} />}>New Template</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading templates...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          {templates.length === 0 ? "No templates yet. Create your first one." : "No templates match your search."}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div key={t._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Updated {formatDate(t.updatedAt)}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[t.category] || CATEGORY_COLORS["Custom Messages"]}`}>
                  {t.category}
                </span>
              </div>

              <div className="space-y-2 mb-4 flex-1">
                {t.subject && (
                  <p className="text-xs text-slate-500"><span className="font-semibold text-slate-700">Subject:</span> {t.subject}</p>
                )}
                {t.htmlBody && (
                  <p className="text-xs text-slate-500 line-clamp-2"><span className="font-semibold text-slate-700">Email:</span> {t.htmlBody.replace(/<[^>]*>/g, " ").slice(0, 120)}...</p>
                )}
                {t.whatsappMessage && (
                  <p className="text-xs text-slate-500 line-clamp-2"><span className="font-semibold text-slate-700">WhatsApp:</span> {t.whatsappMessage.slice(0, 120)}</p>
                )}
                {!t.subject && !t.htmlBody && !t.whatsappMessage && (
                  <p className="text-xs text-slate-400">Empty template</p>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                <Button size="sm" onClick={() => onApply(t)} icon={<Clipboard size={13} />}>Use</Button>
                <button onClick={() => openEdit(t)} className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(t)} disabled={deletingId === t._id} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit template" : "New template"}
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? "Update" : "Create"}</Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Workshop Reminder"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email subject</label>
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Subject (optional)"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email body (HTML)</label>
            <textarea
              rows={4}
              value={form.htmlBody}
              onChange={(e) => setForm({ ...form, htmlBody: e.target.value })}
              placeholder="<p>Hi {{name}},</p>..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp message</label>
            <textarea
              rows={3}
              value={form.whatsappMessage}
              onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
              placeholder="Hi {{name}}, ..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <Badge variant="default">Tip: use {"{{name}}"} as a personalization placeholder.</Badge>
        </div>
      </Modal>
    </div>
  )
}

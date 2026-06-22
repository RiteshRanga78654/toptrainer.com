"use client"
import { useState } from "react"
import { industries as initialIndustries } from "../data/mockData"
import { Card, Badge, Button, Modal, Input, Toggle, Toast } from "../../components/ui"
import { Plus, Edit2, Trash2 } from "lucide-react"

export default function IndustryPage() {
  const [industries, setIndustries] = useState(initialIndustries)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ name: "", icon: "🏢", status: "active" })

  const openAdd = () => { setEditing(null); setForm({ name: "", icon: "🏢", status: "active" }); setModal(true) }
  const openEdit = (i) => { setEditing(i); setForm({ name: i.name, icon: i.icon, status: i.status }); setModal(true) }

  const handleSave = () => {
    if (editing) {
      setIndustries(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i))
      setToast("Industry updated!")
    } else {
      setIndustries(prev => [...prev, { ...form, id: `i${Date.now()}`, expertCount: 0, workshopCount: 0 }])
      setToast("Industry added!")
    }
    setModal(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={openAdd}><Plus size={14} /> Add Industry</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map(ind => (
          <Card key={ind.id} className="p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className="text-3xl">{ind.icon}</div>
              <Toggle checked={ind.status === "active"} onChange={() => setIndustries(prev => prev.map(i => i.id === ind.id ? { ...i, status: i.status === "active" ? "inactive" : "active" } : i))} />
            </div>
            <h3 className="font-semibold text-slate-900 mt-3">{ind.name}</h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
              <span>{ind.expertCount} experts</span>
              <span className="text-slate-300">·</span>
              <span>{ind.workshopCount} workshops</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant={ind.status === "active" ? "success" : "danger"}>{ind.status}</Badge>
              <div className="ml-auto flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => openEdit(ind)}><Edit2 size={12} /></Button>
                <Button variant="danger" size="sm" onClick={() => setIndustries(prev => prev.filter(i => i.id !== ind.id))}><Trash2 size={12} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Industry" : "Add Industry"}>
        <div className="space-y-4">
          <Input label="Industry Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="e.g. Healthcare" />
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Icon (emoji)</label>
            <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} maxLength={2}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">{editing ? "Update" : "Add"}</Button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}
"use client"
import { useState } from "react"
import { competencies as initialComp } from "../data/mockData"
import { Card, Badge, Button, Modal, Input, Toggle, Toast } from "../../components/ui"
import { Plus, Edit2, Trash2 } from "lucide-react"

export default function CompetencyPage() {
  const [comps, setComps] = useState(initialComp)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ name: "", icon: "🎯", status: "active" })

  const openAdd = () => { setEditing(null); setForm({ name: "", icon: "🎯", status: "active" }); setModal(true) }
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, icon: c.icon, status: c.status }); setModal(true) }

  const handleSave = () => {
    if (editing) {
      setComps(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c))
      setToast("Competency updated!")
    } else {
      setComps(prev => [...prev, { ...form, id: `c${Date.now()}`, expertCount: 0, workshopCount: 0 }])
      setToast("Competency added!")
    }
    setModal(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={openAdd}><Plus size={14} /> Add Competency</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comps.map(c => (
          <Card key={c.id} className="p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className="text-3xl">{c.icon}</div>
              <Toggle checked={c.status === "active"} onChange={() => setComps(prev => prev.map(x => x.id === c.id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x))} />
            </div>
            <h3 className="font-semibold text-slate-900 mt-3">{c.name}</h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
              <span>{c.expertCount} experts</span>
              <span className="text-slate-300">·</span>
              <span>{c.workshopCount} workshops</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant={c.status === "active" ? "success" : "danger"}>{c.status}</Badge>
              <div className="ml-auto flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Edit2 size={12} /></Button>
                <Button variant="danger" size="sm" onClick={() => setComps(prev => prev.filter(x => x.id !== c.id))}><Trash2 size={12} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Competency" : "Add Competency"}>
        <div className="space-y-4">
          <Input label="Competency Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="e.g. Leadership" />
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
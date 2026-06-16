"use client"
import { useState } from "react"
import { allExperts } from "../data/mockData"
import { Card, Badge, Button, Modal, Input, Select, Toggle, Toast } from "../../components/ui"
import { Plus, Search, Edit2, Trash2, Star } from "lucide-react"
import { cn } from "../../lib/api"

export default function TrainersPage() {
  const [trainers, setTrainers] = useState(allExperts)
  const [search, setSearch] = useState("")
  const [filterCat, setFilterCat] = useState("all")
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ name: "", title: "", category: "industry", featured: false })

  const filtered = trainers.filter(t =>
    (filterCat === "all" || t.category === filterCat) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.title.toLowerCase().includes(search.toLowerCase()))
  )

  const openAdd = () => { setEditing(null); setForm({ name: "", title: "", category: "industry", featured: false }); setModal(true) }
  const openEdit = (t) => { setEditing(t); setForm({ name: t.name, title: t.title, category: t.category, featured: t.featured }); setModal(true) }

  const handleSave = () => {
    if (editing) {
      setTrainers(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t))
      setToast("Trainer updated!")
    } else {
      setTrainers(prev => [...prev, { ...form, id: `e${Date.now()}`, avatar: `https://i.pravatar.cc/80?img=${Math.floor(Math.random()*70)}` }])
      setToast("Trainer added!")
    }
    setModal(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trainers..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none bg-white">
          <option value="all">All Categories</option>
          <option value="industry">Industry</option>
          <option value="department">Department</option>
          <option value="competency">Competency</option>
        </select>
        <Button onClick={openAdd}><Plus size={14} /> Add Trainer</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(trainer => (
          <Card key={trainer.id} className="p-4 card-hover">
            <div className="flex items-start justify-between mb-3">
              <img src={trainer.avatar} alt={trainer.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex items-center gap-1">
                <button onClick={() => setTrainers(prev => prev.map(t => t.id === trainer.id ? { ...t, featured: !t.featured } : t))}
                  className={cn("w-7 h-7 rounded-lg flex items-center justify-center", trainer.featured ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:text-amber-400")}>
                  <Star size={14} fill={trainer.featured ? "currentColor" : "none"} />
                </button>
                <button onClick={() => openEdit(trainer)} className="w-7 h-7 bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 rounded-lg flex items-center justify-center"><Edit2 size={12} /></button>
                <button onClick={() => setTrainers(prev => prev.filter(t => t.id !== trainer.id))} className="w-7 h-7 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-lg flex items-center justify-center"><Trash2 size={12} /></button>
              </div>
            </div>
            <p className="font-semibold text-slate-900 text-sm">{trainer.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{trainer.title}</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant={trainer.category === "industry" ? "info" : trainer.category === "department" ? "warning" : "success"}>{trainer.category}</Badge>
              {trainer.featured && <Badge variant="warning"><Star size={9} fill="currentColor" /> Featured</Badge>}
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Trainer" : "Add Trainer"}>
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="e.g. Sarah Johnson" />
          <Input label="Title / Role" value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} placeholder="e.g. Senior Industry Analyst" />
          <Select label="Category" value={form.category} onChange={v => setForm(p => ({ ...p, category: v }))}
            options={[{ value: "industry", label: "Industry" }, { value: "department", label: "Department" }, { value: "competency", label: "Competency" }]} />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-slate-900">Featured on Homepage</p>
              <p className="text-xs text-slate-500">Show in the expert section</p>
            </div>
            <Toggle checked={form.featured} onChange={v => setForm(p => ({ ...p, featured: v }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">{editing ? "Update" : "Add Trainer"}</Button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}
"use client"
import { useState } from "react"
import { articles as initialArticles } from "../data/mockData"
import { Card, Badge, Button, Modal, Input, Select, Toast } from "../../components/ui"
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react"
import { formatDate } from "../../lib/api"

export default function ArticlesPage() {
  const [articles, setArticles] = useState(initialArticles)
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ title: "", author: "", category: "Leadership", status: "draft" })

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditing(null); setForm({ title: "", author: "", category: "Leadership", status: "draft" }); setModal(true) }
  const openEdit = (a) => { setEditing(a); setForm({ title: a.title, author: a.author, category: a.category, status: a.status }); setModal(true) }

  const handleSave = () => {
    if (editing) {
      setArticles(prev => prev.map(a => a.id === editing.id ? { ...a, ...form } : a))
      setToast("Article updated!")
    } else {
      setArticles(prev => [...prev, { ...form, id: `a${Date.now()}`, publishedAt: form.status === "published" ? new Date().toISOString().split("T")[0] : null, views: 0, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80" }])
      setToast("Article created!")
    }
    setModal(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <Button onClick={openAdd}><Plus size={14} /> New Article</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Article</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Published</th>
                <th className="px-5 py-3 font-medium text-right">Views</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{a.title}</p>
                        <p className="text-xs text-slate-500">{a.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge>{a.category}</Badge></td>
                  <td className="px-5 py-3"><Badge variant={a.status === "published" ? "success" : "warning"}>{a.status}</Badge></td>
                  <td className="px-5 py-3 text-sm text-slate-600">{formatDate(a.publishedAt)}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 text-right">
                    <span className="flex items-center justify-end gap-1"><Eye size={12} /> {a.views.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(a)}><Edit2 size={12} /></Button>
                      <Button variant="danger" size="sm" onClick={() => setArticles(prev => prev.filter(x => x.id !== a.id))}><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Article" : "New Article"}>
        <div className="space-y-4">
          <Input label="Title" value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} />
          <Input label="Author" value={form.author} onChange={v => setForm(p => ({ ...p, author: v }))} />
          <Select label="Category" value={form.category} onChange={v => setForm(p => ({ ...p, category: v }))}
            options={[{ value: "Leadership", label: "Leadership" }, { value: "Finance", label: "Finance" }, { value: "HR", label: "HR" }, { value: "Operations", label: "Operations" }]} />
          <Select label="Status" value={form.status} onChange={v => setForm(p => ({ ...p, status: v }))}
            options={[{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }]} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">{editing ? "Update" : "Create"}</Button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}
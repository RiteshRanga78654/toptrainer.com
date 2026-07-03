"use client"
import { useState } from "react"
import { articles as initialArticles } from "../data/mockData"
import { Card, Badge, Button, Input, Select, Toast } from "../../components/ui"
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react"
import { formatDate, trainersAPI } from "../../lib/api"
import ArticleFormModal from "../../trainer/articles/ArticleFormModal"
import { useEffect } from "react"

const CSS = `
.btn-create {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 24px; border-radius: 13px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff;
  font-size: .9rem; font-weight: 700;
  border: none; cursor: pointer;
  box-shadow: 0 6px 22px rgba(37,99,235,.35);
  transition: all .2s cubic-bezier(.22,1,.36,1);
}
.btn-create:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(37,99,235,.4); }
`

export default function ArticlesPage() {
  const [articles, setArticles] = useState(initialArticles)
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  
  const [trainers, setTrainers] = useState([])
  const [loadingTrainers, setLoadingTrainers] = useState(true)

  useEffect(() => {
    trainersAPI
      .getAll({ limit: 200, status: 'active' })
      .then((res) => setTrainers(res.data?.data || res.data?.trainers || []))
      .catch(() => {})
      .finally(() => setLoadingTrainers(false))
  }, [])

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditing(null); setModal(true) }
  const openEdit = (a) => { setEditing(a); setModal(true) }

  const handleSave = async (payload, id) => {
    if (id) {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, ...payload } : a))
      setToast("Article updated!")
    } else {
      setArticles(prev => [{ ...payload, id: payload.id || `a${Date.now()}`, publishedAt: payload.status === "published" ? new Date().toISOString().split("T")[0] : null, views: 0, image: payload.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80" }, ...prev])
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
        <button className="btn-create" onClick={openAdd}>
          <Plus size={16} /> New Article
        </button>
      </div>

      <style>{CSS}</style>

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

      {modal && (
        <ArticleFormModal
          article={editing}
          onSave={handleSave}
          onClose={() => setModal(false)}
          trainers={trainers}
        />
      )}

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}
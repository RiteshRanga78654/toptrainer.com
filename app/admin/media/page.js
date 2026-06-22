"use client"
import { useState } from "react"
import { Card, Badge, Button } from "../../components/ui"
import { Upload, Trash2, Search, Grid, List } from "lucide-react"
import { cn } from "../../lib/api"

const mediaItems = [
  { id: "m1", name: "hero-team.jpg", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80", size: "2.3 MB", used: true },
  { id: "m2", name: "speaker-event.jpg", url: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=300&q=80", size: "1.8 MB", used: true },
  { id: "m3", name: "sunset-family.jpg", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80", size: "3.1 MB", used: true },
  { id: "m4", name: "office-meeting.jpg", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=80", size: "2.7 MB", used: true },
  { id: "m5", name: "workshop-finance.jpg", url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80", size: "1.5 MB", used: false },
  { id: "m6", name: "supply-chain.jpg", url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80", size: "2.0 MB", used: false },
]

export default function MediaPage() {
  const [items, setItems] = useState(mediaItems)
  const [search, setSearch] = useState("")
  const [view, setView] = useState("grid")
  const [selected, setSelected] = useState(new Set())

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

  const toggleSelect = (id) => {
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button variant="danger" onClick={() => { setItems(prev => prev.filter(i => !selected.has(i.id))); setSelected(new Set()) }}>
              <Trash2 size={14} /> Delete ({selected.size})
            </Button>
          )}
          <Button variant="secondary" onClick={() => setView(view === "grid" ? "list" : "grid")}>
            {view === "grid" ? <List size={14} /> : <Grid size={14} />}
          </Button>
          <Button><Upload size={14} /> Upload</Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {filtered.map(item => (
            <div key={item.id} onClick={() => toggleSelect(item.id)}
              className={cn("relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all", selected.has(item.id) ? "border-blue-500" : "border-transparent")}>
              <img src={item.url} alt={item.name} className="w-full aspect-square object-cover" />
              {selected.has(item.id) && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-2">
                <p className="text-white text-xs truncate">{item.name}</p>
                <p className="text-white/60 text-xs">{item.size}</p>
              </div>
              {item.used && <div className="absolute top-2 right-2"><Badge variant="success">In use</Badge></div>}
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                <th className="px-5 py-3 font-medium">File</th>
                <th className="px-5 py-3 font-medium">Size</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={item.url} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">{item.size}</td>
                  <td className="px-5 py-3"><Badge variant={item.used ? "success" : "default"}>{item.used ? "In use" : "Unused"}</Badge></td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <Button variant="danger" size="sm" onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
"use client"
import { useState } from "react"
import { users as initialUsers } from "../data/mockData"
import { Card, Badge, Button, Modal, Input, Select, Toast } from "../../components/ui"
import { Plus, Search, Edit2, Trash2 } from "lucide-react"
import { formatDate } from "../../lib/api"

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ name: "", email: "", role: "Learner", status: "active" })

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setEditing(null); setForm({ name: "", email: "", role: "Learner", status: "active" }); setModal(true) }
  const openEdit = (u) => { setEditing(u); setForm({ name: u.name, email: u.email, role: u.role, status: u.status }); setModal(true) }

  const handleSave = () => {
    if (editing) {
      setUsers(prev => prev.map(u => u.id === editing.id ? { ...u, ...form } : u))
      setToast("User updated!")
    } else {
      setUsers(prev => [...prev, { ...form, id: `u${Date.now()}`, joined: new Date().toISOString().split("T")[0], workshopsCompleted: 0 }])
      setToast("User added!")
    }
    setModal(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white" />
        </div>
        <Button onClick={openAdd}><Plus size={14} /> Add User</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-100">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Workshops</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">{u.name[0]}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge variant={u.role === "Admin" ? "info" : u.role === "Trainer" ? "warning" : "default"}>{u.role}</Badge></td>
                  <td className="px-5 py-3 text-sm text-slate-600">{formatDate(u.joined)}</td>
                  <td className="px-5 py-3"><Badge variant={u.status === "active" ? "success" : "danger"}>{u.status}</Badge></td>
                  <td className="px-5 py-3 text-sm text-slate-600">{u.workshopsCompleted}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(u)}><Edit2 size={12} /></Button>
                      <Button variant="danger" size="sm" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit User" : "Add User"}>
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} />
          <Input label="Email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} type="email" />
          <Select label="Role" value={form.role} onChange={v => setForm(p => ({ ...p, role: v }))}
            options={[{ value: "Learner", label: "Learner" }, { value: "Trainer", label: "Trainer" }, { value: "Admin", label: "Admin" }]} />
          <Select label="Status" value={form.status} onChange={v => setForm(p => ({ ...p, status: v }))}
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
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
"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Card, Badge, Button, Input, Toast } from "../../components/ui"
import { adminAuthAPI, formatDate } from "../../lib/api"
import { updateUser } from "../../store/slices/authSlice"
import { Shield, Mail, Calendar, Edit2, X, Eye, EyeOff } from "lucide-react"

export default function AdminProfilePage() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [admin, setAdmin] = useState(null)

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const [form, setForm] = useState({ name: "", email: "" })
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await adminAuthAPI.getProfile()
      const data = res?.data?.admin

      if (!data) throw new Error("No profile data returned")

      setAdmin(data)
      setForm({ name: data.name || "", email: data.email || "" })
    } catch (err) {
      console.log("Profile fetch error:", err?.response?.data || err.message)
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  const openEdit = () => {
    setForm({ name: admin?.name || "", email: admin?.email || "" })
    setPasswordForm({ password: "", confirmPassword: "" })
    setFormError("")
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setFormError("")
    setPasswordForm({ password: "", confirmPassword: "" })
  }

  const handleSave = async () => {
    setFormError("")

    if (!form.name.trim()) {
      setFormError("Name is required")
      return
    }

    if (!form.email.trim()) {
      setFormError("Email is required")
      return
    }

    if (passwordForm.password && passwordForm.password.length < 6) {
      setFormError("New password must be at least 6 characters")
      return
    }

    if (passwordForm.password !== passwordForm.confirmPassword) {
      setFormError("Passwords do not match")
      return
    }

    try {
      setSaving(true)

      const payload = { name: form.name.trim(), email: form.email.trim() }
      if (passwordForm.password) payload.password = passwordForm.password

      const res = await adminAuthAPI.updateProfile(payload)
      const updatedAdmin = res?.data?.admin

      setAdmin((prev) => ({ ...prev, ...updatedAdmin }))
      dispatch(updateUser({
        name: updatedAdmin?.name,
        email: updatedAdmin?.email,
      }))

      setEditing(false)
      setPasswordForm({ password: "", confirmPassword: "" })
      showToast("Profile updated successfully")
    } catch (err) {
      console.log("Profile update error:", err?.response?.data || err.message)
      setFormError(err?.response?.data?.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-sm text-slate-500">Loading profile...</div>
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-sm text-slate-500">
        {error}
        <div className="mt-3">
          <button onClick={fetchProfile} className="text-blue-600 hover:underline text-sm font-medium">
            Retry
          </button>
        </div>
      </Card>
    )
  }

  const initials = admin?.name
    ? admin.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "A"

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{admin?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="info">
                  <span className="flex items-center gap-1">
                    <Shield size={11} /> {admin?.role}
                  </span>
                </Badge>
              </div>
            </div>
          </div>

          {!editing && (
            <Button variant="secondary" onClick={openEdit}>
              <Edit2 size={14} />
              Edit Profile
            </Button>
          )}
        </div>

        {!editing ? (
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={15} className="text-slate-400 shrink-0" />
              <span className="text-slate-500 w-28 shrink-0">Email</span>
              <span className="text-slate-900 font-medium">{admin?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={15} className="text-slate-400 shrink-0" />
              <span className="text-slate-500 w-28 shrink-0">Member since</span>
              <span className="text-slate-900 font-medium">
                {admin?.createdAt ? formatDate(admin.createdAt) : "—"}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                placeholder="Your name"
              />
              <Input
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                placeholder="you@example.com"
              />
            </div>

            <div className="pt-2">
              <p className="text-sm font-medium text-slate-700 mb-3">Change Password</p>
              <p className="text-xs text-slate-500 mb-3">Leave blank to keep your current password.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.password}
                    onChange={(v) => setPasswordForm((p) => ({ ...p, password: v }))}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <Input
                  label="Confirm New Password"
                  type={showPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(v) => setPasswordForm((p) => ({ ...p, confirmPassword: v }))}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {formError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {formError}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={cancelEdit} className="flex-1" disabled={saving}>
                <X size={14} />
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}

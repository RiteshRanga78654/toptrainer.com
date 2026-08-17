"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Clock,
  Users,
  Shield,
  ShieldCheck,
  PenTool,
  SlidersHorizontal,
  GraduationCap,
  User,
  Home,
  BookOpen,
  Building2,
  Award,
  FileText,
  BarChart3,
  Info,
  Star,
  Send,
  KeyRound,
  CheckCircle2,
  XCircle,
  Briefcase,
} from "lucide-react";
import {
  Card,
  Badge,
  Button,
  Modal,
  Input,
  Select,
  Toggle,
  Toast,
} from "../../components/ui";
import { Avatar } from "../../components/ui";
import { teamMembersAPI } from "../../lib/api";
import {
  ALL_MODULES,
  MODULE_LABELS,
  ROLES,
  DEFAULT_PERMISSIONS,
} from "../../lib/permissions";

const MODULE_ICONS = {
  trainers: GraduationCap,
  users: User,
  homepage: Home,
  workshops: BookOpen,
  industry: Building2,
  competency: Award,
  department: Building2,
  articles: FileText,
  reports: BarChart3,
  about_us: Info,
  reviews: Star,
  requirements: Briefcase,
  communications: Send,
  team: ShieldCheck,
};

const ROLE_ICONS = {
  administrator: ShieldCheck,
  content_writer: PenTool,
  standard_member: SlidersHorizontal,
};

const ROLE_COLORS = {
  administrator: "brand",
  content_writer: "violet",
  standard_member: "warning",
};

const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Australia/Sydney",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Africa/Johannesburg",
  "UTC",
];

const timezoneGroups = TIMEZONES.reduce((acc, tz) => {
  const group = tz.split("/")[0];
  if (!acc[group]) acc[group] = [];
  acc[group].push(tz);
  return acc;
}, {});

const formatDate = (d) =>
  d ? new Date(d).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "—";

export default function TeamAndAccessPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    timezone: "Asia/Kolkata",
    password: "",
    confirmPassword: "",
    role: "standard_member",
    permissions: [],
    isActive: true,
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await teamMembersAPI.getAll();
      setMembers(res?.data?.data || res?.data?.teamMembers || []);
    } catch (err) {
      console.log("Team fetch error:", err?.response?.data || err.message);
      showToast("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        !q ||
        m.fullName?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q);
      const matchesRole = !roleFilter || m.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter]);

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      timezone: "Asia/Kolkata",
      password: "",
      confirmPassword: "",
      role: "standard_member",
      permissions: [],
      isActive: true,
    });
  };

  const openAdd = () => {
    setEditing(null);
    resetForm();
    setModal(true);
  };

  const openEdit = (member) => {
    setEditing(member);
    setForm({
      fullName: member.fullName || "",
      email: member.email || "",
      phone: member.phone || "",
      timezone: member.timezone || "Asia/Kolkata",
      password: "",
      confirmPassword: "",
      role: member.role || "standard_member",
      permissions: member.permissions || [],
      isActive: member.isActive,
    });
    setModal(true);
  };

  const handleRoleChange = (role) => {
    setForm((prev) => {
      const base = { ...prev, role };
      if (role === "administrator") {
        return { ...base, permissions: [...ALL_MODULES] };
      }
      if (role === "content_writer") {
        return { ...base, permissions: ["articles"] };
      }
      return { ...base, permissions: prev.permissions };
    });
  };

  const togglePermission = (mod) => {
    setForm((prev) => {
      if (prev.role !== "standard_member") return prev;
      const has = prev.permissions.includes(mod);
      return {
        ...prev,
        permissions: has
          ? prev.permissions.filter((p) => p !== mod)
          : [...prev.permissions, mod],
      };
    });
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.email.trim()) return "Email address is required";
    if (!editing && !form.password) return "Password is required";
    if (form.password && form.password !== form.confirmPassword)
      return "Passwords do not match";
    if (form.role === "standard_member" && form.permissions.length === 0)
      return "Select at least one module for a standard member";
    return null;
  };

  const handleSave = async () => {
    const errMsg = validate();
    if (errMsg) {
      showToast(errMsg, "error");
      return;
    }

    try {
      setSaving(true);
      const payload = { ...form };

      if (!editing) {
        await teamMembersAPI.create(payload);
        showToast("Team member created successfully");
      } else {
        delete payload.confirmPassword;
        if (!payload.password) delete payload.password;
        await teamMembersAPI.update(editing._id, payload);
        showToast("Team member updated successfully");
      }

      setModal(false);
      await fetchMembers();
    } catch (err) {
      console.log("Save error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to save team member", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (member) => {
    const nextActive = !member.isActive;
    const previous = members;

    setMembers((prev) =>
      prev.map((m) => (m._id === member._id ? { ...m, isActive: nextActive } : m))
    );

    try {
      await teamMembersAPI.update(member._id, {
        isActive: nextActive,
        role: member.role,
        permissions: member.permissions,
      });
      showToast(`Member ${nextActive ? "activated" : "deactivated"} successfully`);
    } catch (err) {
      setMembers(previous);
      console.log("Toggle error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      setSaving(true);
      await teamMembersAPI.delete(confirmDelete._id);
      setMembers((prev) => prev.filter((m) => m._id !== confirmDelete._id));
      setConfirmDelete(null);
      showToast("Team member deleted successfully");
    } catch (err) {
      console.log("Delete error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to delete team member", "error");
    } finally {
      setSaving(false);
    }
  };

  const roleOptions = ROLES.map((r) => ({
    value: r.value,
    label: `${r.label} (${r.description})`,
  }));

  const isLockedRole = form.role !== "standard_member";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team &amp; Access Control</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage team members, roles, and module permissions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(v) => setRoleFilter(v)}
            options={[
              { value: "", label: "All Roles" },
              ...roleOptions,
            ]}
            className="w-full sm:w-56"
          />
          <Button onClick={openAdd}>
            <Plus size={14} />
            Create Team Member
          </Button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-sm text-slate-500">Loading team members...</div>
      ) : filteredMembers.length === 0 ? (
        <Card className="p-10 text-center text-sm text-slate-500">
          <div className="flex flex-col items-center gap-2">
            <Users size={28} className="text-slate-300" />
            {members.length === 0
              ? "No team members yet. Click \"Create Team Member\" to get started."
              : "No members match your search or filter."}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => {
            const roleMeta = ROLES.find((r) => r.value === member.role) || ROLES[0];
            const RoleIcon = ROLE_ICONS[member.role] || Shield;
            const roleColor = ROLE_COLORS[member.role] || "default";
            const readonly = member.role === "administrator";

            return (
              <Card
                key={member._id}
                className="p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={member.fullName} size={48} />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {member.fullName}
                      </h3>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                        <Mail size={11} /> {member.email}
                      </p>
                      {member.phone && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone size={11} /> {member.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(member)}>
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setConfirmDelete(member)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Badge variant={roleColor}>
                    <RoleIcon size={11} className="mr-1" />
                    {roleMeta.label}
                  </Badge>
                  <Badge variant={readonly ? "info" : member.isActive ? "success" : "gray"}>
                    {readonly ? (
                      <>Full Access</>
                    ) : member.isActive ? (
                      <>
                        <CheckCircle2 size={11} className="mr-1" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle size={11} className="mr-1" /> Inactive
                      </>
                    )}
                  </Badge>
                  {!readonly && (
                    <div className="ml-auto">
                      <Toggle
                        checked={!!member.isActive}
                        onChange={() => handleToggleStatus(member)}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Allowed Modules
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(member.permissions || []).map((perm) => (
                      <span
                        key={perm}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600"
                      >
                        {MODULE_LABELS[perm] || perm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> Last login: {formatDate(member.lastLogin)}
                  </span>
                  <span className="flex items-center gap-1">
                    <KeyRound size={11} /> {member.isActive && !readonly ? "Access enabled" : "Locked"}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? "Edit Team Member" : "Create Team Member"}
        size="lg"
      >
        <div className="space-y-5">
          {/* Basic info */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <User size={14} className="text-blue-600" /> Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={form.fullName}
                onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
                placeholder="e.g. Priya Sharma"
              />
              <Input
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                placeholder="member@toptrainer.com"
              />
              <Input
                label="Phone Number"
                value={form.phone}
                onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                placeholder="+91 98765 43210"
              />
              <Select
                label="Timezone"
                value={form.timezone}
                onChange={(v) => setForm((p) => ({ ...p, timezone: v }))}
              >
                {Object.entries(timezoneGroups).map(([group, tzs]) => (
                  <optgroup key={group} label={group}>
                    {tzs.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Select>
            </div>
          </div>

          {/* Security */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <KeyRound size={14} className="text-blue-600" /> Security
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={editing ? "New Password (leave blank to keep)" : "Password"}
                type="password"
                value={form.password}
                onChange={(v) => setForm((p) => ({ ...p, password: v }))}
                placeholder="Min. 6 characters"
              />
              <Input
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={(v) => setForm((p) => ({ ...p, confirmPassword: v }))}
                placeholder="Repeat password"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Shield size={14} className="text-blue-600" /> Assigned System Role
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROLES.map((r) => {
                const RoleIcon = ROLE_ICONS[r.value];
                const selected = form.role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => handleRoleChange(r.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selected
                        ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                        selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <RoleIcon size={16} />
                    </div>
                    <p className="font-medium text-sm text-slate-800">{r.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-600" /> Allowed Sidebar Modules
              </h4>
              {isLockedRole && (
                <Badge variant={form.role === "administrator" ? "info" : "violet"}>
                  {form.role === "administrator"
                    ? "Full access — all modules enabled"
                    : "Articles only — for content writers"}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {ALL_MODULES.map((mod) => {
                const Icon = MODULE_ICONS[mod];
                const enabled =
                  form.role === "administrator"
                    ? true
                    : form.role === "content_writer"
                    ? mod === "articles"
                    : form.permissions.includes(mod);
                const locked = form.role !== "standard_member";

                return (
                  <button
                    key={mod}
                    type="button"
                    disabled={locked}
                    onClick={() => togglePermission(mod)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      locked
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:border-blue-300"
                    } ${
                      enabled
                        ? "border-blue-300 bg-blue-50/70"
                        : "border-slate-200 bg-slate-50/60 opacity-70"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        enabled ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                    <span className="flex-1 text-sm font-medium text-slate-700">
                      {MODULE_LABELS[mod]}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        enabled
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {enabled && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status */}
          {editing && (
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-800">Account Status</p>
                <p className="text-xs text-slate-500">
                  Disable to revoke this member's access immediately.
                </p>
              </div>
              <Toggle
                checked={!!form.isActive}
                onChange={(v) => setForm((p) => ({ ...p, isActive: v }))}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 pt-5 mt-5 border-t border-slate-100">
          <Button variant="secondary" onClick={() => setModal(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} loading={saving} className="flex-1">
            {editing ? "Update Team Member" : "Create Team Member"}
          </Button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Team Member"
        size="sm"
      >
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete{" "}
              <strong className="text-slate-800">{confirmDelete?.fullName}</strong>? This will
              permanently remove their access and cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-3 pt-5 mt-5 border-t border-slate-100">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={saving} className="flex-1">
            Delete
          </Button>
        </div>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
'use client'
import { useState, useRef, useEffect } from 'react'
import { X, ChevronDown, ChevronLeft, ChevronRight, Search, AlertTriangle, Check, MoreVertical, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import clsx from 'clsx'

// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', loading, icon, className, type = 'button', onClick, disabled }) {
  const sizeMap    = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-2.5 text-sm' }
  const variantMap = {
    primary:   'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    danger:    'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200',
    ghost:     'text-slate-600 hover:bg-slate-100',
    outline:   'border border-slate-200 text-slate-700 hover:bg-slate-50',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all active:scale-95',
        sizeMap[size], variantMap[variant],
        (loading || disabled) && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
    >
      {loading ? <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> : icon}
      {children}
    </button>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'default', color }) {
  // supports both old `color` prop and new `variant` prop
  const v = variant !== 'default' ? variant : color || 'default'
  const map = {
    default: 'bg-slate-100 text-slate-700',
    gray:    'bg-slate-100 text-slate-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger:  'bg-red-50 text-red-700',
    error:   'bg-red-50 text-red-700',
    info:    'bg-blue-50 text-blue-700',
    brand:   'bg-blue-50 text-blue-700',
    violet:  'bg-violet-50 text-violet-700',
  }
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', map[v] || map.default)}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const map = {
    active:    { variant: 'success', label: 'Active' },
    inactive:  { variant: 'gray',    label: 'Inactive' },
    pending:   { variant: 'warning', label: 'Pending' },
    published: { variant: 'success', label: 'Published' },
    draft:     { variant: 'gray',    label: 'Draft' },
    rejected:  { variant: 'error',   label: 'Rejected' },
    upcoming:  { variant: 'brand',   label: 'Upcoming' },
    ongoing:   { variant: 'info',    label: 'Ongoing' },
    completed: { variant: 'violet',  label: 'Completed' },
    cancelled: { variant: 'error',   label: 'Cancelled' },
  }
  const item = map[status] || { variant: 'gray', label: status }
  return <Badge variant={item.variant}>{item.label}</Badge>
}

// ─── Spinner / Loader ─────────────────────────────────────────────────────────
export function Spinner({ size = 20 }) {
  return <span className="spinner" style={{ width: size, height: size }} />
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="flex flex-col items-center gap-3">
        <Spinner size={32} />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading...</p>
      </div>
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className, style }) {
  return (
    <div className={clsx('bg-white rounded-xl border border-slate-200 shadow-sm', className)} style={style}>
      {children}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, src, size = 36 }) {
  if (src) return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />
  const initials = (name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const colors   = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e']
  const color    = colors[initials.charCodeAt(0) % colors.length]
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color + '20', border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: size * 0.38, fontWeight: 700, color }}>{initials}</span>
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, trend, color = '#0ea5e9', sub, change }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div style={{ width: 42, height: 42, borderRadius: 10, background: (typeof color === 'string' && color.startsWith('#')) ? color + '18' : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className={clsx(!(typeof color === 'string' && color.startsWith('#')) && color)}
        >
          <span style={{ color: (typeof color === 'string' && color.startsWith('#')) ? color : undefined }}>{icon}</span>
        </div>
        {trend !== undefined && (
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: trend >= 0 ? '#10b981' : '#ef4444', background: trend >= 0 ? '#d1fae5' : '#fee2e2', padding: '2px 8px', borderRadius: 20 }}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p style={{ fontWeight: 700, fontSize: '1.75rem', color: 'var(--text-primary, #0f172a)', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #64748b)', marginTop: 6, fontWeight: 500 }}>{label}</p>
      {(sub || change) && <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: 2 }}>{sub || change}</p>}
    </Card>
  )
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
      <div>
        <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-primary, #0f172a)' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #64748b)', marginTop: 4 }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-2.5 flex-wrap">{actions}</div>}
    </div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      {icon && <div style={{ fontSize: '2.5rem', opacity: 0.4 }}>{icon}</div>}
      <div>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary, #64748b)', marginBottom: 4 }}>{title}</p>
        {description && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted, #94a3b8)' }}>{description}</p>}
      </div>
      {action}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
// Supports both old API (isOpen) and new API (open)
export function Modal({ isOpen, open, onClose, title, children, size = 'md', footer }) {
  const visible  = isOpen ?? open ?? false
  const sizeMap  = { sm: 480, md: 600, lg: 800, xl: 960 }

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden w-full" style={{ maxWidth: sizeMap[size] }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary, #0f172a)' }}>{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex gap-2.5 justify-end">{footer}</div>
        )}
      </div>
    </div>
  )
}

// ─── ConfirmDialog ────────────────────────────────────────────────────────────
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Delete', loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm"
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </>}
    >
      <div className="flex gap-3 items-start">
        <div style={{ width: 40, height: 40, background: '#fef2f2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <AlertTriangle size={20} color="#ef4444" />
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #64748b)', lineHeight: 1.6 }}>{message}</p>
      </div>
    </Modal>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, error, hint, onChange, value, ...props }) {
  const handleChange = onChange
    ? (typeof onChange === 'function' && onChange.length <= 1 && !props.ref)
      ? (e) => onChange(e.target.value)   // simple string handler (new API)
      : onChange                           // event handler (react-hook-form)
    : undefined

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
        {...props}
      />
      {(error || hint) && <p className={clsx('text-xs', error ? 'text-red-500' : 'text-slate-500')}>{error || hint}</p>}
    </div>
  )
}

export function Textarea({ label, error, onChange, value, rows = 4, ...props }) {
  const handleChange = onChange
    ? (typeof onChange === 'function' && onChange.length <= 1 && !props.ref)
      ? (e) => onChange(e.target.value)
      : onChange
    : undefined

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <textarea
        rows={rows}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white resize-vertical"
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// Select supports both old API (children) and new API (options array)
export function Select({ label, error, children, options, onChange, value, ...props }) {
  const handleChange = onChange
    ? (typeof onChange === 'function' && onChange.length <= 1 && !props.ref)
      ? (e) => onChange(e.target.value)
      : onChange
    : undefined

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white cursor-pointer"
        {...props}
      >
        {children || options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ─── SearchInput ──────────────────────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        className="w-64 pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────
export function Table({ columns, data, loading, empty, emptyState }) {
  if (loading) return <PageLoader />
  const fallback = empty || emptyState || <EmptyState title="No data found" icon="📭" />
  if (!data?.length) return fallback
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row, i) => (
            <tr key={row._id || i} className="hover:bg-slate-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function Pagination({ page, totalPages, total, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-t border-slate-100">
      <p className="text-xs text-slate-500">
        Page {page} of {totalPages}{total ? ` (${total} total)` : ''}
      </p>
      <div className="flex gap-1.5">
        <button className={clsx('inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm transition-colors', page <= 1 && 'opacity-40 pointer-events-none')} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const p = page <= 3 ? i + 1 : page - 2 + i
          if (p < 1 || p > totalPages) return null
          return (
            <button key={p} onClick={() => onPageChange(p)}
              className={clsx('inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                p === page ? 'bg-blue-600 text-white shadow-sm' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >{p}</button>
          )
        })}
        <button className={clsx('inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm transition-colors', page >= totalPages && 'opacity-40 pointer-events-none')} onClick={() => onPageChange(page + 1)}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── RowMenu ──────────────────────────────────────────────────────────────────
export function RowMenu({ row, onEdit, onDelete, onToggleStatus, statusField = 'status', activeVal = 'active', inactiveVal = 'inactive' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = row[statusField] === activeVal

  return (
    <div ref={ref} className="relative flex justify-end">
      <button onClick={() => setOpen(!open)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
        <MoreVertical size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-20 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1 overflow-hidden">
          {onEdit && (
            <button onClick={() => { onEdit(row); setOpen(false) }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <Pencil size={13} className="text-slate-400" /> Edit
            </button>
          )}
          {onToggleStatus && (
            <button onClick={() => { onToggleStatus(row._id, isActive ? inactiveVal : activeVal); setOpen(false) }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              {isActive ? <ToggleLeft size={13} className="text-slate-400" /> : <ToggleRight size={13} className="text-slate-400" />}
              {isActive ? `Set ${inactiveVal}` : `Set ${activeVal}`}
            </button>
          )}
          {onDelete && (
            <>
              <div className="border-t border-slate-100 my-1" />
              <button onClick={() => { onDelete(row); setOpen(false) }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
export function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} className={clsx('relative w-10 h-5 rounded-full transition-colors', checked ? 'bg-blue-600' : 'bg-slate-300')}>
      <span className={clsx('absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', checked && 'translate-x-5')} />
    </button>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={clsx('fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium', type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white')}>
      {type === 'success' ? <Check size={16} /> : <X size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => onChange(tab.key)}
          className={clsx('px-3.5 py-1.5 rounded-md text-sm font-medium transition-all',
            activeTab === tab.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          )}
        >{tab.label}</button>
      ))}
    </div>
  )
}
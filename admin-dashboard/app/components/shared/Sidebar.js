'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { useAuth } from '../../hooks'
import { cn } from '../../lib/api'
import {
  LayoutDashboard, Users, BookOpen, FileText, Building2,
  Home, Award, ImageIcon, Settings, BarChart3,
  Briefcase, Star, MessageSquare, BarChart2, Upload,
  LogOut, ChevronDown, X,
  GraduationCap, BookMarked, User,
} from 'lucide-react'

// ─── Nav definitions ──────────────────────────────────────────────────────────
const adminNav = [
  {
    label: 'MAIN', items: [
      { label: 'Dashboard',  href: '/admin',                icon: LayoutDashboard, exact: true },
      { label: 'Trainers',   href: '/admin/trainers',       icon: GraduationCap },
      { label: 'Homepage',   href: '/admin/homepage',       icon: Home },
      { label: 'Workshops',  href: '/admin/workshops',    icon: BookOpen },
      { label: 'Articles',   href: '/admin/articles',     icon: FileText },
      { label: 'Industry',   href: '/admin/industries',   icon: Building2 },
      { label: 'Competency', href: '/admin/competencies', icon: Award },
      { label: 'Media',      href: '/admin/media',      icon: ImageIcon },
      { label: 'Users',        href: '/admin/users',          icon: Settings },
      { label: 'Reports',    href: '/admin/reports',    icon: BarChart3 },
    ]
  },
]

const trainerNav = [
  {
    label: 'MAIN', items: [
      { label: 'Dashboard',    href: '/trainer',            icon: LayoutDashboard, exact: true },
      { label: 'My Workshops', href: '/trainer/workshops',  icon: BookOpen },
      { label: 'My Articles',  href: '/trainer/articles',   icon: BookMarked },
      { label: 'Analytics',    href: '/trainer/analytics',  icon: BarChart2 },
    ]
  },
  {
    label: 'ACCOUNT', items: [
      { label: 'Profile', href: '/trainer/profile', icon: User },
    ]
  },
]

// ─── NavItem ─────────────────────────────────────────────────────────────────
function NavItem({ item, depth = 0, onNavigate }) {
  const pathname = usePathname()

  if (item.children) {
    const isActive = item.children.some(c => pathname.startsWith(c.href.split('?')[0]))
    const [open, setOpen] = useState(isActive)

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            'text-slate-300 hover:text-white hover:bg-slate-700/60',
            isActive && 'text-white bg-slate-700/60'
          )}
        >
          <span className="flex items-center gap-3">
            <item.icon size={16} className={cn('shrink-0', isActive ? 'text-blue-400' : 'text-slate-500')} />
            {item.label}
          </span>
          <ChevronDown size={14} className={cn('text-slate-500 transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="mt-0.5 space-y-0.5 pl-3">
            {item.children.map(child => (
              <NavItem key={child.href} item={child} depth={depth + 1} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || (pathname.startsWith(item.href.split('?')[0]) && item.href.split('?')[0] !== '/admin')

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        depth === 0
          ? 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 text-xs',
        isActive && depth === 0 && 'text-white bg-blue-600 shadow-lg shadow-blue-600/20',
        isActive && depth > 0 && 'text-blue-400 bg-slate-700/40',
      )}
      style={{ paddingLeft: depth > 0 ? `${(depth + 1) * 12 + 12}px` : undefined }}
    >
      {depth === 1 && <span className="w-1 h-1 rounded-full bg-current shrink-0" />}
      {depth === 0 && item.icon && <item.icon size={16} className={cn('shrink-0', isActive ? 'text-white' : 'text-slate-500')} />}
      {item.label}
    </Link>
  )
}

// ─── Sidebar content ──────────────────────────────────────────────────────────
function SidebarContent({ role, user, onClose, onLogout }) {
  const sections = role === 'admin' ? adminNav : trainerNav
  const initials = user?.name ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'U'

  return (
    <div className="w-64 bg-slate-900 h-full flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg leading-none">
            Top<span className="text-blue-400">Trainer</span>
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {sections.map(section => (
          <div key={section.label}>
            <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => (
                <NavItem key={item.href || item.label} item={item} onNavigate={onClose} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-slate-800 shrink-0 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/60">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">{user?.name ?? 'User'}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{user?.role ?? role}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
        >
          <LogOut size={15} className="shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

// ─── Default export ───────────────────────────────────────────────────────────
// Simple wrapper — layout (AdminLayout) handles mobile drawer externally.
// Pass onClose when rendering inside a mobile drawer.
export default function Sidebar({ role = 'admin', onClose }) {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    await dispatch(logout())
    router.replace('/auth/login')
  }

  return (
    <SidebarContent
      role={role}
      user={user}
      onClose={onClose}
      onLogout={handleLogout}
    />
  )
}
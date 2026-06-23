'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import {
  LayoutDashboard, BookOpen, FileText, BarChart2,
  User, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  blue:   '#2563eb',
  violet: '#7c3aed',
  slate:  '#0f172a',
  muted:  '#64748b',
  light:  '#94a3b8',
  border: 'rgba(226,232,240,0.8)',
  bg:     '#f8fafc',
}

const SIDEBAR_WIDTH = 258

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  :root {
    --blue-primary: ${T.blue};
    --violet-primary: ${T.violet};
    --sidebar-width: ${SIDEBAR_WIDTH}px;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(37,99,235,0.15); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(37,99,235,0.3); }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse   { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
  @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

  /* ── Responsive sidebar / layout ──────────────────────── */
  .trainer-sidebar {
    transform: translateX(0);
  }
  .trainer-main {
    margin-left: var(--sidebar-width);
    transition: margin-left 0.3s ease;
  }
  .sidebar-mobile-close,
  .sidebar-overlay {
    display: none;
  }
  .menu-toggle-btn {
    display: none;
  }

  @media (max-width: 768px) {
    .trainer-sidebar {
      transform: translateX(-100%);
      box-shadow: 6px 0 36px rgba(37,99,235,0.07);
    }
    .trainer-sidebar.open {
      transform: translateX(0);
    }
    .trainer-main {
      margin-left: 0;
    }
    .sidebar-mobile-close {
      display: flex !important;
    }
    .sidebar-overlay.open {
      display: block;
    }
    .menu-toggle-btn {
      display: flex !important;
    }
  }
`

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV = [
  { href: '/trainer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/trainer/profile',   label: 'Profile',   icon: User            },
  { href: '/trainer/articles',  label: 'Articles',  icon: FileText        },
  { href: '/trainer/workshops', label: 'Workshops', icon: BookOpen        },
  { href: '/trainer/analytics', label: 'Analytics', icon: BarChart2       },
]

// ─── Auth Guard ───────────────────────────────────────────────────────────────
function AuthGuard({ children }) {
  const router = useRouter()
  const user   = useSelector(s => s.auth?.user)
  const token  = useSelector(s => s.auth?.token)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined'
      ? localStorage.getItem('tt_token')
      : null

    if (!token && !stored) {
      router.replace('/auth/login')
      return
    }

    if (user && user.role !== 'trainer') {
      router.replace('/auth/login')
      return
    }
    setReady(true)
  }, [token, user, router])

  if (!ready) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#eff6ff,#f5f3ff)',
      gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        border: '3px solid #e2e8f0', borderTopColor: T.blue,
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: T.muted, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.9rem', margin: 0 }}>
        Authenticating…
      </p>
      <style>{GLOBAL_CSS}</style>
    </div>
  )
  return children
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose }) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router   = useRouter()
  const user     = useSelector(s => s.auth?.user)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('tt_token')
    router.replace('/auth/login')
  }

  const initials = (user?.name || 'T').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        className={`sidebar-overlay${open ? ' open' : ''}`}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)',
          cursor: 'pointer',
        }}
      />

      <aside className={`trainer-sidebar${open ? ' open' : ''}`} style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: SIDEBAR_WIDTH, zIndex: 50,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderRight: `1px solid ${T.border}`,
        boxShadow: '6px 0 36px rgba(37,99,235,0.07)',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(.22,1,.36,1)',
      }}>

        {/* Logo */}
        <div style={{ padding: '22px 20px 18px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `linear-gradient(135deg,${T.blue},${T.violet})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                flexShrink: 0,
              }}>
                <span style={{ color: 'white', fontSize: 18 }}>⚡</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 800, fontSize: '1rem', color: T.slate, lineHeight: 1.1, 
                }}>TopTrainer</div>  
                <div style={{ fontSize: '0.65rem', color: T.slate, letterSpacing: 1.1 , }}>
                  Trainer Portal
                </div>
              </div>
            </div>
            {/* Close button — mobile only */}
            <button
              className="sidebar-mobile-close"
              onClick={onClose}
              style={{
                background: 'none', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer',
                color: T.light, padding: '5px', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = T.slate }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = T.light }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* User pill */}
        <div style={{ padding: '14px 16px 8px' }}>
          <Link href="/trainer/profile" onClick={onClose} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.05))',
            border: '1px solid rgba(37,99,235,0.12)',
            borderRadius: 12, padding: '10px 12px', textDecoration: 'none',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,rgba(37,99,235,0.1),rgba(124,58,237,0.08))'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.05))'}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
              background: `linear-gradient(135deg,${T.blue},${T.violet})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700, fontSize: '0.95rem', color: 'white',
            }}>
              {user?.avatar
                ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                : initials
              }
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontWeight: 700, fontSize: '0.82rem', color: T.slate,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {user?.name || 'Trainer'}
              </div>
              <div style={{
                fontSize: '0.67rem', color: T.muted,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {user?.email || ''}
              </div>
            </div>
            <ChevronRight size={13} color={T.light} />
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '4px 10px', overflowY: 'auto' }}>
          <p style={{
            fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: T.light,
            padding: '10px 8px 5px', margin: 0,
          }}>Navigation</p>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href} onClick={onClose} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 11, marginBottom: 2,
                textDecoration: 'none',
                background: active
                  ? 'linear-gradient(135deg,rgba(37,99,235,0.1),rgba(124,58,237,0.07))'
                  : 'transparent',
                border: active ? '1px solid rgba(37,99,235,0.15)' : '1px solid transparent',
                color: active ? T.blue : '#475569',
                fontWeight: active ? 700 : 500,
                fontSize: '0.86rem',
                transition: 'all 0.18s ease',
              }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(37,99,235,0.04)'
                    e.currentTarget.style.color = T.blue
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#475569'
                  }
                }}
              >
                <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                <span style={{ flex: 1 }}>{label}</span>
                {active && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '8px 10px 20px', borderTop: `1px solid ${T.border}` }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 11, border: 'none',
              background: 'transparent', cursor: 'pointer',
              color: '#ef4444', fontSize: '0.86rem', fontWeight: 600,
              transition: 'all 0.18s ease', textAlign: 'left',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.07)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ onMenuClick, title }) {
  return (
    <header style={{
      height: 60, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 20px',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${T.border}`,
      position: 'sticky', top: 0, zIndex: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Menu button — mobile only */}
        <button
          className="menu-toggle-btn"
          onClick={onMenuClick}
          style={{
            background: 'none', border: '1px solid #e2e8f0', borderRadius: 9,
            width: 36, height: 36, alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#475569',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Menu size={18} />
        </button>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 700, fontSize: '1rem', color: T.slate, margin: 0,
        }}>
          {title}
        </h1>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: '0.73rem', color: T.muted,
        background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)',
        borderRadius: 99, padding: '5px 13px',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
        Trainer Portal
      </div>
    </header>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function TrainerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const currentTitle = NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.label || 'Trainer Portal'

  return (
    <AuthGuard>
      <div style={{ minHeight: '100vh', background: T.bg, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        <style>{GLOBAL_CSS}</style>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="trainer-main">
          <TopBar onMenuClick={() => setSidebarOpen(v => !v)} title={currentTitle} />
          <main style={{ minHeight: 'calc(100vh - 60px)' }}>
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
'use client'
import { Bell } from 'lucide-react'
import { useAuth } from '../../hooks'
import { Avatar } from '../ui'

export default function TopHeader({ title }) {
  const { user } = useAuth()
  return (
    <header
      style={{
        height: 'var(--header-height, 64px)',
        background: 'white',
        borderBottom: '1px solid var(--border, #e2e8f0)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        gap: 16,
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      <h2
        className="top-header-title"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--text-primary, #0f172a)',
          flex: 1,
          marginLeft: 40, // space for mobile hamburger button
        }}
      >
        {title}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="btn btn-ghost btn-sm" style={{ position: 'relative', padding: 8 }}>
          <Bell size={18} />
        </button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            background: 'var(--bg-base, #f8fafc)',
            borderRadius: 10,
            border: '1px solid var(--border, #e2e8f0)',
          }}
        >
          <Avatar name={user?.name} src={user?.avatar} size={26} />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary, #0f172a)' }}>
            {user?.name?.split(' ')[0]}
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 769px) {
          .top-header-title {
            margin-left: 0;
          }
        }
      `}</style>
    </header>
  )
}
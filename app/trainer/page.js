'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default function TrainerRootPage() {
  const router = useRouter()
  const token = useSelector(s => s.auth?.token)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('tt_token') : null
    if (token || stored) {
      router.replace('/trainer/dashboard')
    } else {
      router.replace('/auth/login')
    }
  }, [token, router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#eff6ff,#f5f3ff)', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: '#2563eb', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#64748b', fontFamily: 'sans-serif', fontSize: '0.9rem', margin: 0 }}>Redirecting…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

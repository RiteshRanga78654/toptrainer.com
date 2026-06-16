'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from './store/slices/authSlice'
import { Zap } from 'lucide-react'

export default function RootPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized } = useSelector((state) => state.auth)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('tt_token') : null
    if (!token) { router.replace('/auth/login'); return }
    if (!initialized) dispatch(fetchMe())
  }, [])

  useEffect(() => {
    if (!initialized) return
    if (!user) router.replace('/auth/login')
    else if (user.role === 'admin') router.replace('/admin')
    else router.replace('/trainer/dashboard')
  }, [user, initialized])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0c4a6e 0%, #0f172a 50%, #1e1b4b 100%)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(14,165,233,0.4)' }}>
          <Zap size={26} color="white" fill="white" />
        </div>
        <div style={{ width: 24, height: 24, border: '2px solid rgba(14,165,233,0.25)', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

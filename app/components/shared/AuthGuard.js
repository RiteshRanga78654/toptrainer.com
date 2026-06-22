'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from '../../store/slices/authSlice'
import { Zap } from 'lucide-react'

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('tt_token') || document.cookie.match(/token=([^;]+)/)?.[1] || null
}

export default function AuthGuard({ children, requiredRole }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, initialized, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace('/auth/login')
      return
    }
    if (!initialized) {
      dispatch(fetchMe())
    }
  }, [])

  useEffect(() => {
    if (!initialized) return
    if (!user) {
      router.replace('/auth/login')
      return
    }
    if (requiredRole && user.role !== requiredRole) {
      router.replace(user.role === 'admin' ? '/admin' : '/trainer/dashboard')
    }
  }, [user, initialized])

  if (!initialized || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0c4a6e 0%, #0f172a 50%, #1e1b4b 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(14,165,233,0.4)' }}>
            <Zap size={22} color="white" fill="white" />
          </div>
          <div style={{ width: 28, height: 28, border: '2.5px solid rgba(14,165,233,0.25)', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 10px' }} />
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (!user) return null
  if (requiredRole && user.role !== requiredRole) return null

  return children
}

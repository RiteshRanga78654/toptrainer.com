'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../../store/slices/authSlice'
import { Eye, EyeOff, Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (user) {
      router.replace(user.role === 'admin' ? '/admin' : '/trainer/dashboard')
    }
  }, [user, router])

  useEffect(() => { dispatch(clearError()) }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try { await dispatch(login(form)).unwrap() } catch (err) { console.error('Login failed:', err) }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: 10, color: 'white', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #0c4a6e 0%, #0f172a 50%, #1e1b4b 100%)', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'fixed', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '40px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(14,165,233,0.4)' }}>
              <Zap size={26} color="white" fill="white" />
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '1.75rem', color: 'white', letterSpacing: '-0.02em' }}>TopTrainer</h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', marginTop: 6 }}>Sign in to your dashboard</p>
          </div>

          {/* Quick login hints */}
          <div style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: '#38bdf8' }}>Admin:</strong> admin@localhost / admin123<br />
              <strong style={{ color: '#38bdf8' }}>Trainer:</strong> trainer@localhost / trainer123
            </p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
              <p style={{ color: '#fca5a5', fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '11px', background: loading ? 'rgba(14,165,233,0.5)' : 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.925rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 16px rgba(14,165,233,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
              {loading && <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', marginTop: 20 }}>
            Don't have an account?{' '}
            <a href="/auth/register" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>Register</a>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

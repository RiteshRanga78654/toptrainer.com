'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { authAPI } from '../../lib/api'
import { Eye, EyeOff, Zap, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'trainer' })
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user) router.replace(user.role === 'admin' ? '/admin' : '/trainer/dashboard')
  }, [user, router])

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); if (error) setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Name is required')
    if (!form.email.trim()) return setError('Email is required')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match')
    setLoading(true)
    try {
      await authAPI.register({ name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password, role: form.role })
      setSuccess(true)
      setTimeout(() => router.replace('/auth/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally { setLoading(false) }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 10, color: 'white', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #0c4a6e 0%, #0f172a 50%, #1e1b4b 100%)', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ position: 'fixed', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '40px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(14,165,233,0.4)' }}>
              <Zap size={26} color="white" fill="white" />
            </div>
            <h1 style={{ fontWeight: 800, fontSize: '1.75rem', color: 'white', letterSpacing: '-0.02em' }}>TopTrainer</h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', marginTop: 6 }}>Create your account</p>
          </div>

          {success && (
            <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
              <p style={{ color: '#6ee7b7', fontSize: '0.875rem' }}>✓ Account created! Redirecting to login...</p>
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 20 }}>
              <p style={{ color: '#fca5a5', fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Smith" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
            </div>
            <div>
              <label style={labelStyle}>Role</label>
              <select name="role" value={form.role} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', paddingRight: 36, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
                <option value="trainer" style={{ background: '#0f172a' }}>Trainer</option>
                <option value="admin" style={{ background: '#0f172a' }}>Admin</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Password * (min 6 characters)</label>
              <div style={{ position: 'relative' }}>
                <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required
                  style={{ ...inputStyle, paddingRight: 40, borderColor: form.confirmPassword && form.confirmPassword !== form.password ? 'rgba(239,68,68,0.5)' : form.confirmPassword && form.confirmPassword === form.password ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.12)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(14,165,233,0.6)'}
                  onBlur={e => { e.target.style.borderColor = form.confirmPassword && form.confirmPassword !== form.password ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)' }} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <p style={{ color: '#fca5a5', fontSize: '0.75rem', marginTop: 4 }}>Passwords do not match</p>
              )}
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '11px', background: loading ? 'rgba(14,165,233,0.5)' : 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: 10, fontSize: '0.925rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s', boxShadow: '0 4px 16px rgba(14,165,233,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
              {loading ? (<><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Creating account...</>) : (<><UserPlus size={16} /> Create Account</>)}
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', marginTop: 20 }}>
            Already have an account?{' '}
            <a href="/auth/login" style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>Sign in</a>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

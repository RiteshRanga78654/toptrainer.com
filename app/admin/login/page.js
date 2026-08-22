import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0c4a6e 0%, #0f172a 50%, #1e1b4b 100%)' }}><p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p></div>}>
      <LoginForm />
    </Suspense>
  )
}
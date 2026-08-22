'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'
import { Toaster } from 'react-hot-toast'

export default function StoreProvider({ children }) {
  // Create the store once per StoreProvider instance (not once per module),
  // per the standard Redux Toolkit + Next.js App Router pattern.
  const storeRef = useRef(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            borderRadius: 10,
            border: '1px solid var(--border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
        }}
      />
    </Provider>
  )
}
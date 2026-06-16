'use client'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { Toaster } from 'react-hot-toast'

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
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
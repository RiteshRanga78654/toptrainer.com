"use client"
import Sidebar from "../components/shared/Sidebar"
import TopBar from "../components/admin/TopBar"
import AuthGuard from "../components/shared/AuthGuard"
import { useState } from "react"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthGuard requiredRole="admin">
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <div className="hidden lg:block shrink-0">
          <Sidebar role="admin" />
        </div>
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 w-64 h-full">
              <Sidebar role="admin" onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

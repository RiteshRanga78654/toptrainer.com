"use client"

import { useState } from "react"
import { Tabs, Toast } from "../../components/ui"
import ComposeTab from "../../components/admin/communications/ComposeTab"
import TemplatesTab from "../../components/admin/communications/TemplatesTab"
import HistoryTab from "../../components/admin/communications/HistoryTab"
import AnalyticsTab from "../../components/admin/communications/AnalyticsTab"
import { MessageSquare, Send, LayoutTemplate, History, BarChart3, Megaphone } from "lucide-react"

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState("compose")
  const [templatePayload, setTemplatePayload] = useState(null)
  const [toast, setToast] = useState(null)

  const applyTemplate = (template) => {
    setTemplatePayload({
      subject: template.subject,
      htmlBody: template.htmlBody,
      whatsappMessage: template.whatsappMessage,
    })
    setActiveTab("compose")
    setToast({ type: "success", message: `Template "${template.name}" applied` })
  }

  return (
    <div className="space-y-6">
      {toast && <Toast type={toast.type} onClose={() => setToast(null)}>{toast.message}</Toast>}

      {/* Header banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 p-6 text-white shadow-lg">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 right-24 w-56 h-56 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-6 opacity-20">
          <Megaphone size={120} />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <h1 className="text-2xl font-bold">Communication Center</h1>
          </div>
          <p className="text-sm text-blue-100 max-w-xl">
            Send professional emails and WhatsApp messages to your users and trainers,
            schedule campaigns, reuse templates, and track delivery from one place.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { key: "compose", label: "Compose" },
          { key: "templates", label: "Templates" },
          { key: "history", label: "History" },
          { key: "analytics", label: "Analytics" },
        ]}
      />

      <div className="flex items-center gap-2 text-xs text-slate-400 -mt-2">
        {activeTab === "compose" && <span className="inline-flex items-center gap-1"><Send size={12} /> New message</span>}
        {activeTab === "templates" && <span className="inline-flex items-center gap-1"><LayoutTemplate size={12} /> Saved templates</span>}
        {activeTab === "history" && <span className="inline-flex items-center gap-1"><History size={12} /> Message log</span>}
        {activeTab === "analytics" && <span className="inline-flex items-center gap-1"><BarChart3 size={12} /> Delivery insights</span>}
      </div>

      {activeTab === "compose" && (
        <ComposeTab templatePayload={templatePayload} onTemplateConsumed={() => setTemplatePayload(null)} />
      )}
      {activeTab === "templates" && <TemplatesTab onApply={applyTemplate} />}
      {activeTab === "history" && <HistoryTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
    </div>
  )
}

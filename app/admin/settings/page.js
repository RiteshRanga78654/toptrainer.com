"use client"
import { useState } from "react"
import { generalSettings as gs } from "../data/mockData"
import { Card, Button, Input, Toggle, Toast } from "../../components/ui"

export default function SettingsPage() {
  const [settings, setSettings] = useState(gs)
  const [toast, setToast] = useState(null)
  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Site Identity</h2>
        <Input label="Site Name" value={settings.siteName} onChange={v => update("siteName", v)} />
        <Input label="Tagline" value={settings.tagline} onChange={v => update("tagline", v)} />
        <Input label="Contact Email" value={settings.contactEmail} onChange={v => update("contactEmail", v)} type="email" />
        <Input label="Support Phone" value={settings.supportPhone} onChange={v => update("supportPhone", v)} />
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Social Media Links</h2>
        {Object.entries(settings.socialLinks).map(([platform, url]) => (
          <Input key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)} value={url}
            onChange={v => update("socialLinks", { ...settings.socialLinks, [platform]: v })} />
        ))}
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-semibold text-slate-900">Homepage Slider</h2>
        <div>
          <label className="text-sm font-medium text-slate-700">Slide Interval (seconds)</label>
          <div className="flex items-center gap-4 mt-2">
            <input type="range" min={5} max={60} step={5} value={settings.heroSliderInterval}
              onChange={e => update("heroSliderInterval", Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="text-sm font-bold text-slate-900 w-8 shrink-0">{settings.heroSliderInterval}s</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 divide-y divide-slate-100">
        <h2 className="font-semibold text-slate-900 pb-3">Platform Controls</h2>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium text-slate-900">Maintenance Mode</p>
            <p className="text-xs text-slate-500">Hide the site from visitors</p>
          </div>
          <Toggle checked={settings.maintenanceMode} onChange={v => update("maintenanceMode", v)} />
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium text-slate-900">Allow New Registrations</p>
            <p className="text-xs text-slate-500">Allow new users to create accounts</p>
          </div>
          <Toggle checked={settings.allowRegistrations} onChange={v => update("allowRegistrations", v)} />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={() => { setToast("Settings saved!"); setTimeout(() => setToast(null), 3000) }}>
          Save All Settings
        </Button>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  )
}
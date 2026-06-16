"use client"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { heroImages as initialHero, allExperts, generalSettings as gs } from "../data/mockData"
import { Card, Button, Toggle, Toast, Badge, Modal, Input } from "../../components/ui"
import { Trash2, Upload, Plus, ChevronRight, ExternalLink, Check } from "lucide-react"
import { cn, wordCount } from "../../lib/api"

function HeroSection() {
  const [images, setImages] = useState(initialHero)
  const [saved, setSaved] = useState(false)

  const updateCaption = (id, caption) => setImages(prev => prev.map(img => img.id === id ? { ...img, caption } : img))
  const toggleActive = (id) => setImages(prev => prev.map(img => img.id === id ? { ...img, active: !img.active } : img))
  const removeImage = (id) => setImages(prev => prev.filter(img => img.id !== id))

  const handleSave = () => {
    // TODO: POST /api/v1/cms/hero { images }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Hero Section</h2>
          <p className="text-sm text-slate-500 mt-0.5">Upload up to 4 images with 20 words each</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">{images.length} / 4 Images Used</span>
          <Button onClick={handleSave} size="sm">Save Changes</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {images.map((img, idx) => {
          const wc = wordCount(img.caption)
          return (
            <div key={img.id} className={cn("group relative bg-white border rounded-xl overflow-hidden", img.active ? "border-slate-200" : "border-dashed border-slate-300 opacity-60")}>
              <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white text-xs font-bold">{idx + 1}</div>
              <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                <Toggle checked={img.active} onChange={() => toggleActive(img.id)} />
                <button onClick={() => removeImage(img.id)} className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="relative aspect-video bg-slate-100 overflow-hidden upload-zone">
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                <div className="upload-overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <Upload size={18} className="text-white" />
                  <span className="text-white text-xs font-medium">Change Image</span>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <textarea value={img.caption} onChange={e => updateCaption(img.id, e.target.value)} rows={3}
                  className="w-full text-xs text-slate-700 border border-slate-200 rounded-lg px-2.5 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                <div className="flex items-center justify-between">
                  {wc <= 20
                    ? <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><Check size={10} /> {wc} words</span>
                    : <span className="text-xs text-red-500 font-medium">{wc}/20 words (too long)</span>
                  }
                </div>
              </div>
            </div>
          )
        })}

        {images.length < 4 && (
          <div className="border-2 border-dashed border-slate-200 rounded-xl min-h-[200px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 group">
            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center">
              <Plus size={18} className="text-slate-400 group-hover:text-blue-500" />
            </div>
            <p className="text-sm text-slate-500 group-hover:text-blue-600 font-medium">Add Image</p>
          </div>
        )}
      </div>

      {images.length < 4 && (
        <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs shrink-0">i</div>
          <p className="text-sm text-blue-700">If less than 4 images are uploaded, they will repeat every {gs.heroSliderInterval} seconds on the homepage slider.</p>
        </div>
      )}

      {saved && <Toast message="Hero section saved!" type="success" onClose={() => setSaved(false)} />}
    </div>
  )
}

function ExpertSection() {
  const [activeTab, setActiveTab] = useState("industry")
  const [selected, setSelected] = useState({
    industry: new Set(allExperts.filter(e => e.category === "industry" && e.featured).map(e => e.id)),
    department: new Set(allExperts.filter(e => e.category === "department" && e.featured).map(e => e.id)),
    competency: new Set(allExperts.filter(e => e.category === "competency" && e.featured).map(e => e.id)),
  })
  const [saved, setSaved] = useState(false)

  const toggleExpert = (id) => {
    setSelected(prev => {
      const newSet = new Set(prev[activeTab])
      if (newSet.has(id)) { newSet.delete(id) } else { if (newSet.size >= 6) return prev; newSet.add(id) }
      return { ...prev, [activeTab]: newSet }
    })
  }

  const categories = [
    { key: "industry", label: "Industry Experts", color: "text-emerald-600", bg: "bg-emerald-50" },
    { key: "department", label: "Department Experts", color: "text-violet-600", bg: "bg-violet-50" },
    { key: "competency", label: "Competency Experts", color: "text-amber-600", bg: "bg-amber-50" },
  ]

  const filtered = allExperts.filter(e => e.category === activeTab)
  const selectedSet = selected[activeTab]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Expert Section</h2>
          <p className="text-sm text-slate-500 mt-0.5">Select 6 expert profiles from each category</p>
        </div>
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000) }} size="sm">Save Changes</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {categories.map(cat => {
          const count = selected[cat.key].size
          const experts = allExperts.filter(e => e.category === cat.key && selected[cat.key].has(e.id))
          return (
            <div key={cat.key} onClick={() => setActiveTab(cat.key)}
              className={cn("bg-white border rounded-xl p-4 cursor-pointer transition-all", activeTab === cat.key && "ring-2 ring-blue-400")}>
              <div className="flex items-center justify-between mb-3">
                <p className={cn("text-sm font-semibold", cat.color)}>{cat.label}</p>
                <Badge variant={count === 6 ? "success" : "warning"}>{count}/6</Badge>
              </div>
              <div className="flex items-center flex-wrap">
                {experts.slice(0, 5).map(e => (
                  <img key={e.id} src={e.avatar} alt={e.name} className="w-8 h-8 rounded-full object-cover border-2 border-white -ml-1 first:ml-0" />
                ))}
                {count > 5 && <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 -ml-1 border-2 border-white">+{count - 5}</div>}
              </div>
              <button className={cn("mt-3 w-full text-xs py-1.5 rounded-lg font-medium border", cat.color, cat.bg)}>
                Edit {cat.label.split(" ")[0]} Experts
              </button>
            </div>
          )
        })}
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-900 capitalize">Select {activeTab} Experts ({selectedSet.size}/6)</p>
        </div>
        <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(expert => (
            <div key={expert.id} onClick={() => toggleExpert(expert.id)}
              className={cn("relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                selectedSet.has(expert.id) ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white")}>
              {selectedSet.has(expert.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </div>
              )}
              <img src={expert.avatar} alt={expert.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{expert.name}</p>
                <p className="text-xs text-slate-500 truncate">{expert.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {saved && <Toast message="Expert selections saved!" type="success" onClose={() => setSaved(false)} />}
    </div>
  )
}

function OtherSections() {
  const sections = [
    { label: "Workshops", icon: "📚", desc: "Manage workshops", href: "/admin/workshops", color: "bg-blue-50" },
    { label: "Articles", icon: "📰", desc: "Manage articles", href: "/admin/articles", color: "bg-amber-50" },
    { label: "Industry", icon: "🏢", desc: "Manage industries", href: "/admin/industry", color: "bg-emerald-50" },
    { label: "Competency", icon: "🎯", desc: "Manage competencies", href: "/admin/competency", color: "bg-violet-50" },
  ]
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-slate-900">Other Home Sections</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage the content for other sections on homepage</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map(s => (
          <a key={s.label} href={s.href} className="group">
            <Card className="p-5 card-hover cursor-pointer">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3", s.color)}>{s.icon}</div>
              <p className="font-semibold text-slate-900 text-sm">{s.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100">
                Manage <ChevronRight size={12} />
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}

function GeneralSettingsTab() {
  const [settings, setSettings] = useState(gs)
  const [saved, setSaved] = useState(false)
  const update = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">General Settings</h2>
        <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000) }}>Save Changes</Button>
      </div>

      <Card className="p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Site Identity</h3>
        <Input label="Site Name" value={settings.siteName} onChange={v => update("siteName", v)} />
        <Input label="Tagline" value={settings.tagline} onChange={v => update("tagline", v)} />
        <Input label="Contact Email" value={settings.contactEmail} onChange={v => update("contactEmail", v)} type="email" />
        <Input label="Support Phone" value={settings.supportPhone} onChange={v => update("supportPhone", v)} />
      </Card>

      <Card className="p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Social Links</h3>
        {Object.entries(settings.socialLinks).map(([platform, url]) => (
          <Input key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)} value={url}
            onChange={v => update("socialLinks", { ...settings.socialLinks, [platform]: v })} />
        ))}
      </Card>

      <Card className="p-5 space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Slider Settings</h3>
        <div>
          <label className="text-sm font-medium text-slate-700">Slide interval (seconds)</label>
          <div className="flex items-center gap-3 mt-2">
            <input type="range" min={5} max={60} step={5} value={settings.heroSliderInterval}
              onChange={e => update("heroSliderInterval", Number(e.target.value))} className="flex-1 accent-blue-600" />
            <span className="text-sm font-bold text-slate-900 w-8">{settings.heroSliderInterval}s</span>
          </div>
        </div>
      </Card>

      {saved && <Toast message="Settings saved!" type="success" onClose={() => setSaved(false)} />}
    </div>
  )
}

export default function HomepagePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") ?? "hero"

  const tabs = [
    { key: "hero", label: "Hero Section" },
    { key: "expert", label: "Expert Section" },
    { key: "other", label: "Other Home Sections" },
    { key: "general", label: "General Settings" },
  ]

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <a href="https://toptrainer.com" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium">
          <ExternalLink size={12} /> Preview Live Site
        </a>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 border-b border-slate-200">
          <div className="flex gap-1">
            {tabs.map(t => (
              <button key={t.key} onClick={() => router.push(`/admin/homepage?tab=${t.key}`)}
                className={cn("px-4 py-3.5 text-sm font-medium relative whitespace-nowrap",
                  tab === t.key ? "text-blue-600 tab-active" : "text-slate-500 hover:text-slate-700")}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5">
          {tab === "hero" && <HeroSection />}
          {tab === "expert" && <ExpertSection />}
          {tab === "other" && <OtherSections />}
          {tab === "general" && <GeneralSettingsTab />}
        </div>
      </Card>
    </div>
  )
}
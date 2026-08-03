"use client"
import { Bell, Search, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../hooks"

const pageTitles = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back, Admin" },
  "/dashboard/trainers": { title: "Trainers", subtitle: "Manage trainer profiles" },
  "/dashboard/homepage": { title: "Homepage Management", subtitle: "Manage what appears on the website homepage" },
  "/dashboard/workshops": { title: "Workshops", subtitle: "Manage training workshops" },
  "/dashboard/articles": { title: "Articles", subtitle: "Manage published articles" },
  "/dashboard/industry": { title: "Industry", subtitle: "Manage industry categories" },
  "/dashboard/competency": { title: "Competency", subtitle: "Manage competency categories" },
  "/dashboard/department": {title: "Department", suntitle: "Manage Department categories"},
  "/dashboard/media": { title: "Media Library", subtitle: "Manage uploaded media" },
  "/dashboard/settings": { title: "General Settings", subtitle: "Configure your platform" },
  "/dashboard/users": { title: "Users", subtitle: "Manage platform users" },
  "/dashboard/reports": { title: "Reports & Analytics", subtitle: "Platform performance insights" },
  
}

export default function TopBar({ onMenuClick }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const page = pageTitles[pathname] ?? { title: "TopTrainer Admin", subtitle: "" }
  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "A"

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 shrink-0">
      {onMenuClick && (
        <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-800">
          <Menu size={20} />
        </button>
      )}
      <div>
        <h1 className="text-lg font-bold text-slate-900 leading-tight">{page.title}</h1>
        {page.subtitle && <p className="text-xs text-slate-500">{page.subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-60">
          <Search size={14} className="text-slate-400" />
          <input placeholder="Search…" className="bg-transparent text-sm text-slate-700 outline-none w-full placeholder:text-slate-400" />
        </div>
        <button className="relative w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center">
          <Bell size={16} className="text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <Link
          href="/admin/profile"
          className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-blue-700 transition-colors"
        >
          {initials}
        </Link>
      </div>
    </header>
  )
}
// FRONTEND-ONLY: All data stored in localStorage, no backend needed
import { clsx } from "clsx"

// ─── Local Storage helpers ────────────────────────────────────────────────────
function getStore(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}
function setStore(key, value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// ─── Seed default data if missing ─────────────────────────────────────────────
function seedDefaultData() {
  if (getStore('tt_seeded', false)) return

  // Default accounts
  setStore('tt_users', [
    { _id: 'admin-001', name: 'Admin User', email: 'admin@localhost', password: 'admin123', role: 'admin', status: 'active', joined: '2024-01-01', workshopsCompleted: 0 },
    { _id: 'trainer-001', name: 'Trainer User', email: 'trainer@localhost', password: 'trainer123', role: 'trainer', status: 'active', joined: '2024-01-01', workshopsCompleted: 0 },
  ])

  setStore('tt_trainers', [
    { _id: 't1', name: 'Rachel Green', email: 'rachel@example.com', title: 'Leadership Coach', category: 'competency', avatar: 'https://i.pravatar.cc/80?img=30', status: 'active', workshopCount: 4, articleCount: 2, rating: 4.8 },
    { _id: 't2', name: 'David Kim', email: 'david@example.com', title: 'Marketing Director', category: 'department', avatar: 'https://i.pravatar.cc/80?img=18', status: 'active', workshopCount: 3, articleCount: 1, rating: 4.6 },
    { _id: 't3', name: 'Priya Patel', email: 'priya@example.com', title: 'Supply Chain Consultant', category: 'industry', avatar: 'https://i.pravatar.cc/80?img=5', status: 'active', workshopCount: 2, articleCount: 3, rating: 4.9 },
  ])

  setStore('tt_workshops', [
    { _id: 'w1', title: 'Leadership Excellence', date: '2025-07-15', instructor: 'Rachel Green', category: 'Competency', seats: 30, enrolled: 22, status: 'active', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80', description: 'Master leadership skills for modern teams.', createdAt: '2025-01-01' },
    { _id: 'w2', title: 'Financial Analysis Mastery', date: '2025-07-20', instructor: 'David Kim', category: 'Department', seats: 25, enrolled: 25, status: 'full', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80', description: 'Deep dive into financial analysis techniques.', createdAt: '2025-01-05' },
    { _id: 'w3', title: 'Supply Chain Optimization', date: '2025-08-05', instructor: 'Priya Patel', category: 'Industry', seats: 40, enrolled: 18, status: 'active', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', description: 'Optimize your supply chain for maximum efficiency.', createdAt: '2025-01-10' },
    { _id: 'w4', title: 'Digital Marketing Trends', date: '2025-08-12', instructor: 'David Kim', category: 'Department', seats: 35, enrolled: 10, status: 'active', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80', description: 'Stay ahead with the latest digital marketing strategies.', createdAt: '2025-01-15' },
  ])

  setStore('tt_articles', [
    { _id: 'a1', title: 'The Future of Remote Leadership', author: 'Rachel Green', category: 'Leadership', publishedAt: '2025-06-01', status: 'published', views: 3420, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80', content: 'Remote leadership is transforming how teams operate across the globe...', trainerId: 't1' },
    { _id: 'a2', title: 'AI in Financial Services: 2025 Outlook', author: 'David Kim', category: 'Finance', publishedAt: '2025-06-10', status: 'published', views: 2890, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', content: 'Artificial intelligence is reshaping the financial services landscape...', trainerId: 't2' },
    { _id: 'a3', title: 'Building High-Performance Teams', author: 'Rachel Green', category: 'HR', publishedAt: null, status: 'draft', views: 0, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80', content: 'High-performance teams share common traits that set them apart...', trainerId: 't1' },
    { _id: 'a4', title: 'Sustainable Supply Chain Practices', author: 'Priya Patel', category: 'Operations', publishedAt: '2025-06-18', status: 'published', views: 1560, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80', content: 'Sustainability is becoming a core pillar of supply chain management...', trainerId: 't3' },
  ])

  setStore('tt_industries', [
    { _id: 'i1', name: 'Finance & Banking', icon: '💰', expertCount: 8, workshopCount: 5, status: 'active' },
    { _id: 'i2', name: 'Healthcare', icon: '🏥', expertCount: 6, workshopCount: 4, status: 'active' },
    { _id: 'i3', name: 'Technology', icon: '💻', expertCount: 12, workshopCount: 8, status: 'active' },
    { _id: 'i4', name: 'Retail & E-commerce', icon: '🛍️', expertCount: 5, workshopCount: 3, status: 'active' },
    { _id: 'i5', name: 'Manufacturing', icon: '🏭', expertCount: 4, workshopCount: 2, status: 'inactive' },
  ])

  setStore('tt_competencies', [
    { _id: 'c1', name: 'Leadership', icon: '🎯', expertCount: 5, workshopCount: 4, status: 'active' },
    { _id: 'c2', name: 'Communication', icon: '🗣️', expertCount: 4, workshopCount: 3, status: 'active' },
    { _id: 'c3', name: 'Critical Thinking', icon: '🧠', expertCount: 3, workshopCount: 2, status: 'active' },
    { _id: 'c4', name: 'Emotional Intelligence', icon: '❤️', expertCount: 2, workshopCount: 1, status: 'active' },
    { _id: 'c5', name: 'Negotiation', icon: '🤝', expertCount: 3, workshopCount: 2, status: 'inactive' },
  ])

  setStore('tt_media', [
    { _id: 'm1', name: 'hero-1.jpg', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80', type: 'image', size: '245 KB', uploadedAt: '2025-01-01' },
    { _id: 'm2', name: 'hero-2.jpg', url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80', type: 'image', size: '312 KB', uploadedAt: '2025-01-02' },
  ])

  setStore('tt_seeded', true)
}

// Run seed on module load
if (typeof window !== 'undefined') seedDefaultData()

// ─── Simulate async delay ─────────────────────────────────────────────────────
const delay = (ms = 150) => new Promise(r => setTimeout(r, ms))

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: async ({ email, password }) => {
    await delay()
    const users = getStore('tt_users', [])
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) throw { response: { data: { message: 'Invalid email or password' } } }
    const { password: _, ...safeUser } = user
    const token = btoa(JSON.stringify({ id: user._id, role: user.role, ts: Date.now() }))
    return { data: { data: { token, user: safeUser } } }
  },
  register: async ({ name, email, password, role }) => {
    await delay()
    const users = getStore('tt_users', [])
    if (users.find(u => u.email === email)) throw { response: { data: { message: 'Email already registered' } } }
    const newUser = { _id: makeId(), name, email, password, role: role || 'trainer', status: 'active', joined: new Date().toISOString(), workshopsCompleted: 0 }
    setStore('tt_users', [...users, newUser])
    return { data: { message: 'Registered successfully' } }
  },
  logout: async () => { await delay(50); return { data: {} } },
  me: async () => {
    await delay()
    const token = typeof window !== 'undefined' ? (document.cookie.match(/token=([^;]+)/)?.[1] || localStorage.getItem('tt_token')) : null
    if (!token) throw { response: { status: 401, data: { message: 'Unauthorized' } } }
    try {
      const { id } = JSON.parse(atob(token))
      const users = getStore('tt_users', [])
      const user = users.find(u => u._id === id)
      if (!user) throw new Error('Not found')
      const { password: _, ...safeUser } = user
      return { data: { data: safeUser } }
    } catch { throw { response: { status: 401 } } }
  },
}

// ─── GENERIC CRUD FACTORY ────────────────────────────────────────────────────
function makeCRUD(storeKey) {
  return {
    getAll: async (params = {}) => {
      await delay()
      let items = getStore(storeKey, [])
      if (params.search) {
        const q = params.search.toLowerCase()
        items = items.filter(i => JSON.stringify(i).toLowerCase().includes(q))
      }
      return { data: { data: items, total: items.length } }
    },
    getOne: async (id) => {
      await delay()
      const items = getStore(storeKey, [])
      const item = items.find(i => i._id === id)
      if (!item) throw { response: { data: { message: 'Not found' } } }
      return { data: { data: item } }
    },
    create: async (data) => {
      await delay()
      const items = getStore(storeKey, [])
      const newItem = { _id: makeId(), ...data, createdAt: new Date().toISOString() }
      setStore(storeKey, [...items, newItem])
      return { data: { data: newItem } }
    },
    update: async (id, data) => {
      await delay()
      const items = getStore(storeKey, [])
      const idx = items.findIndex(i => i._id === id)
      if (idx === -1) throw { response: { data: { message: 'Not found' } } }
      items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() }
      setStore(storeKey, items)
      return { data: { data: items[idx] } }
    },
    delete: async (id) => {
      await delay()
      const items = getStore(storeKey, [])
      setStore(storeKey, items.filter(i => i._id !== id))
      return { data: { message: 'Deleted' } }
    },
    updateStatus: async (id, status) => {
      await delay()
      const items = getStore(storeKey, [])
      const idx = items.findIndex(i => i._id === id)
      if (idx === -1) throw { response: { data: { message: 'Not found' } } }
      items[idx] = { ...items[idx], status }
      setStore(storeKey, items)
      return { data: { data: items[idx] } }
    },
  }
}

// ─── DOMAIN APIs ─────────────────────────────────────────────────────────────
export const usersAPI = {
  ...makeCRUD('tt_users'),
  getMe: () => authAPI.me(),
  updateMe: async (data) => {
    await delay()
    const token = typeof window !== 'undefined' ? (localStorage.getItem('tt_token') || document.cookie.match(/token=([^;]+)/)?.[1]) : null
    if (!token) throw { response: { status: 401 } }
    const { id } = JSON.parse(atob(token))
    return usersAPI.update(id, data)
  },
}

export const trainersAPI = {
  ...makeCRUD('tt_trainers'),
  getStats: async (id) => {
    await delay()
    const trainers = getStore('tt_trainers', [])
    const trainer = trainers.find(t => t._id === id)
    return { data: { data: { workshopCount: trainer?.workshopCount || 0, articleCount: trainer?.articleCount || 0, rating: trainer?.rating || 0 } } }
  },
}

export const workshopsAPI = {
  ...makeCRUD('tt_workshops'),
  getMine: async () => {
    await delay()
    const workshops = getStore('tt_workshops', [])
    return { data: { data: workshops, total: workshops.length } }
  },
  getByTrainer: async (trainerId) => {
    await delay()
    const workshops = getStore('tt_workshops', [])
    const mine = workshops.filter(w => w.trainerId === trainerId)
    return { data: { data: mine } }
  },
}

export const articlesAPI = {
  ...makeCRUD('tt_articles'),
  getMine: async () => {
    await delay()
    const articles = getStore('tt_articles', [])
    return { data: { data: articles, total: articles.length } }
  },
}

export const industriesAPI = makeCRUD('tt_industries')
export const competenciesAPI = makeCRUD('tt_competencies')

export const departmentsAPI = {
  ...makeCRUD('tt_departments'),
  getAll: async () => {
    await delay()
    const items = getStore('tt_departments', [
      { _id: 'd1', name: 'Human Resources', icon: '👥', status: 'active' },
      { _id: 'd2', name: 'Finance', icon: '💵', status: 'active' },
      { _id: 'd3', name: 'Marketing', icon: '📣', status: 'active' },
      { _id: 'd4', name: 'Operations', icon: '⚙️', status: 'active' },
    ])
    return { data: { data: items, total: items.length } }
  },
}

export const rankingsAPI = makeCRUD('tt_rankings')
export const cmsAPI = makeCRUD('tt_cms')

export const analyticsAPI = {
  getDashboard: async () => {
    await delay()
    const trainers = getStore('tt_trainers', [])
    const workshops = getStore('tt_workshops', [])
    const articles = getStore('tt_articles', [])
    const users = getStore('tt_users', [])
    return {
      data: {
        data: {
          totalTrainers: trainers.length,
          totalLearners: users.filter(u => u.role === 'learner').length || 1240,
          totalWorkshops: workshops.length,
          totalArticles: articles.length,
          monthlyRevenue: 84200,
          activeEnrollments: workshops.reduce((s, w) => s + (w.enrolled || 0), 0),
        }
      }
    }
  },
  getTrainerAnalytics: async () => { await delay(); return { data: { data: [] } } },
  getWorkshopAnalytics: async () => { await delay(); return { data: { data: [] } } },
  getArticleAnalytics: async () => { await delay(); return { data: { data: [] } } },
}

export const uploadsAPI = {
  upload: async (formData) => {
    await delay(300)
    const file = formData.get('file')
    if (!file) throw new Error('No file')
    const url = URL.createObjectURL(file)
    const media = getStore('tt_media', [])
    const newItem = { _id: makeId(), name: file.name, url, type: file.type.split('/')[0], size: `${Math.round(file.size / 1024)} KB`, uploadedAt: new Date().toISOString() }
    setStore('tt_media', [...media, newItem])
    return { data: { data: { url, filename: file.name } } }
  },
  delete: async (filename) => {
    await delay()
    const media = getStore('tt_media', [])
    setStore('tt_media', media.filter(m => m.name !== filename))
    return { data: { message: 'Deleted' } }
  },
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
export function cn(...inputs) { return clsx(inputs) }

export function formatDate(dateStr) {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

export function truncate(str, n) {
  return str.length > n ? str.substring(0, n - 1) + "…" : str
}

export function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length
}

export default { post: () => {}, get: () => {}, put: () => {}, delete: () => {}, patch: () => {} }

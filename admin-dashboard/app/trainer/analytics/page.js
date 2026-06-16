'use client'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { workshopsAPI, articlesAPI } from '../../lib/api'
import {
  Eye, Users, TrendingUp, BookOpen,
  FileText, Star, BarChart2, RefreshCw,
  DollarSign, AlertCircle, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'

const T = {
  blue:   '#2563eb',
  violet: '#7c3aed',
  slate:  '#0f172a',
  muted:  '#64748b',
  light:  '#94a3b8',
  border: 'rgba(226,232,240,0.8)',
}

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'white', border: `1px solid ${T.border}`, borderRadius: 16, boxShadow: '0 2px 12px rgba(37,99,235,0.04)', ...style }}>
    {children}
  </div>
)

const BigStat = ({ label, value, icon: Icon, color, bg, sub, delay = 0, trend }) => (
  <Card style={{ padding: '22px 24px', position: 'relative', overflow: 'hidden', animation: `fadeUp 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms both` }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: 70, height: 70, borderRadius: '0 16px 0 70px', background: bg, opacity: 0.5 }} />
    <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color }}>
      <Icon size={20} strokeWidth={2} />
    </div>
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '2rem', color: T.slate, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.78rem', color: T.muted, marginTop: 4, fontWeight: 500 }}>{label}</div>
    {sub && <div style={{ fontSize: '0.72rem', color: T.light, marginTop: 6 }}>{sub}</div>}
    {trend !== undefined && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
        {trend >= 0
          ? <ArrowUpRight size={13} color="#16a34a" />
          : <ArrowDownRight size={13} color="#dc2626" />
        }
        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: trend >= 0 ? '#16a34a' : '#dc2626' }}>
          {Math.abs(trend)}% vs last month
        </span>
      </div>
    )}
  </Card>
)

function MiniBar({ items, color }) {
  const max = Math.max(...items.map(i => i.value), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
      {items.map((item, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative' }}>
          <div
            title={`${item.label}: ${item.value}`}
            style={{
              width: '100%', borderRadius: '4px 4px 0 0',
              background: `linear-gradient(180deg,${color}cc,${color}44)`,
              height: `${Math.max(4, (item.value / max) * 70)}px`,
              transition: 'height 0.6s ease', minHeight: 4, cursor: 'default',
            }}
          />
          <span style={{ fontSize: '0.6rem', color: T.light, whiteSpace: 'nowrap' }}>{item.label}</span>
          {item.value > 0 && (
            <span style={{ position: 'absolute', top: -18, fontSize: '0.6rem', color, fontWeight: 700 }}>{item.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}

function DonutChart({ pct, color, label, value, total }) {
  const r = 36
  const circumference = 2 * Math.PI * r
  const dashOffset = circumference * (1 - (pct / 100))
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
          <circle
            cx="45" cy="45" r={r} fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 45 45)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: T.slate, lineHeight: 1 }}>{pct}%</span>
        </div>
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: T.muted }}>{value} / {total}</p>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const user = useSelector(s => s.auth?.user)
  const [workshops,  setWorkshops]  = useState([])
  const [articles,   setArticles]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [period,     setPeriod]     = useState('6m')  // '3m', '6m', '12m'

  const fetchData = useCallback(async (isRefresh = false) => {
    const id = user?._id || user?.id
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)
    try {
      const [w, a] = await Promise.all([
        workshopsAPI.getAll({ limit: 200, ...(id && { trainer: id }) }),
        articlesAPI.getAll({ limit: 200,  ...(id && { author: id  }) }),
      ])
      setWorkshops(w.data?.data || w.data?.workshops || [])
      setArticles(a.data?.data  || a.data?.articles  || [])
    } catch (e) {
      setError(e.message || 'Failed to load analytics')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [user])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80, gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: T.blue, animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: T.light, fontSize: '0.84rem', margin: 0 }}>Loading analytics…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (error) return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <AlertCircle size={40} color="#dc2626" style={{ marginBottom: 12, opacity: 0.7 }} />
      <p style={{ color: '#dc2626', fontWeight: 600, marginBottom: 12 }}>{error}</p>
      <button onClick={() => fetchData()} style={{ padding: '10px 24px', background: T.blue, color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>Retry</button>
    </div>
  )

  // ── Computed stats ──────────────────────────────────────────────────────────
  const totalViews    = articles.reduce((s, a) => s + (a.views || 0), 0)
  const totalEnrolled = workshops.reduce((s, w) => s + (w.enrolledCount || 0), 0)
  const totalCapacity = workshops.reduce((s, w) => s + (w.maxCapacity  || 0), 0)
  const fillRate      = totalCapacity > 0 ? Math.round(totalEnrolled / totalCapacity * 100) : 0
  const avgViews      = articles.length > 0 ? Math.round(totalViews / articles.length) : 0
  const publishedCount = articles.filter(a => a.status === 'published').length
  const draftCount    = articles.filter(a => a.status === 'draft').length
  const totalRevenue  = workshops.reduce((s, w) => s + ((w.price || 0) * (w.enrolledCount || 0)), 0)
  const upcomingCount = workshops.filter(w => w.status === 'upcoming').length
  const completedCount = workshops.filter(w => w.status === 'completed').length

  const topArticles  = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
  const topWorkshops = [...workshops].sort((a, b) => (b.enrolledCount || 0) - (a.enrolledCount || 0)).slice(0, 5)

  // Month labels based on period
  const monthCount = period === '3m' ? 3 : period === '12m' ? 12 : 6
  const now = new Date()
  const monthLabels = Array.from({ length: monthCount }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (monthCount - 1 - i), 1)
    return { month: d.getMonth(), year: d.getFullYear(), label: d.toLocaleDateString('en-US', { month: 'short' }) }
  })

  const articlesByMonth = monthLabels.map(({ month, year, label }) => ({
    label,
    value: articles.filter(a => {
      const d = new Date(a.createdAt)
      return d.getMonth() === month && d.getFullYear() === year
    }).length,
  }))

  const viewsByMonth = monthLabels.map(({ month, year, label }) => ({
    label,
    value: articles.filter(a => {
      const d = new Date(a.createdAt)
      return d.getMonth() === month && d.getFullYear() === year
    }).reduce((s, a) => s + (a.views || 0), 0),
  }))

  const workshopsByMonth = monthLabels.map(({ month, year, label }) => ({
    label,
    value: workshops.filter(w => {
      const d = new Date(w.createdAt)
      return d.getMonth() === month && d.getFullYear() === year
    }).length,
  }))

  const revenueByMonth = monthLabels.map(({ month, year, label }) => ({
    label,
    value: workshops
      .filter(w => {
        const d = new Date(w.createdAt)
        return d.getMonth() === month && d.getFullYear() === year
      })
      .reduce((s, w) => s + ((w.price || 0) * (w.enrolledCount || 0)), 0),
  }))

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin   { to   { transform:rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28, animation: 'fadeUp 0.5s cubic-bezier(.22,1,.36,1) both', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.5rem', color: T.slate, margin: 0 }}>Analytics</h1>
          <p style={{ color: T.muted, fontSize: '0.85rem', margin: '4px 0 0' }}>Performance overview for all your content and workshops</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Period selector */}
          <div style={{ display: 'flex', background: '#f8fafc', borderRadius: 9, padding: 3, border: `1px solid ${T.border}` }}>
            {[['3m', '3M'], ['6m', '6M'], ['12m', '1Y']].map(([val, label]) => (
              <button key={val} onClick={() => setPeriod(val)} style={{
                padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: '0.76rem', fontWeight: 600, transition: 'all 0.18s',
                background: period === val ? 'white' : 'transparent',
                color: period === val ? T.blue : T.muted,
                boxShadow: period === val ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}>
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 10, border: `1px solid ${T.border}`, background: 'white', color: T.muted, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', opacity: refreshing ? 0.6 : 1, transition: 'all 0.18s' }}
            onMouseEnter={e => { if (!refreshing) { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted }}
          >
            <RefreshCw size={14} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Big stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(188px,1fr))', gap: 14, marginBottom: 28 }}>
        <BigStat label="Total Views"        value={totalViews.toLocaleString()}          icon={Eye}       color="#0891b2" bg="#ecfeff" delay={0}   sub={`${avgViews} avg per article`} />
        <BigStat label="Total Enrollments"  value={totalEnrolled.toLocaleString()}       icon={Users}     color={T.blue}  bg="#eff6ff" delay={60}  sub={`${fillRate}% fill rate`} />
        <BigStat label="Published Articles" value={publishedCount}                       icon={FileText}  color={T.violet}bg="#f5f3ff" delay={120} sub={`${draftCount} drafts`} />
        <BigStat label="Total Workshops"    value={workshops.length}                     icon={BookOpen}  color="#d97706" bg="#fffbeb" delay={180} sub={`${upcomingCount} upcoming`} />
        <BigStat label="Total Revenue"      value={`$${totalRevenue.toLocaleString()}`}  icon={DollarSign}color="#16a34a" bg="#f0fdf4" delay={240} sub="from paid workshops" />
        <BigStat label="Avg Workshop Fill"  value={`${fillRate}%`}                       icon={Star}      color="#dc2626" bg="#fff1f2" delay={300} sub={`${totalEnrolled}/${totalCapacity} seats`} />
      </div>

      {/* Donut charts row */}
      {(articles.length > 0 || workshops.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 24 }}>
          {articles.length > 0 && (
            <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 310ms both' }}>
              <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Article Publish Rate</p>
              <DonutChart
                pct={articles.length > 0 ? Math.round(publishedCount / articles.length * 100) : 0}
                color={T.violet} label="Published" value={publishedCount} total={articles.length}
              />
            </Card>
          )}
          {totalCapacity > 0 && (
            <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 350ms both' }}>
              <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Workshop Fill Rate</p>
              <DonutChart
                pct={fillRate} color={T.blue} label="Seats Filled" value={totalEnrolled} total={totalCapacity}
              />
            </Card>
          )}
          {workshops.length > 0 && (
            <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 390ms both' }}>
              <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Completion Rate</p>
              <DonutChart
                pct={workshops.length > 0 ? Math.round(completedCount / workshops.length * 100) : 0}
                color="#16a34a" label="Completed" value={completedCount} total={workshops.length}
              />
            </Card>
          )}
        </div>
      )}

      {/* Bar charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 24 }}>
        <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 320ms both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={16} color={T.blue} />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Articles Published</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: T.light }}>Last {monthCount} months</p>
            </div>
          </div>
          <MiniBar items={articlesByMonth} color={T.blue} />
        </Card>

        <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 380ms both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Eye size={16} color="#0891b2" />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Article Views</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: T.light }}>Last {monthCount} months</p>
            </div>
          </div>
          <MiniBar items={viewsByMonth} color="#0891b2" />
        </Card>

        <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 420ms both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={16} color="#d97706" />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Workshops Created</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: T.light }}>Last {monthCount} months</p>
            </div>
          </div>
          <MiniBar items={workshopsByMonth} color="#d97706" />
        </Card>

        {totalRevenue > 0 && (
          <Card style={{ padding: '20px 24px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 460ms both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={16} color="#16a34a" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: T.slate }}>Revenue</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: T.light }}>Last {monthCount} months</p>
              </div>
            </div>
            <MiniBar items={revenueByMonth} color="#16a34a" />
          </Card>
        )}
      </div>

      {/* Top tables */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>

        {/* Top Articles */}
        <Card style={{ padding: '20px 22px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 440ms both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '1rem', color: T.slate, margin: 0 }}>Top Articles by Views</h2>
            {articles.length > 5 && (
              <Link href="/trainer/articles" style={{ fontSize: '0.76rem', color: T.blue, textDecoration: 'none', fontWeight: 600 }}>
                View all →
              </Link>
            )}
          </div>
          {topArticles.length === 0 ? (
            <p style={{ color: T.light, fontSize: '0.84rem', textAlign: 'center', padding: '24px 0' }}>No articles yet</p>
          ) : topArticles.map((a, i) => {
            const maxViews = topArticles[0]?.views || 1
            const pct = Math.max(4, Math.round((a.views || 0) / maxViews * 100))
            return (
              <Link key={a._id} href={`/trainer/articles/${a._id}/edit`} style={{ display: 'block', marginBottom: i < topArticles.length - 1 ? 14 : 0, textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: T.slate, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>
                    {i + 1}. {a.title}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: T.muted, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Eye size={10} /> {(a.views || 0).toLocaleString()}
                  </span>
                </div>
                <div style={{ height: 5, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${T.blue},${T.violet})`, borderRadius: 99, transition: 'width 0.8s ease' }} />
                </div>
              </Link>
            )
          })}
        </Card>

        {/* Top Workshops */}
        <Card style={{ padding: '20px 22px', animation: 'fadeUp 0.55s cubic-bezier(.22,1,.36,1) 500ms both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '1rem', color: T.slate, margin: 0 }}>Top Workshops by Enrollment</h2>
            {workshops.length > 5 && (
              <Link href="/trainer/workshops" style={{ fontSize: '0.76rem', color: T.blue, textDecoration: 'none', fontWeight: 600 }}>
                View all →
              </Link>
            )}
          </div>
          {topWorkshops.length === 0 ? (
            <p style={{ color: T.light, fontSize: '0.84rem', textAlign: 'center', padding: '24px 0' }}>No workshops yet</p>
          ) : topWorkshops.map((w, i) => {
            const pct = w.maxCapacity ? Math.min(100, Math.round((w.enrolledCount || 0) / w.maxCapacity * 100)) : 0
            return (
              <Link key={w._id} href={`/trainer/workshops/${w._id}/edit`} style={{ display: 'block', marginBottom: i < topWorkshops.length - 1 ? 14 : 0, textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: T.slate, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>
                    {i + 1}. {w.title}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: T.muted, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Users size={10} /> {w.enrolledCount || 0}/{w.maxCapacity || '∞'} ({pct}%)
                  </span>
                </div>
                <div style={{ height: 5, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${Math.max(4, pct)}%`,
                    background: pct >= 90 ? 'linear-gradient(90deg,#dc2626,#f97316)' : 'linear-gradient(90deg,#d97706,#7c3aed)',
                    borderRadius: 99, transition: 'width 0.8s ease',
                  }} />
                </div>
              </Link>
            )
          })}
        </Card>
      </div>

      {/* Empty state */}
      {articles.length === 0 && workshops.length === 0 && (
        <Card style={{ padding: '60px 32px', textAlign: 'center', marginTop: 24 }}>
          <BarChart2 size={48} color={T.light} style={{ marginBottom: 12 }} />
          <p style={{ fontWeight: 700, color: T.slate, margin: '0 0 6px', fontSize: '1rem' }}>No data yet</p>
          <p style={{ color: T.muted, fontSize: '0.84rem', margin: '0 0 20px' }}>Create articles and workshops to start seeing analytics.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link href="/trainer/articles/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `linear-gradient(135deg,${T.blue},${T.violet})`, color: 'white', padding: '10px 20px', borderRadius: 10, fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none' }}>
              Write Article
            </Link>
            <Link href="/trainer/workshops/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'white', border: `1px solid ${T.border}`, color: T.slate, padding: '10px 20px', borderRadius: 10, fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none' }}>
              New Workshop
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
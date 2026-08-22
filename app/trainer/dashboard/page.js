"use client";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trainerDashboardAPI } from "../../lib/api";
import {
  BookOpen, FileText, Eye, Users, TrendingUp,
  ArrowRight, Clock, Star, Plus, BarChart2,
  RefreshCw, AlertCircle,
} from "lucide-react";

const T = {
  blue: "#2563eb",
  violet: "#7c3aed",
  slate: "#0f172a",
  muted: "#64748b",
  light: "#94a3b8",
  border: "rgba(226,232,240,0.8)",
};

const Card = ({ children, style = {}, onClick, ...props }) => (
  <div
    onClick={onClick}
    style={{
      background: "white",
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(37,99,235,0.04)",
      cursor: onClick ? "pointer" : "default",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

const StatCard = ({ label, value, icon: Icon, color, bg, delay = 0, suffix = "", href }) => {
  const router = useRouter();
  return (
    <Card
      onClick={href ? () => router.push(href) : undefined}
      style={{
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
        animation: `fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms both`,
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: href ? "pointer" : "default",
      }}
      onMouseEnter={href ? (e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.1)";
      } : undefined}
      onMouseLeave={href ? (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.04)";
      } : undefined}
    >
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 80, height: 80, borderRadius: "0 16px 0 80px",
        background: bg, opacity: 0.7,
      }} />
      <div style={{
        width: 40, height: 40, borderRadius: 11, background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 14, color,
      }}>
        <Icon size={20} strokeWidth={2} />
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontWeight: 800, fontSize: "1.85rem", color: "#0f172a", lineHeight: 1,
      }}>
        {value}{suffix}
      </div>
      <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 5, fontWeight: 500 }}>
        {label}
      </div>
    </Card>
  );
};

const SectionTitle = ({ children, href, linkLabel = "View All" }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
    <h2 style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      fontWeight: 700, fontSize: "1.05rem", color: "#0f172a", margin: 0,
    }}>
      {children}
    </h2>
    {href && (
      <Link
        href={href}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          fontSize: "0.8rem", fontWeight: 600, color: "#2563eb",
          textDecoration: "none", padding: "4px 10px", borderRadius: 8,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#eff6ff"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        {linkLabel} <ArrowRight size={14} />
      </Link>
    )}
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    published: { bg: "#dcfce7", color: "#16a34a", label: "Published" },
    draft: { bg: "#fef9c3", color: "#ca8a04", label: "Draft" },
    upcoming: { bg: "#dbeafe", color: "#2563eb", label: "Upcoming" },
    ongoing: { bg: "#ede9fe", color: "#7c3aed", label: "Ongoing" },
    completed: { bg: "#f0fdf4", color: "#16a34a", label: "Completed" },
    cancelled: { bg: "#fee2e2", color: "#dc2626", label: "Cancelled" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#64748b", label: status || "—" };
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: "0.7rem",
      fontWeight: 700, padding: "3px 9px", borderRadius: 99, whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
};

function EmptyMini({ icon, text, cta }) {
  return (
    <div style={{ textAlign: "center", padding: "28px 0" }}>
      <div style={{ fontSize: "2rem", opacity: 0.3, marginBottom: 8 }}>{icon}</div>
      <p style={{ color: "#94a3b8", fontSize: "0.84rem", margin: "0 0 10px" }}>{text}</p>
      <Link href={cta.href} style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: "0.8rem", fontWeight: 600, color: "#2563eb", textDecoration: "none",
        background: "#eff6ff", padding: "6px 14px", borderRadius: 8,
      }}>
        <Plus size={13} /> {cta.label}
      </Link>
    </div>
  );
}

function PageLoader() {
  return (
    <div style={{ padding: "60px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "3px solid #e2e8f0", borderTopColor: "#2563eb",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: "#94a3b8", fontSize: "0.84rem", margin: 0 }}>Loading dashboard…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function DashboardContent() {
  const user = useSelector((s) => s.auth?.user);
  const router = useRouter();

  const [workshops, setWorkshops] = useState([]);   // holds backend's recentWorkshops
  const [articles, setArticles] = useState([]);      // holds backend's recentArticles
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (!user) {
      setLoading(false);
      return;
    }

    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError(null);

    try {
      const res = await trainerDashboardAPI.getDashboard();
      const data = res?.data?.data || {};

      setStats(data.stats || {});
      setWorkshops(data.recentWorkshops || []);
      setArticles(data.recentArticles || []);
    } catch (e) {
      const status = e?.response?.status;
      const message =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load data";

      if (status === 401) {
        router.replace("/auth/login");
        return;
      }

      if (status === 404) {
        setError("Requested API endpoint not found");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user, fetchData]);

  if (loading) return <PageLoader />;

  if (error) return (
    <div style={{ padding: "40px 24px", textAlign: "center" }}>
      <AlertCircle size={40} color="#dc2626" style={{ marginBottom: 12, opacity: 0.7 }} />
      <p style={{ color: "#dc2626", fontWeight: 600, marginBottom: 12 }}>{error}</p>
      <button
        onClick={() => fetchData()}
        style={{ padding: "10px 24px", background: T.blue, color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: "0.88rem" }}
      >
        Retry
      </button>
    </div>
  );

  // Backend already computes these across ALL workshops/articles (not just
  // the "recent" subset above), so use stats.* directly instead of
  // recalculating from the (partial) workshops/articles arrays.
  const publishedArticles = stats.publishedArticles ?? 0;
  const totalViews = stats.profileView ?? 0;
  const upcomingWorkshops = stats.upcomingSessions ?? 0;
  const totalWorkshopsCount = stats.totalWorkshops ?? 0;
  const totalArticlesCount = stats.totalArticles ?? 0;
  const fillRate = stats.fillRate ?? 0;
  // Backend doesn't compute a revenue total yet, so the revenue banner just stays hidden.
  const totalRevenue = 0;

  // Backend already sorts + slices these to "recent", no need to redo it here.
  const recentArticles = articles;
  const recentWorkshops = workshops;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: "28px 24px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}}
      `}</style>

      <div style={{ marginBottom: 28, animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) both", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: "1.5rem" }}>👋</span>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800, fontSize: "1.6rem", color: "#0f172a", margin: 0,
            }}>
              {greeting}, {user?.name?.split(" ")[0] || "Trainer"}!
            </h1>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
            Here's an overview of your content performance and upcoming sessions.
          </p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "9px 16px", borderRadius: 10,
            border: `1px solid ${T.border}`, background: "white",
            color: T.muted, fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
            opacity: refreshing ? 0.6 : 1, transition: "all 0.18s",
          }}
          onMouseEnter={e => { if (!refreshing) { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue; } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
        >
          <RefreshCw size={14} style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }} />
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 mb-7">
        <StatCard label="Profile Views" value={totalViews.toLocaleString()} icon={Eye} color="#0891b2" bg="#ecfeff" delay={180} href="/trainer/analytics" />
        <StatCard label="Published Articles" value={publishedArticles} icon={TrendingUp} color="#16a34a" bg="#f0fdf4" delay={120} href="/trainer/articles" />
        <StatCard label="Total Workshops" value={totalWorkshopsCount} icon={BookOpen} color="#2563eb" bg="#eff6ff" delay={0} href="/trainer/workshops" />
        <StatCard label="Total Articles" value={totalArticlesCount} icon={FileText} color="#7c3aed" bg="#f5f3ff" delay={60} href="/trainer/articles" />
        <StatCard label="Upcoming Sessions" value={upcomingWorkshops} icon={Star} color="#d97706" bg="#fffbeb" delay={240} href="/trainer/workshops" />
        <StatCard label="Fill Rate" value={fillRate} icon={Users} color="#dc2626" bg="#fff1f2" delay={300} suffix="%" href="/trainer/analytics" />
      </div>

      {totalRevenue > 0 && (
        <div style={{
          background: "linear-gradient(135deg,#0f172a,#1e1b4b)",
          borderRadius: 16, padding: "18px 24px", marginBottom: 24,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12, animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 300ms both",
        }}>
          <div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>Total Revenue</p>
            <p style={{ margin: "2px 0 0", fontSize: "1.6rem", fontWeight: 800, color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <Link href="/trainer/analytics" style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "white", padding: "8px 16px", borderRadius: 9,
            fontSize: "0.82rem", fontWeight: 700, textDecoration: "none",
            transition: "background 0.18s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            View Analytics <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <div style={{
        background: "linear-gradient(135deg,#2563eb,#7c3aed)",
        borderRadius: 18, padding: "22px 28px", marginBottom: 28,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
        animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 320ms both",
        boxShadow: "0 8px 32px rgba(37,99,235,0.3)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -20, right: 80, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "relative" }}>
          <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "white", margin: "0 0 4px" }}>
            Ready to share your expertise?
          </h3>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.84rem", margin: 0 }}>
            Create an article or host a workshop to grow your audience.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, position: "relative" }}>
          <Link href="/trainer/articles/" style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white", padding: "9px 18px", borderRadius: 10,
            fontSize: "0.84rem", fontWeight: 700, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          >
            <Plus size={15} /> Write Article
          </Link>
          <Link href="/trainer/workshops/" style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "white", color: "#2563eb",
            padding: "9px 18px", borderRadius: 10,
            fontSize: "0.84rem", fontWeight: 700, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,255,255,0.4)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <Plus size={15} /> New Workshop
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
        <Card style={{ padding: "20px 22px", animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 360ms both" }}>
          <SectionTitle href="/trainer/articles">Recent Articles</SectionTitle>
          {recentArticles.length === 0 ? (
            <EmptyMini icon="✍️" text="No articles yet" cta={{ href: "/trainer/articles/", label: "Write your first article" }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {recentArticles.map((a, idx) => (
                <Link
                  key={a._id || a.id}
                  href={`/trainer/articles/${a._id || a.id}/edit`}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    borderBottom: idx < recentArticles.length - 1 ? "1px solid #f1f5f9" : "none",
                    textDecoration: "none",
                    transition: "background 0.15s",
                    borderRadius: 8,
                    margin: "0 -8px",
                    padding: "10px 8px",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    width: 52, height: 42, borderRadius: 9, flexShrink: 0, overflow: "hidden",
                    background: "linear-gradient(135deg,#eff6ff,#f5f3ff)",
                    border: "1px solid #e2e8f0",
                  }}>
                    {(a.coverImage || a.image || a.thumbnail) && (
                      <img
                        src={a.coverImage || a.image || a.thumbnail}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => e.target.style.display = "none"}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: "0 0 5px", fontWeight: 600, fontSize: "0.82rem", color: "#0f172a",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{a.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <StatusBadge status={a.status} />
                      <span style={{ fontSize: "0.68rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 3 }}>
                        <Eye size={10} /> {(a.views || a.viewCount || 0).toLocaleString()}
                      </span>
                      {(a.readTime || a.readDuration) && (
                        <span style={{ fontSize: "0.68rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 3 }}>
                          <Clock size={10} /> {a.readTime || a.readDuration}m
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card style={{ padding: "20px 22px", animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 420ms both" }}>
          <SectionTitle href="/trainer/workshops">Recent Workshops</SectionTitle>
          {recentWorkshops.length === 0 ? (
            <EmptyMini icon="📅" text="No workshops yet" cta={{ href: "/trainer/workshops/", label: "Create your first workshop" }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {recentWorkshops.map((w, idx) => {
                const maxCapacity = w.maxCapacity || w.capacity || 0;
                const enrolled = w.enrolledCount || w.totalEnrollments || 0;
                const pct = maxCapacity ? Math.round((enrolled / maxCapacity) * 100) : 0;
                return (
                  <Link
                    key={w._id || w.id}
                    href={`/trainer/workshops/${w._id || w.id}/edit`}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      borderBottom: idx < recentWorkshops.length - 1 ? "1px solid #f1f5f9" : "none",
                      textDecoration: "none",
                      transition: "background 0.15s",
                      borderRadius: 8,
                      margin: "0 -8px",
                      padding: "10px 8px",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      width: 52, height: 42, borderRadius: 9, flexShrink: 0, overflow: "hidden",
                      background: "linear-gradient(135deg,#0c1a3a,#1e1b4b)",
                    }}>
                      {(w.thumbnail || w.coverImage || w.image) && (
                        <img
                          src={w.thumbnail || w.coverImage || w.image}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={e => e.target.style.display = "none"}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        margin: "0 0 4px", fontWeight: 600, fontSize: "0.82rem", color: "#0f172a",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{w.title}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                        <StatusBadge status={w.status} />
                        <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>
                          {Number(w.price || 0) > 0 ? `$${Number(w.price).toLocaleString()}` : "Free"}
                        </span>
                        <span style={{ fontSize: "0.68rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 3 }}>
                          <Users size={10} /> {enrolled}/{maxCapacity || "∞"}
                        </span>
                      </div>
                      {maxCapacity > 0 && (
                        <div style={{ height: 4, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${Math.min(100, pct)}%`,
                            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
                            borderRadius: 99, transition: "width 0.6s ease",
                          }} />
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <div style={{ marginTop: 20, animation: "fadeUp 0.6s cubic-bezier(.22,1,.36,1) 480ms both" }}>
        <Link href="/trainer/analytics" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 22px",
          background: "linear-gradient(135deg,rgba(37,99,235,0.04),rgba(124,58,237,0.03))",
          border: "1px solid rgba(37,99,235,0.1)",
          borderRadius: 14, textDecoration: "none",
          transition: "all 0.2s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.1)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.1)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart2 size={18} color="#2563eb" />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>View Full Analytics</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>Detailed performance metrics and insights</p>
            </div>
          </div>
          <ArrowRight size={18} color="#2563eb" />
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // Auth + role protection is already handled once, at the route level, by
  // `trainer/layout.js` (which wraps every /trainer/* page). Wrapping again
  // here with a second, independent AuthGuard caused two auth checks to run
  // concurrently and fight over redirects — that was the source of the
  // "dashboard keeps reloading" loop. Do not re-add a guard here.
  return <DashboardContent />;
}
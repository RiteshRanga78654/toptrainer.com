'use client'
import { useState, useEffect, useMemo } from 'react'
import { adminWorkshopsAPI, trainersAPI } from '../../lib/api'
import { usePagination, useFetch, useCRUD, useModal } from '../../hooks'
import TopHeader from '../../components/shared/TopHeader'
import {
  Button, Card, Table, Pagination, SearchInput, Modal,
  ConfirmDialog, PageHeader, StatusBadge, EmptyState,
  Input, Textarea, Select, RowMenu, StatCard
} from '../../components/ui'
import {
  Plus, BookOpen, Calendar, MapPin, Users,
  DollarSign, Clock, Filter, Eye, FileText
} from 'lucide-react'
import { format } from 'date-fns'

import WorkshopFormModal from '../../trainer/workshops/WorkshopFormModal'
import HeroSliderSection from '../homepage/components/HeroSliderSection'
import useWorkshopHeroImages from './useWorkshopHeroImages'

const CSS = `
.btn-create {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 24px; border-radius: 13px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff;
  font-size: .9rem; font-weight: 700;
  border: none; cursor: pointer;
  box-shadow: 0 6px 22px rgba(37,99,235,.35);
  transition: all .2s cubic-bezier(.22,1,.36,1);
}
.btn-create:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(37,99,235,.4); }
`

// ─── Helpers ───────────────────────────────────────────────────────────────
function toDatetimeLocal(isoStr) {
  if (!isoStr) return ''
  try {
    return format(new Date(isoStr), "yyyy-MM-dd'T'HH:mm")
  } catch {
    return ''
  }
}


// ─── Main Page ─────────────────────────────────────────────────────────────
export default function AdminWorkshopsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [modeFilter, setModeFilter]     = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const workshopHero = useWorkshopHeroImages()
  
  const [trainers, setTrainers] = useState([])
  const [loadingTrainers, setLoadingTrainers] = useState(true)

  useEffect(() => {
    trainersAPI
      .getAll({ limit: 200, status: 'active' })
      .then((res) => {
        setTrainers(res.data?.data || res.data?.trainers || [])
      })
      .catch(() => {})
      .finally(() => setLoadingTrainers(false))
  }, [])

  const pagination = usePagination()
  const editModal   = useModal()
  const deleteModal = useModal()

  const { data, loading, refetch } = useFetch(adminWorkshopsAPI.getAll, {}, [])
  const crud = useCRUD(adminWorkshopsAPI, { onSuccess: refetch })

  const allWorkshops = data?.workshops || data?.data || []

  // ── Client-side filtering ────────────────────────────────────────────────
  const filteredWorkshops = useMemo(() => {
    let result = allWorkshops

    // Text search
    if (pagination.search) {
      const q = pagination.search.toLowerCase()
      result = result.filter((w) =>
        (w.title || '').toLowerCase().includes(q) ||
        (w.category || '').toLowerCase().includes(q) ||
        (w.location || '').toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((w) => w.status === statusFilter)
    }

    // Mode filter (deliveryMode from schedule)
    if (modeFilter) {
      result = result.filter((w) => {
        const m = (w.mode || w.deliveryMode || '').toLowerCase()
        return m === modeFilter.toLowerCase() || m === modeFilter
      })
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter((w) => w.category === categoryFilter)
    }

    return result
  }, [allWorkshops, pagination.search, statusFilter, modeFilter, categoryFilter])

  // ── Pagination ───────────────────────────────────────────────────────────
  const pageSize = pagination.limit || 10
  const totalFiltered = filteredWorkshops.length
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize))
  const paginatedWorkshops = filteredWorkshops.slice(
    (pagination.page - 1) * pageSize,
    pagination.page * pageSize
  )

  // ── Stats from ALL workshops (not filtered) ──────────────────────────────
  const counts = useMemo(() => ({
    total:     allWorkshops.length,
    draft:     allWorkshops.filter((w) => w.status === 'draft').length,
    published: allWorkshops.filter((w) => w.status === 'published').length,
    featured:  allWorkshops.filter((w) => w.isFeatured).length,
  }), [allWorkshops])

  // ── Unique categories for the filter dropdown ────────────────────────────
  const categories = useMemo(() => {
    const cats = [...new Set(allWorkshops.map((w) => w.category).filter(Boolean))]
    return cats.sort()
  }, [allWorkshops])

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSubmit = async (formData) => {
    if (editModal.data?._id) {
      await crud.update(editModal.data._id, formData)
    } else {
      await crud.create(formData)
    }
    editModal.close()
  }

  const handleStatusToggle = (id, newStatus) => {
    crud.updateStatus(id, newStatus)
  }

  // ── Table columns ────────────────────────────────────────────────────────
  const columns = [
    {
      key: 'title',
      label: 'Workshop',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Thumbnail mini */}
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: 'linear-gradient(135deg,#0c4a6e,#1e1b4b)',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            {row.thumbnail ? (
              <img
                src={row.thumbnail}
                alt={row.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BookOpen size={16} color="rgba(255,255,255,0.35)" />
              </div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 220
              }}
            >
              {row.title}
            </p>
            <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
              {row.category || '—'}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'mode',
      label: 'Mode',
      render: (row) => (
        <span style={{ fontSize: '0.85rem', textTransform: 'capitalize' }}>
          {row.mode || row.deliveryMode || '—'}
        </span>
      )
    },
    {
      key: 'startDate',
      label: 'Date',
      render: (row) => (
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>
            {row.startDate
              ? format(new Date(row.startDate), 'MMM d, yyyy')
              : '—'}
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {row.startDate
              ? format(new Date(row.startDate), 'h:mm a')
              : ''}
          </p>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          <MapPin size={12} />
          <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {row.location || 'Online'}
          </span>
        </div>
      )
    },
    {
      key: 'capacity',
      label: 'Seats',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Users size={12} color="var(--text-muted)" />
          <span style={{ fontSize: '0.84rem' }}>
            {row.enrolledCount || 0}
            {row.maxCapacity ? `/${row.maxCapacity}` : row.seats ? `/${row.seats}` : ''}
          </span>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (row) => {
        const p = typeof row.price === 'number' ? row.price : 0
        return (
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: p > 0 ? '#0ea5e9' : '#10b981'
            }}
          >
            {p > 0 ? `₹${p.toLocaleString()}` : 'Free'}
          </span>
        )
      }
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status || 'draft'} />
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <RowMenu
          row={row}
          statusField="status"
          activeVal="published"
          inactiveVal="draft"
          onEdit={(r) => editModal.open(r)}
          onDelete={(r) => deleteModal.open(r)}
          onToggleStatus={handleStatusToggle}
        />
      )
    }
  ]

  return (
    <>
      <TopHeader title="Workshops" />

      <div style={{ padding: 28 }} className="page-in">
        {/* Page header */}
        <PageHeader
          title="Workshops"
          subtitle="Create and manage all training workshops"

          // Create Workshop button removed for now from admin
          // actions={
          //   <button className="btn-create" onClick={() => editModal.open(null)}>
          //     <Plus size={16} /> Create Workshop
          //   </button>
          // }
        />

        <style>{CSS}</style>

        {/* Workshops page hero images (shown on the public /workshops hero banner) */}
        <div style={{ marginBottom: 24 }}>
          <HeroSliderSection
            images={workshopHero.images}
            addHeroImage={workshopHero.addHeroImage}
            toggleActive={workshopHero.toggleActive}
            updateCaption={workshopHero.updateCaption}
            removeImage={workshopHero.removeImage}
          />
        </div>

        {/* Stat mini cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 14,
            marginBottom: 24
          }}
        >
          <StatCard
            label="Total Workshops"
            value={counts.total}
            icon={<BookOpen size={18} />}
            color="#0ea5e9"
          />
          <StatCard
            label="Drafts"
            value={counts.draft}
            icon={<FileText size={18} />}
            color="#f59e0b"
          />
          <StatCard
            label="Published"
            value={counts.published}
            icon={<Eye size={18} />}
            color="#10b981"
          />
          <StatCard
            label="Featured"
            value={counts.featured}
            icon={<Calendar size={18} />}
            color="#8b5cf6"
          />
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
            flexWrap: 'wrap'
          }}
        >
          <SearchInput
            value={pagination.search}
            onChange={pagination.setSearch}
            placeholder="Search workshops…"
          />

          <select
            className="form-input bg-white rounded-xl border border-gray-200 "
            style={{ width: 'auto', padding: '7px 12px' }}
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); pagination.setPage(1) }}
          >
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <select
            className="form-input bg-white rounded-xl border border-gray-200 "
            style={{ width: 'auto', padding: '7px 12px' }}
            value={modeFilter}
            onChange={(e) => { setModeFilter(e.target.value); pagination.setPage(1) }}
          >
            <option value="">All Modes</option>
            <option value="Offline">In-Person</option>
            <option value="Online">Online</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {categories.length > 0 && (
            <select
              className="form-input bg-white rounded-xl border border-gray-200 "
              style={{ width: 'auto', padding: '7px 12px' }}
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); pagination.setPage(1) }}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        {/* Table */}
        <Card>
          <Table
            columns={columns}
            data={paginatedWorkshops}
            loading={loading}
            empty={
              <EmptyState
                icon="📅"
                title="No workshops found"
                description="Adjust your search/filters or create the first workshop"
                action={
                  <Button
                    size="sm"
                    icon={<Plus size={14} />}
                    onClick={() => editModal.open(null)}
                  >
                    Create Workshop
                  </Button>
                }
              />
            }
          />
          <Pagination
            page={pagination.page}
            totalPages={totalPages}
            total={totalFiltered}
            onPageChange={pagination.setPage}
          />
        </Card>

        {/* Create / Edit Modal */}
        {editModal.isOpen && (
          <WorkshopFormModal
            workshop={editModal.data}
            onSave={handleSubmit}
            onClose={editModal.close}
            trainers={trainers}
          />
        )}

        {/* Delete Confirm */}
        <ConfirmDialog
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          title="Delete Workshop"
          message={`Are you sure you want to permanently delete "${deleteModal.data?.title}"? This cannot be undone.`}
          confirmLabel="Delete Workshop"
          loading={crud.submitting}
          onConfirm={async () => {
            await crud.remove(deleteModal.data?._id)
            deleteModal.close()
          }}
        />
      </div>
    </>
  )
}
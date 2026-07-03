'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { workshopsAPI, trainersAPI } from '../../lib/api'
import { usePagination, useFetch, useCRUD, useModal } from '../../hooks'
import TopHeader from '../../components/shared/TopHeader'
import {
  Button, Card, Table, Pagination, SearchInput, Modal,
  ConfirmDialog, PageHeader, StatusBadge, EmptyState,
  Input, Textarea, Select, RowMenu, StatCard
} from '../../components/ui'
import {
  Plus, BookOpen, Calendar, MapPin, Users,
  DollarSign, Clock, Filter
} from 'lucide-react'
import { format } from 'date-fns'

import WorkshopFormModal from '../../trainer/workshops/WorkshopFormModal'

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
// ─── Status filter pill row ────────────────────────────────────────────────
function StatusPills({ value, onChange }) {
  const opts = [
    { label: 'All',       val: '' },
    { label: 'Upcoming',  val: 'upcoming' },
    { label: 'Ongoing',   val: 'ongoing' },
    { label: 'Completed', val: 'completed' },
    { label: 'Cancelled', val: 'cancelled' }
  ]
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {opts.map((o) => (
        <button
          key={o.val}
          onClick={() => onChange(o.val)}
          className={`btn btn-sm ${value === o.val ? 'btn-primary' : 'btn-outline'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function AdminWorkshopsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [modeFilter, setModeFilter]     = useState('')
  
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

  const params = {
    ...pagination.params,
    ...(statusFilter && { status: statusFilter }),
    ...(modeFilter   && { mode:   modeFilter   })
  }

  const { data, loading, refetch } = useFetch(workshopsAPI.getAll, params, [statusFilter, modeFilter])
  const crud = useCRUD(workshopsAPI, { onSuccess: refetch })

  const workshops  = data?.data || data?.workshops || []
  const totalPages = data?.pagination?.pages || data?.pages || 1
  const total      = data?.pagination?.total  || data?.total  || 0

  // stat counts from current full list (only counts for visible page; ideally API returns totals)
  const counts = {
    total:     total,
    upcoming:  workshops.filter((w) => w.status === 'upcoming').length,
    ongoing:   workshops.filter((w) => w.status === 'ongoing').length,
    completed: workshops.filter((w) => w.status === 'completed').length
  }

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

  // Table columns
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
              {row.mode || 'offline'}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'trainer',
      label: 'Trainer',
      render: (row) => (
        <span style={{ fontSize: '0.85rem' }}>
          {row.trainer?.name || row.trainerName || '—'}
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
            {row.maxCapacity ? `/${row.maxCapacity}` : ''}
          </span>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      render: (row) => (
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: row.price > 0 ? '#0ea5e9' : '#10b981'
          }}
        >
          {row.price > 0 ? `$${Number(row.price).toFixed(2)}` : 'Free'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status || 'upcoming'} />
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <RowMenu
          row={row}
          statusField="status"
          activeVal="upcoming"
          inactiveVal="cancelled"
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
          actions={
            <button className="btn-create" onClick={() => editModal.open(null)}>
              <Plus size={16} /> Create Workshop
            </button>
          }
        />

        <style>{CSS}</style>

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
            value={total}
            icon={<BookOpen size={18} />}
            color="#0ea5e9"
          />
          <StatCard
            label="Upcoming"
            value={counts.upcoming}
            icon={<Calendar size={18} />}
            color="#8b5cf6"
          />
          <StatCard
            label="Ongoing"
            value={counts.ongoing}
            icon={<Clock size={18} />}
            color="#f59e0b"
          />
          <StatCard
            label="Completed"
            value={counts.completed}
            icon={<BookOpen size={18} />}
            color="#10b981"
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

          <StatusPills value={statusFilter} onChange={(v) => { setStatusFilter(v); pagination.setPage(1) }} />

          <select
            className="form-input"
            style={{ width: 'auto', padding: '7px 12px' }}
            value={modeFilter}
            onChange={(e) => { setModeFilter(e.target.value); pagination.setPage(1) }}
          >
            <option value="">All Modes</option>
            <option value="offline">In-Person</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Table */}
        <Card>
          <Table
            columns={columns}
            data={workshops}
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
            total={total}
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
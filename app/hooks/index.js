import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

// ─── Auth hook ─────────────────────────────────────────────────────────────
export function useAuth() {
  const { user, loading, error, initialized } = useSelector((s) => s.auth)
  return { user, loading, error, initialized, isAdmin: user?.role === 'admin', isTrainer: user?.role === 'trainer' }
}

// ─── API data fetching hook ─────────────────────────────────────────────────
export function useFetch(apiFn, params = {}, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const paramsKey = JSON.stringify(params)

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiFn(params)
      setData(res.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [paramsKey, ...deps])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}

// ─── Pagination hook ────────────────────────────────────────────────────────
export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})

  const reset = () => setPage(1)

  const handleSearch = (val) => { setSearch(val); setPage(1) }
  const handleFilter = (key, val) => { setFilters((f) => ({ ...f, [key]: val })); setPage(1) }
  const clearFilters = () => { setFilters({}); setSearch(''); setPage(1) }

  return {
    page, setPage, limit, setLimit,
    search, setSearch: handleSearch,
    filters, setFilter: handleFilter, clearFilters,
    params: { page, limit, search, ...filters },
    reset,
  }
}

// ─── Modal hook ─────────────────────────────────────────────────────────────
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState(null)

  const open = (d = null) => { setData(d); setIsOpen(true) }
  const close = () => { setData(null); setIsOpen(false) }

  return { isOpen, data, open, close }
}

// ─── CRUD hook ──────────────────────────────────────────────────────────────
export function useCRUD(api, { onSuccess } = {}) {
  const [submitting, setSubmitting] = useState(false)

  const execute = async (fn, successMsg) => {
    setSubmitting(true)
    try {
      const res = await fn()
      toast.success(successMsg || 'Done!')
      onSuccess?.()
      return res
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const create = (data) => execute(() => api.create(data), 'Created successfully!')
  const update = (id, data) => execute(() => api.update(id, data), 'Updated successfully!')
  const remove = (id) => execute(() => api.delete(id), 'Deleted successfully!')
  const updateStatus = (id, status) => execute(() => api.updateStatus(id, status), 'Status updated!')

  return { submitting, create, update, remove, updateStatus }
}

// ─── Click outside hook ─────────────────────────────────────────────────────
export function useClickOutside(callback) {
  const ref = useRef(null)
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) callback() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [callback])
  return ref
}
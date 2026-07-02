import { useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import SearchFilterBar from '../components/history/SearchFilterBar'
import HistoryTable from '../components/history/HistoryTable'
import HistoryDetailModal from '../components/history/HistoryDetailModal'
import { useHistory } from '../hooks/useHistory'

const HistoryPage = () => {
  const { items, status, error, removeItem } = useHistory()
  const [search, setSearch] = useState('')
  const [nominalFilter, setNominalFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.image_name?.toLowerCase().includes(search.toLowerCase())
      const matchesNominal = !nominalFilter || item.detected_nominals?.includes(nominalFilter)
      return matchesSearch && matchesNominal
    })
  }, [items, search, nominalFilter])

  const handleDelete = async (item) => {
    if (!confirm(`Hapus riwayat deteksi "${item.image_name}"?`)) return
    await removeItem(item.id)
  }

  return (
    <div>
      <PageHeader
        title="Riwayat Deteksi"
        description="Seluruh hasil deteksi gambar yang tersimpan, lengkap dengan detail nominal dan tingkat keyakinan model."
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        nominalFilter={nominalFilter}
        onNominalFilterChange={setNominalFilter}
      />

      {status === 'loading' && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-surface-raised" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-xl border border-thread-maroon/30 bg-thread-maroon/10 px-4 py-3 text-sm text-thread-maroon">
          <AlertTriangle size={17} className="mt-0.5 shrink-0" />
          <span>Gagal memuat riwayat: {error}. Pastikan backend FastAPI sedang berjalan.</span>
        </div>
      )}

      {status === 'success' && (
        <HistoryTable items={filtered} onView={setSelected} onDelete={handleDelete} />
      )}

      <HistoryDetailModal item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default HistoryPage

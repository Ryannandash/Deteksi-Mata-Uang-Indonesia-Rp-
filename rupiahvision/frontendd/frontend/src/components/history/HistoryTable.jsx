import { Eye, Trash2 } from 'lucide-react'
import { formatDateTime, formatPercent, truncate } from '../../utils/format'

const HistoryTable = ({ items, onView, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line px-4 py-14 text-center">
        <p className="text-sm font-medium text-text-primary">Belum ada riwayat deteksi</p>
        <p className="mt-1 text-xs text-text-muted">
          Hasil deteksi gambar akan otomatis tersimpan dan tampil di sini.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-raised text-xs uppercase tracking-wide text-text-faint">
            <th className="px-4 py-3 font-medium">Waktu</th>
            <th className="px-4 py-3 font-medium">Nama File</th>
            <th className="px-4 py-3 font-medium">Nominal</th>
            <th className="px-4 py-3 font-medium">Objek</th>
            <th className="px-4 py-3 font-medium">Confidence</th>
            <th className="px-4 py-3 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-line last:border-0 hover:bg-surface-hover/60">
              <td className="whitespace-nowrap px-4 py-3 text-text-muted">{formatDateTime(item.created_at)}</td>
              <td className="px-4 py-3 font-medium text-text-primary" title={item.image_name}>
                {truncate(item.image_name, 28)}
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-thread-teal/12 px-2.5 py-1 text-xs font-medium text-thread-tealSoft">
                  {item.detected_nominals}
                </span>
              </td>
              <td className="px-4 py-3 text-text-muted">{item.total_detections}</td>
              <td className="px-4 py-3 font-mono text-xs text-text-muted">
                {formatPercent(item.avg_confidence)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onView(item)}
                    className="focus-ring rounded-lg p-1.5 text-text-muted hover:bg-surface-hover hover:text-thread-tealSoft"
                    aria-label="Lihat detail"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="focus-ring rounded-lg p-1.5 text-text-muted hover:bg-surface-hover hover:text-thread-maroon"
                    aria-label="Hapus riwayat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryTable

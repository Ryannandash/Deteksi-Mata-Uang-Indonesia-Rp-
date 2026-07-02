import { X } from 'lucide-react'
import DetectionTable from '../detection/DetectionTable'
import { formatDateTime, formatMs, formatPercent } from '../../utils/format'

const HistoryDetailModal = ({ item, onClose }) => {
  if (!item) return null
  const detections = item.detections ?? []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface shadow-soft">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h3 className="font-display text-sm font-semibold text-text-primary">Detail Riwayat Deteksi</h3>
            <p className="mt-0.5 text-xs text-text-muted">{formatDateTime(item.created_at)}</p>
          </div>
          <button
            onClick={onClose}
            className="focus-ring rounded-lg p-1.5 text-text-muted hover:bg-surface-hover"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {item.annotated_image_url && (
            <img
              src={item.annotated_image_url}
              alt="Hasil anotasi"
              className="max-h-72 w-full rounded-xl border border-line object-contain bg-black/20"
            />
          )}

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-line bg-surface-raised px-3 py-3">
              <p className="font-display text-sm font-bold text-text-primary">{item.total_detections}</p>
              <p className="mt-0.5 text-[11px] text-text-faint">Total Objek</p>
            </div>
            <div className="rounded-xl border border-line bg-surface-raised px-3 py-3">
              <p className="font-display text-sm font-bold text-text-primary">{formatPercent(item.avg_confidence)}</p>
              <p className="mt-0.5 text-[11px] text-text-faint">Rata-rata Confidence</p>
            </div>
            <div className="rounded-xl border border-line bg-surface-raised px-3 py-3">
              <p className="font-display text-sm font-bold text-text-primary">
                {item.inference_time ? formatMs(item.inference_time) : '—'}
              </p>
              <p className="mt-0.5 text-[11px] text-text-faint">Waktu Inferensi</p>
            </div>
          </div>

          <DetectionTable detections={detections} />
        </div>
      </div>
    </div>
  )
}

export default HistoryDetailModal

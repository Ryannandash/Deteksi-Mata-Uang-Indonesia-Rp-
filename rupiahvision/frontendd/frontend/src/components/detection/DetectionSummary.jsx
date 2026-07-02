import { Layers, Timer, TrendingUp } from 'lucide-react'
import { formatMs, formatPercent } from '../../utils/format'

const DetectionSummary = ({ data }) => {
  const avgConfidence =
    data.detections.length > 0
      ? data.detections.reduce((sum, d) => sum + d.confidence, 0) / data.detections.length
      : 0

  const items = [
    { icon: Layers, label: 'Total Objek', value: data.total_detections },
    { icon: TrendingUp, label: 'Rata-rata Confidence', value: formatPercent(avgConfidence) },
    { icon: Timer, label: 'Waktu Inferensi', value: formatMs(data.inference_time) },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-xl border border-line bg-surface-raised px-3 py-3 text-center">
          <Icon size={16} className="mx-auto mb-1.5 text-thread-tealSoft" />
          <p className="font-display text-sm font-bold text-text-primary">{value}</p>
          <p className="mt-0.5 text-[11px] text-text-faint">{label}</p>
        </div>
      ))}
    </div>
  )
}

export default DetectionSummary

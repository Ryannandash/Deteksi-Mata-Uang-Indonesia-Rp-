import { getBanknoteByLabel } from '../../constants/banknotes'
import { formatPercent } from '../../utils/format'

const DetectionTable = ({ detections = [] }) => {
  if (detections.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-text-muted">
        Tidak ada objek uang kertas yang terdeteksi pada gambar ini.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-raised text-xs uppercase tracking-wide text-text-faint">
            <th className="px-4 py-3 font-medium">Nominal</th>
            <th className="px-4 py-3 font-medium">Confidence</th>
            <th className="px-4 py-3 font-medium">Bounding Box</th>
          </tr>
        </thead>
        <tbody>
          {detections.map((det, idx) => {
            const note = getBanknoteByLabel(det.class_name)
            return (
              <tr key={idx} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: note?.color ?? '#2BAE8F' }}
                    />
                    <span className="font-medium text-text-primary">{det.class_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-thread-teal/12 px-2.5 py-1 font-mono text-xs font-semibold text-thread-tealSoft">
                    {formatPercent(det.confidence)}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-muted">
                  [{det.bbox.join(', ')}]
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DetectionTable

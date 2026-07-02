import { formatPercent } from '../../utils/format'

const ModelInfoCard = ({ info }) => {
  const rows = [
    { label: 'Nama Model', value: info.model_name },
    { label: 'File Bobot', value: info.version },
    { label: 'Jumlah Kelas', value: `${info.num_classes} nominal` },
    { label: 'Ukuran Input', value: info.input_size },
  ]

  const metrics = [
    { label: 'Precision', value: info.metrics.precision },
    { label: 'Recall', value: info.metrics.recall },
    { label: 'mAP@0.5', value: info.metrics.map50 },
    { label: 'mAP@0.5:0.95', value: info.metrics.map50_95 },
  ]

  return (
    <div className="card p-5">
      <h3 className="mb-4 font-display text-sm font-semibold text-text-primary">Informasi Model</h3>

      <dl className="mb-5 space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between border-b border-line pb-2.5 last:border-0 last:pb-0">
            <dt className="text-text-muted">{row.label}</dt>
            <dd className="font-mono text-xs font-medium text-text-primary">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-faint">Metrik Performa</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-line bg-surface-raised px-3 py-3 text-center">
            <p className="font-display text-sm font-bold text-thread-tealSoft">{formatPercent(m.value)}</p>
            <p className="mt-0.5 text-[11px] text-text-faint">{m.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-text-muted">{info.dataset_description}</p>
    </div>
  )
}

export default ModelInfoCard

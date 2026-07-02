import { formatCurrency } from '../../utils/format'

const BanknoteCard = ({ note }) => (
  <div className="card overflow-hidden">
    <div className="h-2.5 w-full" style={{ backgroundColor: note.color }} />
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-xl font-bold text-text-primary">{note.label}</p>
          <p className="mt-0.5 text-xs text-text-faint">{formatCurrency(note.value)}</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-mono font-semibold"
          style={{ backgroundColor: `${note.color}22`, color: note.color }}
        >
          {note.classLabel}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-start gap-2">
          <dt className="w-24 shrink-0 text-xs font-medium text-text-faint">Warna dominan</dt>
          <dd className="flex items-center gap-1.5 text-text-primary">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: note.color }} />
            {note.colorName}
          </dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="w-24 shrink-0 text-xs font-medium text-text-faint">Tokoh</dt>
          <dd className="text-text-primary">{note.figure}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="w-24 shrink-0 text-xs font-medium text-text-faint">Ciri visual</dt>
          <dd className="text-text-muted">{note.features}</dd>
        </div>
      </dl>
    </div>
  </div>
)

export default BanknoteCard

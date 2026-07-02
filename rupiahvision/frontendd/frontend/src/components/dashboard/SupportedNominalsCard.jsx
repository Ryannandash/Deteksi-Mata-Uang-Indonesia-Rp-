import { BANKNOTES } from '../../constants/banknotes'

const SupportedNominalsCard = () => (
  <div className="card p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-display text-sm font-semibold text-text-primary">
        Kelas Nominal yang Didukung
      </h3>
      <span className="rounded-full bg-thread-teal/12 px-2.5 py-1 text-[11px] font-semibold text-thread-tealSoft">
        {BANKNOTES.length} kelas
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
      {BANKNOTES.map((note) => (
        <div
          key={note.classLabel}
          className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface-raised px-2 py-3 text-center"
        >
          <span
            className="h-2.5 w-8 rounded-full"
            style={{ backgroundColor: note.color }}
            aria-hidden="true"
          />
          <span className="text-xs font-semibold text-text-primary">{note.label}</span>
        </div>
      ))}
    </div>
  </div>
)

export default SupportedNominalsCard

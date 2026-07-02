import { Search } from 'lucide-react'
import { BANKNOTES } from '../../constants/banknotes'

const SearchFilterBar = ({ search, onSearchChange, nominalFilter, onNominalFilterChange }) => (
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="relative flex-1">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Cari nama file…"
        className="focus-ring w-full rounded-xl border border-line bg-surface-raised py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint"
      />
    </div>
    <select
      value={nominalFilter}
      onChange={(e) => onNominalFilterChange(e.target.value)}
      className="focus-ring rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-text-primary sm:w-52"
    >
      <option value="">Semua nominal</option>
      {BANKNOTES.map((note) => (
        <option key={note.classLabel} value={note.label}>
          {note.label}
        </option>
      ))}
    </select>
  </div>
)

export default SearchFilterBar

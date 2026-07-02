import { NavLink } from 'react-router-dom'
import { ScanLine, X } from 'lucide-react'
import { NAV_ITEMS } from '../../constants/nav'

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-surface transition-transform duration-200 lg:static lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* security thread accent */}
        <div className="absolute inset-y-0 left-0 w-[3px] bg-thread" />

        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-thread-teal/15 text-thread-tealSoft">
              <ScanLine size={20} strokeWidth={2.2} />
            </div>
            <div>
              <p className="font-display text-[15px] font-bold leading-none text-text-primary">
                RupiahVision
              </p>
              <p className="mt-1 text-[11px] leading-none text-text-faint">Deteksi Uang Kertas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-text-muted hover:bg-surface-hover lg:hidden focus-ring"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-ring ${
                  isActive
                    ? 'bg-thread-teal/10 text-thread-tealSoft'
                    : 'text-text-muted hover:bg-surface-hover hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-thread-tealSoft" />
                  )}
                  <Icon size={18} strokeWidth={2} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mx-4 mb-5 rounded-xl border border-line bg-surface-raised p-3.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-thread-gold">
            Model Aktif
          </p>
          <p className="mt-1 text-xs text-text-muted">YOLOv8 · 7 kelas nominal</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

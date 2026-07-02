import { Menu, Moon, Sun, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/nav'

const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('rv-theme') || 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('rv-theme', theme)
  }, [theme])

  return [theme, setTheme]
}

const Topbar = ({ onMenuClick }) => {
  const location = useLocation()
  const [theme, setTheme] = useTheme()
  const current = NAV_ITEMS.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to),
  )

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-ink/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-text-muted hover:bg-surface-hover lg:hidden focus-ring"
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-text-faint">RupiahVision</span>
          <ChevronRight size={14} className="text-text-faint" />
          <span className="font-medium text-text-primary">{current?.label ?? 'Halaman'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-lg p-2 text-text-muted hover:bg-surface-hover hover:text-text-primary focus-ring"
          aria-label="Ganti tema"
          title="Ganti tema terang/gelap"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="h-6 w-px bg-line" />
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-thread-teal/15 text-xs font-semibold text-thread-tealSoft">
            RV
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium leading-none text-text-primary">Operator</p>
            <p className="mt-0.5 text-[11px] leading-none text-text-faint">Petugas Kasir</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar

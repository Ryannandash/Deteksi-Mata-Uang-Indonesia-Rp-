import { LayoutDashboard, ScanLine, History, Wallet, Info } from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/deteksi', label: 'Deteksi Gambar', icon: ScanLine },
  { to: '/riwayat', label: 'Riwayat Deteksi', icon: History },
  { to: '/nominal', label: 'Informasi Nominal', icon: Wallet },
  { to: '/tentang', label: 'Tentang Sistem', icon: Info },
]

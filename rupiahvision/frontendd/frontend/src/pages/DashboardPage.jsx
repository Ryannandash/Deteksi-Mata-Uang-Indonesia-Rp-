import { useEffect, useState } from 'react'
import { ScanLine, History, Wallet, Gauge, ListChecks, Info } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/dashboard/StatCard'
import QuickActionCard from '../components/dashboard/QuickActionCard'
import SupportedNominalsCard from '../components/dashboard/SupportedNominalsCard'
import ModelSummaryCard from '../components/dashboard/ModelSummaryCard'
import { getDashboardSummary } from '../services/dashboardService'
import { DEMO_DASHBOARD_SUMMARY } from '../constants/demoData'
import { formatPercent } from '../utils/format'

const DashboardPage = () => {
  const [summary, setSummary] = useState(null)
  const [isDemo, setIsDemo] = useState(false)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    getDashboardSummary()
      .then((res) => {
        if (cancelled) return
        setSummary(res)
        setStatus('success')
      })
      .catch(() => {
        if (cancelled) return
        setSummary(DEMO_DASHBOARD_SUMMARY)
        setIsDemo(true)
        setStatus('success')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Ringkasan sistem deteksi uang kertas rupiah berbasis YOLO — pantau performa model dan aktivitas deteksi dari satu tempat."
        actions={
          isDemo && (
            <span className="rounded-full border border-thread-gold/30 bg-thread-gold/10 px-3 py-1.5 text-xs font-medium text-thread-gold">
              Data contoh · backend belum terhubung
            </span>
          )
        }
      />

      {status === 'loading' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card h-[104px] animate-pulse bg-surface-raised" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={ListChecks} label="Kelas Nominal" value={summary.total_classes} sublabel="Rp1.000 – Rp100.000" accent="teal" />
            <StatCard icon={History} label="Total Riwayat Deteksi" value={summary.total_history} sublabel="Sepanjang waktu" accent="gold" />
            <StatCard icon={Gauge} label="Rata-rata Confidence" value={formatPercent(summary.avg_confidence)} sublabel="Dari seluruh deteksi" accent="teal" />
            <StatCard icon={Wallet} label="Nominal Tersering" value={summary.most_detected_nominal} sublabel="Paling banyak terdeteksi" accent="maroon" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <QuickActionCard
              to="/deteksi"
              icon={ScanLine}
              title="Mulai Deteksi Gambar"
              description="Unggah foto uang kertas dan jalankan inferensi model YOLO secara langsung."
            />
            <QuickActionCard
              to="/riwayat"
              icon={History}
              title="Lihat Riwayat Deteksi"
              description="Telusuri seluruh hasil deteksi yang tersimpan beserta detailnya."
            />
            <QuickActionCard
              to="/tentang"
              icon={Info}
              title="Tentang Sistem"
              description="Pelajari arsitektur model, alur deteksi, dan metrik performa."
            />
          </div>

          <div className="mt-6">
            <SupportedNominalsCard />
          </div>

          <div className="mt-6">
            <ModelSummaryCard distribution={summary.class_distribution} />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage

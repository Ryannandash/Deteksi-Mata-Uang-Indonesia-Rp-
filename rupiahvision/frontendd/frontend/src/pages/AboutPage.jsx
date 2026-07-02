import { useEffect, useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import ModelInfoCard from '../components/model/ModelInfoCard'
import SystemFlowCard from '../components/model/SystemFlowCard'
import { getModelInfo } from '../services/modelService'
import { DEMO_MODEL_INFO } from '../constants/demoData'

const AboutPage = () => {
  const [info, setInfo] = useState(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    let cancelled = false
    getModelInfo()
      .then((res) => {
        if (!cancelled) setInfo(res)
      })
      .catch(() => {
        if (!cancelled) {
          setInfo(DEMO_MODEL_INFO)
          setIsDemo(true)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <PageHeader
        title="Tentang Sistem"
        description="Informasi arsitektur model, alur kerja deteksi, dan metrik performa RupiahVision."
        actions={
          isDemo && (
            <span className="rounded-full border border-thread-gold/30 bg-thread-gold/10 px-3 py-1.5 text-xs font-medium text-thread-gold">
              Data contoh · backend belum terhubung
            </span>
          )
        }
      />

      <div className="space-y-6">
        <SystemFlowCard />
        {info ? (
          <ModelInfoCard info={info} />
        ) : (
          <div className="card h-64 animate-pulse bg-surface-raised" />
        )}
      </div>
    </div>
  )
}

export default AboutPage

const LoadingOverlay = () => (
  <div className="card relative flex h-[420px] flex-col items-center justify-center gap-4 overflow-hidden">
    <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-line bg-surface-raised">
      <div className="absolute inset-x-0 top-0 h-1 bg-thread-tealSoft/80 shadow-glow animate-scan" />
    </div>
    <div className="text-center">
      <p className="font-display text-sm font-semibold text-text-primary">Menjalankan inferensi model…</p>
      <p className="mt-1 text-xs text-text-muted">Mendeteksi objek uang kertas dengan YOLO</p>
    </div>
  </div>
)

export default LoadingOverlay

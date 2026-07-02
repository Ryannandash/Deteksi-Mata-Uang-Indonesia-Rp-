import { Sun, Crop, LayoutGrid, CheckCircle2 } from 'lucide-react'

const TIPS = [
  {
    icon: Sun,
    title: 'Cahaya putih/natural',
    description: 'Hindari lampu kuning (bohlam) — pakai cahaya matahari atau lampu putih agar warna uang tidak berubah.',
  },
  {
    icon: Crop,
    title: 'Uang utuh dalam frame',
    description: 'Pastikan seluruh bagian uang kertas terlihat, tidak terpotong tepi foto atau tertutup jari.',
  },
  {
    icon: LayoutGrid,
    title: 'Latar belakang polos',
    description: 'Letakkan di atas permukaan datar dengan warna kontras, hindari latar yang terlalu ramai.',
  },
]

const PhotoTipsCard = () => (
  <div className="card mt-4 p-4">
    <div className="mb-3 flex items-center gap-2">
      <CheckCircle2 size={16} className="text-thread-tealSoft" />
      <h3 className="font-display text-sm font-semibold text-text-primary">
        Tips agar deteksi lebih akurat
      </h3>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {TIPS.map(({ icon: Icon, title, description }) => (
        <div key={title} className="rounded-xl border border-line bg-surface-raised px-3 py-3">
          <Icon size={16} className="mb-2 text-thread-tealSoft" />
          <p className="text-xs font-semibold text-text-primary">{title}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-text-muted">{description}</p>
        </div>
      ))}
    </div>
  </div>
)

export default PhotoTipsCard

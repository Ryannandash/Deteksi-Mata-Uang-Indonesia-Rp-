import { Upload, Cpu, ImageIcon, Database } from 'lucide-react'

const STEPS = [
  { icon: Upload, title: 'Unggah Gambar', desc: 'Pengguna mengunggah foto uang kertas melalui halaman deteksi.' },
  { icon: Cpu, title: 'Inferensi YOLO', desc: 'Backend memuat model best.pt dan menjalankan prediksi objek.' },
  { icon: ImageIcon, title: 'Anotasi Hasil', desc: 'Bounding box dan label nominal digambar pada gambar hasil.' },
  { icon: Database, title: 'Simpan & Tampilkan', desc: 'Hasil disimpan ke SQLite dan ditampilkan di dashboard & riwayat.' },
]

const SystemFlowCard = () => (
  <div className="card p-5">
    <h3 className="mb-5 font-display text-sm font-semibold text-text-primary">Alur Sistem Deteksi</h3>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step, idx) => (
        <div key={step.title} className="relative rounded-xl border border-line bg-surface-raised p-4">
          <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-thread-teal/12 text-thread-tealSoft">
            <step.icon size={17} />
          </span>
          <p className="font-display text-xs font-semibold text-thread-gold">Tahap {idx + 1}</p>
          <p className="mt-1 text-sm font-semibold text-text-primary">{step.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
)

export default SystemFlowCard

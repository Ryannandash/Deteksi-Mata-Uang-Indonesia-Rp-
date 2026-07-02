import { Download } from 'lucide-react'
import DetectionSummary from './DetectionSummary'
import DetectionTable from './DetectionTable'

const DetectionResultCard = ({ data }) => (
  <div className="card overflow-hidden">
    <div className="relative bg-black/20">
      <img
        src={data.annotated_image_url}
        alt="Hasil anotasi deteksi"
        className="max-h-[420px] w-full object-contain"
      />
    </div>
    <div className="space-y-4 border-t border-line p-4">
      <DetectionSummary data={data} />
      <DetectionTable detections={data.detections} />
      <a
        href={data.annotated_image_url}
        download
        className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover"
      >
        <Download size={16} />
        Unduh Gambar Hasil
      </a>
    </div>
  </div>
)

export default DetectionResultCard

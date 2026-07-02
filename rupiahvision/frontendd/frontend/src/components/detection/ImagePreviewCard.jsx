import { FileImage, RotateCcw } from 'lucide-react'

const ImagePreviewCard = ({ file, previewUrl, onReset }) => (
  <div className="card overflow-hidden">
    <div className="relative bg-black/20">
      <img src={previewUrl} alt="Pratinjau unggahan" className="max-h-[420px] w-full object-contain" />
    </div>
    <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <FileImage size={16} className="shrink-0 text-text-faint" />
        <span className="truncate text-xs text-text-muted">{file?.name}</span>
      </div>
      <button
        onClick={onReset}
        className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-text-muted hover:bg-surface-hover hover:text-text-primary"
      >
        <RotateCcw size={13} />
        Ganti gambar
      </button>
    </div>
  </div>
)

export default ImagePreviewCard

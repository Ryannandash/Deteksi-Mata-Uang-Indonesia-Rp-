import { useCallback, useRef, useState } from 'react'
import { UploadCloud, ImagePlus } from 'lucide-react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const UploadArea = ({ onFileSelected }) => {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0]
      if (!file) return
      if (!ACCEPTED_TYPES.includes(file.type)) return
      onFileSelected(file)
    },
    [onFileSelected],
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors
        ${dragging ? 'border-thread-tealSoft bg-thread-teal/5' : 'border-line bg-surface-raised'}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-thread-teal/12 text-thread-tealSoft">
        <UploadCloud size={26} strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-text-primary">
          Seret & letakkan gambar di sini
        </p>
        <p className="mt-1 text-xs text-text-muted">Format JPG, PNG, atau WEBP — maksimal 10MB</p>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-thread-teal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-thread-tealSoft"
      >
        <ImagePlus size={16} />
        Pilih Gambar
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

export default UploadArea

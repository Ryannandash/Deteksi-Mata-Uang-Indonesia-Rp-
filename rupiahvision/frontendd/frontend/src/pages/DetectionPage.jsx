import { RotateCcw, ScanLine, AlertTriangle } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import UploadArea from '../components/detection/UploadArea'
import PhotoTipsCard from '../components/detection/PhotoTipsCard'
import ImagePreviewCard from '../components/detection/ImagePreviewCard'
import LoadingOverlay from '../components/detection/LoadingOverlay'
import DetectionResultCard from '../components/detection/DetectionResultCard'
import { useDetection } from '../hooks/useDetection'

const DetectionPage = () => {
  const { file, previewUrl, status, result, error, selectFile, runDetection, reset } = useDetection()

  return (
    <div>
      <PageHeader
        title="Deteksi Gambar"
        description="Unggah foto uang kertas rupiah, lalu jalankan model YOLO untuk mengenali nominal dan lokasi objeknya."
      />

      {!file && (
        <>
          <UploadArea onFileSelected={selectFile} />
          <PhotoTipsCard />
        </>
      )}

      {file && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <ImagePreviewCard file={file} previewUrl={previewUrl} onReset={reset} />

            {status !== 'success' && (
              <div className="flex gap-3">
                <button
                  onClick={runDetection}
                  disabled={status === 'loading'}
                  className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-thread-teal px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-thread-tealSoft disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ScanLine size={17} />
                  {status === 'loading' ? 'Memproses…' : 'Deteksi Sekarang'}
                </button>
                <button
                  onClick={reset}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-medium text-text-muted hover:bg-surface-hover hover:text-text-primary"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-start gap-2.5 rounded-xl border border-thread-maroon/30 bg-thread-maroon/10 px-4 py-3 text-sm text-thread-maroon">
                <AlertTriangle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {status === 'success' && (
              <button
                onClick={reset}
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-medium text-text-muted hover:bg-surface-hover hover:text-text-primary"
              >
                <RotateCcw size={16} />
                Deteksi Gambar Lain
              </button>
            )}
          </div>

          <div>
            {status === 'loading' && <LoadingOverlay />}
            {status === 'success' && result && <DetectionResultCard data={result} />}
            {status === 'idle' && (
              <div className="card flex h-[420px] flex-col items-center justify-center gap-2 text-center text-text-faint">
                <ScanLine size={28} strokeWidth={1.5} />
                <p className="text-sm">Hasil deteksi akan tampil di sini</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DetectionPage

import { useCallback, useState } from 'react'
import { detectImage } from '../services/detectionService'

// Encapsulates the upload -> inference -> result lifecycle for the detection page.
export const useDetection = () => {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const selectFile = useCallback((selected) => {
    if (!selected) return
    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
    setResult(null)
    setError(null)
    setStatus('idle')
  }, [])

  const runDetection = useCallback(async () => {
    if (!file) return
    setStatus('loading')
    setError(null)
    try {
      const response = await detectImage(file)
      setResult(response)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [file])

  const reset = useCallback(() => {
    setFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
    setStatus('idle')
  }, [])

  return { file, previewUrl, status, result, error, selectFile, runDetection, reset }
}

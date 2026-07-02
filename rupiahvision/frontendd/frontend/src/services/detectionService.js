import api from './api'

// Sends an image file to the YOLO inference endpoint.
export const detectImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/api/detect/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

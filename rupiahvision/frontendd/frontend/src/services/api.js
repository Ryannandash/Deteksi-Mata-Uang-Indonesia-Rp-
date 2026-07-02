import axios from 'axios'

// In dev, Vite proxies /api and /static to the FastAPI backend (see vite.config.js).
// In production, set VITE_API_BASE_URL to the deployed backend origin.
const baseURL = import.meta.env.VITE_API_BASE_URL || ''

export const api = axios.create({
  baseURL,
  timeout: 30000,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      'Terjadi kesalahan tak terduga.'
    return Promise.reject(new Error(message))
  },
)

export default api

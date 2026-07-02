import api from './api'

export const getHistoryList = async () => api.get('/api/history')

export const getHistoryDetail = async (id) => api.get(`/api/history/${id}`)

export const deleteHistoryItem = async (id) => api.delete(`/api/history/${id}`)

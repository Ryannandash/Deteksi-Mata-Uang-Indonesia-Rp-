import api from './api'

export const getModelInfo = async () => api.get('/api/model/info')

export const getHealth = async () => api.get('/api/health')

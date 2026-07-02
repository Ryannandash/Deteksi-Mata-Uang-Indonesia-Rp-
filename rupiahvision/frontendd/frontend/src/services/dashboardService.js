import api from './api'

export const getDashboardSummary = async () => api.get('/api/dashboard/summary')

import api from './api'

export const getBanknotes = async () => api.get('/api/banknotes')

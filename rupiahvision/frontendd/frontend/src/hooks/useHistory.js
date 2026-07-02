import { useCallback, useEffect, useState } from 'react'
import { getHistoryList, deleteHistoryItem } from '../services/historyService'

export const useHistory = () => {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState(null)

  const fetchHistory = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const response = await getHistoryList()
      setItems(response ?? [])
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [])

  const removeItem = useCallback(async (id) => {
    await deleteHistoryItem(id)
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return { items, status, error, refetch: fetchHistory, removeItem }
}

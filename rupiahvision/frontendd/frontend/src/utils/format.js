export const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export const formatPercent = (value) => `${(value * 100).toFixed(1)}%`

export const formatDateTime = (isoString) => {
  const d = new Date(isoString)
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
}

export const formatMs = (seconds) => `${Math.round(seconds * 1000)} ms`

export const truncate = (text, max = 24) =>
  text.length > max ? `${text.slice(0, max - 1)}…` : text

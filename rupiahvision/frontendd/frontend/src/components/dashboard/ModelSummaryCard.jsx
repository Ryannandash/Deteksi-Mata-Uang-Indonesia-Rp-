import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const ModelSummaryCard = ({ distribution = [] }) => (
  <div className="card p-5">
    <h3 className="mb-1 font-display text-sm font-semibold text-text-primary">
      Ringkasan Performa Model
    </h3>
    <p className="mb-4 text-xs text-text-muted">
      Distribusi jumlah deteksi per nominal berdasarkan riwayat yang tersimpan.
    </p>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={distribution} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--c-line)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--c-text-faint)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--c-line)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--c-text-faint)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--c-surface-raised)',
              border: '1px solid var(--c-line)',
              borderRadius: 10,
              fontSize: 12,
              color: 'var(--c-text-primary)',
            }}
            cursor={{ fill: 'var(--c-surface-hover)' }}
          />
          <Bar dataKey="count" fill="#2BAE8F" radius={[6, 6, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default ModelSummaryCard

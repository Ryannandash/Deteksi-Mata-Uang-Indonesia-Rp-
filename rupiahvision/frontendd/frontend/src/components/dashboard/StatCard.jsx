const StatCard = ({ icon: Icon, label, value, sublabel, accent = 'teal' }) => {
  const accents = {
    teal: 'bg-thread-teal/12 text-thread-tealSoft',
    gold: 'bg-thread-gold/12 text-thread-gold',
    maroon: 'bg-thread-maroon/12 text-thread-maroon',
  }

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-faint">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-text-primary">{value}</p>
          {sublabel && <p className="mt-1 text-xs text-text-muted">{sublabel}</p>}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}>
          <Icon size={19} strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}

export default StatCard

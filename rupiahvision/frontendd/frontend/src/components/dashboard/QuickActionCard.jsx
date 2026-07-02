import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuickActionCard = ({ to, icon: Icon, title, description }) => (
  <Link
    to={to}
    className="card group flex items-start gap-4 p-5 transition-colors hover:bg-surface-hover focus-ring"
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-thread-teal/12 text-thread-tealSoft">
      <Icon size={20} strokeWidth={2} />
    </div>
    <div className="flex-1">
      <p className="font-display text-sm font-semibold text-text-primary">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-text-muted">{description}</p>
    </div>
    <ArrowUpRight
      size={18}
      className="mt-0.5 shrink-0 text-text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-thread-tealSoft"
    />
  </Link>
)

export default QuickActionCard

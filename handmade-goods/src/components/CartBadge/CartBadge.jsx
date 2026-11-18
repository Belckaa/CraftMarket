import PropTypes from 'prop-types'
import { ShoppingBag } from 'lucide-react'

export default function CartBadge({ totalCount }) {
  return (
    <span className="relative inline-flex items-center gap-2 rounded-control border border-ink-300/30 bg-surface px-4 py-2 shadow-sm">
      <ShoppingBag className="h-5 w-5 text-ink-600" />
      <span className="font-semibold text-ink-900">{totalCount}</span>
      
      {totalCount > 0 && (
        <span
          key={totalCount}
          aria-hidden="true"
          className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white animate-badge-pop shadow-sm"
        >
          +{totalCount}
        </span>
      )}
      <span role="status" className="sr-only">Кошик, товарів: {totalCount}</span>
    </span>
  )
}

CartBadge.propTypes = {
  totalCount: PropTypes.number.isRequired,
}

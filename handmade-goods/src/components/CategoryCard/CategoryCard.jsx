import PropTypes from 'prop-types'

export default function CategoryCard({ name, count, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center rounded-xl border border-line bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-clay-600 cursor-pointer group"
    >
      <div className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
      <span className="text-sm font-semibold text-ink text-center">{name}</span>
      <span className="text-xs text-ink-muted mt-1">{count} товарів</span>
    </button>
  )
}

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

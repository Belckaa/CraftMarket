import PropTypes from 'prop-types'

export default function Loader({ label = 'Завантаження...' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-12 text-ink-500">
      <span aria-hidden="true" className="size-5 animate-spin rounded-full border-2 border-ink-300 border-t-brand-600" />
      <span className="font-medium">{label}</span>
    </div>
  )
}

Loader.propTypes = { label: PropTypes.string }

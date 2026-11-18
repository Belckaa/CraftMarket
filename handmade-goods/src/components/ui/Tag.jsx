import PropTypes from 'prop-types'
import { cx } from './cx.js'

const TONES = {
  neutral: 'bg-ink-100 text-ink-800',
  brand: 'bg-brand-100 text-brand-800',
  success: 'bg-success-100 text-success-800',
}

export function Tag({ tone = 'neutral', onRemove, children }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold', TONES[tone])}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-brand-600"
          aria-label={`Видалити тег ${children}`}
        >
          ×
        </button>
      )}
    </span>
  )
}

Tag.propTypes = {
  tone: PropTypes.oneOf(['neutral', 'brand', 'success']),
  onRemove: PropTypes.func,
  children: PropTypes.node.isRequired,
}

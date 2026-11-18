import PropTypes from 'prop-types'
import { cx } from './cx.js'

export function Card({ className, children, ...rest }) {
  return (
    <div
      className={cx(
        'flex flex-col overflow-hidden rounded-control border border-ink-300/30 bg-surface shadow-sm transition-shadow hover:shadow-md',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

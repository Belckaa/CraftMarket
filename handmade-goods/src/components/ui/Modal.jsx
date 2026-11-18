import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { cx } from './cx'

const EXIT_DURATION_MS = 200

function getExitDelay() {
  if (typeof window === 'undefined') return EXIT_DURATION_MS

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return reduce ? 0 : EXIT_DURATION_MS
}

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ isOpen, onClose, size = 'md', title, children }) {
  const [isClosing, setIsClosing] = useState(false)

  const requestClose = useCallback(() => {
    if (!isOpen || isClosing) return
    setIsClosing(true)
  }, [isOpen, isClosing])

  useEscapeKey(requestClose)

  useEffect(() => {
    if (!isClosing) return undefined

    const timerId = setTimeout(onClose, getExitDelay())

    return () => clearTimeout(timerId)
  }, [isClosing, onClose])

  if (!isOpen && !isClosing) return null

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      requestClose()
    }
  }

  return (
    <div
      role="presentation"
      onClick={handleOverlayClick}
      className={cx(
        'fixed inset-0 z-50 grid place-items-center bg-black/50 p-4',
        isClosing ? 'animate-overlay-out' : 'animate-overlay-in',
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cx(
          'relative w-full rounded-control bg-surface shadow-xl',
          SIZES[size],
          isClosing ? 'animate-modal-out' : 'animate-modal-in',
        )}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Закрити"
          className="absolute right-4 top-4 rounded-full p-2 text-ink-500 transition duration-150 hover:bg-ink-100 hover:text-ink-900 active:scale-90"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {title && (
          <h2 id="modal-title" className="sr-only">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CheckCircle2 } from 'lucide-react'

export function Toast({
  message,
  onClose,
  duration = 3000,
  animateExit = true,
}) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!message) return undefined

    const timer = setTimeout(() => {
      if (animateExit) {
        setIsExiting(true)

        const closeTimer = setTimeout(onClose, 200)

        return () => clearTimeout(closeTimer)
      }

      onClose()
      return undefined
    }, duration)

    return () => clearTimeout(timer)
  }, [message, duration, onClose, animateExit])

  if (!message) return null

  return (
    <div
      className={[
        'fixed left-1/2 top-8 z-[100] -translate-x-1/2',
        'flex items-center gap-2 rounded-control bg-brand-600 px-6 py-3',
        'text-white shadow-lg',
        isExiting ? 'animate-toast-out' : 'animate-toast-in',
      ].join(' ')}
    >
      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      <span className="font-semibold">{message}</span>
    </div>
  )
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  animateExit: PropTypes.bool,
}

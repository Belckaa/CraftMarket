import { useCallback, useEffect, useState } from 'react'
import { fetchCategories } from '../api/categories'

export function useCategories() {
  const [state, setState] = useState({ status: 'loading', categories: [], error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCategories({ signal: controller.signal })
      .then((categories) => {
        setState({ status: 'success', categories, error: null })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ status: 'error', categories: [], error })
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading', categories: [], error: null })
    setAttempt((value) => value + 1)
  }, [])

  return { ...state, retry }
}

import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'

const initialState = { status: 'loading', products: [], error: null, isRefetching: false }

export function useProducts() {
  const [state, setState] = useState(initialState)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts({ signal: controller.signal })
      .then((products) => {
        setState({ status: 'success', products, error: null, isRefetching: false })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        // Варіант 11: якщо вже є дані, не стираємо їх при помилці
        setState((prev) => ({ 
          ...prev, 
          status: 'error', 
          error, 
          isRefetching: false 
        }))
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      // Варіант 11: залишаємо товари на екрані, вмикаємо "Оновлюємо..."
      isRefetching: prev.products.length > 0,
      status: prev.products.length > 0 ? 'success' : 'loading',
      error: null,
    }))
    setAttempt((value) => value + 1)
  }, [])

  return { ...state, retry }
}

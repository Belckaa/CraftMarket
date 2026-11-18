import { useEffect, useState } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isActive = true
    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error(`Сервер повернув статус ${response.status}`)
        const data = await response.json()
        if (isActive) setProducts(data)
      } catch (err) {
        if (isActive) setError(err.message)
      } finally {
        if (isActive) setIsLoading(false)
      }
    }
    load()
    return () => { isActive = false }
  }, [retryCount])

  return { products, isLoading, error, retry: () => setRetryCount((c) => c + 1) }
}

import { useEffect } from 'react'
import { useShopStore } from '@/store/shopStore'

export function useProducts() {
  const products = useShopStore((s) => s.products)
  const status = useShopStore((s) => s.status)
  const error = useShopStore((s) => s.error)
  const fetchProducts = useShopStore((s) => s.fetchProducts)

  useEffect(() => {
    if (status === 'idle') {
      fetchProducts()
    }
  }, [status, fetchProducts])

  return { status, products, error, retry: fetchProducts }
}

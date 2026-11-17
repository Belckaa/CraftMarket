import { useState, useEffect } from 'react'
import ProductList from '@/components/ProductList/ProductList'
import ReviewForm from '@/components/ReviewForm/ReviewForm'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('HTTP error')
        return res.json()
      })
      .then((data) => { setProducts(data); setStatus('success') })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="mt-8 text-ink-muted">Завантаження каталогу…</p>
  if (status === 'error') return <p className="mt-8 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-red-700">Не вдалося завантажити каталог.</p>

  const visible = products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <>
      <h2 className="text-2xl font-bold text-ink mb-6">Каталог товарів</h2>
      
      <div className="rounded-card border border-line bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Пошук</label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введіть назву товару..."
            className="w-full rounded-lg border border-edge bg-paper px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-clay-600 focus:outline-none focus:ring-1 focus:ring-clay-600 transition-colors"
          />
        </div>
        <p className="text-sm text-ink-muted whitespace-nowrap">
          Знайдено: <span className="font-semibold text-ink">{visible.length}</span>
        </p>
      </div>

      <ProductList products={visible} />
      
      <div className="mt-12 border-t border-line pt-8">
        <ReviewForm productName="Гончарна ваза «Лаванда»" />
      </div>
    </>
  )
}

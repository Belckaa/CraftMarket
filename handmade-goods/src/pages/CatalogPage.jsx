import { useState, useEffect } from 'react'
import CategoryList from '@/components/CategoryCard/CategoryList'
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar'
import ProductList from '@/components/ProductList/ProductList'
import ReviewForm from '@/components/ReviewForm/ReviewForm'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  
  // Стани фільтрів
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sorting, setSorting] = useState('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

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

  // Логіка фільтрації
  let visible = products.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(query.trim().toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    return matchQuery && matchCategory
  })

  // Логіка сортування
  if (sorting === 'price-asc') visible.sort((a, b) => a.price - b.price)
  if (sorting === 'price-desc') visible.sort((a, b) => b.price - a.price)

  return (
    <>
      <h2 className="text-2xl font-bold text-ink mb-6">Каталог товарів</h2>
      
      {/* Категорії (Варіант 1, 6) */}
      <CategoryList onCategoryClick={setCategory} />

      {/* Панель керування (мобільна кнопка) */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          Фільтри
        </button>
        <p className="text-sm text-ink-muted">
          Знайдено: <span className="font-semibold text-ink">{visible.length}</span>
        </p>
      </div>

      {/* Двоколонкова структура з фільтрами */}
      <div className="flex items-start gap-6">
        <FilterSidebar 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
          query={query} setQuery={setQuery}
          category={category} setCategory={setCategory}
          sorting={sorting} setSorting={setSorting}
        />

        <div className="flex-1 min-w-0">
          <ProductList products={visible} />
        </div>
      </div>

      {/* Форма відгуку (залишилась з ЛР6/9) */}
      <div className="mt-12 border-t border-line pt-8">
        <ReviewForm productName="Гончарна ваза «Лаванда»" />
      </div>
    </>
  )
}

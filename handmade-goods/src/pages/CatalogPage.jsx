import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import ProductList from '../components/ProductList/ProductList'

function CatalogPage({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isActive = true
    async function loadProducts() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/products${window.location.search}`)
        if (!response.ok) throw new Error(`Сервер повернув статус ${response.status}`)
        const data = await response.json()
        if (isActive) setProducts(data)
      } catch (err) {
        if (isActive) setError(err.message)
      } finally {
        if (isActive) setIsLoading(false)
      }
    }
    loadProducts()
    return () => { isActive = false }
  }, [retryCount])

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      let matchesPrice = true
      if (minPrice !== '' || maxPrice !== '') {
        const min = minPrice === '' ? 0 : Number(minPrice)
        const max = maxPrice === '' ? Infinity : Number(maxPrice)
        const actualMin = Math.min(min, max)
        const actualMax = Math.max(min, max)
        matchesPrice = product.price >= actualMin && product.price <= actualMax
      }
      return matchesSearch && matchesCategory && matchesPrice
    })

    if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name, 'uk'))
    else if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name, 'uk'))
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, 'uk'))

    return result.map(p => ({ ...p, highlightQuery: searchQuery }))
  }, [products, searchQuery, category, minPrice, maxPrice, sortBy])

  const handleRetry = () => setRetryCount(prev => prev + 1)

  return (
    <div className="flex flex-col w-full">
      <SearchPanel
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        category={category} onCategoryChange={setCategory}
        minPrice={minPrice} onMinPriceChange={setMinPrice}
        maxPrice={maxPrice} onMaxPriceChange={setMaxPrice}
        sortBy={sortBy} onSortChange={setSortBy}
      />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink-900">Каталог товарів</h2>
        {!isLoading && !error && (
          <p className="text-ink-500 font-medium">Знайдено товарів: {filteredAndSortedProducts.length}</p>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-ink-500">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-ink-100 border-t-brand-600"></div>
          <p>Завантаження каталогу...</p>
        </div>
      ) : error ? (
        <div className="rounded-control border border-danger-600 bg-danger-100 p-8 text-center text-danger-600" role="alert">
          <p className="mb-4 font-semibold">Не вдалося завантажити каталог: {error}</p>
          <button onClick={handleRetry} className="rounded-control bg-danger-600 px-4 py-2 font-semibold text-white transition-opacity hover:opacity-80">
            Спробувати ще раз
          </button>
        </div>
      ) : (
        <ProductList products={filteredAndSortedProducts} onAddToCart={onAddToCart} />
      )}
    </div>
  )
}

CatalogPage.propTypes = { onAddToCart: PropTypes.func.isRequired }

export default CatalogPage

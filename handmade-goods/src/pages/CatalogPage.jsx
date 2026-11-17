import { useState, useEffect, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import ProductList from '../components/ProductList/ProductList'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import ProfileForm from '../components/ProfileForm/ProfileForm'
import './CatalogPage.css'
import PropTypes from 'prop-types'

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

  // Стан для відгуків та Варіанта 6
  const [reviews, setReviews] = useState([])
  const [hasReviewed, setHasReviewed] = useState(false)

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

  // Варіант 6: Обробка відгуку
  const handleReviewSubmit = (review) => {
    setReviews((prev) => [...prev, review])
    setHasReviewed(true)
  }

  return (
    <div className="catalog-page">
      {/* Варіант 1: Форма зміни імені */}
      <ProfileForm />

      <SearchPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="catalog-page__header">
        <h2>Каталог товарів</h2>
        {!isLoading && !error && (
          <p className="catalog-page__count">Знайдено товарів: {filteredAndSortedProducts.length}</p>
        )}
      </div>

      {isLoading ? (
        <div className="catalog-page__loading">
          <div className="spinner"></div>
          <p>Завантаження каталогу...</p>
        </div>
      ) : error ? (
        <div className="catalog-page__error" role="alert">
          <p>Не вдалося завантажити каталог: {error}</p>
          <button onClick={handleRetry} className="catalog-page__retry-btn">Спробувати ще раз</button>
        </div>
      ) : (
        <>
          <ProductList products={filteredAndSortedProducts} onAddToCart={onAddToCart} />
          
          {/* Варіант 6 та 11: Форма відгуку */}
          <div className="catalog-page__review-section">
            {hasReviewed ? (
              <div className="catalog-page__review-thanks">
                <h3>Дякуємо!</h3>
                <p>Ви вже залишили відгук про цей товар. (Варіант 6)</p>
                <p className="muted">Останній відгук: {reviews[reviews.length - 1].reviewText}</p>
              </div>
            ) : (
              <ReviewForm 
                productName="Гончарна ваза «Лаванда»" 
                onReviewSubmit={handleReviewSubmit} 
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

CatalogPage.propTypes = { onAddToCart: PropTypes.func.isRequired }
export default CatalogPage

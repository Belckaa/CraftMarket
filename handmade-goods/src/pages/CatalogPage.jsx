import { useState, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import ProductList from '../components/ProductList/ProductList'
import ProductModal from '../components/ProductModal/ProductModal'
import CategorySidebar from '../components/CategorySidebar/CategorySidebar'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import ProfileForm from '../components/ProfileForm/ProfileForm'
import { useProducts } from '@/hooks/useProducts'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { Toast, Loader } from '@/components/ui'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import DevMockPanel from '../components/DevMockPanel' // <--- Імпорт панелі

function CatalogPage() {
  const { status, products, error, isRefetching, retry } = useProducts()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [reviews, setReviews] = useState([])

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

  const handleReviewSubmit = (review) => {
    setReviews(prev => [...prev, review])
    setToastMessage('Дякуємо! Ваш відгук успішно додано.')
  }

  return (
    <div className="flex flex-col w-full relative">
      {/* Додаємо панель сюди */}
      {import.meta.env.DEV && <DevMockPanel />}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} duration={3000} animateExit={true} />

      <ProfileForm />
      
      <SearchPanel
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        category={category} onCategoryChange={setCategory}
        minPrice={minPrice} onMinPriceChange={setMinPrice}
        maxPrice={maxPrice} onMaxPriceChange={setMaxPrice}
        sortBy={sortBy} onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-8">
        <aside>
          <CategorySidebar activeCategory={category} onSelectCategory={setCategory} />
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink-900">Каталог товарів</h2>
            {!isRefetching && status === 'success' && (
              <p className="text-ink-500 font-medium">Знайдено: {filteredAndSortedProducts.length}</p>
            )}
          </div>

          {isRefetching && (
            <div className="mb-4 flex items-center gap-2 text-sm text-brand-600 font-medium">
              <span className="animate-spin size-4 rounded-full border-2 border-brand-600 border-t-transparent"></span>
              Оновлюємо...
            </div>
          )}

          {status === 'loading' && <Loader label="Завантаження каталогу..." />}

          {status === 'error' && (
            <ErrorMessage 
              title="Каталог не завантажено" 
              message={getErrorMessage(error)} 
              onRetry={retry} 
            />
          )}

          {status === 'success' && (
            <>
              <ProductList 
                products={filteredAndSortedProducts} 
                 
                onOpenDetails={setSelectedProduct} 
              />
              <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

              <div className="mt-12 border-t border-ink-300/30 pt-8">
                <h3 className="mb-6 text-xl font-bold text-ink-900">Відгуки</h3>
                {reviews.length > 0 ? (
                  <div className="mb-6 space-y-4">
                    {reviews.map((r, i) => (
                      <div key={i} className="rounded-control bg-ink-100 p-4">
                        <p className="font-semibold text-ink-900">{r.authorName} <span className="text-brand-600">({r.rating}/5)</span></p>
                        <p className="text-ink-600">{r.reviewText}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mb-6 text-ink-500">Ще немає відгуків.</p>
                )}
                <ReviewForm productName="Гончарна ваза «Лаванда»" onReviewSubmit={handleReviewSubmit} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


export default CatalogPage

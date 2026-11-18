import { useMemo, useState } from 'react'
import { useCartContext as useCart } from '@/context/useCartContext'
import { useProducts } from '@/hooks/useProducts'
import SearchPanel from '@/components/SearchPanel/SearchPanel'
import ProductList from '@/components/ProductList/ProductList'
import ProductModal from '@/components/ProductModal/ProductModal'
import ReviewForm from '@/components/ReviewForm/ReviewForm'
import ProfileForm from '@/components/ProfileForm/ProfileForm'
import { Toast } from '@/components/ui'

export default function CatalogPage() {
  const cart = useCart()
  const { products, isLoading, error, retry } = useProducts()

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

    return result.map((p) => ({ ...p, highlightQuery: searchQuery }))
  }, [products, searchQuery, category, minPrice, maxPrice, sortBy])

  const handleReviewSubmit = (review) => {
    setReviews((prev) => [...prev, review])
    setToastMessage('Дякуємо! Ваш відгук успішно додано.')
  }

  return (
    <div className="flex flex-col w-full">
      <title>Каталог | CraftMarket</title>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} duration={3000} />
      <ProfileForm />

      <SearchPanel
        searchQuery={searchQuery} onSearchChange={setSearchQuery}
        category={category} onCategoryChange={setCategory}
        minPrice={minPrice} onMinPriceChange={setMinPrice}
        maxPrice={maxPrice} onMaxPriceChange={setMaxPrice}
        sortBy={sortBy} onSortChange={setSortBy}
      />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink-900">Каталог товарів</h1>
        {!isLoading && !error && (
          <p className="text-ink-500 font-medium">Знайдено: {filteredAndSortedProducts.length}</p>
        )}
      </div>

      {isLoading ? (
        <p role="status" className="py-16 text-center text-ink-500">Завантаження каталогу…</p>
      ) : error ? (
        <div role="alert" className="rounded-control border border-danger-600 bg-danger-100 p-8 text-center text-danger-600">
          <p className="mb-4 font-semibold">Не вдалося завантажити каталог: {error}</p>
          <button onClick={retry} className="rounded-control bg-danger-600 px-4 py-2 font-semibold text-white">
            Спробувати ще раз
          </button>
        </div>
      ) : (
        <>
          <ProductList
            products={filteredAndSortedProducts}
            onAddToCart={cart.addItem}
            onOpenDetails={setSelectedProduct}
          />
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

          <div className="mt-12 border-t border-ink-300/30 pt-8">
            <h3 className="mb-6 text-xl font-bold text-ink-900">Відгуки</h3>
            {reviews.length > 0 ? (
              <div className="mb-6 space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-control bg-ink-100 p-4">
                    <p className="font-semibold text-ink-900">
                      {r.authorName} <span className="text-brand-600">({r.rating}/5)</span>
                    </p>
                    <p className="text-ink-600">{r.reviewText}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mb-6 text-ink-500">Ще немає відгуків.</p>
            )}
            <ReviewForm
              productName="Гончарна ваза «Лаванда»"
              onReviewSubmit={handleReviewSubmit}
            />
          </div>
        </>
      )}
    </div>
  )
}

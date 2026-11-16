import { useState, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import ProductList from '../components/ProductList/ProductList'
import { mockProducts } from '../data/mockProducts'
import './CatalogPage.css'

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Стан для демонстрації видалення (Крок 5)
  const [demoProducts, setDemoProducts] = useState(mockProducts)

  // Варіант 11: Спочатку фільтруємо, потім сортуємо (у useMemo)
  const filteredAndSortedProducts = useMemo(() => {
    // 1. Фільтрація
    let result = demoProducts.filter((product) => {
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

    // 2. Сортування (Варіанти 1 та 6)
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'uk'))
    } else if (sortBy === 'price-asc') {
      // Варіант 6: Якщо ціни рівні, сортуємо за назвою
      result.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name, 'uk'))
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, 'uk'))
    }

    // Додаємо highlightQuery до кожного об'єкта для ProductCard
    return result.map(p => ({ ...p, highlightQuery: searchQuery }))
  }, [demoProducts, searchQuery, category, minPrice, maxPrice, sortBy])

  // Функція для демонстрації Кроку 5
  const handleRemoveFirst = () => {
    setDemoProducts((prev) => prev.slice(1))
  }

  return (
    <div className="catalog-page">
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
        <p className="catalog-page__count">Знайдено товарів: {filteredAndSortedProducts.length}</p>
      </div>

      {/* Кнопка для демонстрації Кроку 5 (прибрати після звіту) */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleRemoveFirst}
          style={{ padding: '8px 16px', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          [Демонстрація] Видалити перший товар
        </button>
      </div>

      <ProductList products={filteredAndSortedProducts} />
    </div>
  )
}

export default CatalogPage

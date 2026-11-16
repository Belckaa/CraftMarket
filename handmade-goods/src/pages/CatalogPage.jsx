import { useState } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import ProductCard from '../components/ProductCard/ProductCard'
import { mockProducts } from '../data/mockProducts'
import './CatalogPage.css'

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Логіка фільтрації (Варіанти 1, 6)
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category

    let matchesPrice = true
    if (minPrice !== '' || maxPrice !== '') {
      const min = minPrice === '' ? 0 : Number(minPrice)
      const max = maxPrice === '' ? Infinity : Number(maxPrice)
      
      // Варіант 6: Обробка випадку, коли мін > макс (автоматично міняємо місцями)
      const actualMin = Math.min(min, max)
      const actualMax = Math.max(min, max)
      
      matchesPrice = product.price >= actualMin && product.price <= actualMax
    }

    return matchesSearch && matchesCategory && matchesPrice
  })

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
      />

      <div className="catalog-page__header">
        <h2>Каталог товарів</h2>
        <p className="catalog-page__count">Знайдено товарів: {filteredProducts.length}</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="catalog-page__empty">
          <p>
            За запитом «{searchQuery}» нічого не знайдено.
            {category !== 'all' && ' Спробуйте змінити категорію.'}
          </p>
          <p className="catalog-page__empty-hint">Спробуйте інше формулювання або скиньте фільтри.</p>
        </div>
      ) : (
        <div className="catalog-page__grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              highlightQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CatalogPage

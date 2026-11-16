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

  const filteredAndSortedProducts = useMemo(() => {
    let result = mockProducts.filter((product) => {
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

    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'uk'))
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name, 'uk'))
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name, 'uk'))
    }

    return result.map(p => ({ ...p, highlightQuery: searchQuery }))
  }, [searchQuery, category, minPrice, maxPrice, sortBy])

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

      <ProductList products={filteredAndSortedProducts} />
    </div>
  )
}

export default CatalogPage

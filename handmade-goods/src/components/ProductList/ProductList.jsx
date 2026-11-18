import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="mt-8 rounded-control border border-dashed border-ink-300 bg-surface px-6 py-16 text-center shadow-sm">
        <p className="text-lg font-semibold text-ink-900">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-ink-500">Змініть запит або очистіть фільтри.</p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 list-none p-0 w-full">
      {products.map((product) => (
        <li key={product.id} className="flex h-full">
          <ProductCard
            {...product}
            onAddToCart={() => onAddToCart(product)}
          />
        </li>
      ))}
    </ul>
  )
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductList

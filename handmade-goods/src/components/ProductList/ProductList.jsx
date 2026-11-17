import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="mt-8 rounded-card border border-dashed border-edge bg-white px-6 py-16 text-center shadow-sm">
        <p className="text-lg font-semibold text-ink">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-ink-muted">Змініть запит або очистіть фільтри.</p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6 list-none p-0 w-full">
      {products.map((product) => (
        <li key={product.id} className="flex h-full">
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
}

export default ProductList

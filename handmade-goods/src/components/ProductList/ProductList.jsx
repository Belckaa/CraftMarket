import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="mt-8 rounded-card border border-dashed border-line bg-white px-6 py-12 text-center">
        <p className="font-display text-xl font-semibold text-ink">Нічого не знайдено</p>
        <p className="mt-2 text-sm text-ink-muted">Змініть запит або очистіть поле пошуку.</p>
      </div>
    )
  }

  return (
    <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-6 list-none p-0">
      {products.map((product) => (
        <li key={product.id} className="flex">
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

import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductList.module.css'

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>За заданими умовами пошуку товарів не знайдено.</p>
        <p className={styles.emptyHint}>Спробуйте змінити фільтри або пошуковий запит.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
          inStock={product.inStock}
          onSale={product.onSale}
          highlightQuery={product.highlightQuery || ''}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onAddToCart: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      inStock: PropTypes.bool,
      onSale: PropTypes.bool,
      highlightQuery: PropTypes.string,
    })
  ).isRequired,
}

export default ProductList

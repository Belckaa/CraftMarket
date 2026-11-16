import PropTypes from 'prop-types'
import './product-card.css'

const PLACEHOLDER_IMAGE = new URL('../../assets/product-placeholder.svg', import.meta.url).href

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} props.category
 * @param {boolean} [props.inStock=true]
 * @param {boolean} [props.onSale=false]
 */
function ProductCard({ name, price, image, category, inStock = true, onSale = false }) {
  const imageSrc = image || PLACEHOLDER_IMAGE

  // Логіка пріоритету бейджів (Варіант 6)
  const renderBadge = () => {
    if (!inStock) {
      return <span className="product-card__badge product-card__badge--out">Немає в наявності</span>
    }
    if (onSale && category === 'Кераміка') {
      return <span className="product-card__badge product-card__badge--sale">Розпродаж</span>
    }
    return null
  }

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img className="product-card__image" src={imageSrc} alt={name} />
        {renderBadge()}
      </div>
      <div className="product-card__content">
        <p className="product-card__category">{category}</p>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price.toLocaleString('uk-UA')} ₴</p>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  onSale: PropTypes.bool,
}

export default ProductCard

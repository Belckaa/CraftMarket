import PropTypes from 'prop-types'
import { useCartContext } from '@/context/useCartContext'
import { useFormatPrice } from '@/utils/formatPrice'
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
 * @param {string} [props.highlightQuery='']
 */
function ProductCard({ name, price, image, category, inStock = true, onSale = false, highlightQuery = '' }) {
  const { addItem } = useCartContext()
  const formatPrice = useFormatPrice()
  const imageSrc = image || PLACEHOLDER_IMAGE

  const renderBadge = () => {
    if (!inStock) {
      return <span className="product-card__badge product-card__badge--out">Немає в наявності</span>
    }
    if (onSale && category === 'Кераміка') {
      return <span className="product-card__badge product-card__badge--sale">Розпродаж</span>
    }
    return null
  }

  // Варіант 11: Функція підсвічування збігу
  const renderHighlightedName = () => {
    if (!highlightQuery.trim()) return name

    // Екрануємо спецсимволи для RegExp
    const escapedQuery = highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = name.split(new RegExp(`(${escapedQuery})`, 'gi'))

    return parts.map((part, index) =>
      part.toLowerCase() === highlightQuery.toLowerCase() ? (
        <mark key={index} className="product-card__highlight">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img className="product-card__image" src={imageSrc} alt={name} />
        {renderBadge()}
      </div>
      <div className="product-card__content">
<p className="product-card__category">{category}</p>
        <h3 className="product-card__name">{renderHighlightedName()}</h3>
        <p className="product-card__price">{formatPrice(price)}</p>
        <button type="button" className="product-card__add" disabled={!inStock} onClick={() => addItem({ id: name, name, price, image, inStock })}>
          {inStock ? "До кошика" : "Немає в наявності"}
        </button>
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
  highlightQuery: PropTypes.string,
}

export default ProductCard

import PropTypes from 'prop-types'
import { useCartContext } from '@/context/useCartContext'
import { useFormatPrice } from '@/utils/formatPrice'

const PLACEHOLDER_IMAGE = new URL('../../assets/product-placeholder.svg', import.meta.url).href

const cardClasses = "group flex w-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-shadow duration-300 ease-soft hover:shadow-lift"
const imageClasses = "h-full w-full object-cover transition-transform duration-500 ease-soft"
const badgeClasses = "w-fit rounded-full bg-clay-100 px-2.5 py-0.5 text-xs font-medium text-clay-700"

function ProductCard({ name, price, image, category, inStock = true, onSale = false, highlightQuery = '' }) {
  const { addItem } = useCartContext()
  const formatPrice = useFormatPrice()
  const imageSrc = image || PLACEHOLDER_IMAGE

  const imageState = inStock ? 'group-hover:scale-105' : 'grayscale'
  const tone = inStock ? 'text-ink' : 'text-ink-muted'

  const renderBadge = () => {
    if (!inStock) return <span className={`${badgeClasses} bg-red-100 text-red-700`}>Немає в наявності</span>
    if (onSale && category === 'Кераміка') return <span className={`${badgeClasses} bg-green-100 text-green-700`}>Розпродаж</span>
    return <span className={badgeClasses}>{category}</span>
  }

  const renderHighlightedName = () => {
    if (!highlightQuery.trim()) return name
    const escapedQuery = highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = name.split(new RegExp(`(${escapedQuery})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === highlightQuery.toLowerCase() ? (
        <mark key={index} className="bg-clay-100 text-clay-700 rounded px-0.5">{part}</mark>
      ) : part
    )
  }

  return (
    <article className={cardClasses}>
      <div className="relative aspect-[4/3] overflow-hidden bg-clay-50">
        <img className={`${imageClasses} ${imageState}`} src={imageSrc} alt={name} />
        <div className="absolute top-3 left-3">
          {renderBadge()}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className={`font-display text-lg font-semibold leading-snug ${tone}`}>
          {renderHighlightedName()}
        </h2>
        <p className={`mt-auto text-xl font-bold ${tone}`}>
          {formatPrice(price)}
        </p>
        <button 
          type="button" 
          className="inline-flex w-full items-center justify-center rounded-lg bg-clay-600 px-4 py-2.5 text-sm font-semibold text-white enabled:hover:bg-clay-700 enabled:active:bg-clay-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-700 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted transition-colors duration-200 ease-soft" 
          disabled={!inStock} 
          onClick={() => addItem({ id: name, name, price, image, inStock })}
        >
          {inStock ? 'До кошика' : 'Немає в наявності'}
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

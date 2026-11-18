import PropTypes from 'prop-types'
import { useCartContext } from '@/context/useCartContext'
import { useFormatPrice } from '@/utils/formatPrice'

const PLACEHOLDER_IMAGE = new URL('../../assets/product-placeholder.svg', import.meta.url).href

function ProductCard({ name, price, image, category, inStock = true, onSale = false, highlightQuery = '' }) {
  const { addItem } = useCartContext()
  const formatPrice = useFormatPrice()
  const imageSrc = image || PLACEHOLDER_IMAGE

  const renderHighlightedName = () => {
    if (!highlightQuery.trim()) return name
    const escapedQuery = highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = name.split(new RegExp(`(${escapedQuery})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === highlightQuery.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
      ) : part
    )
  }

  const renderBadge = () => {
    if (!inStock) return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Немає в наявності</span>
    if (onSale && category === 'Кераміка') return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Розпродаж</span>
    return <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">{category}</span>
  }

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-lift">
      {/* aspect-4/3 резервує місце, щоб сторінка не стрибала */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
        <img className={`h-full w-full object-cover transition-transform duration-500 ${inStock ? 'group-hover:scale-105' : 'grayscale opacity-75'}`} src={imageSrc} alt={name} width="400" height="300" />
        <div className="absolute top-3 left-3">{renderBadge()}</div>
      </div>
      
      {/* Адаптивні відступи та типографіка */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h2 className={`line-clamp-2 text-base font-semibold leading-snug md:text-lg ${inStock ? 'text-ink' : 'text-ink-muted'}`}>
          {renderHighlightedName()}
        </h2>
        <p className={`mt-auto pt-2 text-lg font-bold ${inStock ? 'text-ink' : 'text-ink-muted'}`}>
          {formatPrice(price)}
        </p>
        
        <button 
          type="button" 
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-clay-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm enabled:hover:bg-clay-700 enabled:active:bg-clay-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 transition-colors duration-200" 
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

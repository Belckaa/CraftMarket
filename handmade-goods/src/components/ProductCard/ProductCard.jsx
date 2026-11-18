import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Card, Badge, Button } from '@/components/ui'
import { formatPrice } from '@/utils/formatPrice'

const PLACEHOLDER_IMAGE = new URL('../../assets/product-placeholder.svg', import.meta.url).href

function ProductCard({ id, name, price, image, category, inStock = true, onSale = false, highlightQuery = '', onAddToCart, onOpenDetails }) {
  const imageSrc = image || PLACEHOLDER_IMAGE

  const renderBadges = () => {
    if (!inStock) return <Badge tone="danger">Немає в наявності</Badge>
    if (onSale && category === 'Кераміка') return <Badge tone="brand">Розпродаж</Badge>
    return null
  }

  const renderHighlightedName = () => {
    if (!highlightQuery.trim()) return name
    const escapedQuery = highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = name.split(new RegExp(`(${escapedQuery})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === highlightQuery.toLowerCase() ? (
        <mark key={index} className="bg-brand-100 text-brand-800 rounded px-0.5">{part}</mark>
      ) : (part)
    )
  }

  return (
    <Card className="h-full w-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <img
          className={`h-full w-full object-cover transition-transform duration-500 ${inStock ? 'group-hover:scale-105' : 'grayscale opacity-75'}`}
          src={imageSrc}
          alt={name}
          width="400"
          height="300"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">{renderBadges()}</div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-semibold tracking-wide text-ink-500 uppercase">{category}</p>
        <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-snug text-ink-900 md:text-lg">
          <Link
            to={`/product/${id}`}
            className="hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
          >
            {renderHighlightedName()}
          </Link>
        </h3>
        <p className="mt-auto mb-4 text-xl font-bold text-ink-900">{formatPrice(price)}</p>

        <div className="flex gap-2 mt-auto">
          <Button
            variant="secondary"
            onClick={onOpenDetails}
            className="flex-1 text-sm active:scale-95 transition-transform"
          >
            Деталі
          </Button>
          <Button
            variant={inStock ? 'primary' : 'secondary'}
            disabled={!inStock}
            onClick={onAddToCart}
            className="flex-1 text-sm active:scale-95 transition-transform disabled:active:scale-100"
          >
            {inStock ? 'До кошика' : 'Немає'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  onSale: PropTypes.bool,
  highlightQuery: PropTypes.string,
  onAddToCart: PropTypes.func.isRequired,
  onOpenDetails: PropTypes.func.isRequired,
}

export default ProductCard

import PropTypes from 'prop-types'
import { useFormatPrice } from '@/utils/formatPrice'

const PLACEHOLDER = new URL('../../assets/product-placeholder.svg', import.meta.url).href

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, name, price, image, quantity } = item
  const formatPrice = useFormatPrice()

  return (
    <li className="grid grid-cols-[56px_minmax(0,1fr)_auto] gap-4 border-b border-line py-4 last:border-0">
      <img className="h-14 w-14 rounded-lg object-cover bg-slate-50 border border-line" src={image || PLACEHOLDER} alt="" />
      
      <div className="flex flex-col min-w-0 justify-between">
        <div>
          <p className="line-clamp-2 text-sm font-medium leading-tight text-ink">{name}</p>
          <p className="mt-1 text-xs text-ink-muted">{formatPrice(price)}</p>
        </div>
        
        <div className="flex items-center gap-1 mt-2 w-fit rounded-md border border-line bg-white p-0.5">
          <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-ink hover:bg-slate-100" onClick={() => onQuantityChange(id, quantity - 1)}>−</button>
          <span className="min-w-[20px] text-center text-xs font-semibold text-ink">{quantity}</span>
          <button type="button" className="flex h-6 w-6 items-center justify-center rounded text-ink hover:bg-slate-100" onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between py-1">
        <button type="button" className="text-slate-400 hover:text-red-500 transition-colors" onClick={() => onRemove(id)}>✕</button>
        <p className="text-sm font-bold text-ink whitespace-nowrap mt-4">{formatPrice(price * quantity)}</p>
      </div>
    </li>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

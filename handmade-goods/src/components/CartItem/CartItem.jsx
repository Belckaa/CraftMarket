import PropTypes from 'prop-types'
import { useFormatPrice } from '@/utils/formatPrice'

const PLACEHOLDER = new URL('../../assets/product-placeholder.svg', import.meta.url).href

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, name, price, image, quantity } = item
  const formatPrice = useFormatPrice()

  return (
    <li className="grid grid-cols-[56px_minmax(0,1fr)_auto] grid-rows-[auto_auto] gap-x-3 gap-y-2 border-b border-line py-4">
      <img className="col-start-1 row-span-2 h-14 w-14 rounded-lg object-cover bg-clay-50" src={image || PLACEHOLDER} alt="" />
      
      <div className="col-start-2 row-start-1 flex flex-col min-w-0">
        <p className="line-clamp-2 text-sm font-medium leading-tight text-ink">{name}</p>
        <p className="mt-1 text-xs text-ink-muted">{formatPrice(price)}</p>
      </div>

      <div className="col-start-2 row-start-2 flex items-center gap-1 self-end justify-self-start rounded-lg border border-line bg-paper p-0.5">
        <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-ink hover:bg-line" onClick={() => onQuantityChange(id, quantity - 1)}>−</button>
        <span className="min-w-[20px] text-center text-sm font-semibold text-ink">{quantity}</span>
        <button type="button" className="flex h-7 w-7 items-center justify-center rounded text-ink hover:bg-line" onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
      </div>

      <div className="col-start-3 row-start-2 flex items-end justify-end gap-2">
        <p className="text-sm font-bold text-ink whitespace-nowrap">{formatPrice(price * quantity)}</p>
        <button type="button" className="text-lg text-red-500 hover:text-red-700 leading-none px-1 mb-0.5" onClick={() => onRemove(id)}>×</button>
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

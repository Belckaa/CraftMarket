import PropTypes from 'prop-types'
import { useFormatPrice } from '@/utils/formatPrice'
import './CartItem.css'

const PLACEHOLDER = new URL('../../assets/product-placeholder.svg', import.meta.url).href

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const formatPrice = useFormatPrice()
  const { id, name, price, image, quantity } = item

  return (
    <li className="cart-item">
      <img className="cart-item__image" src={image || PLACEHOLDER} alt="" width="64" height="64" />
      <div className="cart-item__info">
        <p className="cart-item__title">{name}</p>
        <p className="cart-item__unit">{formatPrice(price)}</p>
      </div>
      <div className="cart-item__controls">
        <button type="button" onClick={() => onQuantityChange(id, quantity - 1)}>−</button>
        <span className="cart-item__qty">{quantity}</span>
        <button type="button" onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
      </div>
      <p className="cart-item__subtotal">{formatPrice(price * quantity)}</p>
      <button type="button" className="cart-item__remove" onClick={() => onRemove(id)}>×</button>
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

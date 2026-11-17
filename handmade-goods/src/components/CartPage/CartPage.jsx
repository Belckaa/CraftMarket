import PropTypes from 'prop-types'
import CartItem from '../CartItem/CartItem'
import PromoForm from '../PromoForm/PromoForm'
import { formatPrice } from '@/utils/formatPrice'
import './CartPage.css'

export default function CartPage({ cart }) {
  const { 
    items, totalCount, totalPrice, discountAmount, finalPrice, 
    promo, promoError, isEmpty, updateQuantity, removeItem, clearCart, applyPromo 
  } = cart

  if (isEmpty) {
    return (
      <section className="cart-panel">
        <h2 className="cart-panel__title">Кошик</h2>
        <p className="cart-panel__empty">У кошику поки немає товарів.</p>
      </section>
    )
  }

  return (
    <section className="cart-panel">
      <h2 className="cart-panel__title">Кошик ({totalCount})</h2>
      <ul className="cart-panel__list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
        ))}
      </ul>

      <div className="cart-panel__summary">
        {!promo ? (
          <PromoForm onApply={applyPromo} error={promoError} />
        ) : (
          <div className="cart-panel__promo-applied">
            Промокод <strong>{promo}</strong> застосовано
          </div>
        )}

        <div className="cart-panel__row">
          <span>Сума:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        {discountAmount > 0 && (
          <div className="cart-panel__row cart-panel__row--discount">
            <span>Знижка (10%):</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="cart-panel__row cart-panel__row--total">
          <span>До сплати:</span>
          <strong>{formatPrice(finalPrice)}</strong>
        </div>

        <button type="button" className="cart-panel__clear" onClick={clearCart}>
          Очистити кошик
        </button>
      </div>
    </section>
  )
}

CartPage.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    discountAmount: PropTypes.number.isRequired,
    finalPrice: PropTypes.number.isRequired,
    promo: PropTypes.string,
    promoError: PropTypes.string,
    isEmpty: PropTypes.bool.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    applyPromo: PropTypes.func.isRequired,
  }).isRequired,
}

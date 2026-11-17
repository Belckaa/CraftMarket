import CartItem from '../CartItem/CartItem'
import PromoForm from '../PromoForm/PromoForm'
import { useCartContext } from '@/context/useCartContext'
import { useFormatPrice } from '@/utils/formatPrice'
import './CartPage.css'

export default function CartPage() {
  const { 
    items, totalCount, totalPrice, discountAmount, finalPrice, 
    promo, promoError, updateQuantity, removeItem, clearCart, applyPromo 
  } = useCartContext()
  
  const formatPrice = useFormatPrice()

  if (items.length === 0) {
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

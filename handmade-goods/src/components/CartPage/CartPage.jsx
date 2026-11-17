import CartItem from '../CartItem/CartItem'
import PromoForm from '../PromoForm/PromoForm'
import { useCartContext } from '@/context/useCartContext'
import { useFormatPrice } from '@/utils/formatPrice'

export default function CartPage() {
  const { 
    items, totalCount, totalPrice, discountAmount, finalPrice, 
    promo, promoError, updateQuantity, removeItem, clearCart, applyPromo 
  } = useCartContext()
  
  const formatPrice = useFormatPrice()

  if (items.length === 0) {
    return (
      <section className="sticky top-6 rounded-card border border-line bg-white p-6 shadow-card">
        <h2 className="mb-4 border-b border-line pb-4 font-display text-xl font-bold text-ink">Кошик</h2>
        <p className="py-10 text-center text-sm text-ink-muted">У кошику поки немає товарів.</p>
      </section>
    )
  }

  return (
    <section className="sticky top-6 rounded-card border border-line bg-white p-6 shadow-card">
      <h2 className="mb-4 border-b border-line pb-4 font-display text-xl font-bold text-ink">Кошик ({totalCount})</h2>
      
      <ul className="max-h-[400px] overflow-y-auto mb-4 p-0">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
        ))}
      </ul>

      <div className="border-t border-line pt-4">
        {!promo ? (
          <PromoForm onApply={applyPromo} error={promoError} />
        ) : (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            Промокод <strong>{promo}</strong> застосовано
          </div>
        )}

        <div className="flex justify-between text-sm text-ink-muted mb-2">
          <span>Сума:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600 mb-2">
            <span>Знижка (10%):</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-lg font-bold text-ink mt-3 border-t border-dashed border-line pt-3">
          <span>До сплати:</span>
          <strong>{formatPrice(finalPrice)}</strong>
        </div>

        <button 
          type="button" 
          className="mt-4 w-full rounded-lg border border-red-500 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50" 
          onClick={clearCart}
        >
          Очистити кошик
        </button>
      </div>
    </section>
  )
}

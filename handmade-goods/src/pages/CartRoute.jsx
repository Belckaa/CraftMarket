import { useCartContext as useCart } from '@/context/useCartContext'
import CartPage from '@/components/CartPage/CartPage'

export default function CartRoute() {
  const cart = useCart()
  return (
    <section>
      <title>Кошик | CraftMarket</title>
      <h1 className="mb-6 text-2xl font-bold text-ink-900">Кошик</h1>
      <CartPage cart={cart} />
    </section>
  )
}

import { useCart } from '@/hooks/useCart'
import CatalogPage from '@/pages/CatalogPage'
import CartPage from '@/components/CartPage/CartPage'
import DesignSystemPreview from '@/pages/DesignSystemPreview'

function App() {
  const cart = useCart()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-control bg-ink-900 font-bold text-surface">CM</span>
          <div>
            <h1 className="text-2xl font-bold text-ink-900">CraftMarket</h1>
            <p className="text-ink-500">Вітрина товарів ручної роботи</p>
          </div>
        </div>
        <div className="rounded-control border border-ink-300/30 bg-surface px-4 py-2 text-sm shadow-sm">
          У кошику: <strong>{cart.totalCount}</strong>
        </div>
      </header>

      <DesignSystemPreview />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] items-start">
        <div>
          <CatalogPage onAddToCart={cart.addItem} />
        </div>
        <aside className="sticky top-8">
          <CartPage cart={cart} />
        </aside>
      </div>
    </main>
  )
}

export default App

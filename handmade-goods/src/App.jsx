import CatalogPage from '@/pages/CatalogPage'
import CartPage from '@/components/CartPage/CartPage'
import CurrencySwitcher from '@/components/CurrencySwitcher/CurrencySwitcher'
import { useCartContext } from '@/context/useCartContext'

const container = "mx-auto max-w-6xl px-4"

function App() {
  const { totalCount } = useCartContext()

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className={`${container} flex items-center justify-between py-4`}>
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-bold tracking-tight text-clay-700">CraftMarket</span>
            <p className="hidden text-sm text-ink-muted sm:block">Вітрина товарів ручної роботи</p>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySwitcher />
            <div className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-ink">
              У кошику: <strong className="text-clay-600">{totalCount}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className={`${container} py-8`}>
        <h1 className="font-display text-3xl font-bold text-ink mb-6">Каталог товарів</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            <CatalogPage />
          </div>
          <aside>
            <CartPage />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App

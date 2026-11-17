import CatalogPage from '@/pages/CatalogPage'
import CartPage from '@/components/CartPage/CartPage'
import CurrencySwitcher from '@/components/CurrencySwitcher/CurrencySwitcher'
import { useCartContext } from '@/context/useCartContext'

function App() {
  const { totalCount } = useCartContext()

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      <header className="border-b border-line bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">
              CM
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-ink">CraftMarket</h1>
              <p className="text-xs text-ink-muted hidden sm:block">Вітрина товарів ручної роботи</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySwitcher />
            <div className="rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-ink shadow-sm">
              У кошику: <strong className="text-clay-600">{totalCount}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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

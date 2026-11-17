import CatalogPage from '@/pages/CatalogPage'
import CartPage from '@/components/CartPage/CartPage'
import CurrencySwitcher from '@/components/CurrencySwitcher/CurrencySwitcher'
import { useCartContext } from '@/context/useCartContext'
import './App.css'

function App() {
  const { totalCount } = useCartContext()

  return (
    <main className="app">
      <header className="app__header">
        <div className="brand">
          <span className="brand__mark">CM</span>
          <div>
            <h1 className="brand__title">CraftMarket</h1>
            <p className="brand__subtitle">Вітрина товарів ручної роботи</p>
          </div>
        </div>
        <div className="app__header-controls">
          <CurrencySwitcher />
          <div className="app__cart-counter">
            У кошику: <strong>{totalCount}</strong>
          </div>
        </div>
      </header>

      <div className="app__layout">
        <div className="app__catalog">
          <CatalogPage />
        </div>
        <aside className="app__cart">
          <CartPage />
        </aside>
      </div>
    </main>
  )
}

export default App

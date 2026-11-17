import { useCart } from '@/hooks/useCart'
import CatalogPage from '@/pages/CatalogPage'
import CartPage from '@/components/CartPage/CartPage'
import './App.css'

function App() {
  const cart = useCart()

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
        <div className="app__cart-counter">
          У кошику: <strong>{cart.totalCount}</strong>
        </div>
      </header>

      <div className="app__layout">
        <div className="app__catalog">
          <CatalogPage onAddToCart={cart.addItem} />
        </div>
        <aside className="app__cart">
          <CartPage cart={cart} />
        </aside>
      </div>
    </main>
  )
}

export default App

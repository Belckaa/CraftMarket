import CatalogPage from '@/pages/CatalogPage'

function App() {
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
      </header>

      <CatalogPage />
    </main>
  )
}

export default App

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

      <section className="hero-card">
        <p className="eyebrow">Каталог</p>
        <h2>Скоро тут з’явиться каталог товарів</h2>
        <p className="muted">
          Базовий каркас готовий. Товари, фільтри та кошик додамо в наступних
          лабораторних роботах.
        </p>
      </section>
    </main>
  )
}

export default App

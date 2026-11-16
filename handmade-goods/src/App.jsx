import ProductCard from '@/components/ProductCard/ProductCard'

const products = [
  {
    id: 1,
    name: 'Ваза керамічна',
    price: 450,
    category: 'Кераміка',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=400',
    onSale: true,
  },
  {
    id: 2,
    name: 'Дерев’яна миска',
    price: 320,
    category: 'Дерев’яні вироби',
  },
  {
    id: 3,
    name: 'Кулон срібний',
    price: 780,
    category: 'Прикраси',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=formathttps://images.unsplash.com/photo-1599643478514-4a11011d1686?auto=format&fit=crop&q=80&w=400fit=crop&q=80&w=400',
    inStock: false,
  },
  {
    id: 4,
    name: 'Тарілка розписна',
    price: 280,
    category: 'Кераміка',
    onSale: true,
    inStock: false, // Демонстрація Варіанта 6 (пріоритет "Немає в наявності")
  },
]

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

      <section>
        <div className="catalog-header">
          <h2>Каталог товарів</h2>
          <p className="muted">Демонстрація карток з різними станами</p>
        </div>
        
        <div className="catalog-grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default App

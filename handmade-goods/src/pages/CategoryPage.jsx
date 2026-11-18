import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useCartContext as useCart } from '@/context/useCartContext'
import { useProducts } from '@/hooks/useProducts'
import ProductList from '@/components/ProductList/ProductList'
import ProductModal from '@/components/ProductModal/ProductModal'

// Мапа slug → реальне значення поля category у мок-даних
const SLUG_TO_CATEGORY = {
  ceramics: 'Кераміка',
  textile: 'Текстиль',
  wood: 'Дерево',
}

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const cart = useCart()
  const { products, isLoading, error, retry } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState(null)

  if (isLoading) return <p role="status" className="py-16 text-center text-ink-500">Завантаження каталогу…</p>
  if (error) {
    return (
      <div role="alert" className="rounded-control border border-danger-600 bg-danger-100 p-8 text-center text-danger-600">
        <p className="mb-4 font-semibold">Не вдалося завантажити каталог: {error}</p>
        <button onClick={retry} className="rounded-control bg-danger-600 px-4 py-2 font-semibold text-white">
          Спробувати ще раз
        </button>
      </div>
    )
  }

  const categoryName = SLUG_TO_CATEGORY[categorySlug] ?? categorySlug
  // Похідне значення — без useState/useEffect
  const categoryProducts = products.filter((p) => p.category === categoryName)

  return (
    <section>
      <title>{`${categoryName} | CraftMarket`}</title>
      <nav aria-label="Навігаційний ланцюжок" className="mb-4 text-sm text-ink-500">
        <Link to="/" className="underline hover:text-brand-600">Каталог</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{categoryName}</span>
      </nav>
      <h1 className="mb-4 text-2xl font-bold text-ink-900">Категорія: {categoryName}</h1>
      <ProductList
        products={categoryProducts}
        onAddToCart={cart.addItem}
        onOpenDetails={setSelectedProduct}
      />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}

import { Link, Outlet, useLoaderData } from 'react-router'
import { useCartContext as useCart } from '@/context/useCartContext'
import { formatPrice } from '@/utils/formatPrice'

export default function ProductPage() {
  const product = useLoaderData()
  const cart = useCart()

  return (
    <article>
      <title>{`${product.name} | CraftMarket`}</title>

      <nav aria-label="Навігаційний ланцюжок" className="mb-4 text-sm text-ink-500">
        <Link to="/" className="underline hover:text-brand-600">Каталог</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/category/${product.categorySlug ?? product.category}`} className="underline hover:text-brand-600">
          {product.category}
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full rounded-control object-cover"
          />
        )}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-ink-900">{product.name}</h1>
          <p className="text-2xl font-bold text-ink-900">{formatPrice(product.price)}</p>
          <p className="text-ink-600">
            {product.description ?? 'Опис товару буде додано незабаром.'}
          </p>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => cart.addItem(product)}
            className="mt-auto rounded-control bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:bg-ink-300 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
          </button>
          <Link
            to={`/product/${product.id}/review`}
            className="rounded-control border border-brand-600 px-4 py-3 text-center font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            Залишити відгук
          </Link>
        </div>
      </div>

      {/* Варіант 11: сюди роутер підставляє ProductReviewPage */}
      <Outlet context={{ productName: product.name, productId: product.id }} />
    </article>
  )
}

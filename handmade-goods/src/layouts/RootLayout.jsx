import { NavLink, Outlet, useNavigation } from 'react-router'
import { useCartContext as useCart } from '@/context/useCartContext'
import CartBadge from '@/components/CartBadge/CartBadge'

// Slug-и мають збігатися зі значеннями поля category у мок-даних
const CATEGORY_LINKS = [
  { slug: 'ceramics', title: 'Кераміка' },
  { slug: 'textile', title: 'Текстиль' },
  { slug: 'wood', title: 'Дерево' },
]

const navLinkClass = ({ isActive }) => {
  const base = 'rounded-control px-3 py-2 text-sm font-medium transition-colors'
  const state = isActive
    ? 'bg-brand-100 text-brand-800'
    : 'text-ink-700 hover:bg-ink-100'
  return `${base} ${state}`
}

export default function RootLayout() {
  const cart = useCart()
  const navigation = useNavigation()
  const isNavigating = navigation.state === 'loading'

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink-900">
      <header className="border-b border-ink-300/30 bg-surface">
        <nav
          aria-label="Головна навігація"
          className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-8"
        >
          <span className="mr-2 grid h-10 w-10 place-items-center rounded-control bg-ink-900 text-sm font-bold text-surface">
            CM
          </span>
          <NavLink to="/" end className={navLinkClass}>Каталог</NavLink>
          {CATEGORY_LINKS.map(({ slug, title }) => (
            <NavLink key={slug} to={`/category/${slug}`} className={navLinkClass}>
              {title}
            </NavLink>
          ))}
          <NavLink to="/profile/1" className={navLinkClass}>Профіль</NavLink>
          <NavLink
            to="/cart"
            className={(state) => `${navLinkClass(state)} ml-auto`}
          >
            <span className="inline-flex items-center gap-2">
              Кошик <CartBadge totalCount={cart.totalCount} />
            </span>
          </NavLink>
        </nav>
        {isNavigating && (
          <div
            role="progressbar"
            aria-label="Завантаження сторінки"
            className="h-1 w-full animate-pulse bg-brand-600"
          />
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-ink-300/30 py-4 text-center text-sm text-ink-500">
        CraftMarket · вітрина виробів ручної роботи
      </footer>
    </div>
  )
}

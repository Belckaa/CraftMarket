import { Link, NavLink, Outlet } from 'react-router'
import { useAuth } from '@/store/authStore'
import { useCart } from '@/hooks/useCart'
import CartBadge from '@/components/CartBadge/CartBadge'

export default function RootLayout() {
  const { isAuthenticated, user, logout } = useAuth()
  const cart = useCart()

  // Варіант 7: обрізання імені
  const rawName = user?.displayName || user?.email || ''
  const shortName = rawName.length > 20 ? `${rawName.slice(0, 20)}...` : rawName

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink-300/30 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-control bg-ink-900 font-bold text-surface">CM</span>
              <span className="text-xl font-bold text-ink-900">CraftMarket</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <NavLink to="/" className="text-ink-600 hover:text-ink-900 font-medium">Каталог</NavLink>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <CartBadge totalCount={cart.totalCount} />
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <NavLink to="/orders" className="text-ink-600 hover:text-ink-900 font-medium">Мої замовлення</NavLink>
                <span 
                  className="text-sm text-ink-500" 
                  title={rawName.length > 20 ? rawName : undefined}
                  aria-label={`Вітаємо, ${rawName}`}
                >
                  Вітаємо, {shortName}
                </span>
                <button onClick={logout} className="text-sm text-danger-600 font-medium hover:underline">Вийти</button>
              </div>
            ) : (
              <NavLink to="/login" className="rounded-control bg-brand-600 px-4 py-2 text-white font-medium hover:bg-brand-700">Увійти</NavLink>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

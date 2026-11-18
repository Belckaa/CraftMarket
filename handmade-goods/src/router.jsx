import { createBrowserRouter } from 'react-router'
import RootLayout from './layouts/RootLayout.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ProductReviewPage from './pages/ProductReviewPage.jsx'
import CartRoute from './pages/CartRoute.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx'
import { productLoader } from './loaders/productLoader.js'
import { profileLoader } from './loaders/profileLoader.js'

// Роутер створюється один раз, на рівні модуля
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          // безшляховий маршрут: групує сторінки й дає їм спільний errorElement
          errorElement: <RouteErrorBoundary />,
          children: [
            { index: true, element: <CatalogPage /> },
            { path: 'category/:categorySlug', element: <CategoryPage /> },
            {
              path: 'product/:productId',
              element: <ProductPage />,
              loader: productLoader,
              hydrateFallbackElement: (
                <p role="status" className="py-16 text-center text-ink-500">
                  Завантаження товару…
                </p>
              ),
              // Варіант 11: вкладений маршрут відгуку
              children: [
                { path: 'review', element: <ProductReviewPage /> },
              ],
            },
            { path: 'cart', element: <CartRoute /> },
            // Варіант 1 + 6: профіль користувача
            { path: 'profile/:userId', element: <ProfilePage />, loader: profileLoader },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
)

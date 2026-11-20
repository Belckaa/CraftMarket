/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router'
import RootLayout from './layouts/RootLayout'
import CatalogPage from './pages/CatalogPage'
import CartPage from './components/CartPage/CartPage'
import LoginPage from './pages/LoginPage'
import OrdersPage from './pages/OrdersPage'
import AddressesPage from './pages/AddressesPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import { ordersLoader } from './loaders/ordersLoader'

// Компонент для відображення помилок
const ErrorBoundary = () => (
  <div className="p-8 text-center text-danger-600 bg-danger-100 rounded-control max-w-lg mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-4">Сталася помилка</h1>
    <p>Не вдалося завантажити сторінку. Можливо, мок-сервер (MSW) не перехопив запит.</p>
    <p className="text-sm mt-2">Спробуйте оновити сторінку (F5).</p>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />, // Додаємо обробник для всього дерева
    children: [
      { index: true, element: <CatalogPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: 'orders', 
            element: <OrdersPage />, 
            loader: ordersLoader,
            errorElement: <ErrorBoundary /> // Окремо для замовлень
          },
          { path: 'account/addresses', element: <AddressesPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

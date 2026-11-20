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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'orders', element: <OrdersPage />, loader: ordersLoader },
          { path: 'account/addresses', element: <AddressesPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

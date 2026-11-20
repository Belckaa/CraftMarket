import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/store/authStore'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const fullPath = location.pathname + location.search + location.hash
    return <Navigate to="/login" replace state={{ from: fullPath }} />
  }
  return <Outlet />
}

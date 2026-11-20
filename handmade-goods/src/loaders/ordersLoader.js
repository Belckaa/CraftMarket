import { authFetch } from '@/services/authService'
import { redirect } from 'react-router'

export async function ordersLoader() {
  const response = await authFetch('/api/orders')
  if (response.status === 401) {
    return redirect('/login')
  }
  if (!response.ok) {
    throw new Response('Не вдалося завантажити замовлення', { status: response.status })
  }
  return response.json()
}

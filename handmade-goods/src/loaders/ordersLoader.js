import { authFetch } from '@/services/authService'
import { redirect } from 'react-router'

export async function ordersLoader() {
  const response = await authFetch('/api/orders')

  if (response.status === 401) {
    return redirect('/login')
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (!response.ok || !contentType.includes('application/json')) {
    throw new Response('Не вдалося завантажити замовлення', {
      status: response.status || 500,
    })
  }

  return response.json()
}

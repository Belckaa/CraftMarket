import { useLoaderData } from 'react-router'
import { useAuth } from '@/store/authStore'

export default function OrdersPage() {
  const orders = useLoaderData()
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-ink-900">Мої замовлення</h1>
      {/* Варіант 4: displayName */}
      <p className="mb-6 text-ink-500">Користувач: {user?.displayName || user?.email}</p>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order.id} className="rounded-control border border-ink-300/30 bg-surface p-4 shadow-sm flex justify-between">
            <div>
              <p className="font-bold text-ink-900">№{order.id}</p>
              <p className="text-sm text-ink-500">від {order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-600">{order.total.toLocaleString('uk-UA')} ₴</p>
              <p className="text-sm text-ink-500">{order.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

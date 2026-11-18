import { useLoaderData } from 'react-router'

export default function ProfilePage() {
  const user = useLoaderData()

  const formattedDate = new Date(user.registeredAt).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="mx-auto max-w-xl">
      <title>{`${user.name} | CraftMarket`}</title>
      <div className="rounded-control border border-ink-300/30 bg-surface p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-ink-900">{user.name}</h1>
        <dl className="mt-6 space-y-3">
          <div className="flex justify-between border-b border-ink-100 pb-2">
            <dt className="text-ink-500">Місто</dt>
            <dd className="font-semibold text-ink-900">{user.city}</dd>
          </div>
          <div className="flex justify-between border-b border-ink-100 pb-2">
            <dt className="text-ink-500">Дата реєстрації</dt>
            <dd className="font-semibold text-ink-900">{formattedDate}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">ID</dt>
            <dd className="font-mono text-ink-900">{user.id}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

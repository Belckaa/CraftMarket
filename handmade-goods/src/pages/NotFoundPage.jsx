import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold text-ink-900 mb-4">404</h1>
      <p className="text-ink-500 mb-6">Сторінку не знайдено</p>
      <Link to="/" className="text-brand-600 hover:underline">Повернутися до каталогу</Link>
    </div>
  )
}

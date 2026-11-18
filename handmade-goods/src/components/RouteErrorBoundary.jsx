import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

const homeLinkClass =
  'mt-6 inline-block rounded-control bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700'

export default function RouteErrorBoundary() {
  const error = useRouteError()

  let title = 'Щось пішло не так'
  let details = 'Спробуйте оновити сторінку або повернутися до каталогу.'

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Товар не знайдено'
      details = 'Можливо, його вилучили з вітрини або адресу введено з помилкою.'
    } else if (error.status === 400) {
      title = 'Помилка 400: некоректна адреса'
      details = error.data || 'Перевірте формат ідентифікатора в адресі.'
    } else {
      title = `Помилка ${error.status}`
      details = error.data || error.statusText || details
    }
  } else {
    console.error(error)
  }

  return (
    <section role="alert" className="py-16 text-center">
      <title>{`${title} | CraftMarket`}</title>
      <h1 className="text-3xl font-semibold text-ink-900">{title}</h1>
      <p className="mt-2 text-ink-600">{details}</p>
      <Link to="/" className={homeLinkClass}>До каталогу</Link>
    </section>
  )
}

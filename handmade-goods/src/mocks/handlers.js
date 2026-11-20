import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'
import { authHandlers } from './authHandlers'

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url)
    const error = url.searchParams.get('error')
    await delay(800)
    if (error === '500') return HttpResponse.json({ message: 'Помилка' }, { status: 500 })
    if (error === 'network') return HttpResponse.error()
    return HttpResponse.json(products)
  }),
  http.get('/api/categories', async ({ request }) => {
    const url = new URL(request.url)
    const error = url.searchParams.get('error')
    await delay(800)
    if (error === '500') return HttpResponse.json({ message: 'Помилка' }, { status: 500 })
    if (error === 'network') return HttpResponse.error()
    if (url.searchParams.get('empty') === 'true') return HttpResponse.json([])
    return HttpResponse.json([
      { id: 'cat1', name: 'Кераміка' }, { id: 'cat2', name: 'Текстиль' },
      { id: 'cat3', name: 'Дерево' }, { id: 'cat4', name: 'Свічки' }, { id: 'cat5', name: 'Прикраси' },
    ])
  }),
  ...authHandlers,
]

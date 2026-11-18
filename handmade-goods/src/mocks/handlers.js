import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url)
    const error = url.searchParams.get('error')
    const empty = url.searchParams.get('empty')
    const delayMs = Number(url.searchParams.get('delay')) || 800

    await delay(delayMs)

    if (error === '500') return HttpResponse.json({ message: 'Внутрішня помилка' }, { status: 500 })
    if (error === 'network') return HttpResponse.error()
    if (empty === 'true') return HttpResponse.json([])
    
    return HttpResponse.json(products)
  }),

  http.get('/api/categories', async ({ request }) => {
    const url = new URL(request.url)
    const error = url.searchParams.get('error')
    const empty = url.searchParams.get('empty')
    const delayMs = Number(url.searchParams.get('delay')) || 800

    await delay(delayMs)

    if (error === '500') return HttpResponse.json({ message: 'Внутрішня помилка' }, { status: 500 })
    if (error === 'network') return HttpResponse.error()
    if (empty === 'true') return HttpResponse.json([])

    return HttpResponse.json([
      { id: 'cat1', name: 'Кераміка' },
      { id: 'cat2', name: 'Текстиль' },
      { id: 'cat3', name: 'Дерево' },
      { id: 'cat4', name: 'Свічки' },
      { id: 'cat5', name: 'Прикраси' },
    ])
  }),
]

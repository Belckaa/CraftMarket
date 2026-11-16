import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    // Варіант 1: Фіксована затримка 800 мс
    await delay(800)

    const url = new URL(request.url)
    
    // Механізм для перевірки помилки (якщо є параметр ?error=true)
    if (url.searchParams.get('error') === 'true') {
      return HttpResponse.json(
        { message: 'Внутрішня помилка сервера' },
        { status: 500 }
      )
    }

    return HttpResponse.json(products)
  }),
]

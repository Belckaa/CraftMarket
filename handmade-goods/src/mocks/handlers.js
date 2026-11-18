import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products.js'
import { users } from './users.js'

export const handlers = [
  http.get('/api/products', async () => {
    await delay(400)
    return HttpResponse.json(products)
  }),
  http.get('/api/products/:id', async ({ params }) => {
    await delay(400)
    // params.id — завжди рядок, тому порівнюємо через String()
    const product = products.find((item) => String(item.id) === params.id)
    if (!product) {
      return HttpResponse.json({ message: 'Товар не знайдено' }, { status: 404 })
    }
    return HttpResponse.json(product)
  }),
  http.get('/api/users/:id', async ({ params }) => {
    await delay(300)
    const user = users.find((item) => String(item.id) === params.id)
    if (!user) {
      return HttpResponse.json({ message: 'Користувача не знайдено' }, { status: 404 })
    }
    return HttpResponse.json(user)
  }),
]

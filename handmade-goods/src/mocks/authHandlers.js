import { http, HttpResponse, delay } from 'msw'

const USERS = [
  {
    id: 'u1',
    email: 'anna@craftmarket.test',
    password: 'Craft2026!',
    displayName: 'Анна Мельник', // Варіант 4
  },
]

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json()
    await delay(600)
    const user = USERS.find((u) => u.email === email && u.password === password)
    
    if (!user) {
      return HttpResponse.json({ message: 'Невірна адреса або пароль' }, { status: 401 })
    }
    return HttpResponse.json({
      token: `mock.${user.id}.${Date.now()}`,
      user: { id: user.id, email: user.email, displayName: user.displayName },
    })
  }),

  // Варіант 15
  http.get('/api/orders', async ({ request }) => {
    await delay(500)
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    return HttpResponse.json([
      { id: 'A-1042', date: '2026-09-28', total: 1240, status: 'Доставлено' },
      { id: 'A-1057', date: '2026-10-05', total: 680, status: 'У дорозі' },
    ])
  }),
]

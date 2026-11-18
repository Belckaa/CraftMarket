// Варіант 1 + Варіант 6: розрізняємо 400 (некоректний формат) і 404 (не існує)
export async function profileLoader({ params, request }) {
  const { userId } = params

  // Варіант 6: перевіряємо формат — лише додатні цілі числа
  if (!/^\d+$/.test(userId)) {
    throw new Response('Некоректний формат ідентифікатора користувача', {
      status: 400,
      statusText: 'Bad Request',
    })
  }

  const response = await fetch(`/api/users/${encodeURIComponent(userId)}`, {
    signal: request.signal,
  })
  if (response.status === 404) {
    throw new Response('Користувача не знайдено', { status: 404 })
  }
  if (!response.ok) {
    throw new Response('Помилка сервера', { status: response.status })
  }
  return response.json()
}

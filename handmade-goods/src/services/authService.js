const TOKEN_KEY = 'craftmarket.token'
const USER_KEY = 'craftmarket.user'

export async function loginRequest({ email, password }) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.message ?? 'Не вдалося виконати вхід')
    error.status = response.status
    throw error
  }
  return data
}

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers = {
    Accept: 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
  return fetch(url, { ...options, headers })
}

export function saveSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function loadSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  const rawUser = localStorage.getItem(USER_KEY)
  if (!token || !rawUser) return null
  try {
    return { token, user: JSON.parse(rawUser) }
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

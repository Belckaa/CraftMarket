import { create } from 'zustand'
import { loadSession, loginRequest, saveSession, clearSession } from '@/services/authService'

export const useAuthStore = create((set) => ({
  user: loadSession()?.user ?? null,
  token: loadSession()?.token ?? null,
  
  login: async (credentials) => {
    const data = await loginRequest(credentials)
    saveSession(data)
    set({ user: data.user, token: data.token })
  },
  
  logout: () => {
    clearSession()
    set({ user: null, token: null })
  },
}))

export const useAuth = () => {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  return { user, token, isAuthenticated: Boolean(token), login, logout }
}

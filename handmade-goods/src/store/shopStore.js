import { create } from 'zustand'
import { useAuthStore } from './authStore'

const getCartKey = () => {
  const userId = useAuthStore.getState().user?.id
  return userId ? `cart:${userId}` : null
}

export const useShopStore = create((set, get) => ({
  items: [],
  
  loadCart: () => {
    const key = getCartKey()
    if (!key) return set({ items: [] })
    try {
      const saved = localStorage.getItem(key)
      set({ items: saved ? JSON.parse(saved) : [] })
    } catch {
      set({ items: [] })
    }
  },

  saveCart: () => {
    const key = getCartKey()
    if (key) {
      localStorage.setItem(key, JSON.stringify(get().items))
    }
  },

  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.id === product.id)
    const newItems = existing 
      ? state.items.map((item) => item.id === product.id ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item)
      : [...state.items, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }]
    get().saveCart()
    return { items: newItems }
  }),

  updateQuantity: (id, quantity) => set((state) => {
    let qty = Number(quantity)
    if (isNaN(qty)) qty = 1
    qty = Math.floor(qty)
    qty = Math.max(0, Math.min(10, qty))
    const newItems = qty === 0 
      ? state.items.filter((item) => item.id !== id)
      : state.items.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    get().saveCart()
    return { items: newItems }
  }),

  removeItem: (id) => set((state) => {
    const newItems = state.items.filter((item) => item.id !== id)
    get().saveCart()
    return { items: newItems }
  }),

  clearCart: () => set(() => {
    get().saveCart()
    return { items: [] }
  }),

  // Catalog state
  products: [],
  status: 'idle',
  error: null,
  fetchProducts: async () => {
    set({ status: 'loading', error: null })
    try {
      const response = await fetch(`/api/products${window.location.search}`)
      if (!response.ok) throw new Error(`Сервер повернув статус ${response.status}`)
      const data = await response.json()
      set({ products: data, status: 'success' })
    } catch (err) {
      if (err.name === 'AbortError') return
      set({ status: 'error', error: err })
    }
  },
}))

export const selectTotalCount = (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectTotalPrice = (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const selectItems = (state) => state.items

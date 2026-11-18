import { create } from 'zustand'

export const useShopStore = create((set) => ({
  // --- Стан кошика ---
  items: [],
  
  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.id === product.id)
    if (existing) {
      const newQty = Math.min(10, existing.quantity + 1) // Варіант 6: ліміт 10
      return {
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        ),
      }
    }
    return {
      items: [...state.items, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }],
    }
  }),

  updateQuantity: (id, quantity) => set((state) => {
    // Варіант 6: обробка нецілих та NaN-значень
    let qty = Number(quantity)
    if (isNaN(qty)) qty = 1
    qty = Math.floor(qty)
    qty = Math.max(0, Math.min(10, qty)) // Обмеження 0-10

    if (qty === 0) {
      return { items: state.items.filter((item) => item.id !== id) }
    }
    return {
      items: state.items.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    }
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  // Варіант 1: Очищення кошика
  clearCart: () => set({ items: [] }),

  // --- Стан каталогу (Варіант 11) ---
  products: [],
  status: 'idle', // idle | loading | success | error
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

// Селектори (для оптимізації рендерів)
export const selectTotalCount = (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectTotalPrice = (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const selectItems = (state) => state.items

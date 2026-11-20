import { useShopStore, selectTotalCount, selectTotalPrice, selectItems } from '@/store/shopStore'

export function useCart() {
  const items = useShopStore(selectItems)
  const totalCount = useShopStore(selectTotalCount)
  const totalPrice = useShopStore(selectTotalPrice)
  const addItem = useShopStore((s) => s.addItem)
  const updateQuantity = useShopStore((s) => s.updateQuantity)
  const removeItem = useShopStore((s) => s.removeItem)
  const clearCart = useShopStore((s) => s.clearCart)

  return { items, totalCount, totalPrice, addItem, updateQuantity, removeItem, clearCart }
}

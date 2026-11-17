import { useCallback, useMemo, useReducer } from 'react'
import { CART_ACTIONS, cartReducer, initialCartState } from './cartReducer.js'

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const addItem = useCallback((product, quantity = 1) => {
    if (!product.inStock) return
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } })
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR })
  }, [])

  const applyPromo = useCallback((code) => {
    dispatch({ type: CART_ACTIONS.APPLY_PROMO, payload: { code } })
  }, [])

  const clearPromoError = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_PROMO_ERROR })
  }, [])

  const totals = useMemo(() => {
    let totalCount = 0
    let totalPrice = 0
    for (const item of state.items) {
      totalCount += item.quantity
      totalPrice += item.price * item.quantity
    }
    
    const discountAmount = state.promo === 'CRAFT10' ? totalPrice * 0.1 : 0
    const finalPrice = totalPrice - discountAmount

    return { totalCount, totalPrice, discountAmount, finalPrice }
  }, [state.items, state.promo])

  return {
    items: state.items,
    totalCount: totals.totalCount,
    totalPrice: totals.totalPrice,
    discountAmount: totals.discountAmount,
    finalPrice: totals.finalPrice,
    promo: state.promo,
    promoError: state.promoError,
    isEmpty: state.items.length === 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromo,
    clearPromoError,
  }
}

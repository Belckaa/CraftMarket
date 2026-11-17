import { createContext } from 'react'

/**
 * @typedef {Object} CartContextValue
 * @property {Array} items
 * @property {number} totalCount
 * @property {number} totalPrice
 * @property {number} discountAmount
 * @property {number} finalPrice
 * @property {string|null} promo
 * @property {string|null} promoError
 * @property {Function} addItem
 * @property {Function} updateQuantity
 * @property {Function} removeItem
 * @property {Function} clearCart
 * @property {Function} applyPromo
 */

/** @type {import('react').Context<CartContextValue | null>} */
export const CartContext = createContext(null)
CartContext.displayName = 'CartContext'

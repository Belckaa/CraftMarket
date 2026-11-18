import { beforeEach, describe, expect, it } from 'vitest'
import { useShopStore, selectTotalCount, selectTotalPrice } from './shopStore'

const vase = { id: 'p1', name: 'Керамічна ваза', price: 450 }
const mug = { id: 'p2', name: 'Кухоль', price: 180 }

describe('useShopStore (Кошик)', () => {
  beforeEach(() => {
    useShopStore.setState({ items: [] })
  })

  it('додає новий товар із кількістю 1', () => {
    useShopStore.getState().addItem(vase)
    expect(useShopStore.getState().items).toEqual([{ ...vase, quantity: 1 }])
  })

  it('збільшує кількість при повторному додаванні, але не більше 10 (Варіант 6)', () => {
    const { addItem } = useShopStore.getState()
    for (let i = 0; i < 12; i++) addItem(vase)
    expect(useShopStore.getState().items[0].quantity).toBe(10)
  })

  it('видаляє позицію, якщо кількість стає нульовою', () => {
    const { addItem, updateQuantity } = useShopStore.getState()
    addItem(vase)
    updateQuantity('p1', 0)
    expect(useShopStore.getState().items).toHaveLength(0)
  })

  it('ігнорує NaN та нецілі значення (Варіант 6)', () => {
    const { addItem, updateQuantity } = useShopStore.getState()
    addItem(vase)
    updateQuantity('p1', 'abc')
    expect(useShopStore.getState().items[0].quantity).toBe(1)
    updateQuantity('p1', 3.8)
    expect(useShopStore.getState().items[0].quantity).toBe(3)
  })

  it('очищає кошик (Варіант 1)', () => {
    const { addItem, clearCart } = useShopStore.getState()
    addItem(vase)
    addItem(mug)
    clearCart()
    expect(useShopStore.getState().items).toHaveLength(0)
  })

  it('рахує кількість і суму через селектори', () => {
    const { addItem, updateQuantity } = useShopStore.getState()
    addItem(vase)
    addItem(mug)
    updateQuantity('p2', 3)
    const state = useShopStore.getState()
    expect(selectTotalCount(state)).toBe(4)
    expect(selectTotalPrice(state)).toBe(450 + 180 * 3)
  })
})

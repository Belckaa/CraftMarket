import assert from 'node:assert/strict'
import { CART_ACTIONS, cartReducer, initialCartState } from '../src/hooks/cartReducer.js'

const vase = { id: 'p-101', name: 'Керамічна ваза', price: 850, inStock: true }
const add = (state, product) => cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, payload: { product } })

// 1. Додавання та злиття
let state = add(add(initialCartState, vase), vase)
assert.equal(state.items.length, 1)
assert.equal(state.items[0].quantity, 2)

// 2. Оновлення без мутації
const before = state
const after = cartReducer(before, { type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: 'p-101', quantity: 5 } })
assert.notEqual(after, before)
assert.notEqual(after.items, before.items)
assert.equal(before.items[0].quantity, 2)
assert.equal(after.items[0].quantity, 5)

// 3. Видалення при 0
const emptied = cartReducer(after, { type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: 'p-101', quantity: 0 } })
assert.deepEqual(emptied.items, [])

// 4. Варіант 1: Застосування промокоду
const withPromo = cartReducer(state, { type: CART_ACTIONS.APPLY_PROMO, payload: { code: 'CRAFT10' } })
assert.equal(withPromo.promo, 'CRAFT10')
assert.equal(withPromo.promoError, null)

// 5. Варіант 6: Невідомий промокод
const withError = cartReducer(state, { type: CART_ACTIONS.APPLY_PROMO, payload: { code: 'UNKNOWN' } })
assert.equal(withError.promo, null)
assert.equal(withError.promoError, 'Невідомий промокод')

// 6. Варіант 6: Запобігання подвійній знижці
const doublePromo = cartReducer(withPromo, { type: CART_ACTIONS.APPLY_PROMO, payload: { code: 'CRAFT10' } })
assert.equal(doublePromo.promo, 'CRAFT10')

// 7. Невідома дія
assert.throws(() => cartReducer(state, { type: 'cart/unknown' }))

console.log('cartReducer: усі перевірки пройдено (включно з Варіантами 1 та 6)')

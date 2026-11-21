import { cartReducer, initialCartState } from '@/reducers/cartReducer'
import type { CartState } from '@/types/cart'

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }
  return value
}

const state = (items: CartState['items']): CartState => deepFreeze({ items })

describe('cartReducer', () => {
  describe('ADD_ITEM', () => {
    it('adds a new item', () => {
      const next = cartReducer(initialCartState, {
        type: 'ADD_ITEM',
        payload: { coffeeId: 'latte', quantity: 2 },
      })
      expect(next.items).toEqual([{ coffeeId: 'latte', quantity: 2 }])
    })

    it('accumulates an existing item without duplicating the line (RN-02)', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 2 }])
      const next = cartReducer(prev, { type: 'ADD_ITEM', payload: { coffeeId: 'latte', quantity: 3 } })
      expect(next.items).toEqual([{ coffeeId: 'latte', quantity: 5 }])
      expect(next).not.toBe(prev)
    })

    it('keeps other items untouched', () => {
      const prev = state([
        { coffeeId: 'latte', quantity: 1 },
        { coffeeId: 'cubano', quantity: 1 },
      ])
      const next = cartReducer(prev, { type: 'ADD_ITEM', payload: { coffeeId: 'latte', quantity: 1 } })
      expect(next.items[1]).toBe(prev.items[1])
    })

    it.each([0, -1, 1.5, Number.NaN])('ignores invalid quantity %s (RN-01)', (quantity) => {
      const prev = state([])
      expect(cartReducer(prev, { type: 'ADD_ITEM', payload: { coffeeId: 'latte', quantity } })).toBe(prev)
    })

    it('caps accumulated quantity at the maximum', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 98 }])
      const next = cartReducer(prev, { type: 'ADD_ITEM', payload: { coffeeId: 'latte', quantity: 5 } })
      expect(next.items[0].quantity).toBe(99)
    })
  })

  describe('INCREMENT_ITEM', () => {
    it('increments an existing item', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 1 }])
      const next = cartReducer(prev, { type: 'INCREMENT_ITEM', payload: { coffeeId: 'latte' } })
      expect(next.items).toEqual([{ coffeeId: 'latte', quantity: 2 }])
    })

    it('ignores unknown items', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 1 }])
      expect(cartReducer(prev, { type: 'INCREMENT_ITEM', payload: { coffeeId: 'x' } })).toBe(prev)
    })
  })

  describe('DECREMENT_ITEM', () => {
    it('decrements an item with quantity above 1', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 3 }])
      const next = cartReducer(prev, { type: 'DECREMENT_ITEM', payload: { coffeeId: 'latte' } })
      expect(next.items).toEqual([{ coffeeId: 'latte', quantity: 2 }])
    })

    it('removes the item when decrementing from 1 (RN-01)', () => {
      const prev = state([
        { coffeeId: 'latte', quantity: 1 },
        { coffeeId: 'cubano', quantity: 2 },
      ])
      const next = cartReducer(prev, { type: 'DECREMENT_ITEM', payload: { coffeeId: 'latte' } })
      expect(next.items).toEqual([{ coffeeId: 'cubano', quantity: 2 }])
    })
  })

  describe('REMOVE_ITEM', () => {
    it('removes only the matching item', () => {
      const prev = state([
        { coffeeId: 'latte', quantity: 4 },
        { coffeeId: 'cubano', quantity: 2 },
      ])
      const next = cartReducer(prev, { type: 'REMOVE_ITEM', payload: { coffeeId: 'latte' } })
      expect(next.items).toEqual([{ coffeeId: 'cubano', quantity: 2 }])
    })

    it('returns the same state for unknown ids', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 4 }])
      expect(cartReducer(prev, { type: 'REMOVE_ITEM', payload: { coffeeId: 'x' } })).toBe(prev)
    })
  })

  describe('CLEAR_CART', () => {
    it('empties the cart', () => {
      const prev = state([{ coffeeId: 'latte', quantity: 4 }])
      expect(cartReducer(prev, { type: 'CLEAR_CART' }).items).toEqual([])
    })
  })

  describe('HYDRATE_CART', () => {
    it('replaces items with a copy of the payload', () => {
      const payload = [{ coffeeId: 'latte', quantity: 2 }]
      const next = cartReducer(initialCartState, { type: 'HYDRATE_CART', payload })
      expect(next.items).toEqual(payload)
      expect(next.items[0]).not.toBe(payload[0])
    })
  })
})

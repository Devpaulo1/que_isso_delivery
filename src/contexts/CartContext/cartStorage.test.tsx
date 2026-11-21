import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { STORAGE_KEYS } from '@/config/constants'
import { CartProvider } from '@/contexts/CartContext'
import { loadCartItems, parseCartItems } from '@/contexts/CartContext/cartStorage'
import { useCart } from '@/hooks/useCart'
import { readStorage, writeStorage } from '@/utils/storage'

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

const stored = () => JSON.parse(window.localStorage.getItem(STORAGE_KEYS.cart) ?? 'null') as unknown

describe('parseCartItems', () => {
  it('accepts a valid cart', () => {
    expect(parseCartItems({ items: [{ coffeeId: 'latte', quantity: 2 }] })).toEqual([
      { coffeeId: 'latte', quantity: 2 },
    ])
  })

  it.each([null, 42, 'cart', [], { items: 'x' }, { products: [] }])(
    'rejects incompatible structure %j',
    (value) => {
      expect(parseCartItems(value)).toBeNull()
    },
  )

  it('drops malformed items and merges duplicates', () => {
    expect(
      parseCartItems({
        items: [
          { coffeeId: 'latte', quantity: 1 },
          { coffeeId: 'latte', quantity: 2 },
          { coffeeId: '', quantity: 1 },
          { coffeeId: 'cubano', quantity: 0 },
          { coffeeId: 'cubano', quantity: 1.5 },
          { coffeeId: 7, quantity: 1 },
          'junk',
        ],
      }),
    ).toEqual([{ coffeeId: 'latte', quantity: 3 }])
  })
})

describe('cart persistence', () => {
  it('hydrates the cart from storage on start (refresh)', () => {
    writeStorage(STORAGE_KEYS.cart, { items: [{ coffeeId: 'latte', quantity: 3 }] })
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([{ coffeeId: 'latte', quantity: 3 }])
    expect(result.current.totalUnits).toBe(3)
  })

  it('persists every change', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('latte', 2))
    expect(stored()).toEqual({ items: [{ coffeeId: 'latte', quantity: 2 }] })
    act(() => result.current.clearCart())
    expect(stored()).toEqual({ items: [] })
  })

  it.each(['{broken json', '"old-format"', '[{"id":"latte"}]'])(
    'starts empty with corrupted storage %s without crashing',
    (raw) => {
      window.localStorage.setItem(STORAGE_KEYS.cart, raw)
      expect(loadCartItems()).toEqual([])
      const { result } = renderHook(() => useCart(), { wrapper })
      expect(result.current.items).toEqual([])
    },
  )

  it('survives a storage that throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    expect(readStorage(STORAGE_KEYS.cart, parseCartItems)).toBeNull()
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toEqual([])
  })

  it('syncs changes made in another tab', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: STORAGE_KEYS.cart,
          newValue: JSON.stringify({ items: [{ coffeeId: 'cubano', quantity: 4 }] }),
        }),
      )
    })
    expect(result.current.items).toEqual([{ coffeeId: 'cubano', quantity: 4 }])
  })
})

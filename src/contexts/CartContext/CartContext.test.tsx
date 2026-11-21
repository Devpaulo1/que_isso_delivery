import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { CartProvider } from '@/contexts/CartContext'
import { useCart } from '@/hooks/useCart'

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('CartContext', () => {
  it('exposes typed cart operations', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => result.current.addItem('latte', 2))
    act(() => result.current.addItem('cubano', 1))
    act(() => result.current.incrementItem('cubano'))
    expect(result.current.items).toEqual([
      { coffeeId: 'latte', quantity: 2 },
      { coffeeId: 'cubano', quantity: 2 },
    ])

    act(() => result.current.decrementItem('latte'))
    act(() => result.current.removeItem('cubano'))
    expect(result.current.items).toEqual([{ coffeeId: 'latte', quantity: 1 }])

    act(() => result.current.clearCart())
    expect(result.current.items).toEqual([])
  })

  it('derives units and totals from the catalog', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem('expresso-tradicional', 2))
    act(() => result.current.addItem('latte', 1))
    expect(result.current.totalUnits).toBe(3)
    expect(result.current.subtotalInCents).toBe(2 * 990 + 1290)
    expect(result.current.totalInCents).toBe(2 * 990 + 1290 + 500)
    expect(result.current.resolvedItems).toHaveLength(2)
  })

  it('keeps operation references stable between renders', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const { addItem } = result.current
    act(() => result.current.addItem('latte', 1))
    expect(result.current.addItem).toBe(addItem)
  })

  it('throws a clear error outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useCart())).toThrow(/CartProvider/)
  })
})

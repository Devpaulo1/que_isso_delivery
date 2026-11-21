import { DELIVERY_FEE_IN_CENTS } from '@/config/constants'
import type { Coffee } from '@/types/coffee'
import {
  getCartTotals,
  getDeliveryFeeInCents,
  getSubtotalInCents,
  getTotalUnits,
  resolveCartItems,
} from '@/utils/cart'

const fixture: Record<string, Coffee> = {
  a: { id: 'a', name: 'A', description: '', priceInCents: 990, image: '', tags: ['x'], category: 'traditional' },
  b: { id: 'b', name: 'B', description: '', priceInCents: 1290, image: '', tags: ['x'], category: 'special' },
}
const lookup = (id: string) => fixture[id]

describe('cart utils', () => {
  it('handles an empty cart', () => {
    expect(getCartTotals([], lookup)).toMatchObject({
      totalUnits: 0,
      subtotalInCents: 0,
      deliveryFeeInCents: 0,
      totalInCents: 0,
      items: [],
      missingCoffeeIds: [],
    })
  })

  it('sums units across items, not item types (RF-04)', () => {
    expect(
      getTotalUnits([
        { coffeeId: 'a', quantity: 2 },
        { coffeeId: 'b', quantity: 3 },
      ]),
    ).toBe(5)
  })

  it('computes subtotal, fee and total in integer cents (RN-03)', () => {
    const totals = getCartTotals(
      [
        { coffeeId: 'a', quantity: 3 },
        { coffeeId: 'b', quantity: 2 },
      ],
      lookup,
    )
    // 3 × 990 + 2 × 1290 = 2970 + 2580 = 5550
    expect(totals.subtotalInCents).toBe(5550)
    expect(totals.deliveryFeeInCents).toBe(DELIVERY_FEE_IN_CENTS)
    expect(totals.totalInCents).toBe(5550 + DELIVERY_FEE_IN_CENTS)
    expect(Number.isInteger(totals.totalInCents)).toBe(true)
  })

  it('avoids floating point errors', () => {
    // 0.1 + 0.2 em reais seria 0.30000000000000004
    const coffee: Coffee = { ...fixture.a, id: 'c', priceInCents: 10 }
    const totals = getCartTotals([{ coffeeId: 'c', quantity: 3 }], () => coffee, 0)
    expect(totals.totalInCents).toBe(30)
  })

  it('separates ids missing from the catalog (RN-10)', () => {
    const resolved = resolveCartItems(
      [
        { coffeeId: 'a', quantity: 1 },
        { coffeeId: 'ghost', quantity: 2 },
      ],
      lookup,
    )
    expect(resolved.items.map((item) => item.coffee.id)).toEqual(['a'])
    expect(resolved.missingCoffeeIds).toEqual(['ghost'])
    expect(getSubtotalInCents(resolved.items)).toBe(990)
  })

  it('charges delivery only when there is a subtotal', () => {
    expect(getDeliveryFeeInCents(0)).toBe(0)
    expect(getDeliveryFeeInCents(100)).toBe(DELIVERY_FEE_IN_CENTS)
  })
})

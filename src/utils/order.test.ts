import type { CheckoutFormData } from '@/schemas/checkoutSchema'
import type { ResolvedCartItem } from '@/types/cart'
import type { Coffee } from '@/types/coffee'
import { createOrderSnapshot } from '@/utils/order'

const latte: Coffee = {
  id: 'latte',
  name: 'Latte',
  description: '',
  priceInCents: 1290,
  image: '/latte.svg',
  tags: ['Com leite'],
  category: 'with-milk',
}

const form: CheckoutFormData = {
  postalCode: '01001000',
  street: 'Praça da Sé',
  number: '100',
  complement: undefined,
  neighborhood: 'Sé',
  city: 'São Paulo',
  state: 'SP',
  paymentMethod: 'cash',
}

const deps = { now: () => new Date('2026-11-17T12:00:00Z'), generateId: () => 'order-1' }

describe('createOrderSnapshot', () => {
  it('copies item data, address, payment and totals', () => {
    const items: ResolvedCartItem[] = [{ coffee: latte, quantity: 2, lineTotalInCents: 2580 }]
    const order = createOrderSnapshot({ items, form }, deps)

    expect(order).toEqual({
      id: 'order-1',
      createdAt: '2026-11-17T12:00:00.000Z',
      items: [
        {
          coffeeId: 'latte',
          name: 'Latte',
          unitPriceInCents: 1290,
          quantity: 2,
          lineTotalInCents: 2580,
          image: '/latte.svg',
        },
      ],
      address: {
        postalCode: '01001000',
        street: 'Praça da Sé',
        number: '100',
        neighborhood: 'Sé',
        city: 'São Paulo',
        state: 'SP',
      },
      paymentMethod: 'cash',
      subtotalInCents: 2580,
      deliveryFeeInCents: 500,
      totalInCents: 3080,
    })
  })

  it('keeps the complement when present', () => {
    const items: ResolvedCartItem[] = [{ coffee: latte, quantity: 1, lineTotalInCents: 1290 }]
    const order = createOrderSnapshot({ items, form: { ...form, complement: 'Sala 2' } }, deps)
    expect(order.address.complement).toBe('Sala 2')
  })

  it('is independent from later catalog/cart changes', () => {
    const coffee = { ...latte }
    const items: ResolvedCartItem[] = [{ coffee, quantity: 1, lineTotalInCents: 1290 }]
    const order = createOrderSnapshot({ items, form }, deps)

    coffee.name = 'Latte (novo nome)'
    coffee.priceInCents = 9999
    items.length = 0

    expect(order.items[0]).toMatchObject({ name: 'Latte', unitPriceInCents: 1290 })
    expect(order.items).toHaveLength(1)
  })

  it('is immutable', () => {
    const items: ResolvedCartItem[] = [{ coffee: latte, quantity: 1, lineTotalInCents: 1290 }]
    const order = createOrderSnapshot({ items, form }, deps)
    expect(Object.isFrozen(order)).toBe(true)
    expect(Object.isFrozen(order.items[0])).toBe(true)
    expect(Object.isFrozen(order.address)).toBe(true)
  })

  it('refuses to create an order without items', () => {
    expect(() => createOrderSnapshot({ items: [], form }, deps)).toThrow()
  })

  it('generates unique ids by default', () => {
    const items: ResolvedCartItem[] = [{ coffee: latte, quantity: 1, lineTotalInCents: 1290 }]
    const a = createOrderSnapshot({ items, form })
    const b = createOrderSnapshot({ items, form })
    expect(a.id).not.toBe(b.id)
  })
})

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { STORAGE_KEYS } from '@/config/constants'
import { AppRoutes } from '@/routes/AppRoutes'
import { clearCepCache } from '@/services/cep/viaCep'
import { fillCheckoutForm, mockViaCepSuccess } from '@/tests/helpers/checkout'
import { renderWithProviders } from '@/tests/helpers/render'
import { loadLastOrder, parseOrder } from '@/utils/orderStorage'

const readJson = (key: string) => JSON.parse(window.localStorage.getItem(key) ?? 'null') as unknown

beforeEach(() => clearCepCache())

describe('order confirmation (RF-12, RF-13)', () => {
  it('saves the snapshot, clears the cart and leaves the checkout', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    renderWithProviders(<AppRoutes />, {
      route: '/checkout',
      cart: [
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'cubano', quantity: 1 },
      ],
    })

    await fillCheckoutForm(user, 'Dinheiro')
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Finalizar pedido' })).not.toBeInTheDocument(),
    )
    const order = loadLastOrder()
    expect(order).not.toBeNull()
    expect(order?.items.map((item) => [item.coffeeId, item.quantity])).toEqual([
      ['latte', 2],
      ['cubano', 1],
    ])
    expect(order?.address).toMatchObject({ street: 'Praça da Sé', number: '100', complement: 'Sala 2' })
    expect(order?.paymentMethod).toBe('cash')
    expect(order?.totalInCents).toBe(2 * 1290 + 1590 + 500)

    expect(readJson(STORAGE_KEYS.cart)).toEqual({ items: [] })
    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()
  })

  it('persists the snapshot before clearing the cart', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    const writes: string[] = []
    const original = Storage.prototype.setItem
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (this: Storage, key, value) {
      if (key === STORAGE_KEYS.lastOrder) writes.push('order')
      if (key === STORAGE_KEYS.cart && value === JSON.stringify({ items: [] })) writes.push('clear-cart')
      return original.call(this, key, value)
    })
    renderWithProviders(<AppRoutes />, { route: '/checkout', cart: [{ coffeeId: 'latte', quantity: 1 }] })

    await fillCheckoutForm(user)
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    await waitFor(() => expect(writes).toContain('clear-cart'))
    expect(writes.indexOf('order')).toBeLessThan(writes.indexOf('clear-cart'))
  })

  it('keeps the cart when the snapshot cannot be saved', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    const original = Storage.prototype.setItem
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (this: Storage, key, value) {
      if (key === STORAGE_KEYS.lastOrder) throw new Error('QuotaExceededError')
      return original.call(this, key, value)
    })
    renderWithProviders(<AppRoutes />, { route: '/checkout', cart: [{ coffeeId: 'latte', quantity: 1 }] })

    await fillCheckoutForm(user)
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText(/não foi possível salvar o pedido/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Carrinho com 1 item' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Finalizar pedido' })).toBeInTheDocument()
  })
})

describe('parseOrder', () => {
  const valid = {
    id: 'o1',
    createdAt: '2026-11-17T12:00:00.000Z',
    items: [{ coffeeId: 'latte', name: 'Latte', unitPriceInCents: 1290, quantity: 2, lineTotalInCents: 2580, image: '' }],
    address: { postalCode: '01001000', street: 'Rua', number: '1', neighborhood: 'B', city: 'C', state: 'SP' },
    paymentMethod: 'credit',
    subtotalInCents: 2580,
    deliveryFeeInCents: 500,
    totalInCents: 3080,
  }

  it('accepts a consistent order', () => {
    expect(parseOrder(valid)).toEqual(valid)
  })

  it.each([
    ['null', null],
    ['no items', { ...valid, items: [] }],
    ['bad payment', { ...valid, paymentMethod: 'pix' }],
    ['tampered total', { ...valid, totalInCents: 1 }],
    ['tampered line', { ...valid, items: [{ ...valid.items[0], lineTotalInCents: 1 }] }],
    ['bad address', { ...valid, address: { ...valid.address, postalCode: '123' } }],
    ['bad date', { ...valid, createdAt: 'ontem' }],
  ])('rejects %s', (_label, value) => {
    expect(parseOrder(value)).toBeNull()
  })
})

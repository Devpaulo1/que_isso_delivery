import { screen, within } from '@testing-library/react'
import { AppRoutes } from '@/routes/AppRoutes'
import { renderWithProviders } from '@/tests/helpers/render'
import type { Order } from '@/types/order'
import { saveLastOrder } from '@/utils/orderStorage'

const normalize = (text: string | null) => (text ?? '').split(String.fromCharCode(160)).join(' ')

const order: Order = {
  id: 'abcdef12-0000-0000-0000-000000000000',
  createdAt: '2026-11-17T12:00:00.000Z',
  items: [
    { coffeeId: 'latte', name: 'Latte', unitPriceInCents: 1290, quantity: 2, lineTotalInCents: 2580, image: '/latte.svg' },
    // Nome/preço do momento da compra, mesmo que o catálogo mude depois
    { coffeeId: 'cubano', name: 'Cubano Antigo', unitPriceInCents: 1000, quantity: 1, lineTotalInCents: 1000, image: '/cubano.svg' },
  ],
  address: {
    postalCode: '01001000',
    street: 'Praça da Sé',
    number: '100',
    complement: 'Sala 2',
    neighborhood: 'Sé',
    city: 'São Paulo',
    state: 'SP',
  },
  paymentMethod: 'debit',
  subtotalInCents: 3580,
  deliveryFeeInCents: 500,
  totalInCents: 4080,
}

describe('Success page', () => {
  it('shows address, payment, items and totals from the snapshot', () => {
    saveLastOrder(order)
    renderWithProviders(<AppRoutes />, { route: '/success' })

    expect(screen.getByRole('heading', { level: 1, name: 'Uhu! Pedido confirmado' })).toBeInTheDocument()

    const delivery = screen.getByRole('list', { name: 'Detalhes da entrega' })
    expect(delivery).toHaveTextContent('Praça da Sé, 100 — Sala 2')
    expect(delivery).toHaveTextContent('Sé - São Paulo, SP · CEP 01001-000')
    expect(delivery).toHaveTextContent('Cartão de débito')

    const items = within(screen.getByRole('list', { name: 'Itens do pedido confirmado' })).getAllByRole('listitem')
    expect(items.map((item) => normalize(item.textContent))).toEqual([
      '2 × LatteR$ 25,80',
      '1 × Cubano AntigoR$ 10,00',
    ])

    const total = screen.getByText('Total', { selector: 'dt' }).nextElementSibling
    expect(normalize(total?.textContent ?? null)).toBe('R$ 40,80')
    expect(screen.getByRole('link', { name: 'Voltar para a Home' })).toHaveAttribute('href', '/')
  })
})

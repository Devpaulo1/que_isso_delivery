import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppRoutes } from '@/routes/AppRoutes'
import { formatViolations, runAxe } from '@/tests/helpers/axe'
import { renderWithProviders } from '@/tests/helpers/render'
import type { Order } from '@/types/order'
import { saveLastOrder } from '@/utils/orderStorage'

const order: Order = {
  id: 'abcdef12-0000',
  createdAt: '2026-11-17T12:00:00.000Z',
  items: [{ coffeeId: 'latte', name: 'Latte', unitPriceInCents: 1290, quantity: 1, lineTotalInCents: 1290, image: '' }],
  address: { postalCode: '01001000', street: 'Rua', number: '1', neighborhood: 'B', city: 'C', state: 'SP' },
  paymentMethod: 'cash',
  subtotalInCents: 1290,
  deliveryFeeInCents: 500,
  totalInCents: 1790,
}

async function expectNoViolations(container: Element) {
  const violations = await runAxe(container)
  expect(violations, formatViolations(violations)).toEqual([])
}

describe('accessibility (axe-core)', () => {
  it('detects violations (sanity check of the helper)', async () => {
    const { container } = renderWithProviders(
      <div>
        <img src="/x.png" />
        <button type="button" />
      </div>,
    )
    const ids = (await runAxe(container)).map((v) => v.id)
    expect(ids).toEqual(expect.arrayContaining(['image-alt', 'button-name']))
  })

  it.each(['light', 'dark'] as const)('Home has no violations (%s)', async (theme) => {
    const { container } = renderWithProviders(<AppRoutes />, { route: '/', theme })
    await expectNoViolations(container)
  })

  it('Checkout with items has no violations', async () => {
    const { container } = renderWithProviders(<AppRoutes />, {
      route: '/checkout',
      cart: [{ coffeeId: 'latte', quantity: 2 }],
    })
    await expectNoViolations(container)
  })

  it('Checkout with validation errors has no violations', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(<AppRoutes />, {
      route: '/checkout',
      cart: [{ coffeeId: 'latte', quantity: 1 }],
    })
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))
    await waitFor(() => expect(screen.getByText('Selecione uma forma de pagamento')).toBeInTheDocument())
    await expectNoViolations(container)
  })

  it('empty Checkout has no violations', async () => {
    const { container } = renderWithProviders(<AppRoutes />, { route: '/checkout' })
    await expectNoViolations(container)
  })

  it('Success with and without order has no violations', async () => {
    const empty = renderWithProviders(<AppRoutes />, { route: '/success' })
    await expectNoViolations(empty.container)
    empty.unmount()

    saveLastOrder(order)
    const filled = renderWithProviders(<AppRoutes />, { route: '/success' })
    await expectNoViolations(filled.container)
  })

  it('exposes a skip link that moves focus to the main content', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AppRoutes />, { route: '/' })
    await user.tab()
    const skip = screen.getByRole('link', { name: 'Pular para o conteúdo' })
    expect(skip).toHaveFocus()
    expect(skip).toHaveAttribute('href', '#conteudo')
    expect(document.getElementById('conteudo')?.tagName).toBe('MAIN')
  })

  it('has exactly one h1 per page', () => {
    for (const route of ['/', '/checkout', '/success']) {
      const { unmount } = renderWithProviders(<AppRoutes />, { route })
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      unmount()
    }
  })
})

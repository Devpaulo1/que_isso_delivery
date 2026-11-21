import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppRoutes } from '@/routes/AppRoutes'
import { clearCepCache } from '@/services/cep/viaCep'
import { fillCheckoutForm, mockViaCepSuccess } from '@/tests/helpers/checkout'
import { renderWithProviders } from '@/tests/helpers/render'

const normalize = (text: string | null) => (text ?? '').split(String.fromCharCode(160)).join(' ')

beforeEach(() => clearCepCache())

describe('Checkout page', () => {
  it('shows the empty state with a link back home', () => {
    renderWithProviders(<AppRoutes />, { route: '/checkout' })
    expect(screen.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver cafés' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('button', { name: 'Confirmar pedido' })).not.toBeInTheDocument()
  })

  it('renders items, address, payment and summary together', () => {
    renderWithProviders(<AppRoutes />, {
      route: '/checkout',
      cart: [
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'expresso-tradicional', quantity: 1 },
      ],
    })

    const items = screen.getByRole('region', { name: 'Itens do pedido' })
    expect(within(items).getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('region', { name: 'Endereço de entrega' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /pagamento/i })).toBeInTheDocument()

    const summary = screen.getByRole('region', { name: 'Resumo de valores' })
    // 2 × 12,90 + 9,90 = 35,70; + 5,00 = 40,70
    expect(normalize(within(summary).getByText('Total', { selector: 'dt' }).nextElementSibling?.textContent ?? null)).toBe('R$ 40,70')
  })

  it('updates totals and badge when items change', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AppRoutes />, { route: '/checkout', cart: [{ coffeeId: 'latte', quantity: 1 }] })

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    expect(screen.getByRole('link', { name: 'Carrinho com 2 itens' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' }))
    expect(screen.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument()
  })

  it('submits a valid form and navigates to the success route', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    renderWithProviders(<AppRoutes />, { route: '/checkout', cart: [{ coffeeId: 'latte', quantity: 1 }] })

    await fillCheckoutForm(user)
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Finalizar pedido' })).not.toBeInTheDocument(),
    )
  })
})

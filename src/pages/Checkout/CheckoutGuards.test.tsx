import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppRoutes } from '@/routes/AppRoutes'
import { clearCepCache } from '@/services/cep/viaCep'
import { fillCheckoutForm, inputByLabel, mockViaCepSuccess } from '@/tests/helpers/checkout'
import { renderWithProviders } from '@/tests/helpers/render'

const stillOnCheckout = () =>
  expect(screen.getByRole('heading', { level: 1, name: 'Finalizar pedido' })).toBeInTheDocument()

beforeEach(() => clearCepCache())

describe('Checkout guards (RF-11, RN-10)', () => {
  it('does not submit with an empty cart, even if the form is submitted', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    renderWithProviders(<AppRoutes />, { route: '/checkout' })

    await fillCheckoutForm(user)
    expect(screen.queryByRole('button', { name: 'Confirmar pedido' })).not.toBeInTheDocument()
    fireEvent.submit(screen.getByRole('form', { name: 'Finalizar pedido' }))

    expect(await screen.findByText(/adicione pelo menos um café/i)).toBeInTheDocument()
    stillOnCheckout()
  })

  it('blocks products that no longer exist in the catalog', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AppRoutes />, {
      route: '/checkout',
      cart: [
        { coffeeId: 'latte', quantity: 1 },
        { coffeeId: 'cafe-descontinuado', quantity: 2 },
      ],
    })

    const items = screen.getByRole('region', { name: 'Itens do pedido' })
    expect(within(items).getByRole('alert')).toHaveTextContent(/não está mais disponível/)
    expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Remover itens indisponíveis' }))
    expect(within(items).queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeEnabled()
    expect(screen.getByRole('link', { name: 'Carrinho com 1 item' })).toBeInTheDocument()
  })

  it('does not submit with an invalid address or missing payment', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AppRoutes />, { route: '/checkout', cart: [{ coffeeId: 'latte', quantity: 1 }] })

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    await waitFor(() => expect(inputByLabel('CEP')).toHaveAttribute('aria-invalid', 'true'))
    expect(inputByLabel('Rua')).toHaveAccessibleDescription(/Informe a rua/)
    expect(screen.getByText('Selecione uma forma de pagamento')).toBeInTheDocument()
    // Foco vai para um campo inválido
    expect(document.activeElement).toHaveAttribute('aria-invalid', 'true')
    stillOnCheckout()
  })

  it('does not submit when only the payment method is missing', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    renderWithProviders(<AppRoutes />, { route: '/checkout', cart: [{ coffeeId: 'latte', quantity: 1 }] })

    await user.type(inputByLabel('CEP'), '01001000')
    await waitFor(() => expect(inputByLabel('Rua')).toHaveValue('Praça da Sé'))
    await user.type(inputByLabel('Número'), '1')
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('Selecione uma forma de pagamento')).toBeInTheDocument()
    stillOnCheckout()
  })
})

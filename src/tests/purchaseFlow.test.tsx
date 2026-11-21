import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { STORAGE_KEYS } from '@/config/constants'
import { AppRoutes } from '@/routes/AppRoutes'
import { clearCepCache } from '@/services/cep/viaCep'
import { fillCheckoutForm, mockViaCepSuccess } from '@/tests/helpers/checkout'
import { renderWithProviders } from '@/tests/helpers/render'

const normalize = (text: string | null) => (text ?? '').split(String.fromCharCode(160)).join(' ')

beforeEach(() => clearCepCache())

/**
 * Fluxo completo FL-01 → FL-04 com "refresh" simulado (desmontar e montar
 * novamente lendo apenas o localStorage).
 */
describe('purchase flow (Home → Checkout → Success)', () => {
  it('buys coffees end to end and keeps the order after a refresh', async () => {
    const user = userEvent.setup()
    const fetchSpy = mockViaCepSuccess()

    // FL-01: escolher cafés na Home
    const home = renderWithProviders(<AppRoutes />, { route: '/' })
    const latte = screen.getByRole('article', { name: 'Latte' })
    await user.click(within(latte).getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(within(latte).getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    const irish = screen.getByRole('article', { name: 'Irlandês' })
    await user.click(within(irish).getByRole('button', { name: 'Adicionar Irlandês ao carrinho' }))
    expect(screen.getByRole('link', { name: 'Carrinho com 3 itens' })).toBeInTheDocument()

    // RF-06: refresh preserva o carrinho
    home.unmount()
    renderWithProviders(<AppRoutes />, { route: '/' })
    expect(screen.getByRole('link', { name: 'Carrinho com 3 itens' })).toBeInTheDocument()

    // FL-02: revisar carrinho no checkout
    await user.click(screen.getByRole('link', { name: 'Carrinho com 3 itens' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Finalizar pedido' })).toBeInTheDocument()
    const total = () =>
      normalize(screen.getByText('Total', { selector: 'dt' }).nextElementSibling?.textContent ?? null)
    // 2 × 12,90 + 16,90 + 5,00 = 47,70
    expect(total()).toBe('R$ 47,70')

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Irlandês' }))
    expect(total()).toBe('R$ 64,60')
    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Irlandês' }))
    expect(total()).toBe('R$ 47,70')

    // FL-03: endereço com ViaCEP + pagamento
    await fillCheckoutForm(user, 'Cartão de crédito')
    expect(fetchSpy).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/', expect.anything())

    // FL-04: confirmar
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1, name: 'Uhu! Pedido confirmado' })).toBeInTheDocument(),
    )
    const delivery = screen.getByRole('list', { name: 'Detalhes da entrega' })
    expect(delivery).toHaveTextContent('Praça da Sé, 100 — Sala 2')
    expect(delivery).toHaveTextContent('Cartão de crédito')
    expect(total()).toBe('R$ 47,70')

    // RF-13: carrinho vazio, pedido preservado
    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEYS.cart) ?? '{}')).toEqual({ items: [] })
  })

  it('keeps the confirmation visible after refreshing /success', async () => {
    const user = userEvent.setup()
    mockViaCepSuccess()
    const first = renderWithProviders(<AppRoutes />, {
      route: '/checkout',
      cart: [{ coffeeId: 'expresso-tradicional', quantity: 1 }],
    })
    await fillCheckoutForm(user, 'Dinheiro')
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))
    await screen.findByRole('heading', { name: 'Uhu! Pedido confirmado' })
    first.unmount()

    renderWithProviders(<AppRoutes />, { route: '/success' })
    expect(screen.getByRole('heading', { name: 'Uhu! Pedido confirmado' })).toBeInTheDocument()
    expect(screen.getByText('Dinheiro')).toBeInTheDocument()
    expect(screen.getByText(/1 × Expresso Tradicional/)).toBeInTheDocument()
  })

  it('persists the theme across a refresh (RF-14)', async () => {
    const user = userEvent.setup()
    const first = renderWithProviders(<AppRoutes />, { route: '/' })
    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    first.unmount()

    renderWithProviders(<AppRoutes />, { route: '/checkout' })
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { coffees } from '@/data/coffees'
import { AppRoutes } from '@/routes/AppRoutes'
import { renderWithProviders } from '@/tests/helpers/render'

describe('Home page', () => {
  it.each(['light', 'dark'] as const)('renders hero, highlights and catalog in %s theme', (theme) => {
    renderWithProviders(<AppRoutes />, { route: '/', theme })

    expect(
      screen.getByRole('heading', { level: 1, name: /encontre o café perfeito/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Entrega rápida e rastreada')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Nossos cafés' })).toBeInTheDocument()
    expect(
      within(screen.getByRole('list', { name: 'Lista de cafés' })).getAllByRole('article'),
    ).toHaveLength(coffees.length)
  })

  it('adds coffees from the cards to the cart and updates the badge (card → cart)', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AppRoutes />, { route: '/' })

    const latte = screen.getByRole('article', { name: 'Latte' })
    await user.click(within(latte).getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(within(latte).getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    expect(screen.getByRole('link', { name: 'Carrinho com 2 itens' })).toBeInTheDocument()

    // Adicionar novamente acumula na mesma linha (RF-03)
    await user.click(within(latte).getByRole('button', { name: 'Adicionar Latte ao carrinho' }))
    const cubano = screen.getByRole('article', { name: 'Cubano' })
    await user.click(within(cubano).getByRole('button', { name: 'Adicionar Cubano ao carrinho' }))

    expect(screen.getByRole('link', { name: 'Carrinho com 4 itens' })).toBeInTheDocument()
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('4')
  })
})

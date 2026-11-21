import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppRoutes } from '@/routes/AppRoutes'
import { renderWithProviders } from '@/tests/helpers/render'

function renderAt(path: string) {
  return renderWithProviders(<AppRoutes />, { route: path })
}

describe('AppRoutes', () => {
  it.each([
    ['/', /encontre o café perfeito/i],
    ['/checkout', 'Finalizar pedido'],
    ['/success', 'Pedido confirmado'],
  ])('renders %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('navigates Home → Checkout → Home without reload', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('link', { name: /carrinho/i }))
    expect(screen.getByRole('heading', { level: 1, name: 'Finalizar pedido' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Ver cafés' }))
    expect(screen.getByRole('heading', { level: 1, name: /encontre o café perfeito/i })).toBeInTheDocument()
  })

  it('falls back to Home for unknown routes', () => {
    renderAt('/nao-existe')
    expect(screen.getByRole('heading', { level: 1, name: /encontre o café perfeito/i })).toBeInTheDocument()
  })
})

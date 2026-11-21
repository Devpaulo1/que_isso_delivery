import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppRoutes } from '@/routes/AppRoutes'
import { renderWithProviders } from '@/tests/helpers/render'

function renderAt(path: string) {
  return renderWithProviders(<AppRoutes />, { route: path })
}

describe('AppRoutes', () => {
  it.each([
    ['/', 'Home'],
    ['/checkout', 'Checkout'],
    ['/success', 'Pedido confirmado'],
  ])('renders %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('navigates Home → Checkout → Success without reload', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('link', { name: 'Carrinho' }))
    expect(screen.getByRole('heading', { name: 'Checkout' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /confirmar/i }))
    expect(screen.getByRole('heading', { name: 'Pedido confirmado' })).toBeInTheDocument()
  })
})

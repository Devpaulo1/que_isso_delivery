import { screen, within } from '@testing-library/react'
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
})

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoffeeCatalog } from '@/components/CoffeeCatalog'
import { coffees } from '@/data/coffees'
import { renderWithProviders } from '@/tests/helpers/render'
import { filterCoffeesByCategory, getAvailableCategories } from '@/utils/catalog'

const cards = () => within(screen.getByRole('list', { name: 'Lista de cafés' })).getAllByRole('article')

describe('CoffeeCatalog', () => {
  it('renders one card per coffee in the catalog', () => {
    renderWithProviders(<CoffeeCatalog />)
    expect(cards()).toHaveLength(coffees.length)
  })

  it('filters by category and clears the filter on second click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CoffeeCatalog />)
    const withMilk = screen.getByRole('button', { name: 'Com leite' })

    await user.click(withMilk)
    expect(withMilk).toHaveAttribute('aria-pressed', 'true')
    expect(cards()).toHaveLength(coffees.filter((c) => c.category === 'with-milk').length)

    await user.click(withMilk)
    expect(cards()).toHaveLength(coffees.length)
  })
})

describe('catalog utils', () => {
  it('returns the full list without category', () => {
    expect(filterCoffeesByCategory(coffees, null)).toBe(coffees)
  })

  it('lists unique categories', () => {
    const categories = getAvailableCategories(coffees)
    expect(new Set(categories).size).toBe(categories.length)
  })
})

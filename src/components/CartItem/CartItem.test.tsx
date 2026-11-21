import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartItem } from '@/components/CartItem'
import { EmptyCart } from '@/components/EmptyCart'
import { findCoffeeById } from '@/data/coffees'
import { renderWithProviders } from '@/tests/helpers/render'
import type { ResolvedCartItem } from '@/types/cart'

const latte = findCoffeeById('latte')!
const item: ResolvedCartItem = { coffee: latte, quantity: 2, lineTotalInCents: latte.priceInCents * 2 }

function renderItem(overrides: Partial<ResolvedCartItem> = {}) {
  const handlers = { onIncrement: vi.fn(), onDecrement: vi.fn(), onRemove: vi.fn() }
  renderWithProviders(
    <ul>
      <CartItem item={{ ...item, ...overrides }} {...handlers} />
    </ul>,
  )
  return handlers
}

describe('CartItem', () => {
  it('shows name, quantity and line total', () => {
    renderItem()
    expect(screen.getByRole('heading', { name: 'Latte' })).toBeInTheDocument()
    expect(screen.getByLabelText('Quantidade de Latte', { selector: 'input' })).toHaveValue('2')
    expect(screen.getByText(/25,80/)).toBeInTheDocument()
  })

  it('increments, decrements and removes', async () => {
    const user = userEvent.setup()
    const handlers = renderItem()
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Remover Latte do carrinho' }))
    expect(handlers.onIncrement).toHaveBeenCalledWith('latte')
    expect(handlers.onDecrement).toHaveBeenCalledWith('latte')
    expect(handlers.onRemove).toHaveBeenCalledWith('latte')
  })

  it('keeps decrement enabled at quantity 1 so it can remove the item (RN-01)', () => {
    renderItem({ quantity: 1, lineTotalInCents: latte.priceInCents })
    expect(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' })).toBeEnabled()
  })
})

describe('EmptyCart', () => {
  it('explains the empty state and links back home', () => {
    renderWithProviders(<EmptyCart />)
    expect(screen.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver cafés' })).toHaveAttribute('href', '/')
  })
})

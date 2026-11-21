import { act, screen } from '@testing-library/react'
import { CartBadge } from '@/components/CartBadge'
import { Header } from '@/components/Header'
import { useCart } from '@/hooks/useCart'
import { renderWithProviders } from '@/tests/helpers/render'
import type { CartContextValue } from '@/contexts/CartContext'

describe('CartBadge', () => {
  it('renders nothing for an empty cart', () => {
    renderWithProviders(<CartBadge count={0} />)
    expect(screen.queryByTestId('cart-badge')).not.toBeInTheDocument()
  })

  it('caps the visual count at 99+', () => {
    renderWithProviders(<CartBadge count={150} />)
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('99+')
  })

  it('shows the sum of quantities in the header after each action (RF-04)', () => {
    let cart: CartContextValue | undefined
    function Spy() {
      cart = useCart()
      return null
    }
    renderWithProviders(
      <>
        <Header />
        <Spy />
      </>,
    )

    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()

    act(() => cart?.addItem('latte', 2))
    act(() => cart?.addItem('cubano', 3))
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('5')
    expect(screen.getByRole('link', { name: 'Carrinho com 5 itens' })).toBeInTheDocument()

    act(() => cart?.decrementItem('cubano'))
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('4')

    act(() => cart?.removeItem('latte'))
    expect(screen.getByRole('link', { name: 'Carrinho com 2 itens' })).toBeInTheDocument()
  })
})

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoffeeCard } from '@/components/CoffeeCard'
import { renderWithProviders } from '@/tests/helpers/render'
import type { Coffee } from '@/types/coffee'

const coffee: Coffee = {
  id: 'latte',
  name: 'Latte',
  description: 'Café com o dobro de leite',
  priceInCents: 1290,
  image: '/latte.svg',
  tags: ['Tradicional', 'Com leite'],
  category: 'with-milk',
}

describe('CoffeeCard', () => {
  it('shows image, name, description, price and tags', () => {
    renderWithProviders(<CoffeeCard coffee={coffee} />)
    const card = screen.getByRole('article', { name: 'Latte' })
    expect(within(card).getByRole('img', { name: 'Xícara de Latte' })).toHaveAttribute('src', '/latte.svg')
    expect(within(card).getByRole('heading', { name: 'Latte' })).toBeInTheDocument()
    expect(within(card).getByText('Café com o dobro de leite')).toBeInTheDocument()
    expect(within(card).getByText('12,90')).toBeInTheDocument()
    const tags = within(within(card).getByRole('list', { name: 'Categorias' })).getAllByRole('listitem')
    expect(tags.map((tag) => tag.textContent)).toEqual(['Tradicional', 'Com leite'])
  })

  it('adds the selected quantity and resets to 1', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    renderWithProviders(<CoffeeCard coffee={coffee} onAddToCart={onAddToCart} />)

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Adicionar Latte ao carrinho' }))

    expect(onAddToCart).toHaveBeenCalledWith('latte', 3)
    expect(screen.getByLabelText('Quantidade de Latte', { selector: 'input' })).toHaveValue('1')
    expect(screen.getByRole('status')).toHaveTextContent('3 × Latte adicionado ao carrinho')
  })
})

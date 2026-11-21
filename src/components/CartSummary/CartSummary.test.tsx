import { screen, within } from '@testing-library/react'
import { CartSummary } from '@/components/CartSummary'
import { renderWithProviders } from '@/tests/helpers/render'

const valueOf = (term: string) => {
  const dt = screen.getByText(term, { selector: 'dt' })
  return (dt.nextElementSibling?.textContent ?? '').split(String.fromCharCode(160)).join(' ')
}

describe('CartSummary', () => {
  it('renders subtotal, delivery fee and total in BRL', () => {
    renderWithProviders(
      <CartSummary subtotalInCents={5550} deliveryFeeInCents={500} totalInCents={6050} />,
    )
    expect(valueOf('Total de itens')).toBe('R$ 55,50')
    expect(valueOf('Entrega')).toBe('R$ 5,00')
    expect(valueOf('Total')).toBe('R$ 60,50')
  })

  it('renders the action slot', () => {
    renderWithProviders(
      <CartSummary subtotalInCents={0} deliveryFeeInCents={0} totalInCents={0}>
        <button type="button">Confirmar pedido</button>
      </CartSummary>,
    )
    const summary = screen.getByRole('region', { name: 'Resumo de valores' })
    expect(within(summary).getByRole('button', { name: 'Confirmar pedido' })).toBeInTheDocument()
  })
})

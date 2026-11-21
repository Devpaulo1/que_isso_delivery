import { screen } from '@testing-library/react'
import { DeliveryLocationBadge } from '@/components/DeliveryLocationBadge'
import { renderWithProviders } from '@/tests/helpers/render'

describe('DeliveryLocationBadge', () => {
  it('exibe o selo com o pin e o texto São Paulo, SP', () => {
    renderWithProviders(<DeliveryLocationBadge />)

    const badge = screen.getByRole('img', { name: 'Entrega em São Paulo, SP' })
    expect(badge).toHaveAttribute('width', '143')
    expect(badge).toHaveAttribute('height', '38')
    expect(badge).toHaveTextContent('São Paulo, SP')
  })
})

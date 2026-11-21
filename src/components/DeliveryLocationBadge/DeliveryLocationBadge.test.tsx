import { screen } from '@testing-library/react'
import { DeliveryLocationBadge } from '@/components/DeliveryLocationBadge'
import { renderWithProviders } from '@/tests/helpers/render'

describe('DeliveryLocationBadge', () => {
  it('exibe cidade e UF consultados no CEP', () => {
    renderWithProviders(<DeliveryLocationBadge />, {
      location: { city: 'Salvador', state: 'BA' },
    })

    const badge = screen.getByRole('img', { name: 'Entrega em Salvador, BA' })
    expect(badge).toHaveAttribute('width', '143')
    expect(badge).toHaveAttribute('height', '38')
    expect(badge).toHaveTextContent('Salvador, BA')
  })

  it('também funciona para São Paulo/SP', () => {
    renderWithProviders(<DeliveryLocationBadge />, {
      location: { city: 'São Paulo', state: 'SP' },
    })
    expect(screen.getByRole('img', { name: 'Entrega em São Paulo, SP' })).toBeInTheDocument()
  })

  it('não renderiza nada sem localização', () => {
    const { container } = renderWithProviders(<DeliveryLocationBadge />)
    expect(container).toBeEmptyDOMElement()
  })
})

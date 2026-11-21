import { fireEvent, screen } from '@testing-library/react'
import { ProductImage } from '@/components/ProductImage'
import { renderWithProviders } from '@/tests/helpers/render'

describe('ProductImage', () => {
  it('renders the image', () => {
    renderWithProviders(<ProductImage src="/latte.svg" size={64} alt="Latte" />)
    expect(screen.getByRole('img', { name: 'Latte' })).toHaveAttribute('src', '/latte.svg')
  })

  it('falls back to an icon when the image fails to load', () => {
    renderWithProviders(<ProductImage src="/missing.svg" size={64} alt="Latte" />)
    fireEvent.error(screen.getByRole('img', { name: 'Latte' }))
    const fallback = screen.getByRole('img', { name: 'Latte' })
    expect(fallback.tagName).toBe('SPAN')
  })

  it('falls back when the src is empty', () => {
    const { container } = renderWithProviders(<ProductImage src="" size={40} />)
    expect(container.querySelector('img')).toBeNull()
  })
})

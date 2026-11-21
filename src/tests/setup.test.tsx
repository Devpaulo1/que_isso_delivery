import { render, screen } from '@testing-library/react'
import { App } from '@/App'
import { DELIVERY_FEE_IN_CENTS, STORAGE_KEYS } from '@/config/constants'

describe('test setup', () => {
  it('resolves the @ alias and renders the app', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('exposes centralized constants', () => {
    expect(DELIVERY_FEE_IN_CENTS).toBe(500)
    expect(STORAGE_KEYS.cart).toBe('que-isso:cart:v1')
  })
})

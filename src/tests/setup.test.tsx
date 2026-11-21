import { render, screen } from '@testing-library/react'

describe('test setup', () => {
  it('renders with jsdom and jest-dom matchers', () => {
    render(<p>QuE IssO</p>)
    expect(screen.getByText('QuE IssO')).toBeInTheDocument()
  })
})

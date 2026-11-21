import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '@/components/ThemeToggle'
import { STORAGE_KEYS } from '@/config/constants'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import { useTheme } from '@/hooks/useTheme'

function CurrentTheme() {
  const { themeName } = useTheme()
  return <output>{themeName}</output>
}

function renderToggle() {
  return render(
    <AppThemeProvider>
      <ThemeToggle />
      <CurrentTheme />
    </AppThemeProvider>,
  )
}

describe('ThemeToggle', () => {
  it('starts in light mode when there is no saved preference', () => {
    renderToggle()
    expect(screen.getByRole('status')).toHaveTextContent('light')
    expect(screen.getByRole('button', { name: 'Ativar tema escuro' })).toBeInTheDocument()
  })

  it('toggles the theme and persists the preference', async () => {
    const user = userEvent.setup()
    renderToggle()
    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(screen.getByRole('status')).toHaveTextContent('dark')
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
    expect(window.localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('restores the saved preference after a refresh', () => {
    window.localStorage.setItem(STORAGE_KEYS.theme, '"dark"')
    renderToggle()
    expect(screen.getByRole('status')).toHaveTextContent('dark')
  })

  it.each(['{not json', '"purple"', '42'])('ignores invalid stored value %s', (stored) => {
    window.localStorage.setItem(STORAGE_KEYS.theme, stored)
    renderToggle()
    expect(screen.getByRole('status')).toHaveTextContent('light')
  })

  it('requires the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeToggle />)).toThrow(/AppThemeProvider/)
  })
})

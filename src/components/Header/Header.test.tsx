import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/components/Header'
import { STORAGE_KEYS } from '@/config/constants'
import { renderWithProviders } from '@/tests/helpers/render'

describe('Header', () => {
  it('shows brand, theme toggle and cart link', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('link', { name: /que isso/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('button', { name: /ativar tema/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /carrinho/i })).toHaveAttribute('href', '/checkout')
  })

  it('is navigable by keyboard in a logical order', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    await user.tab()
    expect(screen.getByRole('link', { name: /que isso/i })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('combobox', { name: 'Idioma' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: /ativar tema/i })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('link', { name: /carrinho/i })).toHaveFocus()
  })

  it('switches the logo with the theme', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(<Header />, { theme: 'light' })
    const logo = () => container.querySelector('img')?.getAttribute('src') ?? ''
    const lightSrc = logo()
    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(logo()).not.toBe(lightSrc)
  })

  it('switches the language and remembers the choice', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    await user.selectOptions(screen.getByRole('combobox', { name: 'Idioma' }), 'en')
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Empty cart' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem(STORAGE_KEYS.language)).toBe('"en"')

    await user.selectOptions(screen.getByRole('combobox', { name: 'Language' }), 'es')
    expect(screen.getByRole('button', { name: 'Activar tema oscuro' })).toBeInTheDocument()
  })
})

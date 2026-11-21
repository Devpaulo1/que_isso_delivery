import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import type { ThemeName } from '@/styles/themes'
import type { CartItem } from '@/types/cart'

interface ProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  theme?: ThemeName
  cart?: CartItem[]
}

/** Renderiza com os mesmos providers da aplicação, usando MemoryRouter. */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', theme, cart, ...options }: ProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AppThemeProvider initialTheme={theme}>
        <CartProvider initialItems={cart}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </CartProvider>
      </AppThemeProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

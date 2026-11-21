import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { DeliveryLocationProvider } from '@/contexts/DeliveryLocationContext'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import type { ThemeName } from '@/styles/themes'
import type { CartItem } from '@/types/cart'
import type { DeliveryLocation } from '@/types/deliveryLocation'

interface ProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  theme?: ThemeName
  cart?: CartItem[]
  location?: DeliveryLocation | null
}

/** Renderiza com os mesmos providers da aplicação, usando MemoryRouter. */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', theme, cart, location = null, ...options }: ProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AppThemeProvider initialTheme={theme}>
        <DeliveryLocationProvider initialLocation={location}>
          <CartProvider initialItems={cart}>
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
          </CartProvider>
        </DeliveryLocationProvider>
      </AppThemeProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AppThemeProvider } from '@/contexts/ThemeContext'
import type { ThemeName } from '@/styles/themes'

interface ProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  theme?: ThemeName
}

/** Renderiza com os mesmos providers da aplicação, usando MemoryRouter. */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', theme, ...options }: ProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AppThemeProvider initialTheme={theme}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </AppThemeProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

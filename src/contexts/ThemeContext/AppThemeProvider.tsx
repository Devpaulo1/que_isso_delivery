import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { STORAGE_KEYS } from '@/config/constants'
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext/ThemeContext'
import { getSystemThemeName, parseThemeName } from '@/contexts/ThemeContext/themeStorage'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { themes, type ThemeName } from '@/styles/themes'

interface AppThemeProviderProps {
  children: ReactNode
  /** Usado somente quando não há preferência salva. */
  initialTheme?: ThemeName
}

export function AppThemeProvider({ children, initialTheme }: AppThemeProviderProps) {
  // Preferência salva > initialTheme > preferência do sistema.
  const [themeName, setThemeName] = useLocalStorage<ThemeName>(
    STORAGE_KEYS.theme,
    parseThemeName,
    () => initialTheme ?? getSystemThemeName(),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = themeName
  }, [themeName])

  const toggleTheme = useCallback(() => {
    setThemeName((current) => (current === 'light' ? 'dark' : 'light'))
  }, [setThemeName])

  const value = useMemo<ThemeContextValue>(
    () => ({ themeName, toggleTheme, setThemeName }),
    [themeName, toggleTheme, setThemeName],
  )

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[themeName]}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext/ThemeContext'
import { getInitialThemeName, saveThemeName } from '@/contexts/ThemeContext/themeStorage'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { themes, type ThemeName } from '@/styles/themes'

interface AppThemeProviderProps {
  children: ReactNode
  initialTheme?: ThemeName
}

export function AppThemeProvider({ children, initialTheme }: AppThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(
    () => initialTheme ?? getInitialThemeName(),
  )

  useEffect(() => {
    saveThemeName(themeName)
    document.documentElement.dataset.theme = themeName
  }, [themeName])

  const toggleTheme = useCallback(() => {
    setThemeName((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ themeName, toggleTheme, setThemeName }),
    [themeName, toggleTheme],
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

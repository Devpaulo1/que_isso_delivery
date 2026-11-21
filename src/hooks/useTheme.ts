import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '@/contexts/ThemeContext/ThemeContext'

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de <AppThemeProvider>')
  }
  return context
}

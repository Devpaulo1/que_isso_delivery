import { createContext } from 'react'
import type { ThemeName } from '@/styles/themes'

export interface ThemeContextValue {
  themeName: ThemeName
  toggleTheme: () => void
  setThemeName: (name: ThemeName) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

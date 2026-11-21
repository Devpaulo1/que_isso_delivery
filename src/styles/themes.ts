import { tokens, type Tokens } from '@/styles/tokens'

export type ThemeName = 'light' | 'dark'

/** Cores semânticas: os dois temas expõem exatamente as mesmas chaves. */
export interface ThemeColors {
  background: string
  surface: string
  surfaceAlt: string
  button: string
  buttonHover: string
  border: string
  title: string
  subtitle: string
  text: string
  label: string
  brandYellow: string
  brandYellowDark: string
  brandYellowLight: string
  brandPurple: string
  brandPurpleDark: string
  brandPurpleLight: string
  onBrand: string
  onYellow: string
  tagText: string
  success: string
  error: string
  errorSurface: string
  warning: string
  focus: string
  overlay: string
}

export interface AppTheme extends Tokens {
  name: ThemeName
  colors: ThemeColors
  shadows: { card: string; focus: string }
}

const lightColors: ThemeColors = {
  background: '#FAFAFA',
  surface: '#F3F2F2',
  surfaceAlt: '#EDEDED',
  button: '#E6E5E5',
  buttonHover: '#D7D5D5',
  border: '#D7D5D5',
  title: '#272221',
  subtitle: '#403937',
  text: '#574F4D',
  label: '#6E6765',
  brandYellow: '#DBAC2C',
  brandYellowDark: '#C47F17',
  brandYellowLight: '#F1E9C9',
  brandPurple: '#8047F8',
  brandPurpleDark: '#4B2995',
  brandPurpleLight: '#EBE5F9',
  onBrand: '#FFFFFF',
  onYellow: '#272221',
  tagText: '#7A4E0B',
  success: '#1E7A46',
  error: '#B3261E',
  errorSurface: '#FCE8E6',
  warning: '#8A5A00',
  focus: '#8047F8',
  overlay: 'rgba(0, 0, 0, 0.04)',
}

const darkColors: ThemeColors = {
  background: '#15121B',
  surface: '#211D29',
  surfaceAlt: '#2B2634',
  button: '#332D3E',
  buttonHover: '#40394E',
  border: '#40394E',
  title: '#F5F2FA',
  subtitle: '#E4DFEC',
  text: '#CEC7D9',
  label: '#ADA5B9',
  brandYellow: '#E5B94A',
  brandYellowDark: '#F0C65A',
  brandYellowLight: '#3A301C',
  brandPurple: '#A98BFA',
  brandPurpleDark: '#C9B8FD',
  brandPurpleLight: '#2F2648',
  onBrand: '#15121B',
  onYellow: '#15121B',
  tagText: '#F3D88F',
  success: '#6FD39A',
  error: '#FF8A80',
  errorSurface: '#3B1F22',
  warning: '#F0C65A',
  focus: '#C9B8FD',
  overlay: 'rgba(255, 255, 255, 0.04)',
}

export const lightTheme: AppTheme = {
  ...tokens,
  name: 'light',
  colors: lightColors,
  shadows: {
    card: '0 2px 12px rgba(39, 34, 33, 0.08)',
    focus: `0 0 0 3px ${lightColors.focus}`,
  },
}

export const darkTheme: AppTheme = {
  ...tokens,
  name: 'dark',
  colors: darkColors,
  shadows: {
    card: '0 2px 16px rgba(0, 0, 0, 0.45)',
    focus: `0 0 0 3px ${darkColors.focus}`,
  },
}

export const themes: Record<ThemeName, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
}

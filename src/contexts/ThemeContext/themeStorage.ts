import type { ThemeName } from '@/styles/themes'

export function parseThemeName(value: unknown): ThemeName | null {
  return value === 'light' || value === 'dark' ? value : null
}

/** Preferência do sistema operacional; `light` quando indisponível. */
export function getSystemThemeName(): ThemeName {
  try {
    return typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

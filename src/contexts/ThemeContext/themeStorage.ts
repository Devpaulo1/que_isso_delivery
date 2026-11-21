import { STORAGE_KEYS } from '@/config/constants'
import type { ThemeName } from '@/styles/themes'
import { readStorage, writeStorage } from '@/utils/storage'

export function parseThemeName(value: unknown): ThemeName | null {
  return value === 'light' || value === 'dark' ? value : null
}

function prefersDark(): boolean {
  try {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  } catch {
    return false
  }
}

/** Preferência salva > preferência do sistema > light. */
export function getInitialThemeName(): ThemeName {
  return readStorage(STORAGE_KEYS.theme, parseThemeName) ?? (prefersDark() ? 'dark' : 'light')
}

export function saveThemeName(name: ThemeName): void {
  writeStorage(STORAGE_KEYS.theme, name)
}

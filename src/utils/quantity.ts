import { MAX_QUANTITY, MIN_QUANTITY } from '@/config/constants'

/** Verdadeiro somente para inteiros positivos dentro dos limites (RN-01). */
export function isValidQuantity(
  value: unknown,
  min: number = MIN_QUANTITY,
  max: number = MAX_QUANTITY,
): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max
}

/**
 * Converte o texto digitado em quantidade válida.
 * Aceita apenas dígitos; zero, negativos, decimais e texto retornam `null`.
 */
export function parseQuantityInput(
  text: string,
  min: number = MIN_QUANTITY,
  max: number = MAX_QUANTITY,
): number | null {
  if (!/^\d+$/.test(text.trim())) return null
  const parsed = Number(text.trim())
  return isValidQuantity(parsed, min, max) ? parsed : null
}


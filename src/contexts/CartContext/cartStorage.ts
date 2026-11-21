import { MAX_QUANTITY, STORAGE_KEYS } from '@/config/constants'
import type { CartItem } from '@/types/cart'
import { isValidQuantity } from '@/utils/quantity'
import { readStorage, writeStorage } from '@/utils/storage'

/** Formato persistido (chave versionada `que-isso:cart:v1`). */
interface PersistedCart {
  items: CartItem[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Valida e normaliza o carrinho lido do storage.
 * - Estrutura diferente de `{ items: [...] }` → `null` (dado incompatível).
 * - Itens malformados são descartados.
 * - IDs repetidos são acumulados em uma única linha (RN-02).
 * IDs que não existem no catálogo são mantidos para que o checkout os
 * sinalize e bloqueie a finalização (RN-10).
 */
export function parseCartItems(value: unknown): CartItem[] | null {
  if (!isRecord(value) || !Array.isArray(value.items)) return null

  return value.items.reduce<CartItem[]>((acc, raw) => {
    if (!isRecord(raw)) return acc
    const { coffeeId, quantity } = raw
    if (typeof coffeeId !== 'string' || coffeeId.trim() === '' || !isValidQuantity(quantity)) {
      return acc
    }
    const existing = acc.find((item) => item.coffeeId === coffeeId)
    if (existing) {
      return acc.map((item) =>
        item.coffeeId === coffeeId
          ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + quantity) }
          : item,
      )
    }
    return [...acc, { coffeeId, quantity }]
  }, [])
}

export function loadCartItems(): CartItem[] {
  return readStorage(STORAGE_KEYS.cart, parseCartItems) ?? []
}

export function saveCartItems(items: CartItem[]): boolean {
  const payload: PersistedCart = { items }
  return writeStorage(STORAGE_KEYS.cart, payload)
}

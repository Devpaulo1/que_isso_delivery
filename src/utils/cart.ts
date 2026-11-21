import { DELIVERY_FEE_IN_CENTS } from '@/config/constants'
import { findCoffeeById } from '@/data/coffees'
import type { CartItem, ResolvedCartItem } from '@/types/cart'
import type { Coffee } from '@/types/coffee'

export type CoffeeLookup = (id: string) => Coffee | undefined

export interface ResolvedCart {
  items: ResolvedCartItem[]
  /** IDs presentes no carrinho que não existem no catálogo (RN-10). */
  missingCoffeeIds: string[]
}

export interface CartTotals {
  totalUnits: number
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}

/** Soma das quantidades, não a quantidade de tipos (RF-04). */
export function getTotalUnits(items: readonly CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

/** Resolve os itens contra o catálogo, separando referências inexistentes. */
export function resolveCartItems(
  items: readonly CartItem[],
  lookup: CoffeeLookup = findCoffeeById,
): ResolvedCart {
  return items.reduce<ResolvedCart>(
    (acc, item) => {
      const coffee = lookup(item.coffeeId)
      if (!coffee) {
        return { ...acc, missingCoffeeIds: [...acc.missingCoffeeIds, item.coffeeId] }
      }
      const resolved: ResolvedCartItem = {
        coffee,
        quantity: item.quantity,
        lineTotalInCents: coffee.priceInCents * item.quantity,
      }
      return { ...acc, items: [...acc.items, resolved] }
    },
    { items: [], missingCoffeeIds: [] },
  )
}

/** subtotal = Σ(preçoUnitárioEmCentavos × quantidade) (RN-03). */
export function getSubtotalInCents(items: readonly ResolvedCartItem[]): number {
  return items.reduce((sum, item) => sum + item.lineTotalInCents, 0)
}

/**
 * Taxa de entrega aplicada somente quando há itens:
 * carrinho vazio não gera cobrança fictícia.
 */
export function getDeliveryFeeInCents(
  subtotalInCents: number,
  feeInCents: number = DELIVERY_FEE_IN_CENTS,
): number {
  return subtotalInCents > 0 ? feeInCents : 0
}

export function getCartTotals(
  items: readonly CartItem[],
  lookup: CoffeeLookup = findCoffeeById,
  feeInCents: number = DELIVERY_FEE_IN_CENTS,
): CartTotals & ResolvedCart {
  const resolved = resolveCartItems(items, lookup)
  const subtotalInCents = getSubtotalInCents(resolved.items)
  const deliveryFeeInCents = getDeliveryFeeInCents(subtotalInCents, feeInCents)
  return {
    ...resolved,
    totalUnits: getTotalUnits(items),
    subtotalInCents,
    deliveryFeeInCents,
    totalInCents: subtotalInCents + deliveryFeeInCents,
  }
}

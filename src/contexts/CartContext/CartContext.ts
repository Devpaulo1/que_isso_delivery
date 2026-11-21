import { createContext } from 'react'
import type { CartItem, ResolvedCartItem } from '@/types/cart'
import type { Coffee } from '@/types/coffee'

export interface CartContextValue {
  items: CartItem[]
  /** Itens resolvidos contra o catálogo, prontos para exibição. */
  resolvedItems: ResolvedCartItem[]
  /** IDs no carrinho que não existem no catálogo. */
  missingCoffeeIds: string[]
  totalUnits: number
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  addItem: (coffeeId: Coffee['id'], quantity: number) => void
  incrementItem: (coffeeId: Coffee['id']) => void
  decrementItem: (coffeeId: Coffee['id']) => void
  removeItem: (coffeeId: Coffee['id']) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

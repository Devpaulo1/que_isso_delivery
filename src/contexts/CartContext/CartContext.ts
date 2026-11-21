import { createContext } from 'react'
import type { CartItem } from '@/types/cart'
import type { Coffee } from '@/types/coffee'

export interface CartContextValue {
  items: CartItem[]
  addItem: (coffeeId: Coffee['id'], quantity: number) => void
  incrementItem: (coffeeId: Coffee['id']) => void
  decrementItem: (coffeeId: Coffee['id']) => void
  removeItem: (coffeeId: Coffee['id']) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

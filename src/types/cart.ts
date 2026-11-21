import type { Coffee } from '@/types/coffee'

export interface CartItem {
  coffeeId: Coffee['id']
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE_CART'; payload: CartItem[] }

/** Item do carrinho já resolvido contra o catálogo, pronto para exibição. */
export interface ResolvedCartItem {
  coffee: Coffee
  quantity: number
  lineTotalInCents: number
}

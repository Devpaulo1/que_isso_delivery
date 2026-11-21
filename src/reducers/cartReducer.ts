import { MAX_QUANTITY } from '@/config/constants'
import type { CartAction, CartState } from '@/types/cart'
import { isValidQuantity } from '@/utils/quantity'

export const initialCartState: CartState = { items: [] }

/**
 * Reducer puro do carrinho: recebe o estado anterior e devolve um NOVO estado.
 * Nunca muta arrays/objetos existentes, não acessa storage nem gera IDs.
 * Ações inválidas devolvem o próprio estado (sem re-render desnecessário).
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffeeId, quantity } = action.payload
      if (!isValidQuantity(quantity)) return state

      const existing = state.items.find((item) => item.coffeeId === coffeeId)
      if (!existing) {
        return { items: [...state.items, { coffeeId, quantity }] }
      }
      return {
        items: state.items.map((item) =>
          item.coffeeId === coffeeId
            ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + quantity) }
            : item,
        ),
      }
    }

    case 'INCREMENT_ITEM': {
      const { coffeeId } = action.payload
      const existing = state.items.find((item) => item.coffeeId === coffeeId)
      if (!existing || existing.quantity >= MAX_QUANTITY) return state
      return {
        items: state.items.map((item) =>
          item.coffeeId === coffeeId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      }
    }

    case 'DECREMENT_ITEM': {
      const { coffeeId } = action.payload
      const existing = state.items.find((item) => item.coffeeId === coffeeId)
      if (!existing) return state
      // RN-01: decrementar de 1 remove o item.
      if (existing.quantity <= 1) {
        return { items: state.items.filter((item) => item.coffeeId !== coffeeId) }
      }
      return {
        items: state.items.map((item) =>
          item.coffeeId === coffeeId ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      }
    }

    case 'REMOVE_ITEM': {
      const { coffeeId } = action.payload
      if (!state.items.some((item) => item.coffeeId === coffeeId)) return state
      return { items: state.items.filter((item) => item.coffeeId !== coffeeId) }
    }

    case 'CLEAR_CART':
      return state.items.length === 0 ? state : { items: [] }

    case 'HYDRATE_CART':
      // O payload já chega normalizado/validado pela camada de persistência.
      return { items: action.payload.map((item) => ({ ...item })) }

    default:
      return state
  }
}

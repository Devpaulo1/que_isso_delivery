import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { STORAGE_KEYS } from '@/config/constants'
import { CartContext, type CartContextValue } from '@/contexts/CartContext/CartContext'
import { loadCartItems, parseCartItems, saveCartItems } from '@/contexts/CartContext/cartStorage'
import { cartReducer } from '@/reducers/cartReducer'
import type { CartItem, CartState } from '@/types/cart'
import { getCartTotals } from '@/utils/cart'

interface CartProviderProps {
  children: ReactNode
  /** Quando informado (ex.: testes), substitui o carrinho salvo. */
  initialItems?: CartItem[]
}

function initCart(initialItems: CartItem[] | undefined): CartState {
  return { items: initialItems ?? loadCartItems() }
}

export function CartProvider({ children, initialItems }: CartProviderProps) {
  // Inicialização preguiçosa: lê e valida o storage uma única vez.
  const [state, dispatch] = useReducer(cartReducer, initialItems, initCart)

  // Persistência: efeito colateral fora do reducer (reducer permanece puro).
  useEffect(() => {
    saveCartItems(state.items)
  }, [state.items])

  // Sincroniza alterações feitas em outra aba via HYDRATE_CART.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEYS.cart) return
      let parsed: CartItem[] | null = null
      try {
        parsed = event.newValue ? parseCartItems(JSON.parse(event.newValue) as unknown) : []
      } catch {
        parsed = null
      }
      if (parsed) dispatch({ type: 'HYDRATE_CART', payload: parsed })
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const addItem = useCallback((coffeeId: string, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { coffeeId, quantity } })
  }, [])
  const incrementItem = useCallback((coffeeId: string) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: { coffeeId } })
  }, [])
  const decrementItem = useCallback((coffeeId: string) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: { coffeeId } })
  }, [])
  const removeItem = useCallback((coffeeId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { coffeeId } })
  }, [])
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  // Valores derivados: calculados a partir do estado, nunca armazenados.
  const totals = useMemo(() => getCartTotals(state.items), [state.items])

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      resolvedItems: totals.items,
      missingCoffeeIds: totals.missingCoffeeIds,
      totalUnits: totals.totalUnits,
      subtotalInCents: totals.subtotalInCents,
      deliveryFeeInCents: totals.deliveryFeeInCents,
      totalInCents: totals.totalInCents,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    }),
    [state.items, totals, addItem, incrementItem, decrementItem, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

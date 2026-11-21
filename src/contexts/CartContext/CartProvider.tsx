import { useCallback, useMemo, useReducer, type ReactNode } from 'react'
import { CartContext, type CartContextValue } from '@/contexts/CartContext/CartContext'
import { cartReducer } from '@/reducers/cartReducer'
import type { CartItem } from '@/types/cart'

interface CartProviderProps {
  children: ReactNode
  initialItems?: CartItem[]
}

export function CartProvider({ children, initialItems = [] }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { items: initialItems })

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

  const value = useMemo<CartContextValue>(
    () => ({ items: state.items, addItem, incrementItem, decrementItem, removeItem, clearCart }),
    [state.items, addItem, incrementItem, decrementItem, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

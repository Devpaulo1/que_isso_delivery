import { useContext } from 'react'
import { CartContext, type CartContextValue } from '@/contexts/CartContext/CartContext'

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de <CartProvider>')
  }
  return context
}

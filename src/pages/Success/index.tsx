import { useState } from 'react'
import { OrderSuccess } from '@/components/OrderSuccess'
import { loadLastOrder } from '@/utils/orderStorage'

export function Success() {
  // Lido uma única vez: o snapshot é a única fonte de dados desta tela.
  const [order] = useState(loadLastOrder)

  if (!order) {
    return <h1>Pedido confirmado</h1>
  }

  return <OrderSuccess order={order} />
}

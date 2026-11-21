import { useState } from 'react'
import { EmptyCart } from '@/components/EmptyCart'
import { OrderSuccess } from '@/components/OrderSuccess'
import { loadLastOrder } from '@/utils/orderStorage'

export function Success() {
  // Lido uma única vez: o snapshot é a única fonte de dados desta tela.
  const [order] = useState(loadLastOrder)

  // RN-09/RN-10: sem snapshot válido, não inventamos um pedido.
  if (!order) {
    return (
      <EmptyCart
        headingLevel="h1"
        title="Nenhum pedido confirmado"
        description="Não encontramos um pedido concluído neste navegador. Escolha seus cafés e finalize um pedido para ver a confirmação."
        actionLabel="Voltar para a Home"
      />
    )
  }

  return <OrderSuccess order={order} />
}

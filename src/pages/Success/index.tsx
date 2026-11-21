import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { EmptyCart } from '@/components/EmptyCart'
import { OrderSuccess } from '@/components/OrderSuccess'
import { loadLastOrder } from '@/utils/orderStorage'

export function Success() {
  // Lido uma única vez: o snapshot é a única fonte de dados desta tela.
  const [order] = useState(loadLastOrder)
  const { t } = useTranslation()

  // RN-09/RN-10: sem snapshot válido, não inventamos um pedido.
  if (!order) {
    return (
      <EmptyCart
        headingLevel="h1"
        title={t('success.noOrderTitle')}
        description={t('success.noOrderDescription')}
        actionLabel={t('success.backHome')}
      />
    )
  }

  return <OrderSuccess order={order} />
}

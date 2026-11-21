import { useContext } from 'react'
import {
  DeliveryLocationContext,
  type DeliveryLocationContextValue,
} from '@/contexts/DeliveryLocationContext/DeliveryLocationContext'

export function useDeliveryLocation(): DeliveryLocationContextValue {
  const context = useContext(DeliveryLocationContext)
  if (!context) {
    throw new Error('useDeliveryLocation deve ser usado dentro de <DeliveryLocationProvider>')
  }
  return context
}

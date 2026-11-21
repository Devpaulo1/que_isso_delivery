import { createContext } from 'react'
import type { DeliveryLocation } from '@/types/deliveryLocation'

export interface DeliveryLocationContextValue {
  location: DeliveryLocation | null
  setLocation: (location: DeliveryLocation | null) => void
}

export const DeliveryLocationContext = createContext<DeliveryLocationContextValue | null>(null)

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  DeliveryLocationContext,
  type DeliveryLocationContextValue,
} from '@/contexts/DeliveryLocationContext/DeliveryLocationContext'
import type { DeliveryLocation } from '@/types/deliveryLocation'

interface DeliveryLocationProviderProps {
  children: ReactNode
  initialLocation?: DeliveryLocation | null
}

/** Guarda a última localização consultada pelo CEP, sem persistência. */
export function DeliveryLocationProvider({
  children,
  initialLocation = null,
}: DeliveryLocationProviderProps) {
  const [location, setLocationState] = useState<DeliveryLocation | null>(initialLocation)
  const setLocation = useCallback((next: DeliveryLocation | null) => setLocationState(next), [])
  const value = useMemo<DeliveryLocationContextValue>(() => ({ location, setLocation }), [location, setLocation])

  return <DeliveryLocationContext.Provider value={value}>{children}</DeliveryLocationContext.Provider>
}

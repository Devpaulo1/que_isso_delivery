import type { DeliveryLocation } from '@/types/deliveryLocation'

/** Só considera uma localização quando cidade e UF foram preenchidos. */
export function hasDeliveryLocation(location: DeliveryLocation | null): location is DeliveryLocation {
  return location !== null && Boolean(location.city?.trim()) && Boolean(location.state?.trim())
}

/** Texto exibido no selo do Header, ex.: "Salvador, BA". */
export function formatDeliveryLocation(location: DeliveryLocation): string {
  return `${location.city.trim()}, ${location.state.trim().toLocaleUpperCase('pt-BR')}`
}

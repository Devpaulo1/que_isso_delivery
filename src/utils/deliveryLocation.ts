import type { DeliveryLocation } from '@/types/deliveryLocation'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('pt-BR')
}

/** Aceita "São Paulo/SP" mesmo sem acento ou em caixa alta. */
export function isSaoPauloSp(location: DeliveryLocation | null): boolean {
  return (
    location !== null &&
    normalize(location.city) === 'sao paulo' &&
    normalize(location.state) === 'sp'
  )
}

import { STORAGE_KEYS } from '@/config/constants'
import { PAYMENT_METHODS, type DeliveryAddress, type PaymentMethod } from '@/types/checkout'
import type { Order, OrderItemSnapshot } from '@/types/order'
import { readStorage, writeStorage } from '@/utils/storage'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isString = (value: unknown): value is string => typeof value === 'string'
const isNonEmptyString = (value: unknown): value is string => isString(value) && value.trim() !== ''
const isCents = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0

function parseItem(value: unknown): OrderItemSnapshot | null {
  if (!isRecord(value)) return null
  const { coffeeId, name, unitPriceInCents, quantity, lineTotalInCents, image } = value
  if (
    !isNonEmptyString(coffeeId) ||
    !isNonEmptyString(name) ||
    !isCents(unitPriceInCents) ||
    typeof quantity !== 'number' ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    !isCents(lineTotalInCents) ||
    lineTotalInCents !== unitPriceInCents * quantity ||
    !isString(image)
  ) {
    return null
  }
  return { coffeeId, name, unitPriceInCents, quantity, lineTotalInCents, image }
}

function parseAddress(value: unknown): DeliveryAddress | null {
  if (!isRecord(value)) return null
  const { postalCode, street, number, complement, neighborhood, city, state } = value
  if (
    !isString(postalCode) ||
    !/^\d{8}$/.test(postalCode) ||
    ![street, number, neighborhood, city, state].every(isNonEmptyString) ||
    (complement !== undefined && !isString(complement))
  ) {
    return null
  }
  const address: DeliveryAddress = {
    postalCode,
    street: street as string,
    number: number as string,
    neighborhood: neighborhood as string,
    city: city as string,
    state: state as string,
  }
  return complement ? { ...address, complement } : address
}

/**
 * Valida o último pedido salvo. Qualquer inconsistência (incluindo totais
 * que não batem) invalida o snapshot: a tela de sucesso não inventa pedido.
 */
export function parseOrder(value: unknown): Order | null {
  if (!isRecord(value)) return null
  const { id, createdAt, items, address, paymentMethod, subtotalInCents, deliveryFeeInCents, totalInCents } =
    value

  if (!isNonEmptyString(id) || !isString(createdAt) || Number.isNaN(Date.parse(createdAt))) return null
  if (!Array.isArray(items) || items.length === 0) return null
  if (!PAYMENT_METHODS.includes(paymentMethod as PaymentMethod)) return null
  if (!isCents(subtotalInCents) || !isCents(deliveryFeeInCents) || !isCents(totalInCents)) return null

  const parsedItems = items.map(parseItem)
  if (parsedItems.some((item) => item === null)) return null
  const validItems = parsedItems as OrderItemSnapshot[]

  const parsedAddress = parseAddress(address)
  if (!parsedAddress) return null

  const expectedSubtotal = validItems.reduce((sum, item) => sum + item.lineTotalInCents, 0)
  if (expectedSubtotal !== subtotalInCents || subtotalInCents + deliveryFeeInCents !== totalInCents) {
    return null
  }

  return {
    id,
    createdAt,
    items: validItems,
    address: parsedAddress,
    paymentMethod: paymentMethod as PaymentMethod,
    subtotalInCents,
    deliveryFeeInCents,
    totalInCents,
  }
}

export function saveLastOrder(order: Order): boolean {
  return writeStorage(STORAGE_KEYS.lastOrder, order)
}

export function loadLastOrder(): Order | null {
  return readStorage(STORAGE_KEYS.lastOrder, parseOrder)
}

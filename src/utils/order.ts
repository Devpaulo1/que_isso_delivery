import { DELIVERY_FEE_IN_CENTS } from '@/config/constants'
import type { CheckoutFormData } from '@/schemas/checkoutSchema'
import type { ResolvedCartItem } from '@/types/cart'
import type { DeliveryAddress } from '@/types/checkout'
import type { Order, OrderItemSnapshot } from '@/types/order'
import { getDeliveryFeeInCents } from '@/utils/cart'

export interface CreateOrderInput {
  items: readonly ResolvedCartItem[]
  form: CheckoutFormData
  deliveryFeeInCents?: number
}

export interface CreateOrderDeps {
  now?: () => Date
  generateId?: () => string
}

function defaultId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `order-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }
  return value
}

export function toDeliveryAddress(form: CheckoutFormData): DeliveryAddress {
  const address: DeliveryAddress = {
    postalCode: form.postalCode,
    street: form.street,
    number: form.number,
    neighborhood: form.neighborhood,
    city: form.city,
    state: form.state,
  }
  return form.complement ? { ...address, complement: form.complement } : address
}

/**
 * Cria um snapshot independente do pedido (RF-12, RF-13, RN-06):
 * copia nome, preço unitário, quantidade e total de cada linha no momento
 * da confirmação. Depois de criado, não depende do carrinho nem do catálogo.
 */
export function createOrderSnapshot(
  { items, form, deliveryFeeInCents = DELIVERY_FEE_IN_CENTS }: CreateOrderInput,
  { now = () => new Date(), generateId = defaultId }: CreateOrderDeps = {},
): Order {
  if (items.length === 0) {
    throw new Error('Não é possível criar um pedido sem itens')
  }

  const snapshotItems: OrderItemSnapshot[] = items.map(({ coffee, quantity }) => ({
    coffeeId: coffee.id,
    name: coffee.name,
    unitPriceInCents: coffee.priceInCents,
    quantity,
    lineTotalInCents: coffee.priceInCents * quantity,
    image: coffee.image,
  }))

  const subtotalInCents = snapshotItems.reduce((sum, item) => sum + item.lineTotalInCents, 0)
  const fee = getDeliveryFeeInCents(subtotalInCents, deliveryFeeInCents)

  return deepFreeze({
    id: generateId(),
    createdAt: now().toISOString(),
    items: snapshotItems,
    address: toDeliveryAddress(form),
    paymentMethod: form.paymentMethod,
    subtotalInCents,
    deliveryFeeInCents: fee,
    totalInCents: subtotalInCents + fee,
  })
}

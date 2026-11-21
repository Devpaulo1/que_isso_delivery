import type { DeliveryAddress, PaymentMethod } from '@/types/checkout'

/** Cópia dos dados do produto no momento da compra (não depende do catálogo). */
export interface OrderItemSnapshot {
  coffeeId: string
  name: string
  unitPriceInCents: number
  quantity: number
  lineTotalInCents: number
  image: string
}

export interface Order {
  id: string
  /** ISO 8601. */
  createdAt: string
  items: OrderItemSnapshot[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}

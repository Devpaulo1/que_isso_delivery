export const PAYMENT_METHODS = ['credit', 'debit', 'cash'] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export type { CheckoutFormData, CheckoutFormInput } from '@/schemas/checkoutSchema'

export interface DeliveryAddress {
  /** Somente os 8 dígitos do CEP. */
  postalCode: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  /** UF com 2 letras maiúsculas. */
  state: string
}

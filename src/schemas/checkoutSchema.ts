import type { TFunction } from 'i18next'
import { z } from 'zod'
import { PAYMENT_METHODS } from '@/types/checkout'
import { digitsOnly } from '@/utils/postalCode'

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

/**
 * As mensagens do schema são chaves de tradução (ex.: `validation.streetRequired`),
 * traduzidas na exibição para acompanhar a troca de idioma.
 * Parâmetros vão depois de `|` (ex.: `validation.maxLength|120`).
 */
const maxLength = (max: number) => `validation.maxLength|${max}`

export function translateError(t: TFunction, message: string): string {
  const [key, max] = message.split('|')
  return t(key, { max, defaultValue: message })
}

const requiredText = (message: string, max = 120) =>
  z
    .string({ error: message })
    .trim()
    .min(1, message)
    .max(max, maxLength(max))

export const checkoutSchema = z.object({
  postalCode: z
    .string({ error: 'validation.postalCodeRequired' })
    .trim()
    .min(1, 'validation.postalCodeRequired')
    .transform(digitsOnly)
    .pipe(z.string().regex(/^\d{8}$/, 'validation.postalCodeDigits')),
  street: requiredText('validation.streetRequired'),
  number: requiredText('validation.numberRequired', 10),
  complement: z
    .string()
    .trim()
    .max(60, maxLength(60))
    .optional()
    .transform((value) => (value ? value : undefined)),
  neighborhood: requiredText('validation.neighborhoodRequired', 80),
  city: requiredText('validation.cityRequired', 80),
  state: z
    .string({ error: 'validation.stateRequired' })
    .trim()
    .min(1, 'validation.stateRequired')
    .transform((value) => value.toUpperCase())
    .pipe(z.enum(BRAZILIAN_STATES, { error: 'validation.stateInvalid' })),
  paymentMethod: z.enum(PAYMENT_METHODS, { error: 'validation.paymentRequired' }),
})

/** Valores iniciais do formulário: nenhum pagamento pré-selecionado (RF-09). */
export const checkoutDefaultValues = {
  postalCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
}

/** Valores do formulário (o que o usuário digita). */
export type CheckoutFormInput = z.input<typeof checkoutSchema>
/** Dados validados e normalizados (CEP só dígitos, UF maiúscula). */
export type CheckoutFormData = z.output<typeof checkoutSchema>

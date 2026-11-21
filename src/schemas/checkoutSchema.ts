import { z } from 'zod'
import { PAYMENT_METHODS } from '@/types/checkout'
import { digitsOnly } from '@/utils/postalCode'

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

const requiredText = (message: string, max = 120) =>
  z
    .string({ error: message })
    .trim()
    .min(1, message)
    .max(max, `Use no máximo ${max} caracteres`)

export const checkoutSchema = z.object({
  postalCode: z
    .string({ error: 'Informe o CEP' })
    .trim()
    .min(1, 'Informe o CEP')
    .transform(digitsOnly)
    .pipe(z.string().regex(/^\d{8}$/, 'CEP deve ter 8 dígitos')),
  street: requiredText('Informe a rua'),
  number: requiredText('Informe o número', 10),
  complement: z
    .string()
    .trim()
    .max(60, 'Use no máximo 60 caracteres')
    .optional()
    .transform((value) => (value ? value : undefined)),
  neighborhood: requiredText('Informe o bairro', 80),
  city: requiredText('Informe a cidade', 80),
  state: z
    .string({ error: 'Informe a UF' })
    .trim()
    .min(1, 'Informe a UF')
    .transform((value) => value.toUpperCase())
    .pipe(z.enum(BRAZILIAN_STATES, { error: 'UF inválida' })),
  paymentMethod: z.enum(PAYMENT_METHODS, { error: 'Selecione uma forma de pagamento' }),
})

/** Valores do formulário (o que o usuário digita). */
export type CheckoutFormInput = z.input<typeof checkoutSchema>
/** Dados validados e normalizados (CEP só dígitos, UF maiúscula). */
export type CheckoutFormData = z.output<typeof checkoutSchema>

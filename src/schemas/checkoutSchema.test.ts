import { checkoutSchema, type CheckoutFormInput } from '@/schemas/checkoutSchema'
import { formatPostalCode, isCompletePostalCode, normalizePostalCode } from '@/utils/postalCode'

const valid: CheckoutFormInput = {
  postalCode: '01001-000',
  street: 'Praça da Sé',
  number: '100',
  complement: '',
  neighborhood: 'Sé',
  city: 'São Paulo',
  state: 'sp',
  paymentMethod: 'credit',
}

function errorsFor(input: Partial<Record<keyof CheckoutFormInput, unknown>>) {
  const result = checkoutSchema.safeParse({ ...valid, ...input })
  if (result.success) return {}
  return Object.fromEntries(result.error.issues.map((issue) => [issue.path.join('.'), issue.message]))
}

describe('checkoutSchema', () => {
  it('accepts valid data and normalizes CEP, UF and empty complement', () => {
    const result = checkoutSchema.parse(valid)
    expect(result.postalCode).toBe('01001000')
    expect(result.state).toBe('SP')
    expect(result.complement).toBeUndefined()
  })

  it('keeps a filled complement', () => {
    expect(checkoutSchema.parse({ ...valid, complement: ' Apto 12 ' }).complement).toBe('Apto 12')
  })

  it.each(['', '123', '0100100', '01001-00a', '010010001'])('rejects CEP "%s"', (postalCode) => {
    expect(errorsFor({ postalCode }).postalCode).toBeDefined()
  })

  it.each(['street', 'number', 'neighborhood', 'city'] as const)('requires %s', (field) => {
    expect(errorsFor({ [field]: '   ' })[field]).toMatch(/^Informe/)
  })

  it.each(['', 'S', 'XX', 'SPP', '12'])('rejects UF "%s"', (state) => {
    expect(errorsFor({ state }).state).toBeDefined()
  })

  it.each([undefined, '', 'pix', null])('requires a valid payment method (%s)', (paymentMethod) => {
    expect(errorsFor({ paymentMethod }).paymentMethod).toBe('Selecione uma forma de pagamento')
  })

  it.each(['credit', 'debit', 'cash'])('accepts payment method %s', (paymentMethod) => {
    expect(errorsFor({ paymentMethod })).toEqual({})
  })
})

describe('postal code utils', () => {
  it('normalizes and formats', () => {
    expect(normalizePostalCode('01.001-000x')).toBe('01001000')
    expect(formatPostalCode('01001000')).toBe('01001-000')
    expect(formatPostalCode('0100')).toBe('0100')
    expect(isCompletePostalCode('01001-000')).toBe(true)
    expect(isCompletePostalCode('01001-00')).toBe(false)
  })
})

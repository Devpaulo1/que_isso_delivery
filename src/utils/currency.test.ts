import { formatAmount, formatCurrency } from '@/utils/currency'

/** Intl usa espaço não separável (U+00A0) entre o símbolo e o número. */
const NBSP = String.fromCharCode(160)
const normalize = (text: string) => text.split(NBSP).join(' ')

describe('currency utils', () => {
  it.each([
    [0, 'R$ 0,00'],
    [990, 'R$ 9,90'],
    [1290, 'R$ 12,90'],
    [123456, 'R$ 1.234,56'],
  ])('formats %i cents as %s', (cents, expected) => {
    expect(normalize(formatCurrency(cents))).toBe(expected)
  })

  it('formats without symbol', () => {
    expect(formatAmount(500)).toBe('5,00')
  })

  it('rejects non-integer cents', () => {
    expect(() => formatCurrency(9.9)).toThrow(TypeError)
  })
})

import { clampQuantity, isValidQuantity, parseQuantityInput } from '@/utils/quantity'

describe('quantity utils', () => {
  it.each([1, 2, 99])('accepts %s', (value) => {
    expect(isValidQuantity(value)).toBe(true)
  })

  it.each([0, -1, 1.5, 100, Number.NaN, '2', null, undefined])('rejects %s', (value) => {
    expect(isValidQuantity(value)).toBe(false)
  })

  it.each([
    ['3', 3],
    [' 12 ', 12],
    ['0', null],
    ['-2', null],
    ['2.5', null],
    ['abc', null],
    ['', null],
    ['100', null],
  ])('parses "%s" as %s', (text, expected) => {
    expect(parseQuantityInput(text)).toBe(expected)
  })

  it('clamps to limits', () => {
    expect(clampQuantity(0)).toBe(1)
    expect(clampQuantity(150)).toBe(99)
    expect(clampQuantity(4.7)).toBe(4)
    expect(clampQuantity(Number.NaN)).toBe(1)
  })
})

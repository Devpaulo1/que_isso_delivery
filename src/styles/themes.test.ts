import { darkTheme, lightTheme, type ThemeColors } from '@/styles/themes'

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

/** Pares texto/fundo usados na interface que precisam de AA (4.5:1). */
const textPairs: Array<[keyof ThemeColors, keyof ThemeColors]> = [
  ['title', 'background'],
  ['text', 'background'],
  ['text', 'surface'],
  ['subtitle', 'surface'],
  ['label', 'surfaceAlt'],
  ['tagText', 'brandYellowLight'],
  ['brandPurpleDark', 'brandPurpleLight'],
  ['brandPurpleDark', 'background'],
  ['error', 'background'],
  ['error', 'surface'],
  ['title', 'surfaceAlt'],
  ['text', 'button'],
  ['onYellow', 'brandYellow'],
  ['onBrand', 'brandPurpleDark'],
]

describe.each([lightTheme, darkTheme])('$name theme', (theme) => {
  it('exposes the same semantic color keys', () => {
    expect(Object.keys(theme.colors).sort()).toEqual(Object.keys(lightTheme.colors).sort())
  })

  it.each(textPairs)('%s on %s meets WCAG AA', (fg, bg) => {
    expect(contrast(theme.colors[fg], theme.colors[bg])).toBeGreaterThanOrEqual(4.5)
  })
})

/**
 * Tokens de design independentes de tema.
 * Componentes consomem estes valores via `theme`, nunca hexadecimais soltos.
 */

export const fonts = {
  title: "'Baloo 2', system-ui, sans-serif",
  text: "'Roboto', system-ui, sans-serif",
} as const

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '3rem',
} as const

export const fontWeights = {
  regular: 400,
  bold: 700,
  extraBold: 800,
} as const

export const lineHeights = {
  tight: 1.3,
  base: 1.6,
} as const

export const space = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const

export const radii = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  card: '6px 36px 6px 36px',
  pill: '999px',
} as const

/** Breakpoints em px (DP-07: definidos sem inspeção do Figma). */
export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1120,
} as const

export const media = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
} as const

export const layout = {
  maxWidth: '1120px',
  gutter: space[4],
} as const

export const transitions = {
  fast: '120ms ease-in-out',
  base: '200ms ease-in-out',
} as const

export const tokens = {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
  radii,
  breakpoints,
  media,
  layout,
  transitions,
} as const

export type Tokens = typeof tokens

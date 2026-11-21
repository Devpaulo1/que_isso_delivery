export const COFFEE_CATEGORIES = [
  'traditional',
  'special',
  'with-milk',
  'alcoholic',
  'iced',
] as const

export type CoffeeCategory = (typeof COFFEE_CATEGORIES)[number]

export interface Coffee {
  id: string
  name: string
  description: string
  /** Preço unitário em centavos inteiros (RN-04). */
  priceInCents: number
  /** URL resolvida do asset local. */
  image: string
  /** Rótulos exibidos no card (ex.: "Tradicional", "Com leite"). */
  tags: string[]
  category: CoffeeCategory
}

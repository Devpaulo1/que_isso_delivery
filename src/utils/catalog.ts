import type { Coffee, CoffeeCategory } from '@/types/coffee'

/** Sem categoria selecionada, retorna o catálogo completo. */
export function filterCoffeesByCategory(
  coffees: readonly Coffee[],
  category: CoffeeCategory | null,
): readonly Coffee[] {
  return category ? coffees.filter((coffee) => coffee.category === category) : coffees
}

/** Categorias presentes no catálogo, na ordem em que aparecem. */
export function getAvailableCategories(coffees: readonly Coffee[]): CoffeeCategory[] {
  return [...new Set(coffees.map((coffee) => coffee.category))]
}

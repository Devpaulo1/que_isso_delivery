import { coffees, findCoffeeById } from '@/data/coffees'
import { COFFEE_CATEGORIES } from '@/types/coffee'

const imageFiles = Object.keys(import.meta.glob('/src/assets/img/*.png'))

describe('coffee catalog', () => {
  it('has products', () => {
    expect(coffees.length).toBeGreaterThan(0)
  })

  it('uses unique ids', () => {
    const ids = coffees.map((coffee) => coffee.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(coffees.map((coffee) => [coffee.id, coffee] as const))('%s is valid', (_id, coffee) => {
    expect(coffee.name.trim()).not.toBe('')
    expect(coffee.description.trim()).not.toBe('')
    expect(Number.isInteger(coffee.priceInCents)).toBe(true)
    expect(coffee.priceInCents).toBeGreaterThan(0)
    expect(coffee.tags.length).toBeGreaterThan(0)
    expect(COFFEE_CATEGORIES).toContain(coffee.category)
    expect(coffee.image).not.toBe('')
  })

  it('has an image file for every product', () => {
    for (const coffee of coffees) {
      expect(imageFiles).toContain(`/src/assets/img/${coffee.id}.png`)
    }
  })

  it('finds coffees by id', () => {
    expect(findCoffeeById('latte')?.name).toBe('Latte')
    expect(findCoffeeById('does-not-exist')).toBeUndefined()
  })
})
